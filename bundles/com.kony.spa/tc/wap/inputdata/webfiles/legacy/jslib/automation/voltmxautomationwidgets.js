
voltmx.automation.box = (function() {

    var module = {
        click: function(widgetPath) {

            $KU.logExecuting('voltmx.automation.box.click');
            if(arguments.length !== 1) {
                $KAUtils.throwExceptionInsufficientArguments();
            }

            $KU.logExecutingWithParams('voltmx.automation.box.click', widgetPath);
            if(!$KU.isArray(widgetPath)) {
                $KAUtils.throwExceptionInvalidArgumentType();
            }

            var node = null;

            var widgetConfig = $KAUtils.getWidgetInstance(widgetPath);
            var widgetModel = widgetConfig.widgetInstance;
            if(!widgetModel) {
                $KAUtils.throwExceptionWidgetPathNotFound();
            }
            var isEventRequired = $KAUtils.isEventApplicable(widgetModel);
            if(!isEventRequired) {
                $KU.logExecutingFinished('voltmx.automation.box.click VIA widget disabled or not visible');
                return;
            }

            node = $KAUtils.getNodeByModel(widgetConfig);
            $KU.logExecutingFinished('voltmx.automation.box.click VIA end of function');
            node && node.click();
        }
    };

    return module;
}());

voltmx.automation.flexcontainer = (function() {

    var module = {
        click: function(widgetPath) {

            $KU.logExecuting('voltmx.automation.flexcontainer.click');
            if(arguments.length !== 1) {
                $KAUtils.throwExceptionInsufficientArguments();
            }

            $KU.logExecutingWithParams('voltmx.automation.flexcontainer.click', widgetPath);
            if(!$KU.isArray(widgetPath)) {
                $KAUtils.throwExceptionInvalidArgumentType();
            }

            var node = null;

            var widgetConfig = $KAUtils.getWidgetInstance(widgetPath);
            var widgetModel = widgetConfig.widgetInstance;
            if(!widgetModel) {
                $KAUtils.throwExceptionWidgetPathNotFound();
            }
            var isEventRequired = $KAUtils.isEventApplicable(widgetModel);
            if(!isEventRequired) {
                $KU.logExecutingFinished('voltmx.automation.flexcontainer.click VIA widget disabled or not visible');
                return;
            }

            node = $KAUtils.getNodeByModel(widgetConfig);
            $KU.logExecutingFinished('voltmx.automation.flexcontainer.click VIA end of function');
            node && node.click();
        }
    };

    return module;
}());

voltmx.automation.button = (function() {

    var module = {
        click: function(widgetPath) {

            $KU.logExecuting('voltmx.automation.button.click');
            if(arguments.length !== 1) {
                $KAUtils.throwExceptionInsufficientArguments();
            }

            $KU.logExecutingWithParams('voltmx.automation.button.click', widgetPath);
            if(!$KU.isArray(widgetPath)) {
                $KAUtils.throwExceptionInvalidArgumentType();
            }

            var node = null;
            var widgetConfig = $KAUtils.getWidgetInstance(widgetPath);
            var widgetModel = widgetConfig.widgetInstance;
            if(!widgetModel) {
                $KAUtils.throwExceptionWidgetPathNotFound();
            }
            var isEventRequired = $KAUtils.isEventApplicable(widgetModel);
            if(!isEventRequired) {
                $KU.logExecutingFinished('voltmx.automation.button.click VIA widget disabled or not visible');
                return;
            }

            node = $KAUtils.getNodeByModel(widgetConfig);
            $KU.logExecutingFinished('voltmx.automation.button.click VIA end of function');
            node && node.click();
        }
    };

    return module;
}());

voltmx.automation.textbox = (function() {

    var module = {
        enterText: function(widgetPath, item) {

            $KU.logExecuting('voltmx.automation.textbox.enterText');
            if(arguments.length !== 2) {
                $KAUtils.throwExceptionInsufficientArguments();
            }

            $KU.logExecutingWithParams('voltmx.automation.textbox.enterText', widgetPath, item);
            if(!$KU.isArray(widgetPath) || typeof item !== 'string') {
                $KAUtils.throwExceptionInvalidArgumentType();
            }

            var node = null;
            var widgetConfig = $KAUtils.getWidgetInstance(widgetPath);
            var widgetModel = widgetConfig.widgetInstance;
            if(!widgetModel) {
                $KAUtils.throwExceptionWidgetPathNotFound();
            }
            var isEventRequired = $KAUtils.isEventApplicable(widgetModel);
            if(!isEventRequired) {
                $KU.logExecutingFinished('voltmx.automation.textbox.enterText VIA widget disabled or not visible');
                return;
            }
            node = $KAUtils.getNodeByModel(widgetConfig);
            node.value = "";
            var eventTriggered = $KU.fireEvent(node, "focus");
            for(var i = 0; i < item.length; i++) {
                node.value += item.charAt(i);
                var eventTriggered = $KU.fireEvent(node, "keyup");
            }
            var eventTriggered = $KU.fireEvent(node, "change");
            var eventTriggered = $KU.fireEvent(node, "blur");
            $KU.logExecutingFinished('voltmx.automation.textbox.enterText VIA end of function');

        }
    };

    return module;
}());

