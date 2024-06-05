(function() {
    var box_click = function() {
        //deprecated widget
    };
    var $K = voltmx.$kwebfw$;

    var flexcontainer_click = function(widgetPath) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
            node = null, widgetModel = null;

        $KU.log({api:'voltmx.automation.flexcontainer.click', enter:true});
        if(arguments.length !== 1)
            $KAUtils.throwExceptionInsufficientArguments();

        //$KU.logExecutingWithParams('voltmx.automation.flexcontainer.click', widgetPath);
        if(!Array.isArray(widgetPath))
            $KAUtils.throwExceptionInvalidArgumentType();

        widgetModel = $KAUtils.getWidgetModel(widgetPath);
        if(!widgetModel)
            $KAUtils.throwExceptionWidgetPathNotFound();

        if(!$KAUtils.isEventApplicable(widgetModel)) {
            $KU.log('voltmx.automation.flexcontainer.click VIA widget disabled or not visible');
            return;
        }

        node = widgetModel._kwebfw_.view;
        $KU.log({api:'voltmx.automation.flexcontainer.click VIA end of function', exit:true});

        node && node.click();
    };

    var button_click = function(widgetPath) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
            node = null, widgetModel = null;

        $KU.log({api:'voltmx.automation.button.click', enter:true});
        if(arguments.length !== 1)
            $KAUtils.throwExceptionInsufficientArguments();

        if(!Array.isArray(widgetPath))
            $KAUtils.throwExceptionInvalidArgumentType();

        widgetModel = $KAUtils.getWidgetModel(widgetPath);
        if(!widgetModel)
            $KAUtils.throwExceptionWidgetPathNotFound();

        if(!$KAUtils.isEventApplicable(widgetModel)) {
            $KU.log('voltmx.automation.button.click VIA widget disabled or not visible');
            return;
        }

        node = widgetModel._kwebfw_.view;
        $KU.log({api:'voltmx.automation.button.click VIA end of function', exit:true});
        node && node.click();

    };

    var textbox_enterText = function() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils,
        widgetModel = null, widgetPath = arguments[0];


        $KU.log({api:'voltmx.automation.textbox.enterText', enter:true});

        if(arguments.length !== 2 && arguments.length !== 3) 
            $KAUtils.throwExceptionInsufficientArguments();

        if(!$KU.is(widgetPath, 'array'))
            $KAUtils.throwExceptionInvalidArgumentType();

        if(typeof arguments[1] !== 'string' && !$KU.is(arguments[1], 'array')) {
                $KAUtils.throwExceptionInvalidArgumentType();
        }
        if(arguments.length === 3 && !$KU.is(arguments[2], 'object') && typeof arguments[1] !== 'string') {
            $KAUtils.throwExceptionInvalidArgumentType();
        }

        widgetModel = $KAUtils.getWidgetModel(widgetPath);
        if(!widgetModel)
            $KAUtils.throwExceptionWidgetPathNotFound();

        if(!$KAUtils.isEventApplicable(widgetModel)) {
            $KU.log('voltmx.automation.textbox.enterText VIA widget disabled or not visible');
            return;
        }

        if(arguments.length == 2 && typeof arguments[1] == 'string') {
            enterText_withDefaultEvent(widgetModel, arguments[1]);
        } else if(arguments.length == 2 && $KU.is(arguments[1], 'array')) {
            enterText_withCustomEvent(widgetModel, arguments[1]);
        } else if(arguments.length == 3) {
            // TODO:: enterText_withSingleEventObj(widgetModel, arguments[1], arguments[2]);
        }

        $KU.log({api:'voltmx.automation.textbox.enterText VIA end of function', exit:true});
    };

    var enterText_withDefaultEvent = function(widgetModel, item) {
        var $K = voltmx.$kwebfw$, node = null, $KD = $K.dom;

        node = widgetModel._kwebfw_.view;
        node.value = '';
        $KD.fire(node, 'focusin');
        for(var i = 0; i < item.length; i++) {
            node.value += item[i];
            $KD.fire(node, 'input');
            $KD.fire(node, 'keyup');
        }
        $KD.fire(node, 'focusout');
    }

    var enterText_withCustomEvent = function(widgetModel, item) {
        var $K = voltmx.$kwebfw$, node = null, $KD = $K.dom;

        node = widgetModel._kwebfw_.view;
        node.value = '';

        $KD.fire(node, 'focusin');
        for(var i = 0; i < item.length; i++) {
            if(item[i].hasOwnProperty('key')) {
                node.value += item[i].key;
                $KD.fire(node, 'input');
            }
            $KAUtils.fire(node, 'keyup',item[i]);
        }
        $KD.fire(node, 'focusout');
    };

    var textarea_enterText = function(widgetPath, item) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils,
        widgetModel = null, widgetPath = arguments[0];


        $KU.log({api:'voltmx.automation.textarea.enterText', enter:true});

        if(arguments.length !== 2 && arguments.length !== 3) 
            $KAUtils.throwExceptionInsufficientArguments();

        if(!$KU.is(widgetPath, 'array'))
            $KAUtils.throwExceptionInvalidArgumentType();

        if(typeof arguments[1] !== 'string' && !$KU.is(arguments[1], 'array')) {
                $KAUtils.throwExceptionInvalidArgumentType();
        }
        if(arguments.length === 3 && !$KU.is(arguments[2], 'object') && typeof arguments[1] !== 'string') {
            $KAUtils.throwExceptionInvalidArgumentType();
        }

        widgetModel = $KAUtils.getWidgetModel(widgetPath);
        if(!widgetModel) {
            $KAUtils.throwExceptionWidgetPathNotFound();
        }

        if(!$KAUtils.isEventApplicable(widgetModel)) {
            $KU.log('voltmx.automation.textarea.enterText VIA widget disabled or not visible');
            return;
        }

        if(arguments.length == 2 && typeof arguments[1] == 'string') {
            enterText_withDefaultEvent(widgetModel, arguments[1]);
        } else if(arguments.length == 2 && $KU.is(arguments[1], 'array')) {
            enterText_withCustomEvent(widgetModel, arguments[1]);
        } else if(arguments.length == 3) {
            // TODO:: enterText_withSingleEventObj(widgetModel, arguments[1], arguments[2]);
        }

        $KU.log({api:'voltmx.automation.textarea.enterText VIA end of function', exit:true});

    };
    var richtext_click = function(widgetPath, linktext) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
            node = null, widgetModel = null, count =0;


        $KU.log({api:'voltmx.automation.richtext.click', enter:true});
        if(arguments.length !== 2) {
            $KAUtils.throwExceptionInsufficientArguments();
        }

        //$KU.logExecutingWithParams('voltmx.automation.richtext.click', widgetPath, linktext);
        if(!$KU.is(widgetPath, 'array') || !$KU.is(linktext, 'string')) {
            $KAUtils.throwExceptionInvalidArgumentType();
        }

        widgetModel = $KAUtils.getWidgetModel(widgetPath);
        if(!widgetModel) {
            $KAUtils.throwExceptionWidgetPathNotFound();
        }

        if(!$KAUtils.isEventApplicable(widgetModel)) {
            $KU.log({api:'voltmx.automation.richtext.click VIA widget disabled or not visible', exit:true});
            return;
        }

        node = widgetModel._kwebfw_.view;
        $KU.log({api:'voltmx.automation.richtext.click VIA end of function', exit:true});
        if(node.childElementCount != 0) {
            for(var i = 0; i < node.childElementCount; i++) {
                if(node.children[i].innerText == linktext) {
                    count++;
                    node.children[i].click();
                }
            }
        }

        if((count == 0) && node.textContent.indexOf(linktext) != -1) {
            node.click();
        }

    };

    var link_click = function(widgetPath) {
        //Deprecated widget

    };

    var checkboxgroup_click = function(widgetPath, item) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
            node = null, widgetModel = null;


        $KU.log({api:'voltmx.automation.checkboxgroup.click', enter:true});
        if(arguments.length !== 2) {
            $KAUtils.throwExceptionInsufficientArguments();
        }

        //$KU.logExecutingWithParams('voltmx.automation.checkboxgroup.click', widgetPath, item);
        if(!Array.isArray(widgetPath) || typeof item !== 'string') {
            $KAUtils.throwExceptionInvalidArgumentType();
        }

        widgetModel = $KAUtils.getWidgetModel(widgetPath);
        if(!widgetModel) {
            $KAUtils.throwExceptionWidgetPathNotFound();
        }

        node = widgetModel._kwebfw_.view;
        $KU.log({api:'voltmx.automation.checkboxgroup.click', exit:true});
        for(var i = 0; i < node.childElementCount; i++) {
            if(item.indexOf(node.children[i].children[0].value) > -1) {
                node.children[i].children[0].click();
            }
        }

    };
    var radiobuttongroup_click = function(widgetPath, item) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
            node = null, widgetModel = null;

        $KU.log({api:'voltmx.automation.radiobuttongroup.click', enter:true});
        if(arguments.length !== 2)
            $KAUtils.throwExceptionInsufficientArguments();

        //$KU.logExecutingWithParams('voltmx.automation.radiobuttongroup.click', widgetPath, item);
        if(!Array.isArray(widgetPath) || typeof item !== 'string')
            $KAUtils.throwExceptionInvalidArgumentType();

        widgetModel = $KAUtils.getWidgetModel(widgetPath);
        if(!widgetModel)
            $KAUtils.throwExceptionWidgetPathNotFound();

        if(!$KAUtils.isEventApplicable(widgetModel)) {
            $KU.log('voltmx.automation.radiobuttongroup.click VIA widget disabled or not visible');
            return;
        }
        node = widgetModel._kwebfw_.view;

        $KU.log({api:'voltmx.automation.radiobuttongroup.click VIA end of function', exit:true});
        for(var i = 0; i < node.childElementCount; i++) {
            if(item.indexOf(node.children[i].children[0].value) > -1) {
                node.children[i].children[0].click();
            }
        }

    };

    var listbox_selectItem = function(widgetPath, item) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
            node = null, widgetModel = null, $KD = $K.dom;

           $KU.log({api:'voltmx.automation.listbox.selectItem', enter: true});
            if(arguments.length !== 2) {
                $KAUtils.throwExceptionInsufficientArguments();
            }

            //$KU.logExecutingWithParams('voltmx.automation.listbox.selectItem', widgetPath, item);
            if(!Array.isArray(widgetPath) || typeof item !== 'string') {
                $KAUtils.throwExceptionInvalidArgumentType();
            }

            widgetModel = $KAUtils.getWidgetModel(widgetPath);
            if(!widgetModel) {
                $KAUtils.throwExceptionWidgetPathNotFound();
            }

            if(!$KAUtils.isEventApplicable(widgetModel)) {
                $KU.log('voltmx.automation.listbox.selectItem VIA widget disabled or not visible');
                return;
            }

            node = widgetModel._kwebfw_.view;
            $KU.log({api: 'voltmx.automation.listbox.selectItem VIA end of function', exit: true});
            if(widgetModel.viewtype == 'editableview') {
                //TODO: editable view not tested.
                for(var i = 0; i < node.children[2].childElementCount; i++) {
                    if(node.children[2].children[i].getAttribute('value') === item) {
                        node.children[1].click();
                        node.children[2].children[i].click();
                        break;
                    }
                }
            } else {
                for(var i = 0; i < node.childElementCount; i++) {
                    if(node.children[i].selected) {
                        node.children[i].removeAttribute('selected');
                    }
                    if(node.children[i].value === item) {
                        node.children[i].setAttribute('selected', '');
                        $KD.fire(node, "change");
                    }
                }
            }

    };

    var combobox_selectItem = function() {
        //Deprecated widget
    };

    var appmenu_click = function() {
        //Deprecated widget
    };

    var imagegallery_click = function() {
        //Deprecated widget
    };

    var horizontalimagestrip_click = function() {
        //Deprecated widget
    };


    var switch_toggle = function(widgetPath) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
            el = null, widgetModel = null;

        $KU.log({api:'voltmx.automation.switch.toggle', enter: true});
        if(arguments.length !== 1) {
            $KAUtils.throwExceptionInsufficientArguments();
        }

        //$KU.log('voltmx.automation.switch.toggle', widgetPath);
        if(!$KU.is(widgetPath, 'array')) {
            $KAUtils.throwExceptionInvalidArgumentType();
        }

        widgetModel = $KAUtils.getWidgetModel(widgetPath);
        if(!widgetModel) {
            $KAUtils.throwExceptionWidgetPathNotFound();
        }
        el = $KW.el(widgetModel);
        $KU.log({api:'voltmx.automation.switch.toggle', exit: true});
        el.thumb && el.thumb.click();

    };

    var calendar_selectDate = function(widgetPath, date) {
        //In automation user has to give date format allways "MM/DD/YYYY"
        //date components format is [dd, mm, yyyy, hh, mm, ss]
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
            node = null, widgetModel = null;
        var month = date[0], day = date[1], year = date[2];

        $KU.log({api: 'voltmx.automation.calendar.selectDate', enter: true});
        if(arguments.length !== 2) {
            $KAUtils.throwExceptionInsufficientArguments();
        }

        if(!Array.isArray(widgetPath) || !Array.isArray(date)) {
            $KAUtils.throwExceptionInvalidArgumentType();
        }

        widgetModel = $KAUtils.getWidgetModel(widgetPath);
        if(!widgetModel) {
            $KAUtils.throwExceptionWidgetPathNotFound();
        }
        widgetModel.displayedMonth = [date[0], date[2]];

        node = widgetModel._kwebfw_.view;
        node.getElementsByTagName('img')[0].click();
        if(month <= 9){
            month = "0"+ month;
        }
        if(day <= 9){
            day = "0"+ day;
        }
        node = document.querySelector('[date="' + year + '-' + month + '-' + day + '"]');

        $KU.log({api: 'voltmx.automation.calendar.selectDate', exit: true});
        node && node.click();


    };

    var datagrid_click = function(widgetPath, item) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
        node = null, widgetModel = null;

        $KU.log({api:'voltmx.automation.datagrid.click', enter: true });
        if(arguments.length !== 2) {
            $KAUtils.throwExceptionInsufficientArguments();
        }
        //$KU.log('voltmx.automation.datagrid.click', widgetPath, item);
        if(!$KU.is(widgetPath, 'array') || typeof item !== 'object') {
            $KAUtils.throwExceptionInvalidArgumentType();
        }


        widgetModel = $KAUtils.getWidgetModel(widgetPath);
        if(!widgetModel) {
            $KAUtils.throwExceptionWidgetPathNotFound();
        }
        if(!$KAUtils.isEventApplicable(widgetModel)) {
            $KU.log('voltmx.automation.datagrid.click VIA widget disabled or not visible');
            return;
        }

        node = widgetModel._kwebfw_.view
        $KU.log({api:'voltmx.automation.datagrid.click VIA end of function', exit: true});
        if(item.row == -1) {
            node = node.children[0].children[0];
            node.children[item.col].click();
        } else {
            node = node.children[1];
            node.children[item.row].children[item.col].click();
        }
    };




    var menucontainer_click = function() {
       //Deprecated widget

    };

    var browser_onSuccess = function() {
        //framework have no control
    };

    var browser_onFailure = function() {
        //framework have no control
    };

    var alert_click = function() {
        //framework have no control

    };

    var _validateMapCoordinatesAndGetLocationData = function(widgetModel, pinInfo) {
        var locationData = widgetModel.locationData, pinIndex;

        if(locationData && locationData.length > 0) {
            for(pinIndex = 0; pinIndex < locationData.length; pinIndex++) {
                if(locationData[pinIndex].lat == pinInfo.lat
                && locationData[pinIndex].lon == pinInfo.lon) {
                    return locationData[pinIndex];
                }
            }
            $KAUtils.throwExceptionMapPinNotFound();
        } else {
            $KAUtils.throwExceptionMapPinNotFound();
        }
    };

    var map_click = function() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
            node = null, widgetModel = null;

    };

    //TODO:: MAP APi's.
    var map_clickOnPin = function() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
            node = null, widgetModel = null;

    };

    var map_clickOnPinCallout = function() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
            node = null, widgetModel = null;

    };

    var map_dismissCallout = function() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
            node = null, widgetModel = null;

    };


    var segmentedui_click = function(widgetPath) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
            node = null, widgetModel = null;

        $KU.log({api:'voltmx.automation.segmentedui.click ', enter: true});
        if(arguments.length !== 1) {
            $KAUtils.throwExceptionInsufficientArguments();
        }

        if(!$KU.is(widgetPath, 'array')) {
            $KAUtils.throwExceptionInvalidArgumentType();
        }

        widgetModel = $KAUtils.getWidgetModel(widgetPath);

        if(!widgetModel) {
            $KAUtils.throwExceptionWidgetPathNotFound();
        }

        if(!$KAUtils.isEventApplicable(widgetModel)) {
            $KU.log('voltmx.automation.segmentedui.click VIA widget disabled or not visible');
            return;
        }

        node = widgetModel._kwebfw_.view;
        $KU.log({api:'voltmx.automation.segmentedui.click ', exit: true});
        node && node.click();

    };

    var segmentedui_getItem = function(widgetPath) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
            node = null, widgetModel = null;

        $KU.log({api:'voltmx.automation.segmentedui.getItem ', enter: true});
        if(arguments.length !== 1) {
            $KAUtils.throwExceptionInsufficientArguments();
        }

        if(!$KU.is(widgetPath, 'array')) {
            $KAUtils.throwExceptionInvalidArgumentType();
        }

        widgetModel = $KAUtils.getWidgetModel(widgetPath);
        if(!widgetModel) {
            $KAUtils.throwExceptionWidgetPathNotFound();
        }

        $KU.log({api:'voltmx.automation.segmentedui.getItem ', exit: true});
        return widgetModel;
    };

    var segmentedui_pull = function(widgetPath) {
        //pull event will not work for desktopweb

    };

    var segmentedui_push = function(widgetPath) {
        //push will not work for desktopweb

    };

    var segmentedui_scrollToBottom = function(widgetPath) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
            node = null, widgetModel = null;

        $KU.log({api:'voltmx.automation.segmentedui.scrollToBottom ', enter: true});

        if(arguments.length !== 1) {
            $KAUtils.throwExceptionInsufficientArguments();
        }

        if(!$KU.is(widgetPath, 'array')) {
            $KAUtils.throwExceptionInvalidArgumentType();
        }

        widgetModel = $KAUtils.getWidgetModel(widgetPath);
        if(!widgetModel) {
            $KAUtils.throwExceptionWidgetPathNotFound();
        }

        node = widgetModel._kwebfw_.view;
        node.scrollTop = 200000;

        $KU.log({api:'voltmx.automation.segmentedui.scrollToBottom ', exit: true});
    };

    var segmentedui_scrollToRow = function(widgetPath) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
            node = null, widgetModel = null;

        $KU.log({api:'voltmx.automation.segmentedui.scrollToRow ', enter: true});

        if(arguments.length !== 1) {
            $KAUtils.throwExceptionInsufficientArguments();
        }

        if(!$KU.is(widgetPath, 'array')) {
            $KAUtils.throwExceptionInvalidArgumentType();
        }

        widgetModel = $KAUtils.getWidgetModel(widgetPath);
        if(!widgetModel) {
            $KAUtils.throwExceptionWidgetPathNotFound();
        }
        $KW.scrollElementToParentScroller(widgetModel);

        $KU.log({api:'voltmx.automation.segmentedui.scrollToRow ', exit: true});

    };

    var segmentedui_scrollToTop = function(widgetPath) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
            node = null, widgetModel = null;

        $KU.log({api:'voltmx.automation.segmentedui.scrollToTop ', enter: true});

        if(arguments.length !== 1) {
            $KAUtils.throwExceptionInsufficientArguments();
        }

        if(!$KU.is(widgetPath, 'array')) {
            $KAUtils.throwExceptionInvalidArgumentType();
        }

        widgetModel = $KAUtils.getWidgetModel(widgetPath);
        if(!widgetModel) {
            $KAUtils.throwExceptionWidgetPathNotFound();
        }

        node = widgetModel._kwebfw_.view;
        node.scrollTop = 0;
        $KU.log({api:'voltmx.automation.segmentedui.scrollToTop ', exit: true});
    };



    var collectionview_onItemSelect = function(widgetPath) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
            node = null, widgetModel = null;

    };

    var collectionview_scrolltoItem = function(widgetPath) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
            node = null, widgetModel = null;

    };

    var collectionview_getitem = function(widgetPath) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
            node = null, widgetModel = null;

    };

    var collectionview_onPull = function(widgetPath) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
            node = null, widgetModel = null;

    };

    var collectionview_onPush = function(widgetPath) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
            node = null, widgetModel = null;

    };

    var tabpane_click = function(widgetPath, tabHeader) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
            node = null, widgetModel = null, tabs;

        $KU.log({api:'voltmx.automation.tabpane.click', enter: true});
        if(arguments.length !== 2) {
            $KAUtils.throwExceptionInsufficientArguments();
        }

        if(!$KU.is(widgetPath, 'array') || typeof tabHeader !== 'string') {
            $KAUtils.throwExceptionInvalidArgumentType();
        }

        widgetModel = $KAUtils.getWidgetModel(widgetPath);
        if(!widgetModel) {
            $KAUtils.throwExcetionWidgetPathNotFound();
        }

        tabs = widgetModel._kwebfw_.tabs;
        node = widgetModel._kwebfw_.view.children[0].children[0]
        $KU.log({api:'voltmx.automation.tabpane.click', exit: true});
        if(tabs.length) {
            for(var i = 0;i<tabs.length;i++) {
                if(tabs[i].id === tabHeader) {
                    node.children[i].click();
                }
            }
        }

    };

    var slider_slide = function(widgetPath, value) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget, $KD = $K.dom,
        node = null, widgetModel = null;

        $KU.log({api:'voltmx.automation.slider.slide', enter: true});
        if(arguments.length !== 2) {
            $KAUtils.throwExceptionInsufficientArguments();
        }


        if(!$KU.is(widgetPath, 'array') || typeof value !== 'number') {
            $KAUtils.throwExceptionInvalidArgumentType();
        }

        widgetModel = $KAUtils.getWidgetModel(widgetPath);
        if(!widgetModel) {
            $KAUtils.throwExcetionWidgetPathNotFound();
        }

        node = widgetModel._kwebfw_.view;
        $KU.log({api:'voltmx.automation.slider.slide', exit: true});
        widgetModel.selectedValue = value;
        if(widgetModel.onSlide) {
            widgetModel.onSlide(widgetModel, value);
        }

    };



    $K.defVoltmxProp(voltmx.automation, [
        {keey:'box', value:{}, items:[
            {keey:'click', value:box_click}
        ]},

        {keey:'flexcontainer', value:{}, items:[
            {keey:'click', value:flexcontainer_click}
        ]},

        {keey:'button', value:{}, items:[
            {keey:'click', value:button_click}
        ]},

        {keey:'textbox', value:{}, items:[
            {keey:'enterText', value:textbox_enterText}
        ]},

        {keey:'textarea', value:{}, items:[
            {keey:'enterText', value:textarea_enterText}
        ]},

        {keey:'richtext', value:{}, items:[
            {keey:'click', value:richtext_click}
        ]},

        {keey:'link', value:{}, items:[
            {keey:'click', value:link_click}
        ]},

        {keey:'checkboxgroup', value:{}, items:[
            {keey:'click', value:checkboxgroup_click}
        ]},

        {keey:'radiobuttongroup', value:{}, items:[
            {keey:'click', value:radiobuttongroup_click}
        ]},

        {keey:'listbox', value:{}, items:[
            {keey:'selectItem', value:listbox_selectItem}
        ]},

        {keey:'combobox', value:{}, items:[
            {keey:'selectItem', value:combobox_selectItem}
        ]},

        {keey:'appmenu', value:{}, items:[
            {keey:'click', value:appmenu_click}
        ]},

        {keey:'imagegallery', value:{}, items:[
            {keey:'click', value:imagegallery_click}
        ]},

        {keey:'horizontalimagestrip', value:{}, items:[
            {keey:'click', value:horizontalimagestrip_click}
        ]},

        {keey:'switch', value:{}, items:[
            {keey:'toggle', value:switch_toggle}
        ]},

        {keey:'calendar', value:{}, items:[
            {keey:'selectDate', value:calendar_selectDate}
        ]},

        {keey:'datagrid', value:{}, items:[
            {keey:'click', value:datagrid_click}
        ]},

        {keey:'menucontainer', value:{}, items:[
            {keey:'click', value:menucontainer_click}
        ]},

        {keey:'browser', value:{}, items:[
            {keey:'onSuccess', value:browser_onFailure},
            {keey:'onFailure', value:browser_onFailure}
        ]},

        {keey:'alert', value:{}, items:[
            {keey:'click', value:alert_click}
        ]},

        {keey:'map', value:{}, items:[
            {keey:'click', value:map_click},
            {keey:'clickOnPin', value:map_clickOnPin},
            {keey:'clickOnPinCallout', value:map_clickOnPinCallout},
            {keey:'dismissCallout', value:map_dismissCallout}
        ]},

        {keey:'segmentedui', value:{}, items:[
            {keey:'click', value:segmentedui_click},
            {keey:'getItem', value:segmentedui_getItem},
            {keey:'pull', value:segmentedui_pull},
            {keey:'push', value:segmentedui_push},
            {keey:'scrollToRow', value:segmentedui_scrollToRow},
            {keey:'scrollToTop', value:segmentedui_scrollToTop},
            {keey:'scrollToBottom', value:segmentedui_scrollToBottom}
        ]},

        {keey:'collectionview', value:{}, items:[
            {keey:'onItemSelect', value:collectionview_onItemSelect},
            {keey:'scrolltoItem', value:collectionview_scrolltoItem},
            {keey:'getItem', value:collectionview_getitem},
            {keey:'onPush', value:collectionview_onPush},
            {keey:'onPull', value:collectionview_onPull}
        ]},

        {keey:'tabpane', value:{}, items:[
            {keey:'click', value:tabpane_click}
        ]},

        {keey:'slider', value:{}, items:[
            {keey:'slide', value:slider_slide}
        ]}
    ]);

}());

