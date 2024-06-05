/* global Volt MX */
(function() {
    var _default = {
        caseSensitive: false,
        focusOutInstance: false,
        searchCritaria: voltmx.$kwebfw$.constants.STARTS_WITH,
        icon: 'kdropdownicon.png',
        position: voltmx.$kwebfw$.constants.POSITION_AUTO,
        height: '200px',
        selectedOption: '',
        callback: null,
        selectedSkin: '-voltmx-selected',
        hoverSkin: '-voltmx-hovered',
        focusSkin: '-voltmx-focused'
    },

    _map = {}

    var _attachEvents = function() {
        var $K = voltmx.$kwebfw$, $KD = $K.dom, instance = _map[this.id];

        $KD.on(instance.container, 'click', 'dropdown', _containerOnClick, {scope:this});
        $KD.on(instance.list, 'click', 'dropdown', _listOnClick, {scope:this});
        $KD.on(instance.list, 'mousemove', 'dropdown', _listOnHover, {scope:this});
        $KD.on(instance.input, 'input', 'dropdown', _input, {scope:this});
        $KD.on(instance.container, 'keydown', 'dropdown', _keydown, {scope:this});
        $KD.on(instance.input, 'keydown', 'dropdown', _keydown, {scope:this});

        if(instance.focusOutInstance) {
            $KD.on(instance.container, 'focusout', 'dropdown', _onFocusout, {scope:this});
        }
    },

    _containerOnClick = function(e) {
        var $K = voltmx.$kwebfw$, $KD = $K.dom, instance = _map[this.id];

        if(!$KD.hasCls(instance.container, 'active')){
            this.createOptions();
        }

        if (e.target === instance.input) {
            $KD.toggleCls(instance.container, 'active');
        } else if (e.target === instance.icon) {//todo
            $KD.toggleCls(instance.container, 'active');
            $KD.focus(instance.input);
        }

        if($KD.hasCls(instance.container, 'active')) {
            _setPosition.call(this);
            if(instance.selectedOption) {
                selectedLI = _getSelectedNode.call(this, instance.selectedOption);
                selectedLI && $KD.addCls(selectedLI, instance.selectedSkin);
                selectedLI && $KD.addCls(selectedLI, instance.focusSkin);
                $KD.setAttr(selectedLI, 'isselected', 'true');
                selectedLI.focus();
                instance.input.focus();
                //selectedLI.setAttribute('aria-selected', 'selected');//todo
            }
        }
    },

    _setPosition = function() {
        var $K = voltmx.$kwebfw$, $KD = $K.dom, constants = voltmx.$kwebfw$.constants,
            instance = _map[this.id], position, selectedLI;

        if($KD.hasCls(instance.container, 'active')) {
            if(instance.position === constants.POSITION_AUTO) {
                position = _getPosition(instance.container, instance.list.offsetHeight);
                if(position === constants.POSITION_TOP) {
                    $KD.style(instance.list, 'top', null);
                    $KD.style(instance.list, 'bottom', '100%');
                    $KD.setAttr(instance.container, 'kposition', 'top');
                } else {
                    $KD.style(instance.list, 'bottom', null);
                    $KD.style(instance.list, 'top', '100%');
                    $KD.setAttr(instance.container, 'kposition', 'bottom');
                }
            }
        }
    },

    _dettachEvents = function() {
        var $K = voltmx.$kwebfw$, $KD = $K.dom, instance = _map[this.id];

        $KD.off(instance.container);
        $KD.off(instance.list);
        $KD.off(instance.input);
    },

    _getPosition = function(el, height) {
        var offset = el.getBoundingClientRect(), position = 'top';
        if(window.innerHeight - offset.y - offset.height - height >= 0) {
            position = 'bottom';
        }
        return position;
    },

    _getSelectedNode = function(txt) {
        var $K = voltmx.$kwebfw$, $KD = $K.dom, $KU=$K.utils, instance = _map[this.id], selectedNode = null;

        $KU.each($KD.children(instance.list), function(li) {
            if(li.innerText === txt) {
                selectedNode = li;
            }
        });

        return selectedNode;
    },

    _input = function(e){
        var $K = voltmx.$kwebfw$, $KD = $K.dom, instance = _map[this.id];

        if (!$KD.hasCls(instance.container, 'active')) {
            $KD.addCls(instance.container, 'active');
        }

        this.createOptions(instance.input.value);

        _setPosition.call(this);
    },

    _keydown = function(e){
        var $K = voltmx.$kwebfw$, $KD = $K.dom, instance = _map[this.id],
            kposition = $KD.getAttr(instance.container, 'kposition');

        if(e.keyCode === 40){//down arrow
            if(e.target === instance.input && kposition === 'bottom') {
                $KD.focus(instance.list);
            } else if(e.target === instance.list) {
                if($KD.childAt(instance.list, 0)) {
                    $KD.focus($KD.childAt(instance.list, 0));
                }
            } else {
                $KD.next(e.target) && $KD.focus($KD.next(e.target));
            }
        } else if(e.keyCode === 38){//up arrow
            if(e.target === instance.input && kposition === 'top') {
                $KD.focus(instance.list);
            } else if(e.target === instance.list) {
                $KD.focus(instance.input);
            } else {
                if($KD.prev(e.target)) {
                    $KD.focus($KD.prev(e.target));
                } else {
                    $KD.focus(instance.list);
                }
            }
        } else if((e.keyCode === 13 || e.keyCode === 32) && e.target.tagName === 'LI') {
            _onSelect.call(this, e.target);
        }
    },

    _listOnClick = function(e) {
        _onSelect.call(this, e.target);
    },

   _listOnHover = function(e) {
        var $K = voltmx.$kwebfw$, $KD = $K.dom, instance = _map[this.id], target = e.target,
        relatedNode = instance.relatedNode, hoverSkin = instance.hoverSkin;

        if(relatedNode) {
            $KD.removeCls(relatedNode, hoverSkin);
            if($KD.hasAttr(relatedNode, 'isselected')) {
                $KD.addCls(relatedNode, instance.selectedSkin);
            }

            instance.relatedNode = null;
        }

        if(target.tagName === 'LI') {
            $KD.addCls(target, hoverSkin);
            instance.relatedNode = target;
            if($KD.hasAttr(target, 'isselected')) {
                $KD.removeCls(target, instance.selectedSkin);
            }
        }
   };

    _onFocusout = function(e) {
        var instance = _map[this.id], self = this;

        timeout = setTimeout(function() {
            var $K = voltmx.$kwebfw$, $KD = $K.dom, _ = self._kwebfw_;

            if(instance && !(instance.container === $KD.active() || $KD.contains(instance.container, $KD.active())
            || $KD.parent(instance.container) === $KD.active()) && $KD.hasCls(instance.container, 'active')) {
                $KD.removeCls(instance.container, 'active');
            }

            clearTimeout(timeout); self = timeout = null;
        }, 0);
    };

    _onSelect = function(li) {
        var $K = voltmx.$kwebfw$, $KD = $K.dom, instance = _map[this.id];

        $KD.setAttr(instance.input, 'value', li.innerText);
        $KD.removeCls(instance.container, 'active');

        instance.selectedOption = li.innerText;
        instance.callback && instance.callback.call(this, instance.selectedOption);
    };

    voltmx.$kwebfw$.plugins.DropDown = function(data, config) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom, prop = null;

        this.id = 'K'+$KU.uid();
        if(_map.hasOwnProperty(this.id)) {
            //Throw Error
            return;
        }

        _map[this.id] = {};
        prop = _map[this.id];

        prop.options = data || [];
        config = config || {};

        $KU.each(_default, function(value, key) {
            prop[key] = (config.hasOwnProperty(key)) ? config[key] : value;
        });

        this.init();
        //this.createOptions();

        if(config.renderTo) this.renderTo(config.renderTo);
    };

    voltmx.$kwebfw$.plugins.DropDown.prototype = {
        _get: function(property) {
            return _map[this.id][property];
        },

        createOptions: function(filter) {//need to change the name
            var $K = voltmx.$kwebfw$, $KD = $K.dom, constants = voltmx.$kwebfw$.constants,
                list = null, filterOptions = null, fragment = null, instance = _map[this.id];

            filter = filter || "";
            list = instance.list;

            if(!instance.caseSensitive) {
                filter = filter.toLowerCase();
            }
            filterOptions = instance.options.filter(
                function(option) {
                    //Todo search criteria
                    option = option.toString();//todo
                    if(!instance.caseSensitive) {
                        option = option.toLowerCase();
                    }
                    if(instance.searchCritaria === constants.STARTS_WITH) {
                        return filter === "" || option.substring(0, filter.length) === filter;
                    } else if(instance.searchCritaria === constants.CONTAINS) {
                        return filter === "" || option.indexOf(filter) != -1;
                    } else {
                        return instance.searchCritaria(option, filter);
                    }
                }
            );

            if (filterOptions.length === 0) {
                $KD.removeCls(list, 'active');
            } else {
                $KD.addCls(list, 'active');
            }

            list.innerHTML = '';
            fragment = $KD.create();
            filterOptions.forEach(function(foption){
                var li = $KD.create('LI', {tabIndex: -1, role: 'row', 'aria-colcount': 1});
                li.innerText = foption;
                $KD.add(fragment, li);
            });
            $KD.add(list, fragment);
            $KD.setAttr(list, 'aria-rowcount', filterOptions.length);
        },

        destroy: function() {
            _dettachEvents.call(this);
            delete  _map[this.id];
        },

        disable: function() {
            //
        },

        enable: function() {
            //
        },

        init: function() {
            var $K = voltmx.$kwebfw$, $KD = $K.dom, $KU = $K.utils,
                constants = voltmx.$kwebfw$.constants, instance = _map[this.id];

            instance.container = $KD.create('div');
            instance.input = $KD.create('input', {type: 'text'});
            instance.icon = $KD.create('img', {src: $KU.getImageURL(instance.icon)});
            instance.list = $KD.create('ul', {tabIndex: 1, role: 'grid', 'aria-colcount': 1});

            $KD.add(instance.container, instance.input);
            $KD.add(instance.container, instance.icon);
            $KD.add(instance.container, instance.list);

            $KD.style(instance.list, 'maxHeight', instance.height);
            $KD.setAttr(instance.container, 'kdropdown', true);
            instance.selectedOption && $KD.setAttr(instance.input, 'value', instance.selectedOption);

            if(instance.position === constants.POSITION_TOP) {
                $KD.style(instance.list, 'bottom', '100%');
                $KD.setAttr(instance.container, 'kposition', 'top');
            } else if(instance.position === constants.POSITION_BOTTOM) {
                $KD.style(instance.list, 'top', '100%');
                $KD.setAttr(instance.container, 'kposition', 'bottom');
            } else {//POSITION_AUTO
                //
            }

            _attachEvents.call(this);
        },

        renderTo: function(holder) {
            var $K = voltmx.$kwebfw$, $KD = $K.dom, instance = _map[this.id];

            $KD.add(holder, instance.container);
        }
    };
}());