voltmx.automation.textarea = (function() {

    var module = {
        enterText: function(widgetPath, item) {

            $KU.logExecuting('voltmx.automation.textarea.enterText');
            if(arguments.length !== 2) {
                $KAUtils.throwExceptionInsufficientArguments();
            }

            $KU.logExecutingWithParams('voltmx.automation.textarea.enterText', widgetPath, item);
            if(!$KU.isArray(widgetPath) || typeof item !== 'string') {
                $KAUtils.throwExceptionInvalidArgumentType();
            }

            var node = null;
            var widgetConfig = $KAUtils.getWidgetInstance(widgetPath);
            var widgetModel = widgetConfig.widgetInstance;
            if(!widgetModel) {
                $KAUtils.throwExceptionWidgetPathNotFound();
            }
            var isEventRequired = $KAUtils.isEventApplicable(widgetModel);
            if(!isEventRequired) {
                $KU.logExecutingFinished('voltmx.automation.textarea.enterText VIA widget disabled or not visible');
                return;
            }

            node = $KAUtils.getNodeByModel(widgetConfig);
            node.value = "";
            var eventTriggered = $KU.fireEvent(node, "focus");
            for(var i = 0; i < item.length; i++) {
                node.value += item.charAt(i);
                var eventTriggered = $KU.fireEvent(node, "keyup");
            }
            var eventTriggered = $KU.fireEvent(node, "change");
            var eventTriggered = $KU.fireEvent(node, "blur");
            $KU.logExecutingFinished('voltmx.automation.textarea.enterText VIA end of function');

        }
    };

    return module;
}());

voltmx.automation.richtext = (function() {

    var module = {
        click: function(widgetPath, linktext) {

            $KU.logExecuting('voltmx.automation.richtext.click');
            if(arguments.length !== 2) {
                $KAUtils.throwExceptionInsufficientArguments();
            }

            $KU.logExecutingWithParams('voltmx.automation.richtext.click', widgetPath, linktext);
            if(!$KU.isArray(widgetPath) || typeof linktext !== 'string') {
                $KAUtils.throwExceptionInvalidArgumentType();
            }

            var node = null;
            var count = 0;
            var widgetConfig = $KAUtils.getWidgetInstance(widgetPath);
            var widgetModel = widgetConfig.widgetInstance;
            if(!widgetModel) {
                $KAUtils.throwExceptionWidgetPathNotFound();
            }
            var isEventRequired = $KAUtils.isEventApplicable(widgetModel);
            if(!isEventRequired) {
                $KU.logExecutingFinished('voltmx.automation.richtext.click VIA widget disabled or not visible');
                return;
            }
            node = $KAUtils.getNodeByModel(widgetConfig);
            $KU.logExecutingFinished('voltmx.automation.richtext.click VIA end of function');
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
        }
    };

    return module;
}());

voltmx.automation.link = (function() {

    var module = {
        click: function(widgetPath) {

            $KU.logExecuting('voltmx.automation.link.click');
            if(arguments.length !== 1) {
                $KAUtils.throwExceptionInsufficientArguments();
            }

            $KU.logExecutingWithParams('voltmx.automation.link.click', widgetPath);
            if(!$KU.isArray(widgetPath)) {
                $KAUtils.throwExceptionInvalidArgumentType();
            }

            var node = null;

            var widgetConfig = $KAUtils.getWidgetInstance(widgetPath);
            var widgetModel = widgetConfig.widgetInstance;
            if(!widgetModel) {
                $KAUtils.throwExceptionWidgetPathNotFound();
            }

            node = $KAUtils.getNodeByModel(widgetConfig);
            $KU.logExecutingFinished('voltmx.automation.link.click');
            node && node.click();
        }
    };

    return module;
}());

voltmx.automation.checkboxgroup = (function() {

    var module = {
        click: function(widgetPath, item) {

            $KU.logExecuting('voltmx.automation.checkboxgroup.click');
            if(arguments.length !== 2) {
                $KAUtils.throwExceptionInsufficientArguments();
            }

            $KU.logExecutingWithParams('voltmx.automation.checkboxgroup.click', widgetPath, item);
            if(!$KU.isArray(widgetPath) || typeof item !== 'string') {
                $KAUtils.throwExceptionInvalidArgumentType();
            }

            var node = null;
            var widgetConfig = $KAUtils.getWidgetInstance(widgetPath);
            var widgetModel = widgetConfig.widgetInstance;
            if(!widgetModel) {
                $KAUtils.throwExceptionWidgetPathNotFound();
            }
            node = $KAUtils.getNodeByModel(widgetConfig);
            $KU.logExecutingFinished('voltmx.automation.checkboxgroup.click');
            for(var i = 0; i < node.childElementCount; i++) {
                if(item.indexOf(node.children[i].children[0].value) > -1) {
                    node.children[i].children[0].click();
                }
            }
        }
    };

    return module;
}());

voltmx.automation.radiobuttongroup = (function() {

    var module = {
        click: function(widgetPath, item) {

            $KU.logExecuting('voltmx.automation.radiobuttongroup.click');
            if(arguments.length !== 2) {
                $KAUtils.throwExceptionInsufficientArguments();
            }

            $KU.logExecutingWithParams('voltmx.automation.radiobuttongroup.click', widgetPath, item);
            if(!$KU.isArray(widgetPath) || typeof item !== 'string') {
                $KAUtils.throwExceptionInvalidArgumentType();
            }

            var node = null;
            var widgetConfig = $KAUtils.getWidgetInstance(widgetPath);
            var widgetModel = widgetConfig.widgetInstance;
            if(!widgetModel) {
                $KAUtils.throwExceptionWidgetPathNotFound();
            }
            var isEventRequired = $KAUtils.isEventApplicable(widgetModel);
            if(!isEventRequired) {
                $KU.logExecutingFinished('voltmx.automation.radiobuttongroup.click VIA widget disabled or not visible');
                return;
            }
            node = $KAUtils.getNodeByModel(widgetConfig);
            $KU.logExecutingFinished('voltmx.automation.radiobuttongroup.click VIA end of function');
            for(var i = 0; i < node.childElementCount; i++) {
                if(item.indexOf(node.children[i].children[0].value) > -1) {
                    node.children[i].children[0].click();
                }
            }
        }
    };

    return module;
}());

