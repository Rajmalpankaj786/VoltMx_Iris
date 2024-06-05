/* Attribute's meaning
 * -------------------------------------------------------------------------------------------------
 * kcl --------> Volt MX layout type (hflex / vflex / fflex)
 * kdir -------> voltmx direction type (ltr / rtl)
 * kfb --------> This is value of kr attribute, which means voltmx-fake-border
 * ko ---------> Volt MX orientation for widgets like, CheckBoxGroup/RadioButtonGroup/Slider etc.
 * kr ---------> Volt MX role name for our internal plugins/sub role
 * kt ---------> Volt MX theme, for widgets like Calendar/Switch etc.
 * kv ---------> Volt MX widget view type, for widgets like SegmentedUI2 etc.
 * kw ---------> Volt MX widget name
 * kwf --------> Volt MX widget fragment, like calendar popup can render in any context
 * kwg --------> Volt MX widget gesture, can be found in Slider/Images2 etc.
 * kwh --------> Volt MX widget handler
 * kwi --------> Volt MX widget index (e.g. widget inside segment)
 * kwo --------> Volt MX widget owner (widgets inside segment template will have this)
 * kwp --------> Volt MX widget path for automation purpose (e.g. formId_segmentId[0,0]_templateId_buttonId)
 * -------------------------------------------------------------------------------------------------
 */
