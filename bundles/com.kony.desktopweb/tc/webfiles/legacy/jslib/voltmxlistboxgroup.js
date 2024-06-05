
$KW.ListBox = (function() {
    
    

    var module = {
        initialize: function() {
            voltmx.events.addEvent("change", "ListBox", this.eventHandler);
            voltmx.events.addEvent("click", "ListBox", this.eventHandler);
        },

        initializeView: function(formId) {
            var editableLists = document.querySelectorAll("div[name='SelectOptionsList']");
            if(editableLists) {
                for(var i = 0; i < editableLists.length; i++) {
                    this.initializeEditableList(editableLists[i].parentNode);
                }
            }
        },

        initializeEditableList: function(editableList) {
            var list = editableList,
                listboxModel = $KU.getModelByNode(list),
                containerNode = null,
                containerWidget = null;
                secIndex = null,
                index = null;
                editableListInstance = list.id + "_autoComplete";

            editableListInstance = module.createEditableListInstance(editableList, editableListInstance);
            $KG["listBoxEditableInstances"].push(editableListInstance);
            $KG[editableListInstance] = new module.autocomplete(list, {
                model: listboxModel
            });
        },

        createEditableListInstance: function(listBoxNode, editableListInstance) {
            var containerWidgets = ['Segment','CollectionView'],
                containerId = listBoxNode.getAttribute("kcontainerID"),
                containerWidget,
                rowNode = null,
                secIndex = null,
                index = null;

            if(containerId) {
                containerWidget = $KW.Utils.getContainerModelById(listBoxNode, containerId).wType;
            }
            if(containerWidgets.indexOf(containerWidget) != -1) {
                rowNode = $KU.getParentByAttribute(listBoxNode, 'index');
                secIndex = rowNode.getAttribute('secindex');
                if(secIndex) {
                    editableListInstance += 'secindex' + secIndex;
                }
                index = rowNode.getAttribute('index');
                if(index) {
                    editableListInstance += 'index' + index;
                }
            }
            return editableListInstance;
        },

        updateView: function(widgetModel, propertyName, propertyValue, oldPropertyValue) {
            var element = $KU.getNodeByModel(widgetModel);

            $KW.Utils.updateMasterData({
                "widgetModel": widgetModel,
                'widgetNode': element,
                'propertyName': propertyName
            });

            switch(propertyName) {
                case "multiselectrows":
                    if(element && widgetModel.multiple) {
                        element.setAttribute("size", propertyValue);
                    }
                    break;

                case "masterdatamap":
                case "masterdata":
                    var data = $KW.Utils.getMasterData(widgetModel);
                    widgetModel.selectedkey = widgetModel.selectedkeys = widgetModel.selectedkeyvalue = widgetModel.selectedkeyvalues = null;
                    if(element) {
                        
                        widgetModel.context.ispercent = "";

                        var temp = document.createElement("div");
                        temp.innerHTML = this.generateList(widgetModel, data, widgetModel.context);
                        element.parentNode.replaceChild(temp.firstChild, element);
                        if(widgetModel.viewtype == constants.LISTBOX_VIEW_TYPE_EDITVIEW) {
                            var list = $KU.getNodeByModel(widgetModel);
                            module.initializeEditableList(list);
                        }
                        
                        element = $KU.getNodeByModel(widgetModel);
                        var isFlexWidget = $KW.FlexUtils.isFlexWidget(widgetModel);
                        if(isFlexWidget) {
                            $KW.FlexUtils.setPaddingByParent(widgetModel, element);
                            $KW.FlexUtils.setDimensions(widgetModel, element.parentNode);
                        }
                        $KU.toggleVisibilty(element, data, widgetModel);
                    }
                    break;

                case "selectedkeys":
                    $KW.Utils.setSelectedValueProperty(widgetModel, $KW.Utils.getMasterData(widgetModel), "selectedkeys");
                    if(element) {
                        if(element.tagName == 'SELECT') {
                            var choices = element.options;
                            if(choices.length > 0) {
                                for(var i = 0; i < choices.length; i++) {
                                    if(widgetModel.selectedkeys &&
                                        $KU.inArray(widgetModel.selectedkeys, choices[i].value)[0]) {
                                        choices[i].selected = true;
                                    } else {
                                        choices[i].selected = false;
                                    }
                                }
                                if(!widgetModel.selectedkeys) {
                                    if(!widgetModel.multiple) choices[0].selected = true; 
                                    widgetModel.selectedkeyvalues = null;
                                }
                            }
                        } else if(element.tagName == 'DIV') {
                            if(widgetModel.selectedkeys) {
                                element.innerText = widgetModel.selectedkeyvalues[1][2];
                            } else {
                                element.innerText = widgetModel.masterdata[1][2];
                            }
                        }
                    }
                    break;

                case "selectedkey":
                    var key = widgetModel.selectedkey;
                    if(widgetModel.viewtype == "editableview") {
                        var data = $KW.Utils.getMasterData(widgetModel);
                        var isModified = false;
                        if(data.length > IndexJL) {
                            for(var i = IndexJL; i < data.length; i++) {
                                if(data[i][IndexJL] == key) {
                                    element.children[0].value = data[i][IndexJL + 1];
                                    isModified = true;
                                    widgetModel["selectedkeyvalue"] = [key, data[i][IndexJL + 1]];
                                    IndexJL && widgetModel["selectedkeyvalue"].splice(0, 0, null);
                                }
                            }
                        }
                        if(!isModified || data.length < 0) {
                            element.children[0].value = key;
                            widgetModel["selectedkeyvalue"] = [key, key];
                            IndexJL && widgetModel["selectedkeyvalue"].splice(0, 0, null);
                        }
                    }
                    if(element) {
                        
                        element.value = widgetModel.selectedkey;
                    }
                    $KW.Utils.setSelectedValueProperty(widgetModel, $KW.Utils.getMasterData(widgetModel), "selectedkey");
                    break;
                case "viewtype":
                case "autosuggest":
                    if(element) {
                        var data = $KW.Utils.getMasterData(widgetModel);
                        var temp = document.createElement("div");
                        temp.innerHTML = this.generateList(widgetModel, data, {
                            tabpaneID: element.getAttribute("ktabpaneid")
                        });
                        element.parentNode.replaceChild(temp.firstChild, element);
                        if(widgetModel.viewtype == constants.LISTBOX_VIEW_TYPE_EDITVIEW) {
                            var listNode = $KU.getNodeByModel(widgetModel);
                            module.initializeEditableList(listNode);
                            if(propertyName == "autosuggest" && propertyValue && data && data.length > IndexJL) {
                                element = $KU.getNodeByModel(widgetModel);
                                $KG[element.id + "_autoComplete"] = new module.autocomplete(element, {
                                    data: data,
                                    model: widgetModel
                                });
                            }
                        }
                        element = $KU.getNodeByModel(widgetModel);
                        var isFlexWidget = $KW.FlexUtils.isFlexWidget(widgetModel);
                        if(isFlexWidget) {
                            $KW.FlexUtils.setPaddingByParent(widgetModel, element);
                            $KW.FlexUtils.setDimensions(widgetModel, element.parentNode);
                        }
                    }
                    break;

                case "editableareaskin":
                    if(element && widgetModel.viewtype == "editableview") {
                        element.childNodes[0].className = propertyValue;
                    }
                    break;
            }
        },

        render: function(listboxModel, context) {
            var data = $KW.Utils.getMasterData(listboxModel);
            data.ispercent = context.ispercent;
            listboxModel.context = context;
            return this.generateList(listboxModel, data, context);
        },

        generateList: function(listboxModel, data, context) {
            if(listboxModel.isCloned && data.length == 0) {
                return "";
            }
            var computedSkin = $KW.skins.getWidgetSkinList(listboxModel, context, data);
            var multiple = listboxModel.multiple ? " multiple" : "";
            var size = listboxModel.multiselectrows ? " size=" + parseInt(listboxModel.multiselectrows) : ""
            var htmlString = "";

            if(listboxModel.viewtype == "editableview") {
                var value = "";
                var options = "";
                var cwt = $KW.skins.getMarPadAdjustedContainerWeightSkin(listboxModel, 100);

                if(data.length > IndexJL) {
                    var key = listboxModel.selectedkey;
                    listboxModel.selectedkey = key ? key : data[IndexJL][IndexJL]; 
                    $KW.Utils.setSelectedValueProperty(listboxModel, data, "selectedkey");
                }
                for(var i = IndexJL; i < data.length; i++) {
                    (listboxModel.selectedkey == data[i][IndexJL]) && (value = data[i][1 + IndexJL]);
                    if(!listboxModel.autosuggest) {
                        options += "<div value='" + data[i][IndexJL] + "' name='SelectOptionList' style='padding: 1px; padding-left:3px;" + (listboxModel.selectedkey == data[i][1] ? "background-color:#3169C6;color:#FFFFFF" : "") + "'>" + data[i][1 + IndexJL] + "</div>";
                    }
                }
                value = value || listboxModel.selectedkey || "";
                
                var style = "line-height:16px !important;width:50%;padding-left:2px;font: inherit;border:0px;float:left;" + (!listboxModel.editableareaskin ? "background:transparent;" : "");
                htmlString = "<div " + $KW.Utils.getBaseHtml(listboxModel, context) + "style='position: relative;' class='" + computedSkin + "'><input class='" + listboxModel.editableareaskin + "'" + " style='" + style + "' type='text' value='" + value + "'" + ((listboxModel.length) ? " maxlength='" + listboxModel.length + "'" : "") + "/><img name='SelectImage' src='" + $KU.getImageURL("select_arrow.gif") + "' onmouseover='$KW.ListBox.toggleSelection(arguments[0])' onmouseout='$KW.ListBox.toggleSelection(arguments[0])' style='position: absolute; right:0px; height: 100%;' onload='$KW.ListBox.adjustWidthOnLoad(arguments[0])'/>";
                style = "position: absolute;z-index: 10;display:none;text-align:left;left:-1px;";
                htmlString += "<div id='" + listboxModel.pf + "_" + listboxModel.id + "_options' name='SelectOptionsList' class='" + cwt + " " + (listboxModel.skin || "") + "' style='overflow:auto;max-height:150px;" + style + "' onmouseover='this.parentNode.firstChild.blur();$KW.ListBox.toggleSelection(arguments[0])'>" + options + "</div>";
                htmlString += "</div>";
                return htmlString;
            }
            
            var align = listboxModel.contentalignment == constants.CONTENT_ALIGN_MIDDLE_RIGHT ? " dir='rtl'" : '';
            htmlString = "<select" + align + $KW.Utils.getBaseHtml(listboxModel, context) + "class='" + computedSkin + "' " + (listboxModel.disabled ? "disabled='true' " : "") + multiple + size + " style='" + $KW.skins.getBaseStyle(listboxModel, context) + "'";
            htmlString += ">";

            if(data.length > IndexJL) {
                listboxModel.selectedkey && $KW.Utils.setSelectedValueProperty(listboxModel, data, "selectedkey");
                listboxModel.selectedkeys && $KW.Utils.setSelectedValueProperty(listboxModel, data, "selectedkeys");
                if(listboxModel.needsectionheaders) {
                    htmlString += this.generateGroupOptions(listboxModel, data);
                } else {
                    htmlString += this.generateOptions(listboxModel, data);
                }
            }
            htmlString += "</select>";
            return htmlString;
        },

        generateGroupOptions: function(listboxModel, data) {
            var htmlString = "";
            for(var i = 1; i < data.length; i++) {
                if(data[i][1] != null && $KU.isArray(data[i][2])) {
                    htmlString += "<optgroup label='" + data[i][1] + "' class='" + (listboxModel.sectionskin || "") + "'>";
                    htmlString += this.generateOptions(listboxModel, data[i][2]);
                    htmlString += "</optgroup>";
                }
            }
            return htmlString;
        },

        generateOptions: function(listboxModel, data) {
            var htmlString = "";
            if(data.length > IndexJL) {
                var key = listboxModel.selectedkey;
                listboxModel.selectedkey = key ? key : data[IndexJL][IndexJL]; 
                $KW.Utils.setSelectedValueProperty(listboxModel, data, "selectedkey");
            }
            var selected = false;
            for(var i = IndexJL; i < data.length; i++) {
                if(data[i][IndexJL] != null) {
                    if(listboxModel.multiple)
                        selected = (listboxModel.selectedkeys && $KU.inArray(listboxModel.selectedkeys, data[i][IndexJL])[0]) ? "selected" : "";
                    else
                        selected = (listboxModel.selectedkey && listboxModel.selectedkey == data[i][IndexJL]) ? "selected" : "";
                    var ariaString = $KU.getAccessibilityValues(listboxModel, data[i][2 + IndexJL], data[i][IndexJL]);
                    htmlString += "<option value=\"" + data[i][IndexJL] + "\" " + selected + ariaString + ">" + $KU.escapeHTMLSpecialEntities(data[i][1 + IndexJL]) + "</option>";
                }
            }
            return htmlString;
        },

        printFunctionality: function(listboxModel, target, data) {
            var inputElements = target.childNodes;
            for(var i = 0; i < inputElements.length; i++) {
                inputElements[i].removeAttribute("selected");
            }

            if(listboxModel.multiple) {
                for(var j = 0; j < listboxModel.selectedkeys.length; j++) {
                    for(var i = 0; i < inputElements.length; i++) {
                        var selectElement = (listboxModel.selectedkeys[j] == data[i][0]) ? "selected" : "";
                        if(selectElement == "selected") {
                            target.childNodes[i].setAttribute("selected", "");
                            break;
                        }
                    }
                }
            } else {
                for(var i = 0; i < inputElements.length; i++) {
                    var selectElement = (listboxModel.selectedkey == data[i][0]) ? "selected" : "";
                    if(selectElement == "selected") {
                        target.childNodes[i].setAttribute("selected", "");
                        break;
                    }
                }
            }
        },

        eventHandler: function(eventObject, target, srcElement) {
            var listboxModel = $KU.getModelByNode(target);
            if(!listboxModel) {
                return
            }

            
            if(eventObject.type == 'click' && target.tagName == "SELECT") {
                return;
            }
            var data = $KW.Utils.getMasterData(listboxModel);

            $KAR && $KAR.sendRecording(listboxModel, 'selectItem', {selection: target.value, 'target': target, 'eventType': 'uiAction'});
            if(target.getAttribute("kcontainerID")) {

                
                $KW.ListBox.updateListboxKey(listboxModel, target);
                $KU.callTargetEventHandler(listboxModel, target, 'onselection');
            }
            else {

                if(listboxModel.viewtype == "editableview") {
                    $KW.ListBox.setSelectedKeysEditableListBox(listboxModel, target, eventObject);
                }
                else {
                    $KW.ListBox.updateListboxKey(listboxModel, target);
                    $KW.ListBox.printFunctionality(listboxModel, target, data);

                    $KW.Utils.setSelectedValueProperty(listboxModel, data, "selectedkey");
                    $KW.Utils.setSelectedValueProperty(listboxModel, data, "selectedkeys");
                    $KW.ListBox.processListBoxEvents(listboxModel, target);
                }

            }
        },

        updateListboxKey: function(listboxModel, target) {
            var selectedkeys = (IndexJL == 1 ? [null] : []);
            if(target.tagName == 'SELECT') {
                for(var i = 0; i < target.options.length; i++) {
                    if(target.options[i].selected) {
                        listboxModel.selectedkey = target.options[i].value;
                        selectedkeys.push(target.options[i].value);
                    }
                }
            }
            listboxModel.selectedkeys = selectedkeys;
        },

        processListBoxEvents: function(widgetModel, widgetNode) {

            if(widgetNode.tagName == 'SELECT'
            || widgetNode.tagName == 'DIV') {
                var listboxHandlr = $KU.returnEventReference(widgetModel.ondone || widgetModel.onselection);
                spaAPM && spaAPM.sendMsg(widgetModel, 'onselection');
                
                if(listboxHandlr) {
                    $KU.executeWidgetEventHandler(widgetModel, listboxHandlr);
                    $KU.onEventHandler(widgetModel);
                }
            }

        },
        setSelectedKeysEditableListBox: function(widgetModel, widgetNode, eventRef) {
            var srcEle = eventRef.srcElement,
                instanceId = widgetNode.id + "_autoComplete",
                key,
                instance = null,
                optionsDiv = widgetNode.children[2],
                data = $KW.Utils.getMasterData(widgetModel);

            instanceId = module.createEditableListInstance(widgetNode, instanceId);
            instance = $KG[instanceId];
            if(srcEle.tagName == 'IMG') {
                if(optionsDiv.style.display == 'block') {
                    instance.hideDropdown();
                } else {
                    if(widgetModel.autosuggest) {
                        instance.renderDropdown(data);
                    }
                    instance.showDropdown(widgetNode);
                    module.setSelectedSkin(widgetModel, optionsDiv.children);
                }
            } else if(srcEle.getAttribute("name") == 'SelectOptionList') {
                key = srcEle.getAttribute("value");
                widgetNode.children[0].value = srcEle.innerText || srcEle.textContent;
                srcEle.style.backgroundColor = "#3169C6";
                srcEle.style.color = "#FFFFFF";
                instance.hideDropdown();
                widgetModel["selectedkeyvalue"] = IndexJL ? [null, key, srcEle.innerText || srcEle.textContent] : [key, srcEle.innerText || srcEle.textContent];
                widgetModel.selectedkey = key;
                $KW.ListBox.processListBoxEvents(widgetModel, widgetNode);
            } else { 
                if(eventRef.type == "click") {
                    instance.hideDropdown();
                }
                key = srcEle.value;
                widgetModel["selectedkeyvalue"] = IndexJL ? [null, key, key] : [key, key];
                widgetModel.selectedkey = key;
            }

        },


        adjustHeight: function(list) {
            list.style.height = list.childNodes[0].offsetHeight + 'px';
        },

        adjustWidth: function(listboxModel, list) {
            if(listboxModel && listboxModel.viewtype == "editableview") {
                var pWidth = list.clientWidth;
                var imgWidth = list.children[1].clientWidth;
                if(pWidth && imgWidth)
                    list.firstChild.style.width = ((pWidth - imgWidth) / pWidth) * 100 + '%';
            }
        },

        adjustWidthOnLoad: function(event) {
            var event = event || window.event;
            var target = event.currentTarget || event.srcElement;
            var list = target.parentNode;
            var listboxModel = $KU.getModelByNode(list);
            module.adjustWidth(listboxModel, list);
        },

        setSelectedSkin: function(model, options) {
            for(var i = 0; i < options.length; i++) {
                if(model.selectedkeyvalue && options[i].innerHTML == model.selectedkeyvalue[1]) {
                    options[i].style.backgroundColor = "#3169C6";
                    options[i].style.color = "#FFFFFF";
                } else {
                    options[i].style.backgroundColor = "";
                    options[i].style.color = "";
                }
            }
        },

        toggleSelection: function(event) {
            var event = event || window.event;
            var target = event.currentTarget || event.srcElement;
            if(target.tagName == "IMG") {
                if(event.type == "mouseover") {
                    target.src = $KU.getImageURL("select_arrow_hover.gif");
                } else {
                    target.src = $KU.getImageURL("select_arrow.gif");
                }
            } else {
                var optionsDiv = target;
                var listboxModel = $KU.getModelByNode(optionsDiv.parentNode);
                var options = optionsDiv.children;
                for(var i = 0; i < options.length; i++) {
                    if(listboxModel.selectedkeyvalue && options[i].innerHTML == listboxModel.selectedkeyvalue[1 + IndexJL]) {
                        options[i].style.backgroundColor = "";
                        options[i].style.color = "";
                    }
                }
            }
        }
    };

    module.autocomplete = function(el, options) {
        this.textBox = el.childNodes[0];
        this.dropDown = el.childNodes[2];
        if(options && options.model.autosuggest) {
            for(var i in options) this[i] = options[i];
            voltmx.events.addEventListener(el, 'keyup', this.handleEvent.bind(this));
            voltmx.events.addEventListener(el, 'keydown', this.handleEvent.bind(this));
        }
    };

    module.autocomplete.prototype = {
        handleEvent: function(e) {
            e = e || window.event;
            var list = e.target.parentNode;
            var that = this;
            switch(e.type) {
                case "keydown":
                    that.onKeyDown(e, list);
                    break;
                case "keyup":
                    that.onKeyUp(e, list);
                    break;
            }
        },

        onKeyDown: function(event, list) {
            if(!event) event = window.event;

            var keyCode = event.keyCode;
            switch(keyCode) {
                case 38: 
                    this.moveUp(list);
                    break;
                case 40: 
                    this.moveDown(list);
                    break;
            }
        },

        onKeyUp: function(event, list) {
            if(!event) event = window.event;

            var keyCode = event.keyCode;
            if((keyCode >= 33 && keyCode < 46) || (keyCode >= 112 && keyCode <= 123)) {
                
            } else if(keyCode == 13 || keyCode == 27) { 
                this.dropDown.style.display = "none";
            } else {
                this.showOptions(list);
            }
        },

        showOptions: function(list) {
            var txt = this.textBox.value;
            this.cur = -1;
            if(txt.length > 0) {
                var matches = this.getMatches(txt);
                if(matches.length > IndexJL) {
                    this.renderDropdown(matches);
                    this.showDropdown(list);
                } else {
                    this.dropDown.innerHTML = "";
                    this.hideDropdown();
                }
            } else {
                
                var matches = $KW.Utils.getMasterData(this.model);
                if(matches.length > IndexJL) {
                    this.renderDropdown(matches);
                    this.showDropdown(list);
                }
            }
        },

        renderDropdown: function(matches) {
            while(this.dropDown.hasChildNodes()) {
                this.dropDown.removeChild(this.dropDown.firstChild);
            }
            for(var i = IndexJL; i < matches.length; i++) {
                var oNew = document.createElement('div');
                oNew.innerHTML = "<div value='" + matches[i][IndexJL] + "' name='SelectOptionList' style='padding: 1px; padding-left:3px;" + (this.model.selectedkey == matches[i][IndexJL] ? "background-color:#3169C6;color:#FFFFFF" : "") + "'>" + matches[i][1 + IndexJL] + "</div>";
                this.dropDown.appendChild(oNew.firstChild);
            }
        },

        getMatches: function(str) {
            var matches = IndexJL ? [null] : [];
            this.model.selectedkey = null;
            
            var data = $KW.Utils.getMasterData(this.model);
            if(data && data.length > IndexJL) {
                for(var i = IndexJL; i < data.length; i++) {
                    if(data[i][1 + IndexJL].toLowerCase().indexOf(str.toLowerCase()) == 0) { 
                        matches.push(IndexJL ? [null, data[i][IndexJL], data[i][1 + IndexJL]] : [data[i][IndexJL], data[i][1 + IndexJL]]);
                        if(str == data[i][1 + IndexJL]) {
                            this.model.selectedkey = data[i][IndexJL];
                        }
                    }
                }
            }
            return matches;
        },

        moveUp: function(list) {
            this.showDropdown(list);
            var options = this.dropDown.childNodes;
            if(options.length > 0 && this.cur > 0) {
                --this.cur;
                this.setSelectedValue(options);
            }
        },

        moveDown: function(list) {
            this.showDropdown(list);
            var options = this.dropDown.childNodes;
            if(options.length > 0 && this.cur < (options.length - 1)) {
                ++this.cur;
                this.setSelectedValue(options);
            }
        },

        setSelectedValue: function(options) {
            for(var i = 0; i < options.length; i++) {
                if(i == this.cur) {
                    options[i].style.backgroundColor = "#3169C6";
                    options[i].style.color = "#FFFFFF";
                    this.textBox.value = options[i].innerHTML;
                    this.model.selectedkey = options[i].getAttribute("value");
                    this.model.selectedkeyvalue = IndexJL ? [null, this.model.selectedkey, this.textBox.value] : [this.model.selectedkey, this.textBox.value];
                } else {
                    options[i].style.backgroundColor = "";
                    options[i].style.color = "";
                }
            }
        },

        showDropdown: function(list) {
            module.adjustHeight(list);
            this.dropDown.style.top = (list.offsetHeight - 1) + 'px';
            this.dropDown.style.width = list.offsetWidth + 'px';
            this.dropDown.style.display = "block";
            this.dropDown.parentNode.parentNode.style.overflow = "visible";
        },

        hideDropdown: function() {
            this.dropDown.style.display = "none";
            this.dropDown.parentNode.parentNode.style.overflow = "hidden";
        }
    };


    return module;
}());