voltmx.automation.listbox = (function() {

    var module = {

        selectItem: function(widgetPath, item) {

            $KU.logExecuting('voltmx.automation.listbox.selectItem');
            if(arguments.length !== 2) {
                $KAUtils.throwExceptionInsufficientArguments();
            }

            $KU.logExecutingWithParams('voltmx.automation.listbox.selectItem', widgetPath, item);
            if(!$KU.isArray(widgetPath) || typeof item !== 'string') {
                $KAUtils.throwExceptionInvalidArgumentType();
            }

            var node = null;
            var widgetConfig = $KAUtils.getWidgetInstance(widgetPath);
            var widgetModel = widgetConfig.widgetInstance;
            if(!widgetModel) {
                $KAUtils.throwExceptionWidgetPathNotFound();
            }
            var isEventRequired = $KAUtils.isEventApplicable(widgetModel);
            if(!isEventRequired) {
                $KU.logExecutingFinished('voltmx.automation.listbox.selectItem VIA widget disabled or not visible');
                return;
            }

            node = $KAUtils.getNodeByModel(widgetConfig);
            $KU.logExecutingFinished('voltmx.automation.listbox.selectItem VIA end of function');
            if(widgetModel.viewtype == "editableview") {
                for(var i = 0; i < node.children[2].childElementCount; i++) {
                    if(node.children[2].children[i].getAttribute("value") === item) {
                        node.children[1].click();
                        node.children[2].children[i].click();
                        break;
                    }
                }

            } else {
                for(var i = 0; i < node.childElementCount; i++) {
                    if(node.children[i].selected) {
                        node.children[i].removeAttribute("selected");
                    }
                    if(node.children[i].value === item) {
                        node.children[i].setAttribute("selected", "");
                        var eventTriggered = $KU.fireEvent(node, "change");
                    }
                }
            }
        }
    };

    return module;
}());

voltmx.automation.combobox = (function() {

    var module = {

        selectItem: function(widgetPath, item) {

            $KU.logExecuting('voltmx.automation.combobox.selectItem');
            if(arguments.length !== 2) {
                $KAUtils.throwExceptionInsufficientArguments();
            }
            $KU.logExecutingWithParams('voltmx.automation.combobox.selectItem', widgetPath, item);
            if(!$KU.isArray(widgetPath) || typeof item !== 'string') {
                $KAUtils.throwExceptionInvalidArgumentType();
            }

            var node = null;
            var widgetConfig = $KAUtils.getWidgetInstance(widgetPath);
            var widgetModel = widgetConfig.widgetInstance;
            if(!widgetModel) {
                $KAUtils.throwExceptionWidgetPathNotFound();
            }
            var isEventRequired = $KAUtils.isEventApplicable(widgetModel);
            if(!isEventRequired) {
                $KU.logExecutingFinished('voltmx.automation.combobox.selectItem VIA widget disabled or not visible')
                return;
            }

            node = $KAUtils.getNodeByModel(widgetConfig);
            $KU.logExecutingFinished('voltmx.automation.combobox.selectItem VIA end of function');
            if(widgetModel.viewtype == "editableview") {
                for(var i = 0; i < node.children[2].childElementCount; i++) {
                    if(node.children[2].children[i].getAttribute("value") === item) {
                        node.children[1].click();
                        node.children[2].children[i].click();
                        break;
                    }
                }
            } else {
                for(var i = 0; i < node.childElementCount; i++) {
                    if(node.children[i].selected) {
                        node.children[i].removeAttribute("selected");
                    }
                    if(node.children[i].value === item) {
                        node.children[i].setAttribute("selected", "");
                        var eventTriggered = $KU.fireEvent(node, "change");
                    }
                }
            }
        }
    };

    return module;
}());

voltmx.automation.appmenu = (function() {

    var module = {
        click: function(menuitemid) {

            $KU.logExecuting('voltmx.automation.appmenu.click');
            if(arguments.length !== 1) {
                $KAUtils.throwExceptionInsufficientArguments();
            }
            $KU.logExecutingWithParams('voltmx.automation.appmenu.click', menuitemid);
            if(typeof menuitemid !== 'string') {
                $KAUtils.throwExceptionInvalidArgumentType();
            }

            var node = document.getElementById(menuitemid);
            $KU.logExecutingFinished('voltmx.automation.appmenu.click');
            node.click();
        }
    };

    return module;
}());

voltmx.automation.imagegallery = (function() {

    var module = {

        click: function(widgetPath, imageItemIndex) {

            $KU.logExecuting('voltmx.automation.imagegallery.click');
            if(arguments.length !== 2) {
                $KAUtils.throwExceptionInsufficientArguments();
            }

            $KU.logExecutingWithParams('voltmx.automation.imagegallery.click', widgetPath, imageItemIndex);
            if(!$KU.isArray(widgetPath) || typeof imageItemIndex !== 'number') {
                $KAUtils.throwExceptionInvalidArgumentType();
            }

            var node = null;

            var widgetConfig = $KAUtils.getWidgetInstance(widgetPath);
            var widgetModel = widgetConfig.widgetInstance;
            if(!widgetModel) {
                $KAUtils.throwExceptionWidgetPathNotFound();
            }

            node = $KAUtils.getNodeByModel(widgetConfig);
            node = node.querySelectorAll('[index="' + imageItemIndex + '"]')[0];
            $KU.logExecutingFinished('voltmx.automation.imagegallery.click');
            node && node.click();
        }
    };


    return module;
}());