Object.defineProperty(voltmx.$kwebfw$, 'widget', {configurable:false, enumerable:false, writable:false, value:(function() {
    var _ns = {}, $K = voltmx.$kwebfw$, _specialARIAkeys = ['lang', 'role'];


    //TODO:: To be verified for each and every widget
    var _a11y = {
            a11yLabel: function(model) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, label = model.placeholder,
                    a11y = model._kwebfw_.prop.accessibilityConfig;

                if(!$KU.is(label, 'string')) label = '';

                return (a11y) ? _a11y.prepareLabel(a11y, label) : '';
            },

            a11yHint: function(model, a11yHint) {
                _a11y.createHint(a11yHint, (model._kwebfw_.uid+'_hint'));
            },

            apply: function(model, view, a11y) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom, a11yLabel = '';

                if(a11y) {
                    $KU.each(a11y.a11yARIA, function(value, key) {
                        var $K = voltmx.$kwebfw$, $KU = $K.utils,
                            $KD = $K.dom, rmodel = null;

                        if(key.indexOf('aria-') === 0 || _specialARIAkeys.indexOf(key) >= 0) {
                            if(['aria-labelledby', 'aria-describedby'].indexOf(key) >= 0) {
                                rmodel = _rmodel(model);

                                if(rmodel && $KU.is(rmodel[value], 'widget')) {
                                    $KD.setAttr(view, key, rmodel[value]._kwebfw_.uid);
                                }
                            } else if(key === 'role') {
                                if(_isAriaRoleAllowed(model, value)) {
                                    $KD.setAttr(view, key, value);
                                }
                            } else {
                                if($KU.is(value, 'i18n')) {
                                    value = $KU.getI18Nvalue(value);
                                }

                                $KD.setAttr(view, key, value);
                            }
                        }
                    });

                    if(!$KD.hasAttr(view, 'tabindex') && _interactable(model)
                    && ['A', 'IMG', 'INPUT', 'SELECT', 'TEXTAREA'].indexOf(view.tagName) !== -1) {
                        $KD.setAttr(view, 'tabindex', 0);
                    }

                    if(!(a11y.a11yARIA && a11y.a11yARIA['aria-label']
                    && $KU.is(a11y.a11yARIA['aria-label'], 'string'))) {
                        a11yLabel = _a11y.a11yLabel(model);
                    }

                    if($KU.is(model, 'widget', 'Image2')) {
                        $KD.setAttr(view, 'alt', a11yLabel);
                    } else if(a11yLabel) {
                        $KD.setAttr(view, 'aria-label', a11yLabel);
                    }

                    if(!(a11y.a11yARIA && a11y.a11yARIA['aria-describedby']
                    && $KU.is(a11y.a11yARIA['aria-describedby'], 'string'))) {
                        if($KU.is(a11y.a11yHint, 'string')) {
                            _a11y.a11yHint(model, a11y.a11yHint);
                            $KD.setAttr(view, 'aria-describedby', (model._kwebfw_.uid + '_hint'));
                        }
                    }

                    if(!(a11y.a11yARIA && a11y.a11yARIA['aria-hidden']
                    && $KU.is(a11y.a11yARIA['aria-hidden'], 'boolean'))) {
                        if(a11y.a11yHidden === true) {
                            $KD.setAttr(view, 'aria-hidden', true);
                        }
                    }

                    if(!(a11y.a11yARIA && a11y.a11yARIA['aria-required']
                    && $KU.is(a11y.a11yARIA['aria-required'], 'boolean'))) {
                        if(a11y.required === true) {
                            $KD.setAttr(view, 'aria-required', true);
                        }
                    }
                }
            },

            clean: function(model, view, a11y) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom,
                    div = document.getElementById((model._kwebfw_.uid+'_hint'));

                if(a11y && a11y.a11yARIA) {
                    $KU.each(a11y.a11yARIA, function(value, key) {
                        var $K = voltmx.$kwebfw$, $KD = $K.dom;

                        if(key === 'tabindex' || key.indexOf('aria-') === 0
                        || _specialARIAkeys.indexOf(key) >= 0) {
                            $KD.removeAttr(view, key);
                        }
                    });
                }

                if(div) $KD.remove(div);
                $KD.removeAttr(view, 'aria-describedby');
                $KD.removeAttr(view, 'aria-hidden');
                $KD.removeAttr(view, 'aria-label');
                $KD.removeAttr(view, 'aria-required');
            },

            createHint: function(a11yHint, hintId) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom,
                    $KG = $K.globals, label = null;

                if($KU.is(a11yHint, 'i18n')) {
                    a11yHint = $KU.getI18Nvalue(a11yHint);
                }

                a11yHint = a11yHint.trim();
                label = document.getElementById(hintId);

                if(label) {
                    $KD.text(label, a11yHint);
                } else {
                    label = $KD.create('LABEL', {id:hintId, hidden:''});
                    $KD.text(label, a11yHint);
                    $KD.add($KG.appScrap, label);
                }
            },

            prepareLabel: function(a11y, label) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils,
                    a11yLabel = '', a11yValue = '';

                if($KU.is(a11y.a11yValue, 'string')) {
                    if($KU.is(a11y.a11yValue, 'i18n')) {
                        a11yValue = $KU.getI18Nvalue(a11y.a11yValue);
                    } else {
                        a11yValue = a11y.a11yValue;
                    }
                    a11yValue = a11yValue.trim();
                }

                if($KU.is(a11y.a11yLabel, 'string')) {
                    a11yLabel = a11y.a11yLabel;
                } else if($KU.is(a11y.a11yHint, 'string')) {
                    a11yLabel = a11y.a11yHint;
                }

                if($KU.is(a11yLabel, 'string')) {
                    if($KU.is(a11yLabel, 'i18n')) {
                        a11yLabel = $KU.getI18Nvalue(a11yLabel);
                    }
                    a11yLabel = a11yLabel.trim();
                }

                if(!a11yLabel && label) a11yLabel = label.trim();

                if(a11yLabel && a11yValue) {
                    a11yLabel = a11yLabel + ' ' + a11yValue;
                } else if(!a11yLabel && a11yValue) {
                    a11yLabel = a11yValue;
                } else if(!a11yLabel && !a11yValue) {
                    a11yLabel = '';
                }

                return a11yLabel;
            },

            view: {
                Calendar: function (view, tagName) {
                    var $K = voltmx.$kwebfw$, $KW = $K.widget;
                    if (!tagName || tagName === 'IMG') {
                        tagName = 'ICON';
                    }

                    return $KW.el(view, (tagName).toLocaleLowerCase());
                },

                DataGrid: function(view) {
                    var $K = voltmx.$kwebfw$, $KW = $K.widget;

                    return $KW.el(view, 'table');
                },

                Image2: function(view) {
                    var $K = voltmx.$kwebfw$, $KW = $K.widget;

                    return $KW.el(view, 'image');
                },

                ListBox: function(view) {
                    var $K = voltmx.$kwebfw$, $KW = $K.widget;

                    if(view.tagName === 'SELECT') {
                        return view;
                    }
                    return $KW.el(view, 'input');
                },

                SegmentedUI2: function(view) {
                    var $K = voltmx.$kwebfw$, $KW = $K.widget;

                    return $KW.el(view, 'scrolee');
                },

                Slider: function(view) {
                    var $K = voltmx.$kwebfw$, $KW = $K.widget;

                    return $KW.el(view, 'thumb');
                },

                Switch: function(view) {
                    var $K = voltmx.$kwebfw$, $KW = $K.widget;

                    return $KW.el(view, 'switch');
                },

                Video: function(view) {
                    var $K = voltmx.$kwebfw$, $KW = $K.widget;

                    return $KW.el(view, 'video');
                }
            }
        },
        __el = {
            Browser: function(model, view, $KU, $KW, $KD, key) {
                var hash = {node:view}, iframe = $KD.first(view);

                if(iframe) hash.iframe = iframe;

                return (typeof key === 'string' && key) ? hash[key] : hash;
            },

            Button: function(model, view, $KU, $KW, $KD, key) {
                var hash = {node:view};

                return (typeof key === 'string' && key) ? hash[key] : hash;
            },

            Calendar: function(model, view, $KU, $KW, $KD, key) {
                var hash = {node:view, picker:model._kwebfw_.picker, input:null, icon:null},
                    input = $KD.first(view), icon = $KD.next(input);

                if(icon.tagName === 'IMG') {
                    hash.icon = icon;
                    hash.input = input;
                } else {
                    hash.icon = input;
                    hash.input = icon;
                }

                return (typeof key === 'string' && key) ? hash[key] : hash;
            },

            Canvas: function(model, view, $KU, $KW, $KD, key) {
                var hash = {node:view, canvas: $KD.first(view)};

                return (typeof key === 'string' && key) ? hash[key] : hash;
            },

            Camera: function(model, view, $KU, $KW, $KD, key) {
                var hash = {node:view, video: $KD.first(view)};

                hash.canvas = $KD.next(hash.video);

                return (typeof key === 'string' && key) ? hash[key] : hash;
            },

            CheckBoxGroup: function(model, view, $KU, $KW, $KD, key) {
                var hash = {node:view};

                return (typeof key === 'string' && key) ? hash[key] : hash;
            },

            CollectionView: function(model, view, $KU, $KW, $KD, key) {
                var hash = {node:view};

                if($KU.scrollType() === 'native') {
                    hash.viewport = $KD.first(hash.node);
                    hash.scrolee = hash.viewport;
                } else {
                    hash.viewport = hash.node;
                    hash.scrolee = $KD.first(hash.node);
                }

                hash.docker = $KD.next(hash.scrolee);
                hash.blocker = $KD.first(hash.docker);
                //hash.pageNav = $KD.next(hash.docker);
                //TODO:: pull/push will come and sit here
                hash.vScroll = $KD.last(hash.node);
                hash.hScroll = $KD.prev(hash.vScroll);

                return (typeof key === 'string' && key) ? hash[key] : hash;
            },

            CustomWidget: function(model, view, $KU, $KW, $KD, key) {
                var hash = {node:view};

                return (typeof key === 'string' && key) ? hash[key] : hash;
            },

            DataGrid: function(model, view, $KU, $KW, $KD, key) {
                var hash = {node:view, table:$KD.first(view)};

                hash.docker = $KD.next(hash.table);
                hash.viewport = hash.node;
                if(model.dockingHeader) {
                    hash.dockedheader = $KD.first(hash.docker);
                }
                hash.header = $KD.first(hash.table);

                return (typeof key === 'string' && key) ? hash[key] : hash;
            },

            FlexContainer: function(model, view, $KU, $KW, $KD, key) {
                var hash = {node:view};

                return (typeof key === 'string' && key) ? hash[key] : hash;
            },

            FlexScrollContainer: function(model, view, $KU, $KW, $KD, key) {
                var hash = {node:view, viewport:view};

                if($KU.scrollType() === 'native') {
                    hash.scrolee = hash.viewport;
                } else {
                    hash.scrolee = $KD.first(hash.viewport);
                    hash.hScroll = $KD.next(hash.scrolee);
                    hash.vScroll = $KD.next(hash.hScroll);
                }

                return (typeof key === 'string' && key) ? hash[key] : hash;
            },

            Form2: function(model, view, $KU, $KW, $KD, key) {
                var hash = {node:view, header:$KD.first(view)};

                hash.viewport = $KD.next(hash.header);

                if($KU.scrollType() === 'native') {
                    hash.scrolee = hash.viewport;
                } else {
                    hash.scrolee = $KD.first(hash.viewport);
                    hash.hScroll = $KD.next(hash.scrolee);
                    hash.vScroll = $KD.next(hash.hScroll);
                }

                hash.footer = $KD.next(hash.viewport);

                return (typeof key === 'string' && key) ? hash[key] : hash;
            },

            Image2: function(model, view, $KU, $KW, $KD, key) {
                var hash = {node:view, image:$KD.first(view)};

                return (typeof key === 'string' && key) ? hash[key] : hash;
            },

            Label: function(model, view, $KU, $KW, $KD, key) {
                var hash = {node:view};

                return (typeof key === 'string' && key) ? hash[key] : hash;
            },

            ListBox: function(model, view, $KU, $KW, $KD, key) {
                var hash = {node:view};

                if($KU.is(model, 'widget', 'ListBox')
                && model.viewType === constants.LISTBOX_VIEW_TYPE_EDITVIEW) {
                    hash.input = $KD.first(hash.node);
                    hash.icon = $KD.next(hash.input);
                }

                return (typeof key === 'string' && key) ? hash[key] : hash;
            },

            Map: function(model, view, $KU, $KW, $KD, key) {
                var hash = {node:view};

                return (typeof key === 'string' && key) ? hash[key] : hash;
            },

            RadioButtonGroup: function(model, view, $KU, $KW, $KD, key) {
                var hash = {node:view};

                return (typeof key === 'string' && key) ? hash[key] : hash;
            },

            RichText: function(model, view, $KU, $KW, $KD, key) {
                var hash = {node:view};

                return (typeof key === 'string' && key) ? hash[key] : hash;
            },

            SegmentedUI2: function(model, view, $KU, $KW, $KD, key) {
                var hash = {node:view};

                hash.topscrolee = $KD.first(hash.node);
                hash.viewport = hash.node;
                hash.scrolee = $KD.next(hash.topscrolee);
                hash.bottomscrolee = $KD.next(hash.scrolee);

                hash.docker = $KD.next(hash.bottomscrolee);
                hash.blocker = $KD.first(hash.docker);
                hash.pageNav = $KD.next(hash.docker);
                //TODO:: pull/push will come and sit here
                hash.vScroll = $KD.last(hash.node);
                hash.hScroll = $KD.prev(hash.vScroll);

                return (typeof key === 'string' && key) ? hash[key] : hash;
            },

            Slider: function(model, view, $KU, $KW, $KD, key) {
                var hash = {node:view, slider:$KD.first(view)},
                    children = $KD.children(hash.slider);

                hash.minLabel = children[0];
                hash.seekbar = children[1];
                hash.maxLabel = children[2];

                children = $KD.children(hash.seekbar);

                hash.min = children[0];
                hash.max = children[1];
                hash.thumb = children[2];

                return (typeof key === 'string' && key) ? hash[key] : hash;
            },

            Switch: function(model, view, $KU, $KW, $KD, key) {
                var hash = {node:view, switch:$KD.first(view)},
                    children = $KD.children(hash.switch);

                hash.left = children[0];
                hash.right = children[1];

                hash.thumb = $KD.last(hash.node);
                hash.thumb = $KD.first(hash.thumb);

                return (typeof key === 'string' && key) ? hash[key] : hash;
            },

            TabPane: function(model, view, $KU, $KW, $KD, key) {
                var hash = {node:view, wrapper:$KD.first(view)};

                hash.tabs = $KD.find(hash.wrapper, '[kr="tabs"]')[0];
                hash.viewport = $KD.find(hash.wrapper, '[kr="viewport"]')[0];

                if($KU.scrollType() === 'native') {
                    hash.scrolee = $KD.find(hash.wrapper, '[kr="viewport"]')[0];
                } else {
                    hash.scrolee = $KD.first(hash.viewport);
                    hash.hScroll = $KD.next(hash.scrolee);
                    hash.vScroll = $KD.next(hash.hScroll);
                }

                return (typeof key === 'string' && key) ? hash[key] : hash;
            },

            TextArea2: function(model, view, $KU, $KW, $KD, key) {
                var hash = {node:view};

                return (typeof key === 'string' && key) ? hash[key] : hash;
            },

            TextBox2: function(model, view, $KU, $KW, $KD, key) {
                var hash = {node:view};

                return (typeof key === 'string' && key) ? hash[key] : hash;
            },

            Video: function(model, view, $KU, $KW, $KD, key) {
                var hash = {node:view, video:$KD.first(view)};

                return (typeof key === 'string' && key) ? hash[key] : hash;
            }
        },
        _modal = {
            collectAllModals: function(fmodel) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, children = null,
                    queue = [], modals = [], info = null, infoList = null;

                if(fmodel.isVisible && fmodel.zIndex !== voltmx.flex.ZINDEX_AUTO) {
                    queue = [{model: fmodel, path: [0], zIndex: [0]}];
                }

                //This while loop do a breadth first search iteration
                while(queue.length) {
                    infoList = [];
                    info = _modal.dequeue(queue);
                    children = _children(info.model);

                    $KU.each(children, function(cmodel, index) {
                        var $K = voltmx.$kwebfw$, $KU = $K.utils,
                            path = null, zIndex = null, meta = null;

                        if(cmodel.zIndex !== voltmx.flex.ZINDEX_AUTO
                        && cmodel.isVisible && !cmodel._kwebfw_.oid
                        && ($KU.is(cmodel, 'widget', 'component')
                        || $KU.is(cmodel, 'widget', 'FlexContainer')
                        || $KU.is(cmodel, 'widget', 'FlexScrollContainer'))) {
                            //Container inside TabPane to be excluded
                            if(!_tpmodel(cmodel)) {
                                path = this.path.slice(0);
                                path.push(index);

                                zIndex = this.zIndex.slice(0);
                                zIndex.push(cmodel.zIndex);

                                meta = {model:cmodel, path:path, zIndex:zIndex};
                                infoList.push(meta);
                                cmodel.isModalContainer && modals.push(meta);
                            }
                        }
                    }, info);

                    infoList = _modal.filterOutModals(infoList);
                    queue = _modal.enqueue(queue, infoList);
                }

                return modals;
            },

            deduceFinalModal: function(modals) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils,
                    final = (modals.length) ? modals.shift() : null;

                $KU.each(modals, function(modal) {
                    if(final.zIndex[1] <= modal.zIndex[1]) {
                        final = modal;
                    }
                });

                return (final) ? final.model : null;
            },

            dequeue: function(queue) {
                return queue.shift();
            },

            enqueue: function(queue, items) {
                queue = queue.concat(items);

                return queue;
            },

            filterOutModals: function(modals) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils,
                    filtered = [], listLength = -1;

                if(modals.length <= 1) {
                    filtered = modals;
                } else {
                    //Taking first item from modals as every items...
                    //... zIndex array size is same
                    listLength = (modals[0].zIndex.length - 1);

                    //Sorting modals, based on zIndex
                    //Higher zIndex has higher priority
                    //For same zIndex, last added modal has higher priority
                    modals.sort(function(a, b) {
                        a = a.zIndex[listLength];
                        b = b.zIndex[listLength];

                        if(a > b) return -1;
                        return 1;
                    });


                    //Filtering out modal, based on zIndex
                    $KU.each(modals, function(modal) {
                        filtered.push(modal);

                        if(modal.model.isModalContainer) {
                            return true;
                        }
                    });


                    //Sorting filtered list, based on path
                    //Modal added later in sequence has higher priority
                    filtered.sort(function(a, b) {
                        a = a.path[listLength];
                        b = b.path[listLength];

                        if(a <= b) return -1;
                        return 1;
                    });
                }

                return filtered;
            }
        },
        _onrender = {
            CustomWidget: function() {
                var $K = voltmx.$kwebfw$;

                $K.ui.CustomWidget.onRender.call(this);
            },

            FlexScrollContainer : function() {
                var $K = voltmx.$kwebfw$, $KW = $K.widget,
                    _ = this._kwebfw_, prop = _.prop;

                if(prop.retainScrollPosition === true) {
                    _retainScrollPosition(this, true);
                } else if(prop.contentOffset) {
                    $KW.setContentOffset(this, prop.contentOffset, true);
                }
            },

            Form2 : function() {
                var $K = voltmx.$kwebfw$, $KW = $K.widget,
                    _ = this._kwebfw_, prop = _.prop;

                if(prop.retainScrollPosition === true) {
                    _retainScrollPosition(this, true);
                } else if(prop.contentOffset) {
                    $KW.setContentOffset(this, prop.contentOffset, true);
                }
            },

            Label: function() {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom, _ = this._kwebfw_,
                    prop = _.prop, view = _.view, fontSize = null, lineSpacing = 0;

                if(prop.textStyle && Object.prototype.hasOwnProperty.call(prop.textStyle, 'lineSpacing')) {
                    lineSpacing = prop.textStyle.lineSpacing;

                    //Similar IF block can be found in voltmxlabel.js file Label$_view_textStyle function
                    fontSize = $KD.style(view, 'font-size').replace('px', '');

                    if($KU.is(fontSize, 'numeric')) {
                        fontSize = parseInt(fontSize, 10);
                        $KD.style(view, 'lineHeight', ((fontSize+lineSpacing)+'px'));
                    } else {
                        $KD.style(view, 'line-height', null);
                    }
                }
            },

            ListBox: function() {
                var _ = this._kwebfw_, prop = _.prop, view = _.view;

                if(prop.viewType === constants.LISTBOX_VIEW_TYPE_LISTVIEW && !prop.selectedKey) {
                    view.value = prop.selectedKey;
                }
            },

            SegmentedUI2 : function() {
                var $K = voltmx.$kwebfw$, $KW = $K.widget,
                    _ = this._kwebfw_, prop = _.prop;

                if(prop.retainScrollPositionMode === constants.SEGUI_SCROLL_POSITION_RETAIN) {
                    _retainScrollPosition(this, true);
                } else if(prop.contentOffset) {
                    $KW.setContentOffset(this, prop.contentOffset, true);
                }
            }
        };


    //All the functions will be called in the scope of widget instance
    var _args = {
        Calendar: {
            onDone: function(payload) {
                var args = [];

                if(payload) {
                    args.push(payload.isValidDateSelected);
                }

                return args;
            },

            onSelection: function(payload) {
                var args = [];

                if(payload) {
                    args.push(payload.isValidDateSelected);
                }

                return args;
            }
        },

        Camera: {
            onCapture: function(payload) {
                var args = [];

                if(payload) {
                    args.push(payload);
                }

                return args;
            },

            onCaptureFailed: function(payload) {
                var args = [];

                if(payload) {
                    args.push(payload);
                }

                return args;
            },

            onFailure: function(payload) {
                var args = [];

                if(payload) {
                    args.push(payload);
                }

                return payload;
            }
        },

        CollectionView: {
            onItemSelect: function(payload) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, args = [], item = null,
                    _ = this._kwebfw_, prop = _.prop, data = prop.data;

                if(payload.secIndex === -1) {
                    item = data[payload.itemIndex];
                } else if(payload.itemIndex === -1) {
                    item = data[payload.secIndex][0];
                } else if(payload.itemIndex === -2) {
                    item = data[payload.secIndex][2];
                } else {
                    item = data[payload.secIndex][1][payload.itemIndex];
                }

                args.push(payload.secIndex, item, payload.itemIndex);
                //TODO
                if(prop.selectionBehavior !== constants.SEGUI_DEFAULT_BEHAVIOR) {
                    args.push(false);

                    $KU.each(_.selectedRows, function(index) {
                        if(index[0] === payload.secIndex
                        && index[1] === payload.itemIndex) {
                            args[(args.length - 1)] = true;
                            return true;
                        }
                    });
                }

                //TODO:: If any of args[2] and args[3] value is -1
                //       And needs to be set to 0, then do here, at last.

                return args;
            },

            onItemDisplay: function(payload) {
                return [payload.sectionIndex, payload.itemIndex, payload.itemModel];
            }
        },

        DataGrid: {
            onRowSelected: function() {
                var args = [];

                //

                return args;
            },

            columnOnClick: function(payload) {
                var args = [];

                if(payload) {
                    args.push(payload.cellIndex);
                }

                return args;
            }

        },

        FlexContainer: {
            onBreakpointHandler: function(/*payload*/) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, $KA = $K.app, args = [];

                if($KU.is(this, 'widget', 'component')) {
                    args = [$KA.currentBreakpoint];
                }

                return args;
            },

            onBreakpointChange: function(/*payload*/) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, $KA = $K.app, args = [];

                if($KU.is(this, 'widget', 'component')) {
                    args = [$KA.currentBreakpoint];
                }

                return args;
            }
        },

        FlexScrollContainer: {
            onBreakpointHandler: function(/*payload*/) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, $KA = $K.app, args = [];

                if($KU.is(this, 'widget', 'component')) {
                    args = [$KA.currentBreakpoint];
                }

                return args;
            },

            onBreakpointChange: function(/*payload*/) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, $KA = $K.app, args = [];

                if($KU.is(this, 'widget', 'component')) {
                    args = [$KA.currentBreakpoint];
                }

                return args;
            }
        },

        Form2: {
            onBreakpointHandler: function(/*payload*/) {
                var $K = voltmx.$kwebfw$, $KA = $K.app,
                    args = [$KA.currentBreakpoint];

                return args;
            },

            onBreakpointChange: function(/*payload*/) {
                var $K = voltmx.$kwebfw$, $KA = $K.app,
                    args = [$KA.currentBreakpoint];

                return args;
            }
        },

        Image2: {
            onDownloadComplete: function(payload) {
                var args = [];

                if(payload) {
                    args.push(payload.src);
                    args.push(payload.isSuccess);
                }

                return args;
            }
        },

        ListBox: {
            onSelection: function(/*payload*/) {
                var args = [];

                //

                return args;
            }
        },

        Map: {
            onPinClick: function(payload) {
                var args = [];

                args.push(payload.locationData);

                return args;
            },
            onClick: function(payload) {
                var args = [];

                if(payload) {
                    args.push(payload.latLng);
                }

                return args;
            }
        },

        RichText: {
            onClick: function(/*payload*/) {
                var args = [];

                //

                return args;
            }
        },

        SegmentedUI2: {
            onRowClick: function(payload) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, args = [], item = null,
                    _ = this._kwebfw_, prop = _.prop, data = prop.data;

                if(payload.secIndex === -1) {
                    item = data[payload.rowIndex];
                } else if(payload.rowIndex === -1) {
                    item = data[payload.secIndex][0];
                } else {
                    item = data[payload.secIndex][1][payload.rowIndex];
                }

                args.push(payload.secIndex, item, payload.rowIndex);

                if(prop.selectionBehavior !== constants.SEGUI_DEFAULT_BEHAVIOR) {
                    args.push(false);

                    $KU.each(_.selectedRows, function(index) {
                        if(index[0] === payload.secIndex
                        && index[1] === payload.rowIndex) {
                            args[(args.length - 1)] = true;
                            return true;
                        }
                    });
                }

                //TODO:: If any of args[2] and args[3] value is -1
                //       And needs to be set to 0, then do here, at last.

                return args;
            },

            onRowDisplay: function(payload) {
                return Object.values(payload);
            },

            onSwipe: function(payload) {
                var data = this._kwebfw_.prop.data, args = [];

                args.push(data[payload.rowIndex], -1, payload.rowIndex);
                //TODO:: withSections needs to be handled properly otherwise will lead to errors.

                return args;
            }
        },

        Slider: {
            onSelection: function(/*payload*/) {
                var args = [];

                //

                return args;
            },

            onSlide: function(/*payload*/) {
                var args = [];

                //

                return args;
            }
        },

        Switch: {
            onSlide: function(/*payload*/) {
                var args = [];

                //

                return args;
            }
        },

        TabPane: {
            onTabClick: function(payload) {
                var args = [];

                if(payload) {
                    args.push(payload.tabIndex);
                }

                return args;
            }
        },

        TextArea2: {
            onBeginEditing: function(/*payload*/) {
                var args = [];

                //

                return args;
            },

            onEndEditing: function(/*payload*/) {
                var args = [];

                //

                return args;
            },

            onKeyDown: function(/*payload*/) {
                var args = [];
                /*
                if(payload) {
                    args.push({
                        altKey: payload.altKey,
                        ctrlKey: payload.ctrlKey,
                        metaKey: payload.metaKey,
                        shiftKey: payload.shiftKey,
                        keyCode: payload.keyCode
                    });
                }
                //*/
                return args;
            },

            onKeyUp: function(/*payload*/) {
                var args = [];
                /*
                if(payload) {
                    args.push({
                        altKey: payload.altKey,
                        ctrlKey: payload.ctrlKey,
                        metaKey: payload.metaKey,
                        shiftKey: payload.shiftKey,
                        keyCode: payload.keyCode
                    });
                }
                //*/
                return args;
            },

            onTextChange: function(/*payload*/) {
                var args = [];

                //

                return args;
            }
        },

        TextBox2: {
            onBeginEditing: function(/*payload*/) {
                var args = [];

                //

                return args;
            },

            onEndEditing: function(/*payload*/) {
                var args = [];

                //

                return args;
            },

            onKeyDown: function(/*payload*/) {
                var args = [];
                /*
                if(payload) {
                    args.push({
                        altKey: payload.altKey,
                        ctrlKey: payload.ctrlKey,
                        metaKey: payload.metaKey,
                        shiftKey: payload.shiftKey,
                        keyCode: payload.keyCode
                    });
                }
                //*/
                return args;
            },

            onKeyUp: function(/*payload*/) {
                var args = [];
                /*
                if(payload) {
                    args.push({
                        altKey: payload.altKey,
                        ctrlKey: payload.ctrlKey,
                        metaKey: payload.metaKey,
                        shiftKey: payload.shiftKey,
                        keyCode: payload.keyCode
                    });
                }
                //*/
                return args;
            },

            onTextChange: function(/*payload*/) {
                var args = [];

                //

                return args;
            }
        }
    };


    //All the functions will be called in the scope of widget instance
    var _change = {
        CollectionView: function(model, key, old) {
            var index = model._kwebfw_.ii.split(','),
                secIndex = parseInt(index[0], 10),
                rowIndex = parseInt(index[1], 10);

            if(secIndex < -1) secIndex = -1;
            if(rowIndex < -2) rowIndex = -2;

            this.setDataAt(model, key, old, rowIndex, secIndex);
        },

        DataGrid: function(model, key, old) {
            var index = model._kwebfw_.ii.split(','),
                rowIndex = parseInt(index[0], 10),
                colIndex = parseInt(index[1], 10);

            this.setDataAt(model, key, old, rowIndex, colIndex);
        },

        MenuContainer: function(/*model, key, old*/) {
            //
        },

        SegmentedUI2: function(model, key, old) {
            var index = model._kwebfw_.ii.split(','),
                secIndex = parseInt(index[0], 10),
                rowIndex = parseInt(index[1], 10);

            if(secIndex < -1) secIndex = -1;
            if(rowIndex < -1) rowIndex = -1;

            this.setDataAt(model, key, old, rowIndex, secIndex);
        }

    };


    //All the functions will be called in the scope of widget instance
    var _context = {
        CollectionView: function(/*model*/) {
            //
        },

        DataGrid: function(/*model*/) {
            //
        },

        MenuContainer: function(/*model*/) {
            //
        },

        SegmentedUI2: function(model) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils,
                index = null, secIndex = -1, rowIndex = -1;

            if($KU.is(model, 'widget')) {
                index = model._kwebfw_.ii.split(',');
            } else if($KU.is(model, 'object')) {
                index = [model.secIndex, model.rowIndex];
            }

            if(index) {
                secIndex = parseInt(index[0], 10);
                rowIndex = parseInt(index[1], 10);

                if(secIndex < -1) secIndex = -1;
                if(rowIndex < -1) rowIndex = -1;
            }

            return {rowIndex:rowIndex, sectionIndex:secIndex, widgetInfo:this};
        }
    };


    //All the functions will be called in the scope of widget instance
    var _infoAtIndex = {
        CollectionView: function(/*index*/) {
            //
        },

        DataGrid: function(/*index*/) {
            //
        },

        MenuContainer: function(/*index*/) {
            //
        },

        SegmentedUI2: function(index) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget, oid = '',
                template = null, info = null, prop = this._kwebfw_.prop, ii = '',
                data = this.data, clones = this._kwebfw_.clones;

            if($KU.is(data, 'array')) {
                oid = this._kwebfw_.uid;
                ii = (index[0] + ','+index[1]);

                if(index[0] >= 0 && index[1] >= 0) { //Row inside section
                    if($KU.is(data[index[0]], 'array')
                    && $KU.is(data[index[0]][1], 'array')
                    && $KU.is(data[index[0]][1][index[1]], 'object')) {
                        info = {data:data[index[0]][1][index[1]], index:index, template:null};

                        if($KU.is(clones[index[0]][1][index[1]], 'widget')) {
                            info.template = clones[index[0]][1][index[1]];
                        } else {
                            template = info.data.template || this.rowTemplate;
                            if($KU.is(template, 'string')) {
                                template = $KW.getTemplate(this, template);
                            }
                            info.template = $KW.cloneTemplate(template, info.data, prop.widgetDataMap, function(widget/*, pwidget, windex*/) {
                                widget._kwebfw_.oid = oid;
                                widget._kwebfw_.ii = ii;
                            });
                            clones[index[0]][1][index[1]] = info.template;
                        }
                    }
                } else if(index[0] >= 0 && index[1] < 0) { //Section not row
                    if($KU.is(data[index[0]], 'array')
                    && $KU.is(data[index[0]][0], 'object')) {
                        info = {data:data[index[0]][0], index:index, template:null};

                        if($KU.is(clones[index[0]][0], 'widget')) {
                            info.template = clones[index[0]][0];
                        } else {
                            template = info.data.template || this.sectionHeaderTemplate;
                            if($KU.is(template, 'string')) {
                                template = $KW.getTemplate(this, template);
                            }
                            info.template = $KW.cloneTemplate(template, info.data, prop.widgetDataMap, function(widget/*, pwidget, windex*/) {
                                widget._kwebfw_.oid = oid;
                                widget._kwebfw_.ii = ii;
                            });
                            clones[index[0]][0] = info.template;
                        }
                    }
                } else if(index[0] < 0 && index[1] >= 0) { //Row that does not have a section
                    if($KU.is(data[index[1]], 'object')) {
                        info = {data:data[index[1]], index:index, template:null};

                        if($KU.is(clones[index[1]], 'widget')) {
                            info.template = clones[index[1]];
                        } else {
                            template = info.data.template || this.rowTemplate;
                            if($KU.is(template, 'string')) {
                                template = $KW.getTemplate(this, template);
                            }
                            info.template = $KW.cloneTemplate(template, info.data, prop.widgetDataMap, function(widget/*, pwidget, windex*/) {
                                widget._kwebfw_.oid = oid;
                                widget._kwebfw_.ii = ii;
                            });
                            clones[index[1]] = info.template;
                        }
                    }
                }
            }

            return info;
        }
    };


    var _accessibility = function $KW_accessibility(model, clone) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
            _ = null, prop = null, el = null, dom = null, old = null;

        model = $KW.model(model);

        if(model) {
            _ = model._kwebfw_;
            prop = _.prop;
            el = _el(model);

            if(el.node) {
                if($KU.is(clone, 'object') && !$KU.is(clone, 'widget')) {
                    old = clone;
                }
                if(!$KU.is(clone, 'boolean')) clone = false;

                if (_name(model) === 'Calendar') {
                    for (var index of Object.keys(el.node.children)) {
                        dom = _focusableElement(model, el.node.children[index].tagName);
                        _a11y.clean(model, dom, old);
                        _setupUIInteraction(model, dom, clone);
                        if ($KU.shouldApplyA11Y()) {
                            _a11y.apply(model, dom, prop.accessibilityConfig);
                        }
                    }
                } else {
                    dom = _focusableElement(model);
                    _a11y.clean(model, dom, old);
                    _setupUIInteraction(model, dom, clone);

                    if ($KU.shouldApplyA11Y()) {
                        _a11y.apply(model, dom, prop.accessibilityConfig);
                    }
                }
            }
        }
    };


    var _addSkin = function $KW_addSkin(skin, node) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom;

        if($KU.is(node, 'dom')) {
            if($KU.is(skin, 'string') && skin) {
                $KD.addCls(node, skin);
            } else if($KU.is(skin, 'object')) {
                $KU.each(skin, function(val, key) {
                    $KD.style(node, key, val);
                });
            }
        }
    };


    var _addToView = function $KW_addToView(view, dom) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom, last = null;

        if($KU.is(view, 'dom') && ($KU.is(dom, 'dom') || $KU.is(dom, 'fragment'))) {
            if(['scrolee', 'viewport'].indexOf($KD.getAttr(view, 'kr')) >= 0) {
                $KD.add(view, dom);
            } else if($KD.hasAttr(view, 'kw')) {
                last = $KD.last(view);

                if($KU.is(last, 'dom') && ['kfb'].indexOf($KD.getAttr(last, 'kr')) >= 0) {
                    $KD.before(last, dom);
                } else {
                    $KD.add(view, dom);
                }
            }
        }
    };


    var _applyGroupA11Y = function $KW_applyGroupA11Y(node, a11y, label, hintId) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom, a11yHint = '',
            a11yLabel = (a11y) ? _a11y.prepareLabel(a11y, label) : label;

        if(a11yLabel) {
            $KD.setAttr(node, 'aria-label', a11yLabel);
        }

        if(a11y && $KU.is(a11y.a11yHint, 'string')) {
            a11yHint = a11y.a11yHint.trim();
        }

        if(a11yHint) {
            _a11y.createHint(a11yHint, hintId);
            $KD.setAttr(node, 'aria-describedby', hintId);
        }
    };

    /*eslint-disable no-console*/
    var _auditFakeBorders = function $KW_auditFakeBorders() {
        console.log('***************************** FAKE BORDER STARTS *****************************');

        document.querySelectorAll('[kr="kfb"]').forEach(function(fakeBorder) {
            if(fakeBorder.nextElementSibling) {
                console.log(fakeBorder);
            }
        });

        console.log('****************************** FAKE BORDER ENDS ******************************');
    };
    /*eslint-enable no-console*/


    var _auditFlexDetails = function $KW_auditFlexDetails(model) {
        var $K = voltmx.$kwebfw$, $KW = $K.widget,
            pmodel = null, details = {}, k = '',
            prepare = function(widget, who) {
                var flex = [];

                if(!details.info) {
                    details = {
                        id: {},
                        info: {},
                        path: {},
                        flex: {},
                        height: {},
                        width: {},
                        horizontal: {},
                        vertical: {},
                        zindex: {}
                    };
                }

                for(k in widget._kwebfw_.flex.final) {
                    if(Object.prototype.hasOwnProperty.call(widget._kwebfw_.flex.final, k)) {
                        (function(value, key) {
                            if(key !== 'zIndex') {
                                flex.push((key+'=<'+value+'>'));
                            }
                        }(widget._kwebfw_.flex.final[k], k));
                    }
                }

                if(!details.info[who]) details.info[who] = {};

                details.id[who] = ('uid=<'+widget._kwebfw_.uid+'>, id=<'+widget.id+'>');
                details.info[who] = ('widget=<'+widget._kwebfw_.name+'>, layout=<'+_layout(widget)+'>');
                details.path[who] = ('<'+widget._kwebfw_.wap.split('_').join('.')+'>');
                details.flex[who] = flex.join(', ');
                details.height[who] = ('minHeight=<'+widget.minHeight+'>, height=<'+widget.height+'>, maxHeight=<'+widget.maxHeight+'>');
                details.width[who] = ('minWidth=<'+widget.minWidth+'>, width=<'+widget.width+'>, maxWidth=<'+widget.maxWidth+'>');
                details.horizontal[who] = ('left=<'+widget.left+'>, centerX=<'+widget.centerX+'>, right=<'+widget.right+'>');
                details.vertical[who] = ('top=<'+widget.top+'>, centerY=<'+widget.centerY+'>, bottom=<'+widget.bottom+'>');
                details.zindex[who] = ('actual=<'+widget.zIndex+'>, final=<'+widget._kwebfw_.flex.final.zIndex+'>');
            };

        model = $KW.model(model);

        if(!model) {
            throw new Error('Unable to derive widget model.');
        } else {
            pmodel = _pmodel(model);

            prepare(model, 'me');
            pmodel && prepare(pmodel, 'parent');
            /*eslint-disable no-console*/
            console.clear('');
            console.table(details);
            /*eslint-enable no-console*/
        }
    };


    /*eslint-disable*/
    var _auditModelAnomalies = function $KW_auditModelAnomalies(arg0) {
        var $K = voltmx.$kwebfw$, $KW = $K.widget, $KA = $K.app,
            model = $KW.model(arg0) || $KW.model($KA.currentFormUID);

        //TODO::
    };
     /*eslint-enable*/


    var _children = function $KW_children(model, arg1) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
            children = [], config = ($KU.is(arg1, 'object') ? arg1 : {});

        if(!$KU.is(config.tabs, 'boolean')) config.tabs = false;

        model = _proxy($KW.model(model));

        if(_isContainer(model)) {
            $KU.each(model.widgets(), function(widget) {
                children.push(_proxy(widget));
            });
        } else if(config.tabs && $KU.is(model, 'widget', 'TabPane')) {
            $KU.each(model._kwebfw_.tabs, function(tab) {
                children.push(this[tab.id]);
            }, model);
        }

        return children;
    };


    var _clearGroupA11y = function $KW_clearGroupA11y(model, masterData, masterDataMap) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, uid = model._kwebfw_.uid;

        if(masterData) {
            $KU.each(masterData, function(data) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom,
                    hintId = null, div = null;

                if(data[2]) {
                    hintId = (uid+'_'+data[0]+'_hint');
                    div = document.getElementById(hintId);
                    div && $KD.remove(div);
                }
            });
        }

        if(masterDataMap && masterDataMap[0]) {
            $KU.each(masterDataMap[0], function(data) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom,
                    hintId = null, div = null;

                if(data['accessibilityConfig']) {
                    hintId = (uid+'_'+data[masterDataMap[1]]+'_hint');
                    div = document.getElementById(hintId);
                    div && $KD.remove(div);
                }
            });
        }
    };


    var _cloneTemplate = function $KW_cloneTemplate(tpl, data, widgetDataMap, callback) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget, clone = null, isCloned = false;

        if($KW.isContainer(tpl)) {
            clone = tpl._voltmxControllerName ? tpl : $KU.clone(tpl);
            isCloned = (tpl._kwebfw_.is.cloned === true) ? true : false;

            if($KU.is(data, 'object')) {
                $KW.iterate(clone, function(model, pmodel, index) {
                    var $K = voltmx.$kwebfw$, $KU = $K.utils, defaultProp = null, dataId = '',
                        wap = null, _ = model._kwebfw_, prop = undefined,
                        userwidget = (_.uwi instanceof voltmx.ui.UserWidget) ? _.uwi : null;

                    if(!isCloned) {
                        _.is.cloned = true;

                        if(userwidget) {
                            userwidget._kwebfw_.is.cloned = true;
                        }
                    }

                    wap = _getWidgetDataMapPath(model);

                    //This is needed, to avoid "onTextChange" event being fired
                    //Example, for TextBox2 widget, after clonning the widget...
                    //masterdata specific "text" is set, which fires "onTextChange"
                    _.skip = {event:true};

                    dataId = widgetDataMap[wap];

                    if($KU.is(dataId, 'string') && dataId
                    && Object.prototype.hasOwnProperty.call(data, dataId)) {
                        prop = data[dataId];
                    }

                    if(!$KU.is(prop, 'undefined') && !$KU.is(prop, 'object')) {
                        defaultProp = _getDefaultProperty(model);
                        prop = {};
                        prop[defaultProp] = data[dataId];
                    }

                    if($KU.is(prop, 'object')) {
                        if($K.F.EIWP) {
                            if($KU.is(model, 'widget', 'ListBox')) {
                                if($KU.is(prop.selectedKeys, 'null') && !model.multiSelect) {
                                    delete prop.selectedKeys;
                                }
                            }
                        }

                        $KU.each(prop, function(value, key) {
                            var container = null, controller = null;

                            if(['metaInfo'].indexOf(key) < 0) {
                                if($KU.is(value, 'i18n')) {
                                    value = $KU.getI18Nvalue(value);
                                }

                                if(userwidget) {
                                    userwidget[key] = value;
                                } else {
                                    container = _rmodel(model);

                                    if($KU.is(value, 'string') && value
                                    && container._kwebfw_.is.component
                                    && $KU.hasEventProperty(model, key)) {
                                        controller = _voltmx.mvc.getComponentController(container._voltmxControllerName, container.appName);
                                        //this condition is for setting string as callback in masterdata
                                        if(controller && $KU.is(controller[value], 'function')) {
                                            model._kwebfw_.prop[key] = controller[value];
                                        }// todo: for User widget pass through events
                                    } else {
                                        if(!(model instanceof voltmx.ui.GroupWidget && ['selectedKeyValue', 'selectedKeyValues'].indexOf(key) !== -1)) {
                                            model[key] = value;
                                        }
                                    }
                                }
                            }
                        });
                    } else {
                        //Log Info
                    }

                    if($KU.is(callback, 'function')) {
                        callback(model, pmodel, index);
                    }

                    delete _.skip;

                    if(userwidget) return true;
                }, {tabs:false});
            } else if($KU.is(data, 'string')
            && clone.id === 'flxkwebfwHeader'
            && clone.labelkwebfwHeader) {
                //This is needed, to avoid "onTextChange" event being fired
                //Example, for TextBox2 widget, after clonning the widget...
                //masterdata specific "text" is set, which fires "onTextChange"
                clone._kwebfw_.skip = {event:true};
                clone.labelkwebfwHeader.text = data;

                if($KU.is(callback, 'function')) {
                    callback(clone);
                }

                delete clone._kwebfw_.skip;
            }
        }

        return clone;
    };


    //This iterate over model.parent
    var _closest = function $KW_closest(model, callback, config) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils,
            pmodel = null, omodel = null, flag = null;

        if(!$KU.is(config, 'object')) config = {};
        if(!Object.prototype.hasOwnProperty.call(config, 'scope')) config.scope = this;
        if(!$KU.is(config.owner, 'boolean')) config.owner = true;
        if(!$KU.is(config.tabs, 'boolean')) config.tabs = true;

        pmodel = model = _proxy(model);
        omodel = _omodel(model);

        while(pmodel) {
            flag = callback.call(config.scope, pmodel);

            if(flag === true) {
                return pmodel;
            } else if(flag === false) {
                return null;
            }
            pmodel = _pmodel(pmodel, {tabs:config.tabs});

            if(!pmodel && omodel
                && config.owner === true) {
                pmodel = omodel;
                omodel = null;
            }
        }

        return null;
    };


    var _closestScrollableWidget = function $KW_closestScrollableWidget(model) {
        var scrollableModel = null;

        while(model) {
            if(_isScrollableWidget(model)) {
                scrollableModel = model;
                break;
            }

            model = _pmodel(model);
        }

        return scrollableModel;
    };


    var _cmodel = function $KW_cmodel(model, childIdOrIndex) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget, id = '';

        model = $KW.model(model);

        if(_isContainer(model)) {
            model = _proxy(model);

            if($KU.is(childIdOrIndex, 'number') && childIdOrIndex >= 0
            && childIdOrIndex < model._kwebfw_.children.length) {
                id = model._kwebfw_.children[childIdOrIndex].id;
            } else if($KU.is(childIdOrIndex, 'string') && childIdOrIndex) {
                id = childIdOrIndex;
            }
        }

        return (id && $KU.is(model[id], 'widget')) ? model[id] : null;
    };


    var _component = function $KW_component(model) {
        var $K = voltmx.$kwebfw$, $KW = $K.widget,
            _ = null, component = null, rmodel = null;

        model = $KW.model(model);

        if(model) {
            rmodel = _rmodel(model);

            if(rmodel) {
                _ = rmodel._kwebfw_;

                if(_.uwi instanceof voltmx.ui.UserWidget) {
                    component = _.uwi;
                } else if(rmodel instanceof voltmx.ui.UserWidget) {
                    component = rmodel;
                }
            }
        }

        return component;
    };


    var _contains = function $KW_contains(model, target, owner) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget, flag = false;

        if(!$KU.is(owner, 'boolean')) owner = true;

        model = _proxy(model);
        target = _proxy(target);

        if(model && target) {
            _closest(target, function(widget) {
                if(widget === this) {
                    flag = true;
                    return true;
                }
            }, {owner:owner, scope:model});
        }

        return flag;
    };


    var _deduceModalContainer = function $KW_deduceModalContainer(fmodel) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget, $KA = $K.app,
            cf = $KW.model($KA.currentFormUID), modals = null, modalContainer = null;

        if($KU.is(fmodel, 'widget', 'Form2') && fmodel === cf) {
            modals = _modal.collectAllModals(fmodel);
            modalContainer = _modal.deduceFinalModal(modals);
        }

        return modalContainer;
    };


    var _details = function $KW_details(omodel, index, model, view) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, i = 0,
            len = 0, info= null, details = null;

        if($KU.is(index, 'string')) {
            index = index.split(',');
        }

        if($KU.is(index, 'array')) {
            len = index.length;
            for(i=0; i<len; i++) {
                index[i] = parseInt(index[i], 10);
            }
        }

        if($KU.is(index, 'array') && index.length > 0 && $KU.is(view, 'dom')
        && $KU.is(omodel, 'widget') && $KU.is(model, 'widget')
        && $KU.is(_infoAtIndex[_name(omodel)], 'function')) {
            info = _infoAtIndex[_name(omodel)].call(omodel, index);

            if(info) {
                details = {template:info.template, data:info.data, index:info.index};

                if($KU.is(view, 'dom')) {
                    details.view = view;
                }

                if($KU.is(model, 'widget')) {
                    details.wdata = info.data[model.id];
                    details.model = info.template[model.id];
                }
            }
        }

        return details;
    };


    var _disabled = function $KW_disabled(model) {
        var $K = voltmx.$kwebfw$, $KW = $K.widget, omodel = null, disabled = false;

        model = $KW.model(model);
        omodel = (model) ? $KW.omodel(model) : null;

        if(model) {
            disabled = model._kwebfw_.disabled;

            if(!disabled && omodel) {
                disabled = omodel._kwebfw_.disabled;
            }
        }

        return disabled;
    };


    var _dismissPickers = function $KW_dismissPickers(fmodel) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils,
            pickers = _pickers(fmodel), targetModel =_getRootNode(fmodel);

        $KU.each(pickers, function(uid) {
            var $K = voltmx.$kwebfw$, $KW = $K.widget, $KD = $K.dom,
                model = $KW.model(uid), _ = null;

            if(model) {
                _ = model._kwebfw_;
                $KD.remove(_.picker);
                delete _.picker;
            }
        });

        delete targetModel._kwebfw_.pickers;
    };

    var _dismissPicker = function $KW_dismissPicker(model) {
        var pickers = _pickers(model);

        if(pickers[model._kwebfw_.uid]) {
            delete pickers[model._kwebfw_.uid];
        }
    };


    var _el = function $KW_el(model, key) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
            $KD = $K.dom, name = '', view = null;

        if(typeof key !== 'string') key = '';

        if($KU.is(model, 'widget')) {
            model = _proxy(model);

            view = model._kwebfw_.view;
        } else if($KU.is(model, 'dom')) {
            view = model;
            model = $KW.model(view);
        }

        name = _name(model);

        if(name && $KU.is(__el[name], 'function')) {
            if($KU.is(view, 'dom') && $KU.is(model, 'widget')) {
                return __el[name](model, view, $KU, $KW, $KD, key);
            }
            return {node:null};
        }
        return {node:null};
    };


    var _evaluateScrollPosition = function $KW_evaluateScrollPosition(model) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom, e = 0,
            elen = 0, myself = null, elements = [], selector = '',
            renderCheck = false, evaluate = function(dom, check) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
                    widget = null, prop = null;

                if(!check || document.getElementById(dom.id)) {
                    widget = $KW.model(dom);
                    prop = widget._kwebfw_.prop;

                    if($KU.is(widget, 'widget', 'SegmentedUI2')
                    || $KU.is(widget, 'widget', 'CollectionView')) {
                        _retainSelection(widget);
                    } else {
                        _retainScrollPosition(widget, prop.retainScrollPosition);
                    }
                }
            };

        if($KU.is(model, 'list')) {
            elements = model;
            renderCheck = true;
        } else if(!arguments.length
        || ($KU.is(model, 'widget')
        && model._kwebfw_.ui.scroll
        && _isRendered(model))) {
            selector = 'form[kw="Form2"],div[kw="FlexScrollContainer"],div[kw="SegmentedUI2"],div[kw="CollectionView"]';
        }

        if(selector) {
            if(arguments.length) {
                myself = model._kwebfw_.view;
                elements = $KD.find(myself, selector);
            } else {
                elements = $KD.find(document, selector);
            }
        }

        if(myself) evaluate(myself, renderCheck);

        elen = elements.length;
        for(e=0; e<elen; e++) {
            evaluate(elements[e], renderCheck);
        }
    };


    var _fire = function $KW_fire(model, type, scope, payload, callbacks) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
            $KAR = $K.automation.recorder, item = null,
            omodel = $KW.omodel(model), args = [model], context = null,
            cf = _getRootNode(model),
            noForceLayoutEventList = ['onInit', 'preShow', 'onBreakpointHandler', 'onBreakpointChange'];

        if(model._kwebfw_.skip && model._kwebfw_.skip.event) return false;

        if(arguments.length === 4 && $KU.is(payload, 'array')) {
            callbacks = payload;
            payload = null;
        }

        if($KU.is(_args[_name(model)], 'object')
        && $KU.is(_args[_name(model)][type], 'function')) {
            args = args.concat(_args[_name(model)][type].call(model, payload));

            if(payload) {
                if($KU.is(model, 'widget', 'SegmentedUI2')) {
                    item = args[2];
                    args.splice(2, 1);
                } else if($KU.is(model, 'widget', 'DataGrid')) {
                    item = args[1];
                    args.splice(1, 1);
                } else if($KU.is(model, 'widget', 'RichText')) {
                    args.push(payload.name, payload.href);
                }
            }
        }

        if(omodel) {
            context = _context[_name(omodel)].call(omodel, model, args);
            args.push(context);
        }

        if(payload && ['onTouchStart', 'onTouchMove', 'onTouchEnd'].indexOf(type) >= 0) {
            args.splice(($KU.is(args[0], 'widget') ? 1 : 0), 0, payload.x, payload.y);
        }

        if(type === 'onScrollWidgetPosition') {
            args.splice(($KU.is(args[0], 'widget') ? 1 : 0), 0, payload.positionLeft, payload.positionTop, payload.x, payload.y);
        }

        if(type === 'onFocus') {
            args[1] = document.activeElement.tagName;
        }

        if(type === 'onHover') {
            $KU.each(context, function(value, key) {
                payload[key] = value;
            });
            args.splice(($KU.is(args[0], 'widget') ? 1 : 0), (context? 1 : 0), payload);
        }
        $KAR && $KAR.sendRecording(model, type, payload, true);

        if($KU.is(callbacks, 'array')) {
            $KU.each(callbacks, function(callback) {
                callback.apply(scope, args);
            });

            if(noForceLayoutEventList.indexOf(type) === -1) {
                cf.forceLayout();
            }

            return true;
        } else if(($KU.is(model, 'widget', 'SegmentedUI2') || $KU.is(model, 'widget', 'CollectionView'))
        && $KU.is(item, 'object') && $KU.is(item[type], 'function')) {
            if(args[1] === -1) args[1] = 0;
            if(args[2] !== -1) item[type].apply(scope, args);
        //} else if() {
            //We can have another else if like this to support...
            //...other owner widget whose event comes as a part of item data
        } else if($KU.is(model[type], 'function')
        || (model.scrollingEvents && $KU.is(model.scrollingEvents[type], 'function'))) {
            if(omodel) {
                if($KU.is(omodel, 'widget', 'SegmentedUI2')
                && args[(args.length-1)].sectionIndex === -1) {
                    args[(args.length-1)].sectionIndex = 0;
                }
            }

            if(model[type]) {
                if($KU.is(model, 'widget', 'SegmentedUI2') && type === 'onRowClick') {
                    if(args[1] === -1) args[1] = 0;
                    if(args[2] !== -1) {
                        model[type].apply(scope, args);
                    }
                } else if($KU.is(model, 'widget', 'CollectionView') && type === 'onItemSelect') {
                    if(args[1] === -1) args[1] = 0;
                    if(args[2] !== -1 && args[2] !== -2) { //TODO:
                        model[type].apply(scope, args);
                    }
                } else {
                    model[type].apply(scope, args);
                }
            } else if(model.scrollingEvents && model.scrollingEvents[type]) {
                model.scrollingEvents[type].apply(scope, args);
            }

            if(noForceLayoutEventList.indexOf(type) === -1) {
                cf.forceLayout();
            }

            return true;
        } else if($KU.is(model, 'widget', 'DataGrid')
        && type === 'columnOnClick' && $KU.is(item, 'integer')
        && $KU.is(model['columnHeadersConfig'][item][type], 'function')) {
            model['columnHeadersConfig'][item][type].call(scope, args);
        } else if(type === 'onTabClick' && $KU.is(model, 'widget', 'TabPane')) {
            cf.forceLayout();

            return true;
        } else {
            return false;
        }
    };


    var _fmodel = function $KW_fmodel(model) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, hmodel = _hmodel(model);

        while(hmodel && !$KU.is(hmodel, 'widget', 'Form2')) {
            hmodel = _hmodel(_pmodel(hmodel));
        }

        return ($KU.is(hmodel, 'widget', 'Form2')) ? hmodel : null;
    };


    var _focus = function $KW_focus(model) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom,
            dom = _focusableElement(model), tabindex = -1;

        if(dom) {
            if(!$KD.hasAttr(dom, 'tabindex')) {
                $KD.focus(dom);
            } else {
                tabindex = parseInt($KD.getAttr(dom, 'tabindex'), 10);

                if($KU.is(tabindex, 'integer') && tabindex >= 0) {
                    $KD.focus(dom);
                }
            }
        }
    };


    var _focusableElement = function $KW_focusableElement(model, tagName) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
            dom = null, el = null;

        model = $KW.model(model);

        if(model) {
            el = _el(model);

            if(el.node) {
                if($KU.is(_a11y.view[_name(model)], 'function')) {
                    dom = _a11y.view[_name(model)](el.node, tagName);
                } else {
                    dom = el.node;
                }
            }
        }

        return dom;
    };


    var _getContentOffsetValues = function $KW_getContentOffsetValues(model, offset) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, x = 0, y = 0;

        if($KU.is(offset, 'object')) {
            if($KU.is(offset.x, 'number')) {
                offset.x += model._kwebfw_.layoutUnit || voltmx.flex.DEFAULT_UNIT;
            }
            if($KU.is(offset.y, 'number')) {
                offset.y += model._kwebfw_.layoutUnit || voltmx.flex.DEFAULT_UNIT;
            }
        }

        if($KU.is(offset, 'object')
        && $KU.is(offset.x, 'string')
        && $KU.is(offset.x, 'size')
        && $KU.is(offset.y, 'string')
        && $KU.is(offset.y, 'size')) {
            x = offset.x;
            y = offset.y;

            if(x.indexOf('dp') > 0) {
                x = parseFloat(x.replace('dp', ''), 10);
            } else if(x.indexOf('px') > 0) {
                x = parseFloat(x.replace('px', ''), 10);
                x = (x/$K.device.DPI);
            } else if(x.indexOf('%') > 0) {
                x = parseFloat(x.replace('%', ''), 10);
                x = (x / 100) * model._kwebfw_.view.offsetWidth;
            }

            if(y.indexOf('dp') > 0) {
                y = parseFloat(y.replace('dp', ''), 10);
            } else if(y.indexOf('px') > 0) {
                y = parseFloat(y.replace('px', ''), 10);
                y = (y/$K.device.DPI);
            } else if(y.indexOf('%') > 0) {
                y = parseFloat(y.replace('%', ''), 10);
                y = (y / 100) * model._kwebfw_.view.offsetHeight;
            }

            if(x < 0) x = 0;
            if(y < 0) y = 0;
        }
        return {x: x, y: y};
    };


    var _getAccessibilityConfig = function $KW_getAccessibilityConfig(accessibilityConfig) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils,
            a11y = (accessibilityConfig) ? {} : null;

        $KU.each(accessibilityConfig, function(value, keey) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils;

            if(value && keey === 'a11yARIA') {
                a11y[keey] = {};

                $KU.each(value, function(v, k) {
                    if($KU.is(v, 'i18n')) {
                        a11y[keey][k] = $KU.getI18Nvalue(v);
                    } else {
                        a11y[keey][k] = v;
                    }
                });
            } else if($KU.is(value, 'i18n')) {
                a11y[keey] = $KU.getI18Nvalue(value);
            } else if($KU.is(value, 'string')
            || $KU.is(value, 'number') || $KU.is(value, 'boolean')) {
                a11y[keey] = value;
            }
        });

        return a11y;
    };


    var _getDefaultHeight = function $KW_getDefaultHeight(model) {
        var $K = voltmx.$kwebfw$, $KW = $K.widget, omodel = null,
            _ = null, prop = null, height = '0dp', name = '',
            widgetsHeightMap = {
                Calendar: '40dp',
                CheckBoxGroup: '120dp',
                DataGrid: '120dp',
                ListBox: '40dp',
                Map: '75%',
                RadioButtonGroup: '40dp',
                SegmentedUI2: '120dp',
                Slider: '100dp',
                TextArea2: '120dp',
                TextBox2: '40dp'
            };

        model = $KW.model(model);

        if(model) {
            name = _name(model);
            _ = model._kwebfw_;
            prop = _.prop;

            if(_isTextDrivenWidget(model) || name === 'Image2') {
                height = null;
            } else if(widgetsHeightMap[name]) {
                height = widgetsHeightMap[name];
            } else {
                omodel = _omodel(model);

                if($KW.inPercent(prop.height) && _.is.template
                   && omodel && omodel.autogrowMode === voltmx.flex.AUTOGROW_HEIGHT) {
                    height = '100dp';
                } else {
                    height = '220dp';
                }
            }
        }

        return height;
    };


    var _getDefaultWidth = function $KW_getDefaultWidth(model) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
            width = '0dp', name = '', widgetsWidthMap = {
                Calendar: '200dp',
                CollectionView: '120dp',
                CustomWidget: '200dp',
                ListBox: '260dp',
                RadioButtonGroup: '260dp',
                Slider: '260dp',
                Switch: '200dp',
                TextBox2: '260dp',
                TextArea2: '260dp'
            };

        model = $KW.model(model);

        if(model) {
            name = _name(model);

            if(_isTextDrivenWidget(model)
            || $KU.is(model, 'widget', 'Image2')) {
                width = null;
            } else if(widgetsWidthMap[name]) {
                width = widgetsWidthMap[name];
            } else {
                width = '100%';
            }
        }

        return width;
    };


    var _getDefaultProperty = function $KW_getDefaultProperty(model) {
        var defaultProperty = 'text', name = _name(model);

        if(name === 'Image2') {
            defaultProperty = 'src';
        } else if(name === 'Switch') {
            defaultProperty = 'selectedIndex';
        } else if(name === 'Slider') {
            defaultProperty = 'selectedValue';
        } else if(name === 'Calendar') {
            defaultProperty = 'dateComponents';
        } else if(['CheckBoxGroup', 'RadioButtonGroup', 'ListBox'].indexOf(name) > -1) {
            defaultProperty = 'masterData';
        }

        return defaultProperty;
    };


    var _getFlexProperties = function $KW_getFlexProperties() {
        var props = [
            'left', 'centerX', 'right',
            'top', 'centerY', 'bottom',
            'height', 'minHeight', 'maxHeight',
            'width', 'minWidth', 'maxWidth'
        ];

        return props;
    };


    var _getGroupSelectedKeyValueByKey = function $KW_getGroupSelectedKeyValueByKey(model, key) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, keyValue = null,
            prop = model._kwebfw_.prop, masterdata = model.masterData;

        if(!masterdata && prop.masterDataMap) {
            masterdata = model.masterDataMap[0];
        }

        if($KU.is(key, 'string')) {
            $KU.each(masterdata, function(data) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, prop = this._kwebfw_.prop;

                if($KU.is(data, 'array')) {
                    if(data[0] === key) {
                        keyValue = [data[0], data[1]];
                        return true;
                    }
                } else {
                    if(data[prop.masterDataMap[1]] === key) {
                        keyValue = [data[prop.masterDataMap[1]], data[prop.masterDataMap[2]]];
                        return true;
                    }
                }
            }, model);
        }

        return keyValue;
    };


    var _getModelByNode = function $KW_getModelByNode(node) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils,
            $KW = $K.widget, $KD = $K.dom, model = null;

        if($KU.is(node, 'dom')) {
            model = $KD.closest(node, function(dom) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom;

                if($KD.hasAttr(dom, 'kw')
                || $KD.hasAttr(dom, 'kwf')) {
                    return true;
                }
            });

            if(model) {
                model = $KD.getAttr(model, 'kwf') || $KD.getAttr(model, 'id');
                model = (model) ? $KW.model(model) : null;
            }
        }

        return model;
    };


    var _getModelByPath = function UI$_getModelByPath(path) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
            startSquareBracketIndex = -1, endSquareBracketIndex = -1,
            info = null, fmodel = null, omodel = null, model = null;

        if($KU.is(path, 'array')) path = path.join('_');

        if($KU.is(path, 'string') && path) {
            startSquareBracketIndex = path.indexOf('[');
            endSquareBracketIndex = path.indexOf(']');

            if(startSquareBracketIndex === -1) {
                fmodel = path.indexOf('_');
                fmodel = path.substr(0, fmodel);
                fmodel = $KW.root(fmodel);

                if(fmodel) {
                    model = path.split('_');
                    model.shift();
                    model = (!model.length) ? fmodel : $KU.get(model, fmodel);
                }
            } else if(startSquareBracketIndex > 0
            && endSquareBracketIndex > startSquareBracketIndex) {
                fmodel = path.indexOf('_');
                fmodel = path.substr(0, fmodel);
                fmodel = $KW.root(fmodel);

                if(fmodel) {
                    omodel = path.substr(0, startSquareBracketIndex);
                    omodel = omodel.split('_');
                    omodel.shift();
                    omodel = (!omodel.length) ? fmodel : $KU.get(omodel, fmodel);

                    if(_isOwnerWidget(omodel)) {
                        info = path.substr(
                            (startSquareBracketIndex+1),
                            (endSquareBracketIndex-startSquareBracketIndex-1)
                        );

                        if($KU.is(_infoAtIndex[_name(omodel)], 'function')) {
                            info = _infoAtIndex[_name(omodel)].call(omodel, info.split(','));

                            if(info && info.template) {
                                model = path.substr(
                                    (endSquareBracketIndex+2),
                                    (path.length-endSquareBracketIndex-2)
                                );
                                model = model.split('_');
                                model.shift();
                                model = (!model.length) ? info.template
                                    : $KU.get(model, info.template);
                            }
                        }
                    }
                }
            }
        }

        return ($KU.is(model, 'widget') ? model : null);
    };


    var _getNonConstructorProperties = function $KW_getNonConstructorProperties(widgetName) {
        var props = [], properties = {
            CheckBoxGroup: ['masterDataMap'],
            CollectionView: ['contentOffsetMeasured'],
            FlexScrollContainer: ['contentOffsetMeasured', 'contentSizeMeasured'],
            Form2: ['contentOffsetMeasured', 'contentSizeMeasured'],
            ListBox: ['masterDataMap'],
            Map: ['address'],
            RadioButtonGroup: ['masterDataMap'],
            SegmentedUI2: ['contentOffsetMeasured'],
            UserWidget: ['anchorPoint', 'backgroundColor', 'toolTip', 'transform']
        };

        if(Object.prototype.hasOwnProperty.call(properties, widgetName)) {
            props = properties[widgetName].slice(0);
            props.push('frame', 'parent');
        }

        return props;
    };


    var _getTemplate = function $KW_getTemplate(omodel, tpl) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget, $KA = $K.app,
            _ = $KU.is(omodel, 'widget') ? omodel._kwebfw_ : null;

        if(tpl) {
            if($KU.is(tpl, 'string')) {
                $KA.allowSetter_voltmxControllerName = true;
                tpl = _voltmx.mvc.initializeSubViewController(tpl);
                delete $KA.allowSetter_voltmxControllerName;

                tpl._kwebfw_.is.template = true;
                $KW.root(tpl, 'template');
                _ && $KU.defineProperty(tpl._kwebfw_, 'owner', _.uid, null);
            } else if(!tpl._kwebfw_.is.template) {
                tpl._kwebfw_.is.template = true;
                $KW.root(tpl, 'template');
                _ && $KU.defineProperty(tpl._kwebfw_, 'owner', _.uid, null);
            }
        }

        return tpl;
    };


    var _getWidgetDataMapPath = function $KW_getWidgetDataMapPath(model) {
        var $K = voltmx.$kwebfw$, $KW = $K.widget, tmodel = null, path = [];

        model = $KW.model(model);

        if(model && model._kwebfw_.is.cloned) {
            tmodel = (model._kwebfw_.is.template)
                ? model : _rmodel(_pmodel(model));

            path.splice(0, 0, model.id);

            while(tmodel && !tmodel._kwebfw_.is.template) {
                path.splice(0, 0, tmodel.id);
                tmodel = _rmodel(_pmodel(tmodel));
            }
        }

        return path.join('.');
    };


    var _handleTabPaneEnablement = function $KW$_handleTabPaneEnablement(model, setupUIInteraction) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        if(!$KU.is(setupUIInteraction, 'boolean')) {
            setupUIInteraction = false;
        }

        if($KU.is(model, 'widget', 'TabPane')) {
            $KU.each(model._kwebfw_.tabs, function(tab) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget,
                    disabled = this._kwebfw_.disabled,
                    tabContainer = this[tab.id];

                $KW.iterate(tabContainer, function(widget) {
                    var _ = widget._kwebfw_;

                    if(disabled && !_.disabled) {
                        _.disabled = true;
                        _handleTabPaneEnablement(widget);

                        if(setupUIInteraction) {
                            _setupUIInteraction(widget, _focusableElement(widget));
                        }
                    } else {
                        return true; //Break the loop
                    }
                }, {scope:tabContainer, tabs:false});
            }, model);
        }
    };


    var _handleOnScrollWidgetPosition = function $KW_handleOnScrollWidgetPosition() {
        var $K = voltmx.$kwebfw$, $KD = $K.dom, $KU = $K.utils, $KW = $K.widget, onScrollWidgets = [],
            _updateOnScrollWidgets = function(widget) {
                $KU.each(widget.widgets(), function(model) {
                    if(model.onScrollWidgetPosition) onScrollWidgets.push(model);
                    if($KW.isFlexContainer(model)) _updateOnScrollWidgets(model);
                });
            };

        _updateOnScrollWidgets(this);

        $KU.each(onScrollWidgets, function(model) {
            var view = model._kwebfw_.view,
                position = $KD.point(model._kwebfw_.view);

            $KW.fire(model, 'onScrollWidgetPosition', model, {
                positionLeft: position.x,
                positionTop: position.y,
                x: view.offsetLeft,
                y: view.offsetTop
            });
        });
    };


    var _hmodel = function $KW_hmodel(model) {
        var $K = voltmx.$kwebfw$, $KW = $K.widget, omodel = null, hmodel = null;

        model = $KW.model(model);

        omodel = (model) ? _omodel(model) : null;
        hmodel = (omodel) ? _rmodel(omodel) : _rmodel(model);

        //TODO:: This can be handled in a better way in future
        if(hmodel && hmodel._kwebfw_.tpid) {
            hmodel = $KW.model(hmodel._kwebfw_.tpid);
        }

        return hmodel;
    };


    var _holder = function $KW_holder(model) {
        var $K = voltmx.$kwebfw$, $KW = $K.widget,
            el = $KW.el(model), holder = null;

        holder = el.scrolee || el.viewport || el.node;

        return holder;
    };


    var _inComponent = function $KW_inComponent(model) {
        var $K = voltmx.$kwebfw$, $KW = $K.widget,
            rmodel = null, hmodel = null, flag = false;

        model = $KW.model(model);

        if(model) {
            rmodel = _rmodel(model);

            if(rmodel && rmodel._kwebfw_.is.component) {
                flag = true;
            } else {
                hmodel = _hmodel(model);

                if(hmodel && hmodel._kwebfw_.is.component) {
                    flag = true;
                }
            }
        }

        return flag;
    };


    var _index = function $KW_index(model) {
        var $K = voltmx.$kwebfw$, $KW = $K.widget, proxy = null,
            pmodel = null, c = 0, clen = 0, index = -1, widgets = [];

        model = $KW.model(model);

        if(model) {
            proxy = _proxy(model);
            pmodel = _pmodel(proxy);
            widgets = _children(pmodel);
            clen = widgets.length;

            for(c=0; c<clen; c++) {
                if(widgets[c] === proxy) {
                    index = c; break;
                }
            }
        }

        return index;
    };


    var _inheritedProperties = function $KW_inheritedProperties(model) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget, prop = {};

        model = $KW.model(model);

        if($KU.is(model, 'widget', 'inherited')) {
            $KU.each(Object.getOwnPropertyNames(model), function(value) {
                if(value !== '_kwebfw_' && !Object.prototype.hasOwnProperty.call(this._kwebfw_.prop, value)) {
                    prop[value] = this[value];
                }
            }, model);
        }

        return prop;
    };


    var _inModalContainer = function $KW_inModalContainer(model) {
        var $K = voltmx.$kwebfw$, $KW = $K.widget, omodel = null, flag = false;

        model = $KW.model(model);
        omodel = (model) ? $KW.omodel(model) : null;

        if(model) {
            flag = model._kwebfw_.inModalContainer;

            if(flag && omodel) {
                flag = omodel._kwebfw_.inModalContainer;
            }
        }

        return flag;
    };


    var _inPercent = function $KW_inPercent(value) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false, len = 0;

        if($KU.is(value, 'string') && value) {
            len = value.length;

            if(value.substr((len-1), 1) === '%') {
                value = value.substr(0, (len-1));
                value = parseFloat(value, 10);

                if(!isNaN(value)) {
                    flag = true;
                }
            }
        }

        return flag;
    };


    var _inTemplate = function $KW_inTemplate(model) {
        var $K = voltmx.$kwebfw$, $KW = $K.widget, rmodel = null, flag = false;

        model = $KW.model(model);

        if(model) {
            rmodel = _rmodel(model);

            if(rmodel && rmodel._kwebfw_.is.template) {
                flag = true;
            }
        }

        return flag;
    };


    var _interactable = function $KW_interactable(model) {
        var $K = voltmx.$kwebfw$, $KW = $K.widget, flag = false;

        model = $KW.model(model);

        if(model) {
            flag = !_disabled(model);

            if(flag) {
                flag = _inModalContainer(model);
            }
        }

        return flag;
    };


    var _invokeLifeCycleEvent = function $KW_invokeLifeCycleEvent(model, type, reverse) {
        _iterate(model, function(widget) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils,
                _ = widget._kwebfw_, proxy = null;

            if(_.is.component || $KU.is(widget, 'widget', 'Form2')) {
                if(_.is.component) {
                    proxy = _.proxy;
                }

                _fire((proxy || widget), type, (proxy || widget));
            }
        }, {reverse:reverse, tabs:false});
    };


    var _isAriaRoleAllowed = function $KW_isAriaRoleAllowed(model, role) {
        var $K = voltmx.$kwebfw$, $KW = $K.widget, a11y = null, name = '', flag = false;

        model = $KW.model(model);

        if(model) {
            name = _name(model);
            a11y = model._kwebfw_.prop.accessibilityConfig;

            if(name === 'Button' && ['link'].indexOf(role) >= 0) {
                flag = true;
            } else if(['FlexContainer', 'FlexScrollContainer'].indexOf(name) >= 0) {
                flag = true;
            } else if(name === 'SegmentedUI2' && ['table', 'grid', 'button'].indexOf(role) >= 0) {
                if(a11y && a11y.tagName
                && a11y.tagName.toLowerCase() === 'div') {
                    flag = true;
                }
            }
        }

        return flag;
    };


    var _isClonable = function $KW_isClonable(model) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget, flag = true;

        model = $KW.model(model);

        if(!model || $KU.is(model, 'widget', 'Form2')) {
            flag = false;
        }

        return flag;
    };


    var _isContainer = function $KW_isContainer(model) {
        var $K = voltmx.$kwebfw$, $KW = $K.widget, flag = false;

        model = $KW.model(model);

        if(model && model instanceof voltmx.ui.ContainerWidget) {
            flag = true;
        }

        return flag;
    };


    var _isFixedHeight = function $KW_isFixedHeight(model) {
        var $K = voltmx.$kwebfw$, $KW = $K.widget, final = null, flag = false;

        model = $KW.model(model);

        if(model) {
            final = model._kwebfw_.flex.final;

            if(final.height || _isImplicitHeight(model)) {
                flag = true;
            }
        }

        return flag;
    };


    //TODO::
    var _isFixedHeightWidget = function $KW_isFixedHeightWidget(model) {
        var $K = voltmx.$kwebfw$, $KW = $K.widget, flag = false;

        model = $KW.model(model);

        if(model) {
            //E.g. Slider, Switch etc.
        }

        return flag;
    };


    var _isFixedWidth = function $KW_isFixedWidth(model) {
        var $K = voltmx.$kwebfw$, $KW = $K.widget, final = null, flag = false;

        model = $KW.model(model);

        if(model) {
            final = model._kwebfw_.flex.final;

            if(final.width || _isImplicitWidth(model)) {
                flag = true;
            }
        }

        return flag;
    };


    //TODO::
    var _isFixedWidthWidget = function $KW_isFixedWidthWidget(model) {
        var $K = voltmx.$kwebfw$, $KW = $K.widget, flag = false;

        model = $KW.model(model);

        if(model) {
            //Switch etc.
        }

        return flag;
    };


    var _isFlexContainer = function $KW_isFlexContainer(model) {
        var $K = voltmx.$kwebfw$, $KW = $K.widget, flag = false,
            prop = null, layoutList = [
                voltmx.flex.FREE_FORM, voltmx.flex.FLOW_HORIZONTAL,
                voltmx.flex.FLOW_VERTICAL, voltmx.flex.RESPONSIVE_GRID
            ];

        model = $KW.model(model);

        if(model) {
            prop = model._kwebfw_.prop;

            if(model instanceof voltmx.ui.FlexContainer
            || (model instanceof voltmx.ui.Form2
            && layoutList.indexOf(prop.layoutType) >= 0)) {
                flag = true;
            }
        }

        return flag;
    };


    var _isFlexPropertyDefined = function $KW_isFlexPropertyDefined(prop, name) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

        if(name === 'zIndex') {
            flag = $KU.is(prop[name], 'number') ? true : false;
        } else {
            if($KU.is(prop[name], 'number')
            || ($KU.is(prop[name], 'string') && prop[name])) {
                flag = true;
            }
        }

        return flag;
    };


    var _isFlexWidget = function $KW_isFlexWidget(model) {
        var $K = voltmx.$kwebfw$, $KW = $K.widget, flag = false;

        model = $KW.model(model);

        if(model) {
            if($KW.isFlexContainer(model) || $KW.isFlexContainer(_pmodel(model))) {
                flag = true;
            }
        }

        return flag;
    };


    //TODO::
    var _isGreedyWidget = function $KW_isGreedyWidget(/*model*/) {
        var flag = false;

        return flag;
    };


    var _isImplicitHeight = function $KW_isImplicitHeight(model) {
        var $K = voltmx.$kwebfw$, $KW = $K.widget,
            pmodel = null, final = null, flag = false;

        model = $KW.model(model);

        if(model) {
            final = model._kwebfw_.flex.final;
            pmodel = $KW.pmodel(model);

            if($KW.layout(pmodel) === 'fflex' && !final.height) {
                if((final.top && final.bottom)
                || (final.top && final.centerY)
                || (final.centerY && final.bottom)) {
                    flag = true;
                }
            }
        }


        return flag;
    };


    var _isImplicitWidth = function $KW_isImplicitWidth(model) {
        var $K = voltmx.$kwebfw$, $KW = $K.widget,
            pmodel = null, final = null, flag = false;

        model = $KW.model(model);

        if(model) {
            final = model._kwebfw_.flex.final;
            pmodel = $KW.pmodel(model);

            if($KW.layout(pmodel) === 'fflex' && !final.width) {
                if((final.left && final.right)
                || (final.left && final.centerX)
                || (final.centerX && final.right)) {
                    flag = true;
                }
            }
        }

        return flag;
    };


    var _isOwnerWidget = function $KW_isOwnerWidget(model) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget, flag = false;

        model = $KW.model(model);

        if($KU.is(model, 'widget', 'SegmentedUI2')
        || $KU.is(model, 'widget', 'CollectionView')) {
            flag = true;
        }

        return flag;
    };


    var _isRendered = function $KW_isRendered(model) {
        var $K = voltmx.$kwebfw$, $KW = $K.widget,
            _ = model._kwebfw_, flag = false;

        model = $KW.model(model);

        if(model && (model.isVisible || $K.F.RIVW) && _.view) {
            if(document.getElementById(_.uid)) {
                flag = true;
            }
        }

        return flag;
    };


    var _isResponsiveContainer = function $KW_isResponsiveContainer(model) {
        var $K = voltmx.$kwebfw$, $KW = $K.widget, $KF = voltmx.flex, flag = false, prop = null;

        model = $KW.model(model);

        if(model) {
            prop = model._kwebfw_.prop;

            if(prop.layoutType === $KF.RESPONSIVE_GRID && _isFlexContainer(model)) {
                flag = true;
            }
        }

        return flag;
    };


    var _isScrollableWidget = function $KW_isScrollableWidget(model, scrollDirection) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils,
            flag = false, prop = model._kwebfw_.prop;

        if($KU.is(model, 'widget', 'FlexScrollContainer') || $KU.is(model, 'widget', 'Form2')) {
            if(prop.enableScrolling && !_disabled(model)) {
                flag = true;
            }
        } else if($KU.is(model, 'widget', 'CollectionView')) {
            if(prop.scrollDirection !== voltmx.flex.SCROLL_NONE && !_disabled(model)) {
                flag = true;
            }
        } else if($KU.is(model, 'widget', 'SegmentedUI2')) {
            if((prop.showScrollbars || _isFixedHeight(model)) && !_disabled(model)) {
                flag = true;
            }
        } else if($KU.is(model, 'widget', 'DataGrid')) {
            if(prop.scrollable && !_disabled(model)) {
                flag = true;
            }
        }
        if(scrollDirection && !_disabled(model)
        && ($KU.is(model, 'widget', 'FlexScrollContainer') || $KU.is(model, 'widget', 'Form2'))) {
            if(prop.scrollDirection === voltmx.flex.SCROLL_VERTICAL
            && prop.scrollDirection === scrollDirection) {
                flag = true;
            } else if(prop.scrollDirection === voltmx.flex.SCROLL_HORIZONTAL
            && prop.scrollDirection === scrollDirection) {
                flag = true;
            } else if(prop.scrollDirection === voltmx.flex.SCROLL_BOTH
            && prop.scrollDirection === scrollDirection) {
                flag = true;
            } else {
                flag = false;
            }
        }
        return flag;
    };


    /*eslint-disable*/
    //TODO::
    var _isTemplatable = function $KW_isTemplatable(model) {
        var $K = voltmx.$kwebfw$, $KW = $K.widget, flag = false;

        model = $KW.model(model);

        return flag;
    };
    /*eslint-enable*/


    var _isTextDrivenWidget = function $KW_isTextDrivenWidget(model) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

        if($KU.is(model, 'widget') && [
            'Button', 'Label', 'RichText'
        ].indexOf(_name(model)) >= 0) {
            flag = true;
        }

        return flag;
    };


    //This iterate over model and its children
    var _iterate = function $KW_iterate(model, callback, config) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget, _ = null, output = null;

        model = $KW.model(model);

        if(model && $KU.is(callback, 'function')) {
            model = _proxy(model);
            _ = model._kwebfw_;
            if(!$KU.is(config, 'object')) config = {};
            if(!Object.prototype.hasOwnProperty.call(config, 'scope')) config.scope = this;
            if(!$KU.is(config.reverse, 'boolean')) config.reverse = false;
            if(!$KU.is(config.owner, 'boolean')) config.owner = false;
            if(!$KU.is(config.clones, 'boolean')) config.clones = false;
            if(!$KU.is(config.tabs, 'boolean')) config.tabs = true;

            if(!config.reverse) {
                output = callback.call(config.scope, model);

                if(config.owner && $KU.is(_iterateOwner[_.name], 'function')) {
                    _iterateOwner[_.name](model, callback, {
                        scope: config.scope,
                        reverse: config.reverse,
                        owner: config.owner,
                        clones: config.clones,
                        tabs: config.tabs
                    });
                }
            }

            if(output !== true) {
                $KU.each(_children(model, {tabs:config.tabs}), function(widget) {
                    _iterate(widget, callback, {
                        scope: config.scope,
                        reverse: config.reverse,
                        owner: config.owner,
                        clones: config.clones,
                        tabs: config.tabs
                    });
                }, config.scope);
            }

            if(config.reverse) {
                output = callback.call(config.scope, model);

                if(config.owner && $KU.is(_iterateOwner[_.name], 'function')) {
                    _iterateOwner[_.name](model, callback, {
                        scope: config.scope,
                        reverse: config.reverse,
                        owner: config.owner,
                        clones: config.clones,
                        tabs: config.tabs
                    });
                }
            }
        }
    };


    var _iterateOwner = {};


    var _isWithinViewport = function $KW_isWithinViewport(model, parent) {
        var el = _el(model), pel = _el(parent), flag = false,
            elCord = null, pelCord = null;

        if(el.node && pel.node) {
            elCord = el.node.getBoundingClientRect();
            pelCord = pel.node.getBoundingClientRect();

            if(elCord.top >= pelCord.top && elCord.left >= pelCord.left
            && elCord.bottom <= pelCord.bottom && elCord.right <= pelCord.right) {
                flag = true;
            }
        }

        return flag;
    };


    var _layout = function $KW_layout(model) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, layout = '',
            list = ['fflex', 'hflex', 'vflex', 'rflex'];

        if($KU.is(model, 'widget')) {
            if(_isContainer(model)) {
                layout = model.layoutType;
                if(!layout) layout = list[0];
            }
        } else if($KU.is(model, 'number')) {
            layout = list[model];
        } else if($KU.is(model, 'string') && model) {
            layout = (list.indexOf(model) >= 0) ? model : list[0];
        }

        return layout;
    };


    var _markRelayout = function $KW_markRelayout(model) {
        var cf = _getRootNode(model), relayout = null;

        if(cf) {
            if(!cf._kwebfw_.relayout) {
                cf._kwebfw_.relayout = {};
            }

            relayout = cf._kwebfw_.relayout;
            relayout[model._kwebfw_.uid] = model;
        }
    };

    var _getRootNode = function $_getRootNode(model) {
        var $K = voltmx.$kwebfw$, $KW = $K.widget, $KU = $K.utils,
            $KA = $K.app, rmodel = null, pmodel = null, rootModel = null;

        if(!$KU.loadedFromOtherFramework()) {
            rootModel = $KW.model($KA.currentFormUID);
        } else {
            if(model) {
                rmodel = $KW.rmodel(model);
                if(rmodel) {
                    pmodel = $KW.pmodel(rmodel);
                    if(pmodel) {
                        rootModel = _getRootNode(pmodel);
                    } else {
                        rootModel = rmodel;
                    }
                }
            }
        }

        return rootModel;
    };

    //This function remove the given model from the relayout
    var _removeMarkedLayout = function $KW_removeMarkedLayout(model) {
        var cf = _getRootNode(model), relayout = null;

        if(cf) {
            relayout = cf._kwebfw_.relayout;

            //if the give model's uid is defined in the relayout, then delete
            if(relayout[model._kwebfw_.uid]) {
                delete relayout[model._kwebfw_.uid];
            }
        }
    };


    var _modifySelectedIndexes = function $KW_modifySelectedIndexes(selectedIndexes, depth, position, count) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, indexesToBeRemoved = [];

        if($KU.is(depth, 'integer') && depth >= 0
        && $KU.is(count, 'integer') && count !== 0
        && $KU.is(position, 'integer') && position >= 0
        && $KU.is(selectedIndexes, 'array')) {
            $KU.each(selectedIndexes, function(value, index) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, vlen = -1;

                if($KU.is(value, 'integer') && depth === 0) {
                    if(value >= position) {
                        this[index] = (value + count);

                        if(this[index] < 0) {
                            indexesToBeRemoved.push(index);
                        }
                    }
                } else if($KU.is(value, 'array')) {
                    vlen = value.length;

                    if(depth < vlen && $KU.is(value[depth], 'integer')
                    && value[depth] >= 0 && value[depth] >= position) {
                        value[depth] = (value[depth] + count);

                        if(value[depth] < 0) {
                            indexesToBeRemoved.push(index);
                        }
                    }
                }
            }, selectedIndexes);

            $KU.each(indexesToBeRemoved, function(value, index) {
                this.splice((value-index), 1);
            }, selectedIndexes);
        }
    };


    var _name = function $KW_name(model) {
        var $K = voltmx.$kwebfw$, $KW = $K.widget, name = '';

        model = _proxy($KW.model(model));

        if(model) {
            name = model._kwebfw_.name;

            if(['ComponentWithContract', 'ComponentWithoutContract'].indexOf(name) >= 0) {
                if(model instanceof voltmx.ui.FlexScrollContainer) {
                    name = 'FlexScrollContainer';
                } else if(model instanceof voltmx.ui.FlexContainer) {
                    name = 'FlexContainer';
                }
            }
        }

        return name;
    };


    var _nextVisible = function $KW_nextVisible(model) {
        var $K = voltmx.$kwebfw$, $KW = $K.widget,
            children = null, next = null, index = -1;

        model = $KW.model(model);

        if(model) {
            index = _index(model);

            if(index >= 0) {
                children = _children(_pmodel(model));
                next = children[++index];

                while(next && !next.isVisible) {
                    next = children[++index];
                }
            }
        }

        return next || null;
    };


    var _omodel = function $KW_omodel(model) {
        var $K = voltmx.$kwebfw$, $KW = $K.widget, omodel = null;

        model = $KW.model(model);

        if(model && model._kwebfw_.oid && model._kwebfw_.ii && model._kwebfw_.is.cloned) {
            omodel = $KW.model(model._kwebfw_.oid);
        }

        return omodel;
    };


    var _onPropertyChange = function $KW_onPropertyChange(model, key, old) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, owner = _omodel(model);

        if($KU.is(owner, 'widget') && $KU.is(_change[_name(owner)], 'function')) {
            _change[_name(owner)].call(owner, model, key, old);
        }
    };


    var _onRender = function $KW_onRender(nodes) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        if($KU.is(nodes, 'dom')) nodes = [nodes];

        $KU.each(nodes, function(view) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget, $KD = $K.dom,
                model = $KW.model(view), name = _name(model), selector = '';

            _onrender[name] && _onrender[name].call(model);

            selector += '[kw="CustomWidget"],';
            selector += '[kw="FlexScrollContainer"],';
            selector += '[kw="Label"],';
            selector += '[kw="ListBox"],';
            selector += '[kw="SegmentedUI2"]';

            $KU.each($KD.find(view, selector), function(node) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget,
                    widget = $KW.model(node), name = _name(widget);

                _onrender[name] && _onrender[name].call(widget);
            });
        });
    };

    var _pickers = function $KW_pickers(model) {
        var pickers = {}, fmodel =_getRootNode(model);

        if(!fmodel._kwebfw_.pickers) {
            fmodel._kwebfw_.pickers = {};
        }
        pickers = fmodel._kwebfw_.pickers;

        return pickers;
    };

    var _pmodel = function $KW_pmodel(model, arg1) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget, _ = null,
            pmodel = null, config = ($KU.is(arg1, 'object') ? arg1 : {});

        if(!$KU.is(config.tabs, 'boolean')) config.tabs = false;

        model = $KW.model(model);

        if(model) {
            _ = model._kwebfw_;

            if(config.tabs && _.is.tab === true && _.tpid
            && $KU.is(model, 'widget', 'FlexContainer')) {
                pmodel = $KW.model(_.tpid);
            } else if(_.pid) {
                pmodel = $KW.model(_.pid);
            } else if(_.is.component) {
                pmodel = _component(model);

                if(pmodel) {
                    _ = pmodel._kwebfw_;
                    pmodel = null;

                    if(_.pid) {
                        pmodel = $KW.model(_.pid);
                    }
                }
            }
        }

        return pmodel;
    };


    var _populateScrollDetails = function $KW_populateScrollDetails(model) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils,
            $KW = $K.widget, el = null, scroll = null;

        model = $KW.model(model);

        if(model) {
            el = _el(model);
            scroll = model._kwebfw_.ui.scroll;

            if(el.viewport) {
                if($KU.scrollType() === 'native') {
                    scroll.minX = scroll.minY = 0;

                    scroll.height = el.viewport.scrollHeight;
                    scroll.width = el.viewport.scrollWidth;

                    scroll.maxX = (scroll.width - el.viewport.offsetWidth);
                    scroll.maxY = (scroll.height - el.viewport.offsetHeight);
                    scroll.maxX = (scroll.maxX > 0) ? scroll.maxX : 0;
                    scroll.maxY = (scroll.maxY > 0) ? scroll.maxY : 0;
                }
            }
        }
    };


    var _prevVisible = function $KW_prevVisible(model) {
        var $K = voltmx.$kwebfw$, $KW = $K.widget,
            children = null, prev = null, index = -1;

        model = $KW.model(model);

        if(model) {
            index = _index(model);

            if(index >= 0) {
                children = _children(_pmodel(model));
                prev = children[--index];

                while(prev && !prev.isVisible) {
                    prev = children[--index];
                }
            }
        }

        return prev || null;
    };


    var _proxy = function $KW_proxy(model) {
        var $K = voltmx.$kwebfw$, $KW = $K.widget, proxy = $KW.model(model);

        if(proxy && proxy instanceof voltmx.ui.UserWidget) {
            proxy = proxy._kwebfw_.proxy;

            if(!(proxy instanceof voltmx.ui.FlexContainer
            || proxy instanceof voltmx.ui.FlexScrollContainer)) {
                proxy = null;
            }
        }

        return proxy;
    };


    var _registerForIdleTimeout = function $KW_registerForIdleTimeout() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
            $KA = $K.app, cf = $KW.model($KA.currentFormUID);

        if($KU.is($KA.idleTime, 'number') && $KA.idleTime > 0
        && $KU.is($KA.idleCallback, 'function')) {
            if($KA.idleTimeout) {
                clearTimeout($KA.idleTimeout);
                $KA.lastInteractionAt = $KA.idleTimeout = null;
            }

            if(cf && cf.enabledForIdleTimeout) {
                $KA.lastInteractionAt = new Date();

                $KA.idleTimeout = setTimeout(function() {
                    var $K = voltmx.$kwebfw$, $KW = $K.widget, $KA = $K.app,
                        cf = $KW.model($KA.currentFormUID);

                    clearTimeout($KA.idleTimeout);
                    $KA.lastInteractionAt = $KA.idleTimeout = null;

                    cf && $KA.idleCallback(cf);
                }, $KA.idleTime);
            }
        }
    };


    var _registerNativeScrollEvent = function $KW_registerNativeScrollEvent(model) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
            $KD = $K.dom, el = $KW.el(model), onReachingFired = false,
            timer = null, scrolled = false, dirX = '', dirY = '';

        if($KU.scrollType() !== 'native' || !el.viewport) return;

        $KD.on(el.viewport, 'scroll', 'wscroll', function(e) {
            var $K = voltmx.$kwebfw$, $KW = $K.widget, $KD = $K.dom, $KU = $K.utils,
                widget = $KD.closest(this, 'kw'), prop = null, scroll = null,
                scrollX = this.scrollLeft, scrollY = this.scrollTop, _ = null,
                reachOffsetInPixel = {x:50, y:50}, reachOffsetInPercent = {x:8, y:8},
                maxScrollReach = null;

            //eslint-disable-next-line
             var reachBeginingOffset = null, reachEndOffset = null;

            if(widget) {
                widget = $KW.model(widget);
                _ = widget._kwebfw_;
                scroll = _.ui.scroll;
                prop = _.prop;
                maxScrollReach = {
                    x: Math.max(reachOffsetInPixel.x, (scroll.maxX / reachOffsetInPercent.x)),
                    y: Math.max(reachOffsetInPixel.y, (scroll.maxY / reachOffsetInPercent.y))
                };
                if(scroll.x !== scrollX || scroll.y !== scrollY) {
                    timer && clearTimeout(timer); timer = null;

                    dirX = (scrollX < scroll.x) ? 'left'
                        : (scrollX > scroll.x) ? 'right' : '';
                    dirY = (scrollY < scroll.y) ? 'top'
                        : (scrollY > scroll.y) ? 'bottom' : '';

                    if(scroll.status === 'ended') {
                        scroll.status = 'started'; //console.error(scroll.status);
                        onReachingFired = false; scrolled = true;
                        _populateScrollDetails(widget);
                        $KW.fire(widget, 'onScrollStart', widget);

                        scroll.status = 'scrolling'; //console.error(scroll.status);
                        scroll.x = scrollX; scroll.y = scrollY;
                        $KW.fire(widget, 'onScrolling', widget);
                    } else {
                        scroll.status = 'scrolling'; //console.error(scroll.status);
                        scroll.x = scrollX; scroll.y = scrollY;
                        $KW.fire(widget, 'onScrolling', widget);
                    }

                    if(widget.reachingBeginningOffset) {
                        reachBeginingOffset = widget.reachingBeginningOffset;
                    }

                    if(widget.reachingEndOffset) {
                        reachEndOffset = widget.reachingEndOffset;
                    }

                    if(!onReachingFired) {
                        if((dirX === 'left' && scroll.maxX && scroll.x <= maxScrollReach.x)
                        || (dirY === 'top' && scroll.maxY && scroll.y <= maxScrollReach.y)) {
                            onReachingFired = true; //console.error('onReachingBegining');

                            if(prop.scrollingEvents
                            && prop.scrollingEvents.onReachingBegining) {
                                $KW.fire(widget, 'onReachingBegining', widget);
                            }
                        } else if((dirX === 'right' && scroll.maxX
                        && ((scroll.maxX - scroll.x) <= maxScrollReach.x))
                        || (dirY === 'bottom' && scroll.maxY
                        && ((scroll.maxY - scroll.y) <= maxScrollReach.y))) {
                            onReachingFired = true; //console.error('onReachingEnd');

                            if(prop.scrollingEvents
                            && prop.scrollingEvents.onReachingEnd) {
                                $KW.fire(widget, 'onReachingEnd', widget);
                            }
                        }
                    }
                }

                if(widget.enableOnScrollWidgetPositionForSubwidgets) {
                    _handleOnScrollWidgetPosition.call(widget);
                }
                if($KU.is(widget, 'widget', 'DataGrid')) {
                    $KD.style(el.docker, 'top', el.viewport.scrollTop + 'px');
                }
                if($KU.is(widget, 'widget', 'CollectionView')) {
                    $K.ui[$KW.name(widget)].handleOnItemDisplay.call(widget);
                }
                timer = setTimeout(function() {
                    if(scroll.status !== 'ended'
                    && scroll.x === e.target.scrollLeft
                    && scroll.y === e.target.scrollTop) {
                        scroll.status = 'ended'; //console.error(scroll.status);
                        onReachingFired = false;
                        $KW.fire(widget, 'onScrollEnd', widget);
                    }

                    clearTimeout(timer); timer = null;
                }, 250);
            }
        }, {passive:false});

        $KD.on(el.viewport, 'touchstart', 'wtscroll', function(/*e*/) {
            scrolled = false;

            $KD.on(el.viewport, 'touchend touchcancel', 'wtscroll', function(/*e*/) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget, $KD = $K.dom,
                    widget = $KD.closest(this, 'kw');

                $KD.off(el.viewport, 'touchend touchcancel', 'wtscroll');

                if(widget) {
                    widget = $KW.model(widget);

                    if(scrolled) {
                        $KW.fire(widget, 'onScrollTouchReleased', widget);
                    }
                }
            }, {passive:false});
        }, {passive:false});
    };


    //NOTE:: This function deals with skins, that are applied on el.node
    //       All types of skin, from all widgets are considered here
    var _removeAllSkinsFromUI = function $KW_removeAllSkinsFromUI(model) {
        var $K = voltmx.$kwebfw$, $KW = $K.widget, prop = null, el = null;

        model = $KW.model(model);

        if(model) {
            prop = model._kwebfw_.prop;
            el = _el(model);

            _removeSkin(prop.skin, el.node);
            _removeSkin(prop.focusSkin, el.node);
            _removeSkin(prop.hoverSkin, el.node);
            _removeSkin(prop.placeholderSkin, el.node);
        }
    };


    var _removeSkin = function $KW_removeSkin(skin, node) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom;

        if($KU.is(node, 'dom')) {
            if($KU.is(skin, 'string') && skin) {
                $KD.removeCls(node, skin);
            } else if($KU.is(skin, 'object')) {
                $KU.each(skin, function(val, key) {
                    $KD.style(node, key, null);
                });
            }
        }
    };


    //This function will replace wap index within square bracket for given model
    //e.g. frm_seg[1,0]_btnId with frm_seg[1,1]_btnId where 1,1 index provided
    var _replaceWAPIndex = function $KW_replaceWAPIndex(model, index) {
        var regPattern = /\[.*?\]\s?/g;

        model._kwebfw_.wap = model._kwebfw_.wap.replace(regPattern, '['+index+']');
    };


    var _removeView = function $KW_removeView(model) {
        var $K = voltmx.$kwebfw$, $KW = $K.widget,
            $KD = $K.dom, _ = null, a11yHint = null;

        model = $KW.model(model);

        if(model) {
            model = _proxy(model);
            _ = model._kwebfw_;
            a11yHint = document.getElementById((_.uid+'_hint'));

            if(_.viewPrev && $KD.parent(_.viewPrev)) {
                $KD.remove(_.viewPrev);
            }

            if(_.view && $KD.parent(_.view)) {
                $KD.remove(_.view);
            }

            if(_.viewNext && $KD.parent(_.viewNext)) {
                $KD.remove(_.viewNext);
            }

            if(a11yHint) $KD.remove(a11yHint);
        }
    };


    var _retainScrollPosition = function $KW_retainScrollPosition(model, retainScrollPosition) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget, el = $KW.el(model),
            viewport = null, scroll = null, scrollX = -1, scrollY = -1, _ = model._kwebfw_;

        if(_.ui.scroll && el.viewport) {
            viewport = el.viewport;
            scroll = _.ui.scroll;
            scroll.status = 'ended';

            if($KU.scrollType() === 'native') {
                scrollX = viewport.scrollLeft;
                scrollY = viewport.scrollTop;

                scroll.width = viewport.scrollWidth;
                scroll.height = viewport.scrollHeight;
                scroll.minX = scroll.minY = 0;
                scroll.maxX = (viewport.scrollWidth - viewport.offsetWidth);
                scroll.maxY = (viewport.scrollHeight - viewport.offsetHeight);

                if($K.flag.navigated && retainScrollPosition !== true) {
                    scroll.x = scroll.y = 0;
                } else {
                    if(scroll.x > scroll.maxX) {
                        scroll.x = scroll.maxX;
                    } else if(scroll.x < scroll.minX) {
                        scroll.x = scroll.minX;
                    }

                    if(scroll.y > scroll.maxY) {
                        scroll.y = scroll.maxY;
                    } else if(scroll.y < scroll.minY) {
                        scroll.y = scroll.minY;
                    }
                }

                if(scroll.x !== scrollX) viewport.scrollLeft = scroll.x;
                if(scroll.y !== scrollY) viewport.scrollTop = scroll.y;
            }
        }
    };

    /*eslint-disable*/
    var _retainSelection = function $KW_retainSelection(model) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom,
            _ = model._kwebfw_, prop = _.prop, row = null, rowView = null,
            secIndex = null, rowIndex = null;

        if($KU.is(model, 'widget', 'SegmentedUI2')) {
            if($K.flag.navigated && _isFixedHeight(model) && prop.viewType === constants.SEGUI_VIEW_TYPE_TABLEVIEW) {
                if(prop.retainScrollPositionMode === constants.SEGUI_SCROLL_POSITION_RETAIN) {
                    _retainScrollPosition(model, true);
                } else if(prop.retainSelection && prop.selectedRowIndex) {
                    model.selectedRowIndex = model.selectedRowIndex;
                }
            }
        }

        if($KU.is(model, 'widget', 'CollectionView')) {
            if($K.flag.navigated) {
                if(prop.retainSelection && prop.selectedItemIndex) {
                    model.selectedItemIndex = model.selectedItemIndex;
                }
            }
        }
    };


    var _returnPosition = function $KW_returnPosition(position, dimension) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, result = 0,
            patt1 = /\d+%/g, patt2 = /\d+px/g,
            operand1 = '', operand2 = '', flag = '',
            str = '', op1 = null, op2 = null, opr1 = null, opr2 = null;

        var convertToNumber = function(value) {
            return Number(value);
        };

        if(position) {
            str = position;
            str = str.replace(/\s/g, '');
            op1 = str.match(patt1);
            op2 = str.match(patt2);

            if(op1 && op1.length === 1 && $KU.is(op2, 'null')) {
                op1 = op1[0].slice(0, -1);
                if($KU.is(op1, 'numeric')) {
                    result = (convertToNumber(op1) * dimension)/100;
                }
            } else if(op2 && op2.length === 1 && $KU.is(op1, 'null')) {
                op2 = op2[0].slice(0, -1);
                if($KU.is(op2, 'numeric')) {
                    result = dimension - convertToNumber(op2);
                }
            } else if(op1 && op1.length > 1) {
                opr1 = op1[0].slice(0, -1);
                opr2 = op1[1].slice(0, -1);
                if($KU.is(opr1, 'numeric') && $KU.is(opr2, 'numeric')) {
                    operand1 = ((convertToNumber(opr1)) * dimension) / 100;
                    operand2 = ((convertToNumber(opr2)) * dimension) / 100;
                }
            } else if(op2 && op2.length > 1) {
                flag = 'px';
                opr1 = op2[0].slice(0, -1);
                opr2 = op2[1].slice(0, -1);
                if($KU.is(opr1, 'numeric') && $KU.is(opr2, 'numeric')) {
                    operand1 = (convertToNumber(opr1));
                    operand2 = (convertToNumber(opr2));
                }
            } else {
                op1 = op1[0].slice(0, -1);
                op2 = op2[0].slice(0, -1);
                if($KU.is(op1[0], 'numeric') && $KU.is(op2[0], 'numeric')) {
                    operand1 = ((convertToNumber(op1)) * dimension) / 100;
                    operand2 = convertToNumber(op2);
                }
            }

            if(operand1 && operand2) {
                if(str.indexOf(operand2) < str.indexOf(operand1)) {
                    operand1 = operand2;
                    operand2 = operand1;
                }
                if(str.indexOf('+') > 0)
                    result = operand1 + operand2;
                else
                    result = operand1 - operand2;
                if(flag === 'px')
                    result = dimension - result;
            }
        }
        return result;
    };
    /*eslint-enable*/

    var _rmodel = function $KW_rmodel(model) {
        var $K = voltmx.$kwebfw$, $KW = $K.widget, rmodel = null;

        model = $KW.model(model);

        if(model) {
            if((voltmx.application.getCurrentForm() == null || voltmx.application.getCurrentForm().id != currentFormName) && model instanceof voltmx.ui.FlexContainer) {
                rmodel = $KW.model(model._kwebfw_.uid);
                rmodel.childHierarchy = true;
            } else {
                rmodel = $KW.model(model._kwebfw_.rid);
            }
        }
        if(model instanceof voltmx.ui.Form2)
            currentFormName = model.id;

        return rmodel;
    };


    var _scrollBy = function $KW_scrollBy(model, x, y, duration) {
        var $K = voltmx.$kwebfw$, $KW = $K.widget, scroll = null;

        model = $KW.model(model);
        if(!model) return; //Widget not found

        scroll = model._kwebfw_.ui;
        scroll = (scroll.scroll) ? scroll.scroll : null;
        if(!scroll) return; //This widget is not scrollable

        _scrollTo(model, (scroll.x + x), (scroll.y + y), duration);
    };


    var _scrollTo = function $KW_scrollTo(model, x, y, duration, algo) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget, el = null,
            forced = false, startTime = new Date().getTime(), scroll = null;

        var animate = function() {
            var currentTime = new Date().getTime(), left = 0,
                diffTime = currentTime - startTime, top = 0;

            if(diffTime < duration && (scroll.x !== x || scroll.y !== y)) {
                left = parseInt(ease[algo](diffTime, scroll.x, x, duration), 10);
                top = parseInt(ease[algo](diffTime, scroll.y, y, duration), 10);

                scrollTo(left, top, scroll, el.viewport, el.hScroll, el.vScroll, forced);

                if(scroll.action !== 'stop' && animate) {
                    requestAnimationFrame(animate);
                } else {
                    delete scroll.action; animate = null; //For GC
                }
            } else {
                scrollTo(x, y, scroll, el.node, el.hScroll, el.vScroll, forced);
                delete scroll.action; animate = null; //For GC
            }
        };

        var ease = {
            InOutQuad: function(diffTime, oldValue, newValue, duration) {
                var change = newValue - oldValue;

                diffTime = diffTime / (duration / 2);

                if(diffTime < 1) {
                    return ((change / 2) * (diffTime * diffTime)) + oldValue;
                }
                diffTime--;
                return (((change / 2) * -1) * (diffTime * (diffTime - 2) - 1)) + oldValue;
            }
        };

        var scrollTo = function(left, top, offset, view, hbar, vbar, forced) {
            var hstyle = '', vstyle = '', hleft = 0, vtop = 0, gap = 1;

            if(forced || left !== offset.x) {
                offset.x = (left < 0) ? 0 : (left > offset.maxX) ? offset.maxX : left;
                if(view) view.scrollLeft = offset.x;
            }

            if(forced || top !== offset.y) {
                offset.y = (top < 0) ? 0 : (top > offset.maxY) ? offset.maxY : top;
                if(view) view.scrollTop = offset.y;
            }

            if(hbar) {
                hleft = parseInt(((offset.hmax / offset.maxX) * offset.x), 10);
                hleft = (hleft < 0) ? 0 : (hleft > offset.hmax) ? offset.hmax : hleft;

                hstyle = hbar.style.cssText;
                //hstyle += 'bottom:'+((gap > 0) ? gap : ('-'+offset.y))+'px;'; //Do not delete this line
                //TODO:: Achieve below line with transfor:translate
                hstyle += 'bottom:-'+(offset.y - gap)+'px;';
                hstyle += 'left:'+(offset.x + hleft)+'px;';
                //hstyle += 'transform:translate('+(offset.x + hleft)+'px, 0px);';
                hstyle += 'width:'+offset.hsize+'px;';

                hbar.style.cssText = hstyle;
            }

            if(vbar) {
                vtop = parseInt(((offset.vmax / offset.maxY) * offset.y), 10);
                vtop = (vtop < 0) ? 0 : (vtop > offset.vmax) ? offset.vmax : vtop;

                vstyle = vbar.style.cssText;
                vstyle += 'top:'+(offset.y + vtop)+'px;';
                //vstyle += 'transform:translate(0px, '+(offset.y + vtop)+'px);';
                //TODO:: Achieve below line with transfor:translate
                vstyle += 'right:'+((gap > 0) ? gap : ('-'+offset.x))+'px;';
                //vstyle += 'right:-'+(offset.x - 1)+'px;'; //Do not delete this line
                vstyle += 'height:'+offset.vsize+'px;';

                vbar.style.cssText = vstyle;
            }
        };

        if(!$KU.is(x, 'number') || !$KU.is(y, 'number')) return;

        model = $KW.model(model);
        if(!model) return; //Widget not found

        scroll = model._kwebfw_.ui;
        scroll = (scroll.scroll) ? scroll.scroll : null;
        if(!scroll) return; //This widget is not scrollable

        if($KU.is(duration, 'boolean')) forced = duration;

        //Normalizing algo
        if(!$KU.is(algo, 'string') || !algo
        || !$KU.is(ease[algo], 'function')) {
            algo = 'InOutQuad';
        }

        //Normalizing duration (in miliseconds)
        if($KU.is(duration, 'number')) {
            duration = (duration >= 0) ? duration : 0;
        } else if($KU.is(duration, 'object')) {
            if(!$KU.is(duration.x, 'number')) {
                duration.x = 0;
            }
            if(!$KU.is(duration.y, 'number')) {
                duration.y = 0;
            }

            duration = Math.max(duration.x, duration.y);
        } else {
            duration = 0;
        }

        el = _el(model); //Query all DOM needed
        _updateScroll(model);

        x = parseInt(x, 10); y = parseInt(y, 10);

        //Return if no change in scroll position from its previous state
        if(x === scroll.x && y === scroll.y) return;

        if(duration === 0) {
            scrollTo(x, y, scroll, el.node, el.hScroll, el.vScroll, forced);
        } else { //if duration is greater than zero
            animate();
        }
    };


    //temporary usage purpose will be replaced after custom implementation is done
    var _scrollToSetFocus = function $KW_scrollToSetFocus(model, positionObj/*, animate, time*/) {
        var $K = voltmx.$kwebfw$, $KU =$K.utils, scrollableView = null;

        scrollableView = _el(model);

        if(scrollableView.viewport) {
            scrollableView = scrollableView.viewport;
            //native scroll
            if($KU.scrollType() === 'native') {
                //TO DO
                scrollableView.scrollTop = positionObj.y;
                scrollableView.scrollLeft = positionObj.x;
            }
        }
    };


    var _scrollElementToParentScroller = function $KW_scrollElementToParentScroller(model, parentModel) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils,
            $KD = $K.dom, elView = _el(model), elParentModelView = null,
            parentView = _el(parentModel), focusModel = model, xScroll = 0, yScroll = 0,
            maxLeftScroll = 0, maxTopScroll = 0;

        parentModel = parentModel || _omodel(model) || _pmodel(model);

        if(elView.node && parentView.viewport) {
            elView = elView.node;
            if($KU.is(parentModel, 'widget', 'SegmentedUI2')) {
                elView = $KD.parent(elView);
            }
            parentView = parentView.viewport;
            maxTopScroll = parentView.scrollHeight - parentView.offsetHeight;
            maxLeftScroll = parentView.scrollWidth - parentView.offsetWidth;

            if(_isScrollableWidget(parentModel, voltmx.flex.SCROLL_VERTICAL)
            || _isScrollableWidget(parentModel, voltmx.flex.SCROLL_BOTH)) {
                yScroll = elView.offsetTop;
                model = _pmodel(focusModel) || _omodel(focusModel);

                while(model && (parentModel !== model)) {
                    elParentModelView = _el(model).node;
                    yScroll += elParentModelView.offsetTop;
                    model = _pmodel(model) || _omodel(model);
                }

                if(yScroll > maxTopScroll) {
                    yScroll = maxTopScroll;
                }
                if(yScroll < 0) {
                    yScroll = 0;
                }
            }
            if(_isScrollableWidget(parentModel, voltmx.flex.SCROLL_HORIZONTAL)
            || _isScrollableWidget(parentModel, voltmx.flex.SCROLL_BOTH)) {
                xScroll = elView.offsetLeft;
                model = _pmodel(focusModel) || _omodel(focusModel);

                while(model && (parentModel !== model)) {
                    elParentModelView = _el(model).node;
                    xScroll += elParentModelView.offsetLeft;
                    model = _pmodel(model) || _omodel(model);
                }

                if(xScroll > maxLeftScroll) {
                    xScroll = maxLeftScroll;
                }
                if(xScroll < 0) {
                    xScroll = 0;
                }
            }

            _scrollToSetFocus(parentModel, {x: xScroll, y:yScroll}, true);
        }
    };


    var _setFocus = function $KW_setFocus(model) {
        var parent = null,
            parentScroller = function(gmodel) {
                var pmodel = _pmodel(gmodel) || _omodel(gmodel);

                return _closestScrollableWidget(pmodel);
            };

        parent = parentScroller(model);

        while(parent) {
            if(!_isWithinViewport(model, parent)) {
                _scrollElementToParentScroller(model, parent);
            }
            model = parent;
            parent = parentScroller(model);
        }
    };


    var _setContentOffset = function $KW_setContentOffset(model, offset, animate) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
            el = null, widgets = null, value = {};

        widgets = ['Form2', 'FlexScrollContainer', 'SegmentedUI2', 'CollectionView'];
        if(widgets.indexOf($KW.name(model)) >= 0) {
            if(arguments.length === 2 && !$KU.is(animate, 'boolean')) {
                //ERROR:: throw new Error('Invalid parameter passed.');
            } else {
                if(!$KU.is(animate, 'boolean')) {
                    animate = false;
                }

                value = _getContentOffsetValues(model, offset);

                if($KU.is(value.x, 'integer') && $KU.is(value.y, 'integer')) {
                    //TODO:: Make use of animate parameter
                    if($KU.scrollType() !== 'native') {
                        $KW.scrollTo(model, value.x, value.y);
                    } else {
                        el = $KW.el(model);
                        el.viewport.scrollLeft = value.x;
                        el.viewport.scrollTop = value.y;
                    }
                } else {
                    throw new Error('Invalid parameter passed.');
                }
            }
        } else {
            throw new Error('Cannot call <setContentOffset> method on <'+ this._kwebfw_.ns+'>');
        }
    };


    var _setupUIInteraction = function $KW_setupUIInteraction(model, dom, clone) {
        var $K = voltmx.$kwebfw$, $KU =$K.utils, $KW = $K.widget,
            $KD = $K.dom, ui = null, tabindex = '';

        model = $KW.model(model);

        if(model) {
            ui = $K.ui[_name(model)];
            if(!$KU.is(clone, 'boolean')) clone = false;
            tabindex = _tabIndex(model, clone);

            if(dom) {
                if(ui && $KU.is(ui.setupUIInteraction, 'function')) {
                    ui.setupUIInteraction.call(model, dom, clone);
                } else if(_disabled(model)) {
                    $KD.setAttr(dom, 'aria-disabled', 'true');
                    //If tabindex should be -1, then ui.setupUIInteraction should exist
                    $KD.removeAttr(dom, 'tabindex');
                } else if(!_interactable(model)) {
                    //If tabindex should be -1, then ui.setupUIInteraction should exist
                    $KD.removeAttr(dom, 'tabindex');
                } else {
                    $KD.removeAttr(dom, 'aria-disabled');

                    if($KU.is(tabindex, 'integer')) {
                        $KD.setAttr(dom, 'tabindex', tabindex);
                    } else {
                        //If tabindex should be -1, then ui.setupUIInteraction should exist
                        $KD.removeAttr(dom, 'tabindex');
                    }
                }
            }
        }
    };


    var _shouldApplyRTL = function $KW_shouldApplyRTL(model, property) {
        var $K = voltmx.$kwebfw$, $KA = $K.app, currentlocale = voltmx.i18n && $KA.currentLocale,
            layoutConfig = $KA.localeLayoutConfig,
            appPropertyName, widgetPropertyName, localeLevelPropertyMap = {
                'flexPosition': 'mirrorFlexPositionProperties',
                'contentAligment': 'mirrorContentAlignment',
                'layoutAlignment': 'mirrorFlowHorizontalAlignment'
            },
            widgetLevelPropertyMap = {
                'flexPosition': 'retainFlexPositionProperties',
                'contentAligment': 'retainContentAlignment',
                'layoutAlignment': 'retainFlowHorizontalAlignment'
            };
        if(model._kwebfw_.isPreValidated) {
            return false;
        }
        if(layoutConfig && currentlocale && layoutConfig[currentlocale]) {
            layoutConfig = layoutConfig[currentlocale];
            appPropertyName = localeLevelPropertyMap[property];
            widgetPropertyName = widgetLevelPropertyMap[property];
            if(layoutConfig[appPropertyName] && !model[widgetPropertyName]) {
                return true;
            }
        }
        return false;
    };

    var _shouldLazyLoad = {
        SegmentedUI2: function() {
            var $K = voltmx.$kwebfw$, $KW = $K.widget, flag = false, prop = this._kwebfw_.prop;

            if($KW.isFixedHeight(this)
            && this._kwebfw_.prop.viewType === constants.SEGUI_VIEW_TYPE_TABLEVIEW
            && (voltmx.$kwebfw$.behavior.enableLazyLoadForSegment || prop.enableLazyLoad)) {
                flag = true;
            }

            return flag; //TODO:: return flag;
        }
    };

    var _siblings = function $KW_siblings(model) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
            pmodel = null, widgets = [], siblings = [];

        model = $KW.model(model);

        if(model) {
            pmodel = _pmodel(model);
            widgets = _children(pmodel);

            $KU.each(widgets, function(widget) {
                if(widget !== model) {
                    siblings.push(widget);
                }
            });
        }

        return siblings;
    };


    var _skinHandlers = function $KU_skinhandlers() {
        return {
            webcss: function(skinObj) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom, $KU = $K.utils;

                $KU.each(skinObj.config, function(value, keey) {
                    if(skinObj.rule) {
                        skinObj.rule.style[keey] = value;
                    } else {
                        $KD.style(skinObj.el, keey, value);
                    }
                });
            },

            background: function(skinObj) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom, $KW = $K.widget, value;

                value = $KW.skinUtils.background(skinObj.config);

                if(value) {
                    if(skinObj.rule) {
                        skinObj.rule.style.background = value;
                        //background color and background priority validation todo
                    } else {
                        $KD.style(skinObj.el, 'background', value);
                    }
                } else {
                    //todo
                }
            },

            border: function(skinObj) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom, $KU = $K.utils, $KW = $K.widget,
                    borderObj;

                borderObj = $KW.skinUtils.border(skinObj.config);

                if(borderObj) {
                    borderObj.borderStyle = 'solid';
                    if(skinObj.rule) {
                        $KU.each(borderObj, function(value, keey) {
                            skinObj.rule.style[keey] = value;
                        });
                    } else {
                        $KD.style(skinObj.el, borderObj);
                    }
                } else {
                    //todo
                }
            },

            fonts: function(skinObj) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom, $KU = $K.utils, $KW = $K.widget, fontObj,
                    widgets = ['FlexScrollContainer', 'FlexContainer', 'Form2', 'Map', 'Video', 'Browser'];

                if(skinObj.model
                && widgets.indexOf($KW.name(skinObj.model)) !== -1) {
                    return;
                }

                fontObj= $KW.skinUtils.font(skinObj.config);

                if(fontObj) {
                    if(skinObj.rule) {
                        $KU.each(fontObj, function(value, keey) {
                            skinObj.rule.style[keey] = value;
                        });
                    } else {
                        $KD.style(skinObj.el, fontObj);
                    }
                } else {
                    //todo
                }
            },

            shadow: function(skinObj) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom, $KW = $K.widget, value;

                value = $KW.skinUtils.prepareShadowStyle(skinObj.config);

                if(value) {
                    if(skinObj.rule) {
                        skinObj.rule.style.boxShadow = value;
                    } else {
                        $KD.style(skinObj.el, 'boxShadow', value);
                    }
                } else {
                    //todo
                }
            },

            textShadow: function(skinObj) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom, $KW = $K.widget,
                    value = '';

                if(skinObj.model
                && ['Label', 'Button'].indexOf($KW.name(skinObj.model)) === -1) {
                    return;
                }

                value = $KW.skinUtils.prepareTextShadowStyle(skinObj.config);

                if(value) {
                    if(skinObj.rule) {
                        skinObj.rule.style.textShadow = value;
                    } else {
                        $KD.style(skinObj.el, 'textShadow', value);
                    }
                } else {
                    //todo
                }
            }
        };
    };


    var _skinUtils = {
        background: function(config) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
                bgType = config.backgroundType, background = null;

            if($KU.is(config, 'skinningConstant')) {
                background = $KW.skinUtils.processColorValue(config);
            } else {
                if(bgType === voltmx.skin.BACKGROUND_TYPE_SINGLE_COLOR && config.backgroundColor) {
                    background = $KW.skinUtils.processColorValue(config.backgroundColor);
                } else if(bgType === voltmx.skin.BACKGROUND_TYPE_IMAGE && config.backgroundImage) {
                    background = 'url("' + $KU.getImageURL(config.backgroundImage) + '")';
                } else if(bgType === voltmx.skin.BACKGROUND_TYPE_MULTI_STEP_GRADIENT) {
                    background = $KW.skinUtils.msGradient(config);
                } else if(bgType === voltmx.skin.BACKGROUND_TYPE_TWO_STEP_GRADIENT) {
                    background = $KW.skinUtils.twoStepGradient(config);
                }
            }

            return background;
        },

        border: function(config) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
                border = {}, sknConst = '',

                borderSpecificSkinConstants = function(sknConst, border) {
                    var $K = voltmx.$kwebfw$, $KW = $K.widget;

                    if($KW.skinUtils.getConstantValue(sknConst+'-border-top')) {
                        border.borderTop = 'var(--'+sknConst+'-border-top)';
                    }
                    if($KW.skinUtils.getConstantValue(sknConst+'-border-bottom')) {
                        border.borderBottom = 'var(--'+sknConst+'-border-bottom)';
                    }
                    if($KW.skinUtils.getConstantValue(sknConst+'-border-left')) {
                        border.borderLeft = 'var(--'+sknConst+'-border-left)';
                    }
                    if($KW.skinUtils.getConstantValue(sknConst+'-border-right')) {
                        border.borderRight = 'var(--'+sknConst+'-border-right)';
                    }
                    if($KW.skinUtils.getConstantValue(sknConst+'-border-top-left-radius')) {
                        border.borderTopLeftRadius = 'var(--'+sknConst+'-border-top-left-radius)';
                    }
                    if($KW.skinUtils.getConstantValue(sknConst+'-border-top-right-radius')) {
                        border.borderTopRightRadius = 'var(--'+sknConst+'-border-top-right-radius)';
                    }
                    if($KW.skinUtils.getConstantValue(sknConst+'-border-bottom-left-radius')) {
                        border.borderBottomLeftRadius = 'var(--'+sknConst+'-border-top-left-radius)';
                    }
                    if($KW.skinUtils.getConstantValue(sknConst+'-border-bottom-right-radius')) {
                        border.borderBottomRightRadius = 'var(--'+sknConst+'-border-bottom-right-radius)';
                    }
                };

            if($KU.is(config, 'skinningConstant')) {
                sknConst = config.substring(1);
                if($KW.skinUtils.getConstantValue(sknConst)) {
                    border.border = 'var(--'+sknConst+')';
                    if($KW.skinUtils.getConstantValue(sknConst+'-border-radius')) {
                        border.borderRadius = 'var(--'+sknConst+'-border-radius)';
                    } else {
                        border.borderRadius = '';
                        border.borderTopLeftRadius = '';
                        border.borderTopRightRadius = '';
                        border.borderBottomLeftRadius = '';
                        border.borderBottomRightRadius = '';
                    }
                } else {
                    borderSpecificSkinConstants(sknConst, border);
                }
            } else {
                if(config.borderType === voltmx.skin.BORDER_TYPE_SINGLE_COLOR && config.borderColor) {
                    border.borderColor = $KW.skinUtils.processColorValue(config.borderColor);
                }

                if($KU.is(config.borderWidth, 'number')) {
                    border.borderWidth = config.borderWidth + 'px';
                } else if($KU.is(config.borderWidth, 'string')) {
                    border.borderWidth = config.borderWidth;
                } else if($KU.is(config.borderWidth, 'object')) {
                    border.borderWidth
                        = (config.borderWidth.top || 0) + 'px'
                        + ' ' + (config.borderWidth.right || 0) + 'px'
                        + ' ' + (config.borderWidth.bottom || 0) + 'px'
                        + ' ' + (config.borderWidth.left || 0) + 'px';
                }

                if($KU.is(config.cornerRadius, 'number')) {
                    border.borderRadius = config.cornerRadius + 'px';
                } else if($KU.is(config.cornerRadius, 'string')) {
                    border.borderRadius = config.cornerRadius;
                } else if($KU.is(config.cornerRadius, 'object')) {
                    border.borderRadius
                        = (config.cornerRadius.top || 0) + 'px'
                        + ' ' + (config.cornerRadius.right || 0) + 'px'
                        + ' ' + (config.cornerRadius.bottom || 0) + 'px'
                        + ' ' + (config.cornerRadius.left || 0) + 'px';
                }
            }
            return border;
        },

        font: function(config) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
                baseFont, font = {}, skinConst = '', constVal = '';

            if($KU.is(config, 'skinningConstant')) {
                skinConst = config.substring(1);
                font.color = 'var(--'+skinConst+'-font-color)';
                font.fontFamily = 'var(--'+skinConst+'-font-family)';
                font.fontSize = 'var(--'+skinConst+'-font-size)';
                constVal = $KW.skinUtils.getConstantValue(skinConst+'-font-style').trim();
                if(constVal === voltmx.skin.FONT_STYLE_UNDERLINE) {
                    font.textDecoration = 'var(--'+skinConst+'-font-style)';
                    font.fontStyle = '';
                } else {
                    font.fontStyle = 'var(--'+skinConst+'-font-style)';
                    font.textDecoration = '';
                }
                font.fontWeight = 'var(--'+skinConst+'-font-weight)';
            } else {
                if($KW.skinUtils.validColorValue(config.fontColor)) {
                    font.color = $KW.skinUtils.processColorValue(config.fontColor);
                }

                if($KU.is(config.fontFamily, 'string')) {
                    font.fontFamily = $KW.skinUtils.processFontFamily(config.fontFamily);
                }

                if($KU.is(config.fontSize, 'number')) {
                    baseFont = $KW.skinUtils.getBaseFontSize();
                    font.fontSize = Math.round((config.fontSize * baseFont) /100) + 'px';
                }

                if($KU.is(config.fontStyle, 'string')) {
                    if(config.fontStyle === voltmx.skin.FONT_STYLE_UNDERLINE) {
                        font.textDecoration = config.fontStyle;
                        font.fontStyle = '';//need to test
                    } else {
                        font.fontStyle = config.fontStyle;
                    }
                }

                if($KU.is(config.fontWeight, 'string')) {
                    font.fontWeight = config.fontWeight;
                }
            }

            return font;
        },

        getBaseFontSize: function() {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, $KA = $K.app,
                stylesheet = null, rules, baseFontSize = 16;

            stylesheet = $KU.getThemeStyleSheet($KA.currentTheme);

            if(stylesheet) {
                rules = stylesheet.cssRules || stylesheet.rules;
                $KU.each(rules, function(rule) {
                    if(rule.selectorText === '.voltmxcustomcss') {
                        baseFontSize = parseInt(rule.style.fontSize);
                        return true;
                    }
                });
            }

            return baseFontSize;
        },

        getConstantValue: function(constant) {
            var $K = voltmx.$kwebfw$, $KD = $K.dom, el = document.documentElement,
                value = '';

            value = $KD.style(el, '--'+constant);

            return value;
        },

        msGradient: function(config) {
            var $K = voltmx.$kwebfw$, i = 0, $KW = $K.widget,
                msColor = config.backgroundColorMultiStepGradient, gradient;

            if(msColor) {
                gradient = 'to ' + ['top', 'right', 'bottom', 'left'][[
                    voltmx.skin.MULTI_STEP_GRADIENT_TYPE_TO_BOTTOM,
                    voltmx.skin.MULTI_STEP_GRADIENT_TYPE_TO_LEFT,
                    voltmx.skin.MULTI_STEP_GRADIENT_TYPE_TO_TOP,
                    voltmx.skin.MULTI_STEP_GRADIENT_TYPE_TO_RIGHT
                ].indexOf(msColor.gradientType)] + ', ';

                for(i=0; i<msColor.colors.length && i<msColor.colorStops.length; i++) {
                    gradient += $KW.skinUtils.processColorValue(msColor.colors[i]) +' '+ msColor.colorStops[i]+'%,';
                }

                if(gradient.trim().endsWith(',')) {
                    gradient= gradient.substring(0, gradient.lastIndexOf(','));
                }

                return 'linear-gradient(' + gradient + ')';
            }
        },

        prepareTextShadowStyle: function(config) {
            var $K = voltmx.$kwebfw$, $KW = $K.widget, $KU = $K.utils,
                style = '', shadowColor = config.textShadowColor || '#000000',
                shadowRadius = '', shadowOffsetX = '', shadowOffsetY = '';

            if($KU.is(config, 'skinningConstant')) {
                style = 'var(--'+config.substring(1)+')';
            } else {
                if(config.textShadowOffset) {
                    shadowRadius = (config.textShadowRadius || 0) + 'px';

                    shadowOffsetX = config.textShadowOffset.x + 'px';
                    shadowOffsetY = config.textShadowOffset.y + 'px';

                    if($KW.skinUtils.validColorValue(config.textShadowColor)) {
                        shadowColor = $KW.skinUtils.processColorValue(config.textShadowColor);
                    } else {
                        shadowColor = $KW.skinUtils.processColorValue(shadowColor);
                    }

                    style = shadowOffsetX + ' ' + shadowOffsetY + ' ' + shadowRadius + ' ' + shadowColor;
                }
            }

            return style;
        },

        prepareShadowStyle: function(config) {
            var $K = voltmx.$kwebfw$, $KW = $K.widget, $KU = $K.utils,
                style = '', shadowColor = config.shadowColor || '#000000',
                shadowRadius = '', shadowOffsetX = '', shadowOffsetY = '';

            if($KU.is(config, 'skinningConstant')) {
                style = 'var(--'+config.substring(1)+')';
            } else {
                if(config.shadowOffset) {
                    shadowRadius = (config.shadowRadius || 0) + 'px';

                    if(config.shadowOffset) {
                        shadowOffsetX = config.shadowOffset.x + 'px';
                        shadowOffsetY = config.shadowOffset.y + 'px';
                    }

                    if($KW.skinUtils.validColorHexValue(config.shadowColor)) {
                        shadowColor = $KW.skinUtils.processColorValue(config.shadowColor);
                    } else {
                        shadowColor = $KW.skinUtils.processColorValue(shadowColor);
                    }

                    style = shadowOffsetX + ' ' + shadowOffsetY + ' ' + shadowRadius + ' ' + shadowColor;
                }
            }
            return style;
        },

        stringifyAnchorPoint: function(value) {
            var x = '', y = '';
            x = ((value.x * 100) + '%');
            y = ((value.y * 100) + '%');

            return x+' '+y;
        },

        stringifyTrasnsform:  function(value) {
            var transform = '', t = '';

            if(value) {
                t = value.transform;

                //Order of these IF condition is important
                if(t.perspective) {
                    transform += t.perspective;
                }
                if(t.scale) {
                    transform += (transform) ? (' '+t.scale) : t.scale;
                }
                if(t.translate) {
                    transform += (transform) ? (' '+t.translate) : t.translate;
                }
                if(t.rotate) {
                    transform += (transform) ? (' '+t.rotate) : t.rotate;
                }
            }

            return transform;
        },

        twoStepGradient: function(config) {
            var $K = voltmx.$kwebfw$, bottomcolor = '', gradient = null, topcolor = '',
                tsColor = config.backgroundColorTwoStepGradient, $KW = $K.widget, percentage = null;

            if(tsColor) {
                percentage = (tsColor.style === voltmx.skin.TWO_STEP_GRADIENT_STYLE_VERTICAL_SPLIT
                || tsColor.style === voltmx.skin.TWO_STEP_GRADIENT_STYLE_HORIZONTAL_SPLIT) ? '50%' : '';

                topcolor = $KW.skinUtils.processColorValue(tsColor.topColor);
                bottomcolor = $KW.skinUtils.processColorValue(tsColor.bottomColor);

                gradient = 'to ' + ['bottom', 'bottom', 'right', 'right'][[
                    voltmx.skin.TWO_STEP_GRADIENT_STYLE_VERTICAL_GRADIENT,
                    voltmx.skin.TWO_STEP_GRADIENT_STYLE_VERTICAL_SPLIT,
                    voltmx.skin.TWO_STEP_GRADIENT_STYLE_HORIZONTAL_GRADIENT,
                    voltmx.skin.TWO_STEP_GRADIENT_STYLE_HORIZONTAL_SPLIT
                ].indexOf(tsColor.style)] + ', ';

                gradient += topcolor+ ' '+ percentage +',' + bottomcolor + ' '+ percentage;

                return 'linear-gradient(' + gradient + ')';
            }
        },

        validColorHexValue: function(value) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

            if($KU.is(value, 'string')) {
                value = value.toUpperCase();

                flag = $KU.is(value, 'color');
            }

            return (flag ? [value, flag] : flag);
        },

        validColorValue: function(value) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget, flag = false;

            if($KW.skinUtils.validColorHexValue(value) || $KU.is(value, 'null') || $KU.is(value, 'skinningConstant')) {
                flag = true;
            }

            return flag;
        },

        processColorValue: function(value) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
                processedValue = '';

            if($KU.is(value, 'skinningConstant')) {
                processedValue = 'var(--' + value.substring(1) +')';
            } else if($KW.skinUtils.validColorHexValue(value)) {
                processedValue = $KU.convertHexToRGBA(value);
            }

            return processedValue;
        },

        processFontFamily: function(value) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils,
                processedValue = '';

            if($KU.is(value, 'skinningConstant')) {
                processedValue = 'var(--' + value.substring(1) +')';
            } else {
                processedValue = value;
            }

            return processedValue;
        }
    };


    var _removeSensitiveText = function $KW_removeSensitiveText(model) {
        var $K = voltmx.$kwebfw$, $KW = $K.widget;

        $KW.iterate(model, function(widget) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, templates = null;

            if($KU.is(widget, 'widget', 'SegmentedUI2')
            || $KU.is(widget, 'widget', 'CollectionView')) {
                if($KU.is(widget, 'widget', 'SegmentedUI2')) {
                    templates = widget._kwebfw_.rows;
                } else {
                    templates = widget._kwebfw_.items;
                }

                $KU.each(templates, function(widgetRef) {
                    var $K = voltmx.$kwebfw$, $KW = $K.widget;
                    $KW.iterate(widgetRef, function(widgetModel) {
                        _removeSensitiveTextFromHeap(widgetModel);
                    });
                });
            } else {
                _removeSensitiveTextFromHeap(widget);
            }
        });
    };

    var _removeSensitiveTextFromHeap = function $KW_removeSensitiveTextFromHeap(widget) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;
        if($KU.is(widget, 'widget', 'TextBox2')
        || $KU.is(widget, 'widget', 'TextArea2')) {
            if(widget.isSensitiveText) {
                widget.text = '';
            }
        }
    };

    var _tabIndex = function $KW_tabIndex(model, clone) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
            a11y = null, tabindex = '', rmodel = null, _ = null;

        model = $KW.model(model);

        if(model) {
            _ = model._kwebfw_;
            tabindex = _.tabIndex;
            if(!$KU.is(clone, 'boolean')) clone = false;

            //START:: Override with a11ARIA.tabindex value
            a11y = model.accessibilityConfig;
            a11y = (a11y) ? a11y.a11yARIA : null;

            if(a11y && $KU.is(a11y.tabindex, 'integer')) {
                tabindex = a11y.tabindex;
            }
            //END:: Override with a11ARIA.tabindex value

            //START:: set to 0 if a11y is defined and no tabindex exisits.
            if(!$KU.is(tabindex, 'integer') && model.accessibilityConfig) {
                tabindex = 0;
            }
            //END:: set to 0 if a11y is defined and no tabindex exisits.

            //START:: Deducing with other widget heuristic
            if(!$KU.is(tabindex, 'integer')) {
                if($KU.is(model.onClick, 'function')) {
                    tabindex = 0;
                } else {
                    rmodel = _fmodel(model); //Here rmodel is fmodel
                    if(rmodel && model === rmodel._kwebfw_.modalContainer) {
                        tabindex = 0;
                    }
                }
            }
            //END:: Deducing with other widget heuristic


            //START:: Override if widget belongs to any owner widget
            if($KU.is(tabindex, 'integer') && _.is.cloned && !clone) {
                rmodel = _rmodel(model);
                rmodel = (rmodel) ? rmodel._kwebfw_ : null;

                if(rmodel && rmodel.is.cloned && rmodel.is.template) {
                    tabindex = $KU.is(_.tabIndex, 'integer') ? -1 : '';
                }
            }
            //END:: Override if widget belongs to any owner widget
        }

        return tabindex;
    };


    var _tmodel = function $KW_tmodel(model) {
        var $K = voltmx.$kwebfw$, $KW = $K.widget, tmodel = null;

        model = $KW.model(model);

        if(model) {
            tmodel = (model._kwebfw_.is.template)
                ? model : _rmodel(_pmodel(model));

            while(tmodel && !tmodel._kwebfw_.is.template) {
                tmodel = _rmodel(_pmodel(tmodel));
            }
        }

        return tmodel;
    };


    var _toggleChildren = function $KW_toggleChildren(model) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom,
            _ = model._kwebfw_, dom = _.view, disabled = _.disabled,
            shouldBeDisabled = ['BUTTON', 'FIELDSET', 'INPUT', 'OPTGROUP', 'OPTION', 'OBJECT', 'SELECT', 'TEXTAREA', 'A', 'AREA', 'IFRAME', 'DETAILS', 'AUDIO', 'VIDEO', '[tabindex]', '[voltmx-bkp-tabindex]'],
            listOfElements = dom.querySelectorAll(shouldBeDisabled);

        $KU.each(listOfElements, function(item) {
            var $K = voltmx.$kwebfw$, $KD = $K.dom, disabled = model._kwebfw_.disabled;

            if(disabled) {
                if($KD.hasAttr(item, 'tabindex')) {
                    $KD.setAttr(item, 'voltmx-bkp-tabindex', $KD.getAttr(item, 'tabindex'));
                    $KD.removeAttr(item, 'tabindex');
                }

                if(['BUTTON', 'FIELDSET', 'INPUT', 'OPTGROUP', 'OPTION', 'SELECT', 'TEXTAREA'].indexOf(item.tagName) >= 0) {
                    if($KD.hasAttr(item, 'disabled')) {
                        $KD.setAttr(item, 'voltmx-bkp-disabled', 'disabled');
                    } else {
                        $KD.setAttr(item, 'voltmx-dev-disabled', 'disabled');
                    }
                    $KD.setAttr(item, 'disabled', 'disabled');
                } else if(['A', 'AREA', 'IFRAME', 'DETAILS'].indexOf(item.tagName) >= 0) {
                    $KD.setAttr(item, 'tabindex', -1);
                    $KD.setAttr(item, 'voltmx-dev-tabindex', -1);
                }
            } else {
                if(['BUTTON', 'FIELDSET', 'INPUT', 'OPTGROUP', 'OPTION', 'SELECT', 'TEXTAREA'].indexOf(item.tagName) >= 0) {
                    if($KD.hasAttr(item, 'voltmx-dev-disabled')) {
                        $KD.removeAttr(item, 'disabled');
                        $KD.removeAttr(item, 'voltmx-dev-disabled');
                    } else if($KD.hasAttr(item, 'voltmx-bkp-disabled')) {
                        $KD.setAttr(item, 'disabled', $KD.getAttr(item, 'voltmx-bkp-disabled'));
                        $KD.removeAttr(item, 'voltmx-bkp-disabled');
                    }
                } else if(['A', 'AREA', 'IFRAME', 'DETAILS'].indexOf(item.tagName) >= 0) {
                    if($KD.hasAttr(item, 'voltmx-dev-tabindex')) {
                        $KD.removeAttr(item, 'tabindex');
                        $KD.removeAttr(item, 'voltmx-dev-tabindex');
                    }
                }

                if($KD.hasAttr(item, 'voltmx-bkp-tabindex')) {
                    $KD.setAttr(item, 'tabindex', $KD.getAttr(item, 'voltmx-bkp-tabindex'));
                    $KD.removeAttr(item, 'voltmx-bkp-tabindex');
                }
            }
        });

        if(disabled) {
            $KD.addCls(dom, '-voltmx-blocker');
        } else {
            $KD.removeCls(dom, '-voltmx-blocker');
        }
    };


    var _tpmodel = function $KW_tpmodel(model) {
        var $K = voltmx.$kwebfw$, $KW = $K.widget, _ = null, tpmodel = null;

        model = $KW.model(model);

        if(model) {
            tpmodel = (model._kwebfw_.is.tab && model._kwebfw_.tpid)
                ? model : _rmodel(_pmodel(model));
            _ = (tpmodel) ? tpmodel._kwebfw_ : null;

            while(tpmodel && !(_.is.tab && _.tpid)) {
                tpmodel = _rmodel(_pmodel(tpmodel));
                _ = (tpmodel) ? tpmodel._kwebfw_ : null;
            }

            if(_ && _.is.tab && _.tpid) {
                tpmodel = $KW.model(_.tpid);
            }
        }

        return tpmodel;
    };


    var _updateModalContainer = function $KW_updateModalContainer(fmodel, modalContainer) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
            $KA = $K.app, cf = $KW.model($KA.currentFormUID);

        if($KU.is(fmodel, 'widget', 'Form2') && fmodel === cf) {
            if($KU.is(modalContainer, 'null')
            || $KU.is(modalContainer, 'widget', 'component')
            || $KU.is(modalContainer, 'widget', 'FlexContainer')
            || $KU.is(modalContainer, 'widget', 'FlexScrollContainer')) {
                if(modalContainer !== fmodel._kwebfw_.modalContainer) {
                    fmodel._kwebfw_.modalContainer = modalContainer;

                    _iterate(fmodel, function(widget) {
                        var _ = widget._kwebfw_, dom = null;

                        if(!modalContainer) {
                            _.inModalContainer = true;
                        } else if(fmodel === widget) {
                            _.inModalContainer = false;
                        } else if(modalContainer === widget) {
                            _.inModalContainer = true;
                        } else if(_pmodel(widget)._kwebfw_.inModalContainer) {
                            _.inModalContainer = true;
                        } else {
                            _.inModalContainer = false;
                        }

                        if(_.view) {
                            dom = _focusableElement(widget);
                            _setupUIInteraction(widget, dom);
                        }
                    }, {tabs:false});

                    modalContainer && _focus(modalContainer);
                }
            }
        }
    };


    var _updateScroll = function $KW_updateScroll(model) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom,
            scroll = model._kwebfw_.ui.scroll, el = _el(model), size = -1;

        if(!scroll || $KU.scrollType() === 'native') return;

        //Calculate scroll.width and scroll.height if any of their value is -1
        //The same IF BLOCK is there in "voltmxwidget.js" file "_scrollTo" function
        if((scroll.width === -1 || scroll.height === -1)
        && el.viewport && $KD.contains($KD.body(), el.viewport)) {
            if(scroll.width === -1) {
                size = el.scrolee.offsetWidth;
                scroll.width = Math.max(el.scrolee.scrollWidth, size);
                el.viewport.setAttribute('k_offset_width', size);
                el.viewport.setAttribute('k_scroll_width', scroll.width);
                if(el.hScroll) scroll.hmin = el.hScroll.offsetHeight;
                scroll.maxX = scroll.width - size;
                scroll.maxX = (scroll.maxX > 0) ? scroll.maxX : 0;

                scroll.hsize = (size / scroll.width) * size;
                if(scroll.hsize < scroll.hmin) scroll.hsize = scroll.hmin;

                if(el.hScroll) {
                    if(scroll.hsize === size) {
                        el.hScroll.style.height = '0px';
                        el.hScroll.style.border = 'none';
                    } else {
                        el.hScroll.style.removeProperty('height');
                        el.hScroll.style.removeProperty('border');
                    }
                }

                scroll.hmax = size - scroll.hsize;
            }

            if(scroll.height === -1) {
                size = el.scrolee.offsetHeight;
                scroll.height = Math.max(el.scrolee.scrollHeight, size);
                el.viewport.setAttribute('k_offset_height', size);
                el.viewport.setAttribute('k_scroll_height', scroll.height);
                if(el.vScroll) scroll.vmin = el.vScroll.offsetWidth;
                scroll.maxY = scroll.height - size;
                scroll.maxY = (scroll.maxY > 0) ? scroll.maxY : 0;

                scroll.vsize = (size / scroll.height) * size;
                if(scroll.vsize < scroll.vmin) scroll.vsize = scroll.vmin;

                if(el.vScroll) {
                    if(scroll.vsize === size) {
                        el.vScroll.style.width = '0px';
                        el.vScroll.style.border = 'none';
                    } else {
                        el.vScroll.style.removeProperty('width');
                        el.vScroll.style.removeProperty('border');
                    }
                }

                scroll.vmax = size - scroll.vsize;
            }
        }
    };


    var _visible = function $KW_visible(model) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget, rmodel = null,
            omodel = null, tpmodel = null, invisible = null, activeTabs = null;

        model = $KW.model(model);
        rmodel = (model) ? $KW.rmodel(model) : null;
        omodel = (model) ? $KW.omodel(model) : null;
        tpmodel = (model) ? $KW.tpmodel(model) : null;

        if(model) {
            invisible = $KW.closest(model, function(widget) {
                return (!widget.isVisible) ? true : null;
            }, {owner:true, tabs:true});

            if(!invisible) {
                if(omodel) {
                    invisible = $KW.closest(omodel, function(widget) {
                        return (!widget.isVisible) ? true : null;
                    }, {owner:true, tabs:true});
                } else if(tpmodel) {
                    activeTabs = [];

                    $KU.each(tpmodel.activeTabs, function(pos) {
                        activeTabs.push(this._kwebfw_.tabs[pos].id);
                    }, tpmodel);

                    if(activeTabs.indexOf(rmodel.id) === -1) {
                        invisible = true;
                    } else {
                        invisible = $KW.closest(tpmodel, function(widget) {
                            return (!widget.isVisible) ? true : null;
                        }, {owner:true, tabs:true});
                    }
                }
            }
        }

        return (invisible) ? false : true;
    };


    var _normalizeGroupMasterData = function $KW_normalizeGroupMasterData(model) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, data = model._kwebfw_.prop.masterData;

        if(data) {
            $KU.each(data, function(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, keey = value[0];

                if($KU.is(keey, 'integer')) {
                    value[0] = (''+keey);
                } else if(!$KU.is(keey, 'string')) {
                    throw new Error('Invalid value passed to property <masterData> of widget <'+ this._kwebfw_.ns+'>.');
                }
            }, model);
        }
    };


    var _normalizeGroupMasterDataMap = function $KW_normalizeGroupMasterDataMap(model) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, data = model._kwebfw_.prop.masterDataMap;

        if(data) {
            $KU.each(data[0], function(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, keey = value[data[1]];

                if($KU.is(keey, 'integer')) {
                    value[data[1]] = (''+keey);
                } else if(!$KU.is(keey, 'string')) {
                    throw new Error('Invalid value passed to property <masterDataMap> of widget <'+ this._kwebfw_.ns+'>.');
                }
            }, model);
        }
    };


    $K.defVoltmxProp(_ns, [
        {keey:'accessibility', value:_accessibility},
        {keey:'addSkin', value:_addSkin},
        {keey:'addToView', value:_addToView},
        {keey:'applyGroupA11Y', value:_applyGroupA11Y},
        {keey:'auditFakeBorders', value:_auditFakeBorders},
        {keey:'auditFlexDetails', value:_auditFlexDetails},
        {keey:'auditModelAnomalies', value:_auditModelAnomalies},
        {keey:'children', value:_children},
        {keey:'clearGroupA11y', value:_clearGroupA11y},
        {keey:'cloneTemplate', value:_cloneTemplate},
        {keey:'closest', value:_closest},
        {keey:'closestScrollableWidget', value:_closestScrollableWidget},
        {keey:'cmodel', value:_cmodel},
        {keey:'component', value:_component},
        {keey:'contains', value:_contains},
        {keey:'deduceModalContainer', value:_deduceModalContainer},
        {keey:'details', value:_details},
        {keey:'disabled', value:_disabled},
        {keey:'dismissPickers', value:_dismissPickers},
        {keey:'dismissPicker', value:_dismissPicker},
        {keey:'el', value:_el},
        {keey:'evaluateScrollPosition', value:_evaluateScrollPosition},
        {keey:'fire', value:_fire},
        {keey:'fmodel', value:_fmodel},
        {keey:'focus', value:_focus},
        {keey:'focusableElement', value:_focusableElement},
        {keey:'getContentOffsetValues', value:_getContentOffsetValues},
        {keey:'getAccessibilityConfig', value:_getAccessibilityConfig},
        {keey:'getDefaultHeight', value:_getDefaultHeight},
        {keey:'getDefaultWidth', value:_getDefaultWidth},
        {keey:'getDefaultProperty', value:_getDefaultProperty},
        {keey:'getFlexProperties', value:_getFlexProperties},
        {keey:'getGroupSelectedKeyValueByKey', value:_getGroupSelectedKeyValueByKey},
        {keey:'getModelByNode', value:_getModelByNode},
        {keey:'getModelByPath', value:_getModelByPath},
        {keey:'getNonConstructorProperties', value:_getNonConstructorProperties},
        {keey:'getTemplate', value:_getTemplate},
        {keey:'getWidgetDataMapPath', value:_getWidgetDataMapPath},
        {keey:'handleTabPaneEnablement', value:_handleTabPaneEnablement},
        {keey:'hmodel', value:_hmodel},
        {keey:'holder', value:_holder},
        {keey:'inComponent', value:_inComponent},
        {keey:'index', value:_index},
        {keey:'inheritedProperties', value:_inheritedProperties},
        {keey:'inModalContainer', value:_inModalContainer},
        {keey:'inPercent', value:_inPercent},
        {keey:'inTemplate', value:_inTemplate},
        {keey:'interactable', value:_interactable},
        {keey:'invokeLifeCycleEvent', value:_invokeLifeCycleEvent},
        {keey:'isClonable', value:_isClonable},
        {keey:'isContainer', value:_isContainer},
        {keey:'isFixedHeight', value:_isFixedHeight},
        {keey:'isFixedHeightWidget', value:_isFixedHeightWidget},
        {keey:'isFixedWidth', value:_isFixedWidth},
        {keey:'isFixedWidthWidget', value:_isFixedWidthWidget},
        {keey:'isFlexContainer', value:_isFlexContainer},
        {keey:'isFlexPropertyDefined', value:_isFlexPropertyDefined},
        {keey:'isFlexWidget', value:_isFlexWidget},
        {keey:'isGreedyWidget', value:_isGreedyWidget},
        {keey:'isImplicitHeight', value:_isImplicitHeight},
        {keey:'isImplicitWidth', value:_isImplicitWidth},
        {keey:'isOwnerWidget', value:_isOwnerWidget},
        {keey:'isRendered', value:_isRendered},
        {keey:'isResponsiveContainer', value:_isResponsiveContainer},
        {keey:'isScrollableWidget', value:_isScrollableWidget},
        {keey:'isTemplatable', value:_isTemplatable},
        {keey:'isTextDrivenWidget', value:_isTextDrivenWidget},
        {keey:'iterate', value:_iterate},
        {keey:'layout', value:_layout},
        {keey:'markRelayout', value:_markRelayout},
        {keey:'getRootNode', value:_getRootNode},
        {keey:'modifySelectedIndexes', value:_modifySelectedIndexes},
        {keey:'name', value:_name},
        {keey:'nextVisible', value:_nextVisible},
        {keey:'normalizeGroupMasterData', value:_normalizeGroupMasterData},
        {keey:'normalizeGroupMasterDataMap', value:_normalizeGroupMasterDataMap},
        {keey:'omodel', value:_omodel},
        {keey:'onPropertyChange', value:_onPropertyChange},
        {keey:'onRender', value:_onRender},
        {keey:'pickers', value:_pickers},
        {keey:'pmodel', value:_pmodel},
        {keey:'populateScrollDetails', value:_populateScrollDetails},
        {keey:'prevVisible', value:_prevVisible},
        {keey:'proxy', value:_proxy},
        {keey:'registerForIdleTimeout', value:_registerForIdleTimeout},
        {keey:'registerNativeScrollEvent', value:_registerNativeScrollEvent},
        {keey:'removeAllSkinsFromUI', value:_removeAllSkinsFromUI},
        {keey:'removeMarkedLayout', value:_removeMarkedLayout},
        {keey:'removeSensitiveText', value:_removeSensitiveText},
        {keey:'removeSkin', value:_removeSkin},
        {keey:'removeView', value:_removeView},
        {keey:'replaceWAPIndex', value:_replaceWAPIndex},
        {keey:'rmodel', value:_rmodel},
        {keey:'scrollBy', value:_scrollBy},
        {keey:'scrollElementToParentScroller', value:_scrollElementToParentScroller},
        {keey:'scrollTo', value:_scrollTo},
        {keey:'setFocus', value:_setFocus},
        {keey:'setContentOffset', value:_setContentOffset},
        {keey:'setupUIInteraction', value:_setupUIInteraction},
        {keey:'shouldApplyRTL', value:_shouldApplyRTL},
        {keey:'shouldLazyLoad', value:_shouldLazyLoad},
        {keey:'siblings', value:_siblings},
        {keey:'skinHandlers', value:_skinHandlers},
        {keey:'skinUtils', value:_skinUtils},
        {keey:'tabIndex', value:_tabIndex},
        {keey:'tmodel', value:_tmodel},
        {keey:'toggleChildren', value:_toggleChildren},
        {keey:'tpmodel', value:_tpmodel},
        {keey:'updateModalContainer', value:_updateModalContainer},
        {keey:'updateScroll', value:_updateScroll},
        {keey:'visible', value:_visible}
    ]);


    return _ns;
}())});
