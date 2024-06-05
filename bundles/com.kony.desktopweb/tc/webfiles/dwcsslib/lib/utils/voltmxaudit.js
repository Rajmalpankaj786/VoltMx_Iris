Object.defineProperty(voltmx.$kwebfw$, 'audit', {configurable:false, enumerable:false, writable:false, value:(function() {
    var _ns = {}, $K = voltmx.$kwebfw$;


    //NOT DONE
    function _diagnosis() {
        //
    }


    //NOT DONE
    function _filter(condition, list) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        if(!$KU.is(list, 'array')) {
            //TODO::
        }

        $KU.each(list, function(/*model*/) {
            //TODO::
        });
    }


    //NOT DONE
    function _getAutoGrowWidgetsByComponentID(/*id, type, filterHandler*/) {
        //
    }


    //NOT DONE
    function _getAutoGrowWidgetsByComponentUID(/*uid, type, filterHandler*/) {
        //
    }


    function _getAutoGrowWidgetsByRootID(id, type, filterHandler) {
        var widgets = _getWidgetsByRootID(id, type, '', '', function(model) {
            var $K = voltmx.$kwebfw$, $KW = $K.widget;

            if((!$KW.isFixedHeight(model)
            || !$KW.isFixedWidth(model))
            && filterHandler(model) === true) {
                return true;
            } return false;
        });

        return widgets;
    }


    function _getAutoGrowWidgetsByRootUID(uid, type, filterHandler) {
        var widgets = _getWidgetsByRootUID(uid, type, '', '', function(model) {
            var $K = voltmx.$kwebfw$, $KW = $K.widget;

            if((!$KW.isFixedHeight(model)
            || !$KW.isFixedWidth(model))
            && filterHandler(model) === true) {
                return true;
            } return false;
        });

        return widgets;
    }


    //NOT DONE
    function _getComponents() {
        return []; //TODO::
    }


    //NOT DONE
    function _getComponentsByComponentID(/*id, type, autoHeight, autoWidth, filterHandler*/) {
        //
    }


    //NOT DONE
    function _getComponentsByComponentUID(/*uid, type, autoHeight, autoWidth, filterHandler*/) {
        //
    }


    function _getComponentsByRootID(id, type, autoHeight, autoWidth, filterHandler) {
        var widgets = _getWidgetsByRootID(id, type, autoHeight, autoWidth, function(model) {
            var $K = voltmx.$kwebfw$, $KW = $K.widget;

            if($KW.isComponent(model)
            && filterHandler(model) === true) {
                return true;
            } return false;
        });

        return widgets;
    }


    function _getComponentsByRootUID(uid, type, autoHeight, autoWidth, filterHandler) {
        var widgets = _getWidgetsByRootUID(uid, type, autoHeight, autoWidth, function(model) {
            var $K = voltmx.$kwebfw$, $KW = $K.widget;

            if($KW.isComponent(model)
            && filterHandler(model) === true) {
                return true;
            } return false;
        });

        return widgets;
    }


    function _getForms() {
        var $K = voltmx.$kwebfw$, $KW = $K.widget, $KU = $K.utils, forms = [];

        $KU.each($KW.model(), function(value) {
            if($KW.root(value)
            && value._kwebfw_.is.template !== true
            && value instanceof voltmx.ui.Form2) {
                forms.push(value);
            }
        });

        return forms;
    }


    //NOT DONE
    //NEXT 03
    function _getHiddenWidgetsBeforeAfter(/*before, after, type, autoHeight, autoWidth, filterHandler*/) {
        //
    }


    //NOT DONE
    function _getHiddenWidgetsByComponentID(/*id, type, autoHeight, autoWidth, filterHandler*/) {
        //
    }


    //NOT DONE
    function _getHiddenWidgetsByComponentUID(/*uid, type, autoHeight, autoWidth, filterHandler*/) {
        //
    }


    function _getHiddenWidgetsByRootID(id, type, autoHeight, autoWidth, filterHandler) {
        var widgets = _getWidgetsByRootID(id, type, autoHeight, autoWidth, function(model) {
            var $K = voltmx.$kwebfw$, $KW = $K.widget;

            if($KW.visible(model)
            && filterHandler(model) === true) {
                return true;
            } return false;
        });

        return widgets;
    }


    function _getHiddenWidgetsByRootUID(uid, type, autoHeight, autoWidth, filterHandler) {
        var widgets = _getWidgetsByRootUID(uid, type, autoHeight, autoWidth, function(model) {
            var $K = voltmx.$kwebfw$, $KW = $K.widget;

            if($KW.visible(model)
            && filterHandler(model) === true) {
                return true;
            } return false;
        });

        return widgets;
    }


    function _getTemplates() {
        var $K = voltmx.$kwebfw$, $KW = $K.widget, $KU = $K.utils, templates = [];

        $KU.each($KW.model(), function(value) {
            var $K = voltmx.$kwebfw$, $KW = $K.widget;

            if($KW.root(value)
            && value._kwebfw_.is.template === true
            && value instanceof voltmx.ui.ContainerWidget
            && !(value instanceof voltmx.ui.FlexScrollContainer)
            && !(value instanceof voltmx.ui.Form2)) {
                templates.push(value);
            }
        });

        return templates;
    }


    function _getUIDsByID(arg0) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, ids = [],
            $KW = $K.widget, uids = [], widgets = [];

        if(arguments.length === 1) {
            if($KU.is(arg0, 'array')) {
                ids = arg0;
            } else if($KU.is(arg0, 'string') && arg0) {
                ids = arg0;

                if(ids.indexOf('.') >= 0) {
                    ids = ids.split('.');
                } else if(ids.indexOf('_') >= 0) {
                    ids = ids.split('_');
                } else if(ids[0] === '[' && ids[(ids.length-1)] === ']') {
                    ids = JSON.parse(ids);
                } else {
                    ids = [ids];
                }
            }
        } else ids = arguments;

        $KU.each($KW.model(), function(model) {
            if(model.id === ids[0] && model._kwebfw_.is.template !== true) {
                widgets.push(model);
            }
        });

        ids.splice(0, 1);

        $KU.each(widgets, function(widget) {
            $KU.each(ids, function(value) {
                if($KU.is(widget[value], 'widget')) {
                    widget = widget[value];
                } else {
                    return true;
                }
            });

            if($KU.is(widget, 'widget')) {
                uids.push(widget._kwebfw_.uid);
            }
        });

        return uids;
    }


    //NOT DONE
    //NEXT 01
    function _getWidgetDetails(widgets, arg1) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils,
            details = (arg1 === true) ? {} : [];

        if($KU.is(widgets, 'widget')) widgets = [widgets];

        $KU.each(widgets, function(widget) {
            var $K = voltmx.$kwebfw$, $KW = $K.widget, detail = {},
                rmodel = $KW.rmodel(widget), omodel = $KW.omodel(widget);

            detail.Widget_ID = widget.id;
            detail.Widget_UID = widget._kwebfw_.uid;
            detail.Widget_Type = widget._kwebfw_.name;
            detail.Visible = widget.isVisible;
            detail.Hidden = $KW.visible(widget);
            detail.Cloned = widget._kwebfw_.is.cloned || false;
            detail.Model_Started_At = 0;
            detail.Model_Ended_At = 0;
            detail.Model_Time_Taken = 0;
            detail.View_Started_At = 0;
            detail.View_Ended_At = 0;
            detail.View_Time_Taken = 0;
            detail.Parent_Layout = (($KW.pmodel(widget)) ? $KW.layout($KW.pmodel(widget)) : 'N/A');
            detail.Height = (($KW.isFixedHeight(widget)) ? 'fixed' : 'auto');
            detail.Width = (($KW.isFixedWidth(widget)) ? 'fixed' : 'auto');
            detail.Root_ID = ((rmodel) ? rmodel.id : 'N/A');
            detail.Root_UID = ((rmodel) ? rmodel._kwebfw_.uid : 'N/A');
            detail.Root_Type = ((rmodel) ? rmodel._kwebfw_.name : 'N/A');
            detail.Owner_ID = ((omodel) ? omodel.id : 'N/A');
            detail.Owner_UID = ((omodel) ? omodel._kwebfw_.uid : 'N/A');
            detail.Owner_Type = ((omodel) ? omodel._kwebfw_.name : 'N/A');
            detail.Component_ID = '';
            detail.Component_UID = '';
            detail.Component_Type = '';

            if(details instanceof Array) {
                details.push(detail);
            } else {
                details[detail.Widget_UID] = detail;
            }
        });

        return details;
    }


    //NOT DONE
    //NEXT 02
    function _getWidgetsBeforeAfter(/*before, after, type, autoHeight, autoWidth, filterHandler*/) {
        //
    }


    //NOT DONE
    function _getWidgetsByComponentID(/*id, type, autoHeight, autoWidth, filterHandler*/) {
        //
    }


    //NOT DONE
    function _getWidgetsByComponentUID(/*uid, type, autoHeight, autoWidth, filterHandler*/) {
        //
    }


    function _getWidgetsByID(id, type, autoHeight, autoWidth, filterHandler) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, ret = {};

        $KU.each(_getUIDsByID(id), function(value) {
            ret[value] = _getWidgetsByUID(value, type, autoHeight, autoWidth, filterHandler);
        });

        return ret;
    }


    function _getWidgetsByRootID(id, type, autoHeight, autoWidth, filterHandler) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, roots = [], ret = {};

        if(!$KU.is(id, 'array')) {
            $KU.each(_getForms(), function(value) {
                if(id === '') {
                    roots.push(value.id);
                } else if(value.id === id) {
                    roots.push(value.id);
                    return true;
                }
            });

            if((id === '') || (id !== '' && roots.length === 0)) {
                $KU.each(_getTemplates(), function(value) {
                    if(id === '') {
                        roots.push(value.id);
                    } else if(value.id === id) {
                        roots.push(value.id);
                        return true;
                    }
                });
            }
        } else roots = id;

        $KU.each(roots, function(id) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils;

            $KU.each(_getUIDsByID(id), function(uid) {
                ret[uid] = _getWidgetsByUID(uid, type, autoHeight, autoWidth, filterHandler);
            });
        });

        return ret;
    }


    function _getWidgetsByRootUID(uid, type, autoHeight, autoWidth, filterHandler) {
        var $K = voltmx.$kwebfw$, $KW = $K.widget;

        if($KW.root(uid)) {
            return _getWidgetsByUID(uid, type, autoHeight, autoWidth, filterHandler);
        } return [];
    }


    function _getWidgetsByUID(uid, type, autoHeight, autoWidth, filterHandler) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, widgets = [],
            $KW = $K.widget, widget = $KW.model(uid);

        type = ($KU.is(type, 'string')) ? type : '';
        autoHeight = ($KU.is(autoHeight, 'boolean')) ? autoHeight : '';
        autoWidth = ($KU.is(autoWidth, 'boolean')) ? autoWidth : '';
        filterHandler = ($KU.is(filterHandler, 'function')) ? filterHandler : function() {
            return true;
        };

        if(widget) {
            $KW.iterate(widget, function(model) {
                if(type
                && (autoHeight === true || autoHeight === false)
                && (autoWidth === true || autoWidth === false)) {
                    if(model._kwebfw_.name === type
                    //&&
                    //&&
                    && filterHandler(model) === true) {
                        widgets.push(model);
                    }
                } else if(!type
                && (autoHeight === true || autoHeight === false)
                && (autoWidth === true || autoWidth === false)) {
                    if(//
                    //&&
                    /*&&*/ filterHandler(model) === true) {
                        widgets.push(model);
                    }
                } else if(!(autoHeight === true || autoHeight === false)
                && type
                && (autoWidth === true || autoWidth === false)) {
                    if(model._kwebfw_.name === type
                    //&&
                    && filterHandler(model) === true) {
                        widgets.push(model);
                    }
                } else if(!(autoWidth === true || autoWidth === false)
                && type
                && (autoHeight === true || autoHeight === false)) {
                    if(model._kwebfw_.name === type
                    //&&
                    && filterHandler(model) === true) {
                        widgets.push(model);
                    }
                } else if(type
                && !(autoHeight === true || autoHeight === false)
                && !(autoWidth === true || autoWidth === false)) {
                    if(model._kwebfw_.name === type
                    && filterHandler(model) === true) {
                        widgets.push(model);
                    }
                } else if((autoHeight === true || autoHeight === false)
                && !type
                && !(autoWidth === true || autoWidth === false)) {
                    if(//
                    /*&&*/ filterHandler(model) === true) {
                        widgets.push(model);
                    }
                } else if((autoWidth === true || autoWidth === false)
                && !type
                && !(autoHeight === true || autoHeight === false)) {
                    if(//
                    /*&&*/ filterHandler(model) === true) {
                        widgets.push(model);
                    }
                } else {
                    if(filterHandler(model) === true) {
                        widgets.push(model);
                    }
                }
            }, {tabs:false});
        }

        return widgets;
    }


    //NOT DONE
    function _report() {
        //
    }


    //NOT DONE
    //eslint-disable-next-line no-unused-vars
    function _sort(fields, details) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        if(!$KU.is(details, 'array')) {
            //TODO::
        }

        $KU.each(details, function(/*detail*/) {
            //TODO::
        });
    }


    $K.defVoltmxProp(_ns, [
        {keey:'diagnosis', value:_diagnosis},
        {keey:'filter', value:_filter},
        {keey:'getAutoGrowWidgetsByComponentID', value:_getAutoGrowWidgetsByComponentID},
        {keey:'getAutoGrowWidgetsByComponentUID', value:_getAutoGrowWidgetsByComponentUID},
        {keey:'getAutoGrowWidgetsByRootID', value:_getAutoGrowWidgetsByRootID},
        {keey:'getAutoGrowWidgetsByRootUID', value:_getAutoGrowWidgetsByRootUID},
        {keey:'getComponents', value:_getComponents},
        {keey:'getComponentsByComponentID', value:_getComponentsByComponentID},
        {keey:'getComponentsByComponentUID', value:_getComponentsByComponentUID},
        {keey:'getComponentsByRootID', value:_getComponentsByRootID},
        {keey:'getComponentsByRootUID', value:_getComponentsByRootUID},
        {keey:'getForms', value:_getForms},
        {keey:'getHiddenWidgetsBeforeAfter', value:_getHiddenWidgetsBeforeAfter},
        {keey:'getHiddenWidgetsByComponentID', value:_getHiddenWidgetsByComponentID},
        {keey:'getHiddenWidgetsByComponentUID', value:_getHiddenWidgetsByComponentUID},
        {keey:'getHiddenWidgetsByRootID', value:_getHiddenWidgetsByRootID},
        {keey:'getHiddenWidgetsByRootUID', value:_getHiddenWidgetsByRootUID},
        {keey:'getTemplates', value:_getTemplates},
        {keey:'getWidgetDetails', value:_getWidgetDetails},
        {keey:'getWidgetsBeforeAfter', value:_getWidgetsBeforeAfter},
        {keey:'getWidgetsByComponentID', value:_getWidgetsByComponentID},
        {keey:'getWidgetsByComponentUID', value:_getWidgetsByComponentUID},
        {keey:'getWidgetsByID', value:_getWidgetsByID},
        {keey:'getWidgetsByRootID', value:_getWidgetsByRootID},
        {keey:'getWidgetsByRootUID', value:_getWidgetsByRootUID},
        {keey:'getWidgetsByUID', value:_getWidgetsByUID},
        {keey:'report', value:_report},
        {keey:'sort', value:_sort}
    ]);


    return _ns;
}())});