voltmx.automation.horizontalimagestrip = (function() {

    var module = {

        click: function(widgetPath, imageItemIndex) {

            $KU.logExecuting('voltmx.automation.horizontalimagestrip.click');
            if(arguments.length !== 2) {
                $KAUtils.throwExceptionInsufficientArguments();
            }
            $KU.logExecutingWithParams('voltmx.automation.horizontalimagestrip.click', widgetPath, imageItemIndex);
            if(!$KU.isArray(widgetPath) || typeof imageItemIndex !== 'number') {
                $KAUtils.throwExceptionInvalidArgumentType();
            }

            var node = null;

            var widgetConfig = $KAUtils.getWidgetInstance(widgetPath);
            var widgetModel = widgetConfig.widgetInstance;
            if(!widgetModel) {
                $KAUtils.throwExceptionWidgetPathNotFound();
            }
            node = $KAUtils.getNodeByModel(widgetConfig);
            node = node.querySelectorAll('[index="' + imageItemIndex + '"]')[0];
            $KU.logExecutingFinished('voltmx.automation.horizontalimagestrip.click');
            node && node.click();
        }
    };

    return module;
}());

voltmx.automation.switch = (function() {

    var module = {

        toggle: function(widgetPath) {

            $KU.logExecuting('voltmx.automation.switch.toggle');
            if(arguments.length !== 1) {
                $KAUtils.throwExceptionInsufficientArguments();
            }

            $KU.logExecutingWithParams('voltmx.automation.switch.toggle', widgetPath);
            if(!$KU.isArray(widgetPath)) {
                $KAUtils.throwExceptionInvalidArgumentType();
            }

            var node = null;
            var widgetConfig = $KAUtils.getWidgetInstance(widgetPath);
            var widgetModel = widgetConfig.widgetInstance;
            if(!widgetModel) {
                $KAUtils.throwExceptionWidgetPathNotFound();
            }
            node = $KAUtils.getNodeByModel(widgetConfig);
            $KU.logExecutingFinished('voltmx.automation.switch.toggle');
            node && node.click();
        }
    };

    return module;
}());

voltmx.automation.calendar = (function() {

    var module = {
        selectDate: function(widgetPath, date) {

            $KU.logExecuting('voltmx.automation.calendar.selectDate');
            if(arguments.length !== 2) {
                $KAUtils.throwExceptionInsufficientArguments();
            }

            $KU.logExecutingWithParams('voltmx.automation.calendar.selectDate', widgetPath, date);
            if(!$KU.isArray(widgetPath) || !$KU.isArray(date)) {
                $KAUtils.throwExceptionInvalidArgumentType();
            }

            var node = null;

            var widgetConfig = $KAUtils.getWidgetInstance(widgetPath);
            var widgetModel = widgetConfig.widgetInstance;
            if(!widgetModel) {
                $KAUtils.throwExceptionWidgetPathNotFound();
            }

            node = $KAUtils.getNodeByModel(widgetConfig);

            widgetModel.day = widgetModel.datecomponents[0] = date[1];
            widgetModel.month = widgetModel.datecomponents[1] = date[0];
            widgetModel.year = widgetModel.datecomponents[2] = date[2];
            node.getElementsByTagName("img")[0].click()
            node = document.querySelector('[k-w-c-hold-day="' + date[1] + ',' + date[0] + ',' + date[2] + '"]');
            $KU.logExecutingFinished('voltmx.automation.calendar.selectDate');
            node && node.click();
        }
    };

    return module;
}());

voltmx.automation.datagrid = (function() {

    var module = {

        click: function(widgetPath, item) {

            $KU.logExecuting('voltmx.automation.datagrid.click');
            if(arguments.length !== 2) {
                $KAUtils.throwExceptionInsufficientArguments();
            }
            $KU.logExecutingWithParams('voltmx.automation.datagrid.click', widgetPath, item);
            if(!$KU.isArray(widgetPath) || typeof item !== 'object') {
                $KAUtils.throwExceptionInvalidArgumentType();
            }

            var widgetConfig = $KAUtils.getWidgetInstance(widgetPath);
            var widgetModel = widgetConfig.widgetInstance;
            if(!widgetModel) {
                $KAUtils.throwExceptionWidgetPathNotFound();
            }
            var isEventRequired = $KAUtils.isEventApplicable(widgetModel);
            if(!isEventRequired) {
                $KU.logExecutingFinished('voltmx.automation.datagrid.click VIA widget disabled or not visible');
                return;
            }

            node = $KAUtils.getNodeByModel(widgetConfig);
            $KU.logExecutingFinished('voltmx.automation.datagrid.click VIA end of function');
            if(item.row == -1) {
                node = node.children[0].children[0];
                node.children[item.col].click();
            } else {
                node = node.children[1];
                node.children[item.row].children[item.col].click();
            }
        }
    };

    return module;

}());

voltmx.automation.menucontainer = (function() {

    var module = {
        click: function(widgetPath) {

            if(arguments.length !== 1) {
                $KAUtils.throwExceptionInsufficientArguments();
            }
            if(!$KU.isArray(widgetPath)) {
                $KAUtils.throwExceptionInvalidArgumentType();
            }

            var node = null;

            var widgetConfig = $KAUtils.getWidgetInstance(widgetPath);
            var widgetModel = widgetConfig.widgetInstance;
            if(!widgetModel) {
                $KAUtils.throwExceptionWidgetPathNotFound();
            }

            node = $KAUtils.getNodeByModel(widgetConfig);
            node && node.click();
        }
    };

    return module;
}());

voltmx.automation.browser = (function() {

    var module = {
        onSuccess: function(widgetPath) {

        },
        onFailure: function(widgetPath) {

        },
    };

    return module;
}());

voltmx.automation.alert = (function() {

    var module = {
        click: function(widgetPath) {

        }
    };

    return module;
}());

voltmx.automation.map = (function() {
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

    var module = {

        click: function(widgetPath, clickCoordinates) {

            $KU.logExecuting('voltmx.automation.map.click');
            if(arguments.length !== 2) {
                $KAUtils.throwExceptionInsufficientArguments();
            }
            $KU.logExecutingWithParams('voltmx.automation.map.click', widgetPath, clickCoordinates);
            if(!$KU.isArray(widgetPath) || typeof clickCoordinates !== 'object') {
                $KAUtils.throwExceptionInvalidArgumentType();
            }

            var node = null, mouseevent, map;
            var widgetConfig = $KAUtils.getWidgetInstance(widgetPath);
            var widgetModel = widgetConfig.widgetInstance;
            if(!widgetModel) {
                $KAUtils.throwExceptionWidgetPathNotFound();
            }
            var isEventRequired = $KAUtils.isEventApplicable(widgetModel);
            if(!isEventRequired) {
                $KU.logExecutingFinished('voltmx.automation.map.click VIA widget disabled or not visible');
                return;
            }

            node = $KAUtils.getNodeByModel(widgetConfig);
            $KU.logExecutingFinished('voltmx.automation.map.click VIA end of function');
            if(node) {
                mouseevent = {
                    stop: null,
                    latLng: new google.maps.LatLng(clickCoordinates.lat, clickCoordinates.lon)
                };

                if(widgetModel.map) {
                    widgetModel.map.setCenter(mouseevent.latLng);
                    google.maps.event.trigger(widgetModel.map, 'click', mouseevent);
                }
            }
        },

        clickOnPin: function(widgetPath, pinInfo) {

            $KU.logExecuting('voltmx.automation.map.clickOnPin');
            if(arguments.length !== 2) {
                $KAUtils.throwExceptionInsufficientArguments();
            }
            $KU.logExecutingWithParams('voltmx.automation.map.clickOnPin', widgetPath, pinInfo);
            if(!$KU.isArray(widgetPath) || typeof pinInfo !== 'object') {
                $KAUtils.throwExceptionInvalidArgumentType();
            }

            var node = null;
            var widgetConfig = $KAUtils.getWidgetInstance(widgetPath);
            var widgetModel = widgetConfig.widgetInstance;
            if(!widgetModel) {
                $KAUtils.throwExceptionWidgetPathNotFound();
            }

            var locationData = _validateMapCoordinatesAndGetLocationData(widgetModel, pinInfo);
            var isEventRequired = $KAUtils.isEventApplicable(widgetModel);
            if(!isEventRequired) {
                $KU.logExecutingFinished('voltmx.automation.map.clickOnPin VIA widget disabled or not visible');
                return;
            }

            node = $KAUtils.getNodeByModel(widgetConfig);
            $KU.logExecutingFinished('voltmx.automation.map.clickOnPin VIA end of function')

            if(!node) return;

            var markers = widgetModel.markers, position, index;

            for(index = 0; index < markers.length; index++) {
                position = markers[index].position;

                if(position.equals(new google.maps.LatLng(locationData.lat, locationData.lon))) {
                    google.maps.event.trigger(markers[index], 'click');
                    break;
                }
            }

        },

        clickOnPinCallout: function(widgetPath, pinInfo) {

            $KU.logExecuting('voltmx.automation.map.clickOnPinCallout');
            if(arguments.length !== 2) {
                $KAUtils.throwExceptionInsufficientArguments();
            }
            $KU.logExecutingWithParams('voltmx.automation.map.clickOnPinCallout', widgetPath, pinInfo);
            if(!$KU.isArray(widgetPath) || typeof pinInfo !== 'object') {
                $KAUtils.throwExceptionInvalidArgumentType();
            }

            var node = null;
            var widgetConfig = $KAUtils.getWidgetInstance(widgetPath);
            var widgetModel = widgetConfig.widgetInstance;
            if(!widgetModel) {
                $KAUtils.throwExceptionWidgetPathNotFound();
            }

            var locationData = _validateMapCoordinatesAndGetLocationData(widgetModel, pinInfo);
            var isEventRequired = $KAUtils.isEventApplicable(widgetModel);
            if(!isEventRequired) {
                $KU.logExecutingFinished('voltmx.automation.map.clickOnPinCallout VIA widget disabled or not visible');
                return;
            }

            node = $KAUtils.getNodeByModel(widgetConfig);
            $KU.logExecutingFinished('voltmx.automation.map.clickOnPinCallout VIA end of function');
            var infoWindow = widgetModel.pinInfowindow, isOpened, key, marker, foundMatch = false,
            location = new google.maps.LatLng(locationData.lat, locationData.lon);

            for(key in infoWindow) {
                marker = infoWindow[key];
                position = marker.position;

                if(position.equals(location)) {
                    if(marker.getMap) {
                        isOpened = marker.getMap();
                        if(!isOpened) {
                            $KAUtils.throwExceptionNoOpenCalloutFound();
                        } else {
                            if(node && widgetModel.onSelection) {
                                widgetModel.onSelection.call(widgetModel, widgetModel, locationData);
                            }
                        }
                        foundMatch = true;
                    }
                    break;
                }
            }

            if(!foundMatch) {
                $KAUtils.throwExceptionNoOpenCalloutFound();
            }
        },

        dismissCallout: function(widgetPath, pinInfo) {
            if(arguments.length !== 2) {
                $KAUtils.throwExceptionInsufficientArguments();
            }
            if(!$KU.isArray(widgetPath) || typeof pinInfo !== 'object') {
                $KAUtils.throwExceptionInvalidArgumentType();
            }

            var node = null;
            var widgetConfig = $KAUtils.getWidgetInstance(widgetPath);
            var widgetModel = widgetConfig.widgetInstance;
            if(!widgetModel) {
                $KAUtils.throwExceptionWidgetPathNotFound();
            }

            var locationData = _validateMapCoordinatesAndGetLocationData(widgetModel, pinInfo);

            var infoWindow = widgetModel.pinInfowindow, isOpened, key, marker, foundMatch = false,
            location = new google.maps.LatLng(locationData.lat, locationData.lon);

            for(key in infoWindow) {
                marker = infoWindow[key];
                position = marker.position;

                if(position.equals(location)) {
                    if(marker.getMap) {
                        isOpened = marker.getMap();
                        if(!isOpened) {
                            $KAUtils.throwExceptionNoOpenCalloutFound();
                        }
                    }
                    foundMatch = true;
                    marker.close && marker.close();
                    break;
                }
            }
            if(!foundMatch) {
                $KAUtils.throwExceptionNoOpenCalloutFound();
            }
        }
    };

    return module;
}());

voltmx.automation.segmentedui  = (function(){

    var module = {};

    module.click = function(widgetPath) {

        $KU.logExecuting('voltmx.automation.segmentedui.click');
        if(arguments.length !== 1) {
            $KAUtils.throwExceptionInsufficientArguments();
        }
        $KU.logExecutingWithParams('voltmx.automation.segmentedui.click', widgetPath);
        if(!$KU.isArray(widgetPath)) {
            $KAUtils.throwExceptionInvalidArgumentType();
        }
        var node = null;
        var widgetConfig = $KAUtils.getWidgetInstance(widgetPath);
        var widgetModel = widgetConfig.widgetInstance;
        if(!widgetModel) {
            $KAUtils.throwExceptionWidgetPathNotFound();
        }

        var isEventRequired = $KAUtils.isEventApplicable(widgetModel);
        if(!isEventRequired) {
            $KU.logExecutingFinished('voltmx.automation.segmentedui.click VIA widget disabled or not visible');
            return;
        }

        node = $KAUtils.getNodeByModel(widgetConfig);
        $KU.logExecutingFinished('voltmx.automation.segmentedui.click VIA end of function');
        node && node.click();
    };

    module.getItem = function(widgetPath) {

        $KU.logExecuting('voltmx.automation.segmentedui.getItem');
        if(arguments.length !== 1) {
            $KAUtils.throwExceptionInsufficientArguments();
        }
        $KU.logExecutingWithParams('voltmx.automation.segmentedui.getItem', widgetPath);
        if(!$KU.isArray(widgetPath)) {
            $KAUtils.throwExceptionInvalidArgumentType();
        }

        var widgetConfig = $KAUtils.getWidgetInstance(widgetPath);
        var widgetModel = widgetConfig.widgetInstance;
        if(!widgetModel) {
            $KAUtils.throwExceptionWidgetPathNotFound();
        }

        $KU.logExecutingFinished('voltmx.automation.segmentedui.getItem');
        return widgetModel;
    };

    module.pull = function(widgetPath) {

        $KU.logExecuting('voltmx.automation.segmentedui.pull');
        if(arguments.length !== 1) {
            $KAUtils.throwExceptionInsufficientArguments();
        }
            $KU.logExecutingWithParams('voltmx.automation.segmentedui.pull', widgetPath);
            if(!$KU.isArray(widgetPath)) {
                $KAUtils.throwExceptionInvalidArgumentType();
            }

            var widgetConfig = $KAUtils.getWidgetInstance(widgetPath);
            var widgetModel = widgetConfig.widgetInstance;
            if(!widgetModel) {
                $KAUtils.throwExceptionWidgetPathNotFound();
            }
            var isEventRequired = $KAUtils.isEventApplicable(widgetModel);
            if(!isEventRequired) {
                $KU.logExecutingFinished('voltmx.automation.segmentedui.pull VIA widget disabled or not visible');
                return;
            }

            if(widgetModel.wType == "Segment") {
                $KW.APIUtils.setContentOffSet(widgetModel, {"x": 0, "y": 0}, false);
                var handler = $KU.returnEventReference(widgetModel.scrollingevents.onpull);
                $KU.logExecutingFinished('voltmx.automation.segmentedui.pull VIA end of function');
                $KU.executeWidgetEventHandler(widgetModel, handler);
            }
    };

    module.push = function(widgetPath) {

        $KU.logExecuting('voltmx.automation.segmentedui.push');
        if(arguments.length !== 1) {
            $KAUtils.throwExceptionInsufficientArguments();
        }
            $KU.logExecutingWithParams('voltmx.automation.segmentedui.push', widgetPath);
            if(!$KU.isArray(widgetPath)) {
                $KAUtils.throwExceptionInvalidArgumentType();
            }

            var widgetConfig = $KAUtils.getWidgetInstance(widgetPath);
            var widgetModel = widgetConfig.widgetInstance;
            if(!widgetModel) {
                $KAUtils.throwExceptionWidgetPathNotFound();
            }
            var isEventRequired = $KAUtils.isEventApplicable(widgetModel);
            if(!isEventRequired) {
                $KU.logExecutingFinished('voltmx.automation.segmentedui.push VIA widget disabled or not visible');
                return;
            }

            if(widgetModel.wType == "Segment") {
                $KW.APIUtils.setContentOffSet(widgetModel, {"x": 0, "y": 20000}, false);
                var handler = $KU.returnEventReference(widgetModel.scrollingevents.onpush);
                $KU.logExecutingFinished('voltmx.automation.segmentedui.push VIA end of function');
                $KU.executeWidgetEventHandler(widgetModel, handler);
            }
    };

    module.scrollToBottom = function(widgetPath) {

        $KU.logExecuting('voltmx.automation.segmentedui.scrollToBottom');
        if(arguments.length !== 1) {
            $KAUtils.throwExceptionInsufficientArguments();
        }
        $KU.logExecutingWithParams('voltmx.automation.segmentedui.scrollToBottom', widgetPath);
        if(!$KU.isArray(widgetPath)) {
            $KAUtils.throwExceptionInvalidArgumentType();
        }

        var widgetConfig = $KAUtils.getWidgetInstance(widgetPath);
        var widgetModel = widgetConfig.widgetInstance;
        if(!widgetModel) {
            $KAUtils.throwExceptionWidgetPathNotFound();
        }
        if(widgetModel.wType == "Segment") {
            $KW.APIUtils.setContentOffSet(widgetModel, {"x": 0, "y": 20000}, false);
        }
        $KU.logExecutingFinished('voltmx.automation.segmentedui.scrollToBottom');
    };

    module.scrollToRow = function(widgetPath) {

        $KU.logExecuting('voltmx.automation.segmentedui.scrollToRow');
        if(arguments.length !== 1) {
            $KAUtils.throwExceptionInsufficientArguments();
        }
        $KU.logExecutingWithParams('voltmx.automation.segmentedui.scrollToRow', widgetPath);
        if(!$KU.isArray(widgetPath)) {
            $KAUtils.throwExceptionInvalidArgumentType();
        }

        var segmentPath, indexStart, index, result, sectionIndex,
        rowIndex, widgetModel, data, widgetNode, widgetConfig;

        segmentPath = widgetPath.join('.');
        indexStart = segmentPath.indexOf("[");
        index = segmentPath.substring(indexStart + 1, segmentPath.indexOf("]"));
        segmentPath = segmentPath.substring(0, indexStart);
        segmentPath = segmentPath.split('.');

        index = index.split(',');
        if(index.length > 1) {
            sectionIndex = parseInt(index[0]);
            rowIndex = parseInt(index[1]);
        } else {
            sectionIndex = 0;
            rowIndex = parseInt(index[0]);
        }

        if(Number.isNaN(sectionIndex) || Number.isNaN(rowIndex)) {
            $KAUtils.throwExceptionInvalidSegementRowInfo();
        }

        widgetConfig = $KAUtils.getWidgetInstance(segmentPath);
        widgetModel = widgetConfig.widgetInstance;
        if(!widgetConfig.widgetInstance) {
            $KAUtils.throwExceptionWidgetPathNotFound();
        }

        data = widgetModel.data;

        if(widgetModel.hasSections) {
            if(data.length - 1 < sectionIndex) {
                    $KAUtils.throwExceptionSegmentInvalidRow();
                }
                if(data[sectionIndex].length - 1 < rowIndex) {
                    $KAUtils.throwExceptionSegmentInvalidRow();
                }
        } else {
            if(data.length - 1 < rowIndex) {
                $KAUtils.throwExceptionSegmentInvalidRow();
            }
        }

        if(widgetModel.wType == "Segment") {
            widgetNode = $KU.getNodeByModel(widgetModel);
            $KW.Segment.generateAndAdjustSegmentTillGivenIndexReached(widgetModel, widgetNode, [sectionIndex, rowIndex]);
            $KW.Segment.setFocus(widgetModel, widgetNode,[sectionIndex, rowIndex]);
        }
        $KU.logExecutingFinished('voltmx.automation.segmentedui.scrollToRow');
    };

    module.scrollToTop = function(widgetPath) {

        $KU.logExecuting('voltmx.automation.segmentedui.scrollToTop');
        if(arguments.length !== 1) {
            $KAUtils.throwExceptionInsufficientArguments();
        }
        $KU.logExecutingWithParams('voltmx.automation.segmentedui.scrollToTop', widgetPath);
        if(!$KU.isArray(widgetPath)) {
            $KAUtils.throwExceptionInvalidArgumentType();
        }

        var widgetConfig = $KAUtils.getWidgetInstance(widgetPath);
        var widgetModel = widgetConfig.widgetInstance;
        if(!widgetModel) {
            $KAUtils.throwExceptionWidgetPathNotFound();
        }
        if(widgetModel.wType == "Segment") {
            $KW.APIUtils.setContentOffSet(widgetModel, {"x": 0, "y": 0}, false);
        }
        $KU.logExecutingFinished('voltmx.automation.segmentedui.scrollToTop');
    };

    return module;
}());

voltmx.automation.collectionview = (function() {

    var module = {

        
        onItemSelect: function(widgetPath, itemIndex, sectionIndex) {

            if(arguments.length !== 2) {
                $KAUtils.throwExceptionInsufficientArguments();
            }

            var node = null;
            var rowItem = null;
            var sectionItem = null;
            var node1 = null;
            var widgetConfig = $KAUtils.getWidgetInstance(widgetPath);
            var widgetModel = widgetConfig.widgetInstance;
            if(!widgetModel) {
                $KAUtils.throwExceptionWidgetPathNotFound();
            }
            var isEventRequired = $KAUtils.isEventApplicable(widgetModel);
            if(!isEventRequired)
                return;
            if(widgetConfig) {
                node = $KAUtils.getNodeByModel(widgetConfig);

                    node1 = node.children[0].children[0].children[1];

                for(var i = 0; i < node1.childElementCount; i++) {
                    rowItem = parseInt(node1.children[i].getAttribute("index"));
                    if(sectionIndex != undefined) { 
                        sectionItem = parseInt(node1.children[i].getAttribute("secindex").split(",")[0]);
                    }
                    if((rowItem == itemIndex && sectionItem == sectionIndex) || (sectionIndex == undefined && rowItem == itemIndex)) {
                        node1.children[i].children[0].click();
                    }
                }
            }
        },

        scrolltoItem: function(widgetPath, itemData) {
            

        },

        
        getitem: function(widgetPath, itemIndex, sectionIndex) {

            if(arguments.length !== 2) {
                $KAUtils.throwExceptionInsufficientArguments();
            }

            var node = null;
            var rowItem = null;
            var sectionItem = null;
            var node1 = null;
            var widgetConfig = $KAUtils.getWidgetInstance(widgetPath);
            var widgetModel = widgetConfig.widgetInstance;
            if(!widgetModel) {
                $KAUtils.throwExceptionWidgetPathNotFound();
            }
            var isEventRequired = $KAUtils.isEventApplicable(widgetModel);
            if(!isEventRequired)
                return;
            node = $KAUtils.getNodeByModel(widgetConfig);

            node1 = node.children[0].children[0].children[1];

            for(var i = 0; i < node1.childElementCount; i++) {
                rowItem = parseInt(node1.children[i].getAttribute("index"));
                if(sectionIndex != undefined) { 
                    sectionItem = parseInt(node1.children[i].getAttribute("secindex").split(",")[0]);
                }
                if((rowItem == itemIndex && sectionItem == sectionIndex) || (!sectionIndex && rowItem == itemIndex)) {
                    return node1.children[i];
                }
            }
        },

        
        onPull: function(widgetPath) {

            if(arguments.length !== 1) {
                $KAUtils.throwExceptionInsufficientArguments();
            }

            var widgetConfig = $KAUtils.getWidgetInstance(widgetPath);
            var widgetModel = widgetConfig.widgetInstance;
            if(!widgetModel) {
                $KAUtils.throwExceptionWidgetPathNotFound();
            }
            var isEventRequired = $KAUtils.isEventApplicable(widgetModel);
            if(!isEventRequired)
                return;

            node = $KAUtils.getNodeByModel(widgetConfig);
            node1 = node.children[0].children[0].children[1];
            var itemIndex = {
                "itemIndex": 0,
                "sectionIndex": 0
            };
            widgetModel.scrollToItemAtIndex(itemIndex);
            var sHeight = parseInt(node1.children[0].style.height) % 100;
            for(var i = 0; i < sHeight + 1; i++) {
                voltmx.automation.widget.scroll(widgetPath, voltmx.automation.scrollDirection.Top);
            }
            var scrollerInstance = $KW.Utils.getScrollerInstance(widgetModel);
            scrollerInstance.options.onScrollEnd.call(scrollerInstance);

        },

        
        onPush: function(widgetPath) {

            if(arguments.length !== 1) {
                $KAUtils.throwExceptionInsufficientArguments();
            }

            var widgetConfig = $KAUtils.getWidgetInstance(widgetPath);
            var widgetModel = widgetConfig.widgetInstance;
            if(!widgetModel) {
                $KAUtils.throwExceptionWidgetPathNotFound();
            }
            var isEventRequired = $KAUtils.isEventApplicable(widgetModel);
            if(!isEventRequired)
                return;

            node = $KAUtils.getNodeByModel(widgetConfig);
            node1 = node.children[0].children[0].children[1];
            var k = node1.childElementCount - 1;
            var rowItem = parseInt(node1.children[k].getAttribute("index"));
            if(node1.children[k].getAttribute("secindex") != undefined) { 
                sectionItem = parseInt(node1.children[k].getAttribute("secindex").split(",")[0]);
            }
            var itemIndex = {
                "itemIndex": rowItem,
                "sectionIndex": sectionItem
            };
            widgetModel.scrollToItemAtIndex(itemIndex);
            voltmx.automation.widget.scroll(widgetPath, voltmx.automation.scrollDirection.Bottom);
            var scrollerInstance = $KW.Utils.getScrollerInstance(widgetModel);
            scrollerInstance.options.onScrollEnd.call(scrollerInstance);

        }

    };

    return module;
}());

voltmx.automation.tabpane = (function() {

    var module = {

        click: function(widgetPath, tabHeader) {

            $KU.logExecuting('voltmx.automation.tabpane.click');
            if(arguments.length !== 2) {
                $KAUtils.throwExceptionInsufficientArguments();
            }
            $KU.logExecutingWithParams('voltmx.automation.tabpane.click', widgetPath, tabHeader);
            if(!$KU.isArray(widgetPath) || typeof tabHeader !== 'string') {
                $KAUtils.throwExceptionInvalidArgumentType();
            }

            var node = null;
            var widgetConfig = $KAUtils.getWidgetInstance(widgetPath);
            var widgetModel = widgetConfig.widgetInstance;
            if(!widgetModel) {
                $KAUtils.throwExceptionWidgetPathNotFound();
            }
            node = $KAUtils.getNodeByModel(widgetConfig);
            $KU.logExecutingFinished('voltmx.automation.tabpane.click');

            
            var node1 = node.children[0].children[0];

            for(var i = 0; i < node1.childElementCount; i++) {
                var tabID = node1.children[i].id.split("_")[2];
                if(tabID == tabHeader) {
                    node1.children[i].click();
                    break;
                }
            }

        }

    };

    return module;
}());

voltmx.automation.slider = (function() {

    var module = {

        slide: function(widgetPath, selectedValue) {

            $KU.logExecuting('voltmx.automation.slider.slide');
            if(arguments.length !== 2) {
                $KAUtils.throwExceptionInsufficientArguments();
            }

            $KU.logExecutingWithParams('voltmx.automation.slider.slide', widgetPath, selectedValue);
            if(!$KU.isArray(widgetPath) || typeof selectedValue !== 'number') {
                $KAUtils.throwExceptionInvalidArgumentType();
            }

            var node = null;
            var widgetConfig = $KAUtils.getWidgetInstance(widgetPath);
            var widgetModel = widgetConfig.widgetInstance;
            if(!widgetModel) {
                $KAUtils.throwExceptionWidgetPathNotFound();
            }

            node = $KAUtils.getNodeByModel(widgetConfig);
            $KW.Slider.sliderUpdate(node, selectedValue, widgetModel);
            $KU.logExecutingFinished('voltmx.automation.slider.slide');
            $KU.callTargetEventHandler(widgetModel, node, 'onslide');
        }

    };

    return module;
}());
