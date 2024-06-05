function containerWidgetExtendAdd(widgetarray) {
    this.ownchildrenref = this.ownchildrenref.concat(widgetarray);
    this.createhierarchy(widgetarray);
    this.setparent(widgetarray); 
};


function containerWidgetExtendAddAt(widgetref, index) {
    index = index < IndexJL ? IndexJL : (index - IndexJL > this.ownchildrenref.length ? this.ownchildrenref.length + 1 : index - IndexJL);
    this.children.splice(index, 0, widgetref.id);
    this.ownchildrenref.splice(index, 0, widgetref);
    widgetref.parent = this;
    this.createhierarchy([widgetref]);
};

function containerWidgetExtendRemove(widgetref) {
    _voltmxConstNS.ContainerWidget.prototype.removeReferences.call(this, widgetref);
    boxWidgetExtendRemoveUpdate.call(this, widgetref, true);
};

function containerWidgetExtendRemoveAt(index) {
    var remwidgetref = null;
    if(index >= IndexJL && index - IndexJL <= this.ownchildrenref.length) {
        var remwidgetref = this.ownchildrenref[index - IndexJL];
        remwidgetref && _voltmxConstNS.ContainerWidget.prototype.remove.call(this, remwidgetref);
    }
    boxWidgetExtendRemoveUpdate.call(this, remwidgetref, true);
    return remwidgetref;
};

function containerWidgetExtendSetParent(widgetarray) {
    for(var i = 0; i < widgetarray.length; i++) {
        this.children.push(widgetarray[i].id);
        widgetarray[i].parent = this;
        
        if(widgetarray[i].defineContainerGetter) {
            widgetarray[i].defineContainerGetter(this);
            widgetarray[i].defineContainerSetter(this);
        }
    }
};


function __createHierarchy(that, widgetref, containerType) {
    if(widgetref.id == undefined) {
        throw new VoltmxError(1102, 'WidgetError', 'Widget ID cannot be null, please provide proper ID');
    }
    if(($KG.appbehaviors[constants.API_LEVEL] >= constants.API_LEVEL_7000) && that[widgetref.id] && !widgetref.childHierarchy) {
        throw new VoltmxError(1102, 'WidgetError', 'Duplicate widget ID found while added to Form, Widget ID:-' + widgetref.id);
    } else if(!widgetref.immediateMaster) {
        if( that.wType == 'Form' && (that[widgetref.id] && that[widgetref.id] != widgetref)) {
            containerWidgetExtendRemoveReferences.call(widgetref.parent, widgetref);
            throw new VoltmxError(1102, 'WidgetError', 'Duplicate widget ID found while added to Form, Widget ID:-' + widgetref.id);
        }
        that[widgetref.id] = widgetref;
        widgetref.childHierarchy = true;
    }

    if(containerType == "Form" && (that.wType == 'Popup' || that.wType == 'Form') && widgetref.screenLevelWidget) {
        that['screenLevelWidgets'] = that['screenLevelWidgets'] || {};
        that['screenLevelWidgets'][widgetref.id] = widgetref;
    }

    if((voltmx.application.getCurrentForm() == null || voltmx.application.getCurrentForm().id != currentFormName) && widgetref.parent instanceof voltmx.ui.FlexContainer){ 
        that[widgetref.id] = widgetref; 
        widgetref.childHierarchy = true; 
    }
    if(that instanceof voltmx.ui.Form2)
        currentFormName = that.id;
    if(that.wType == "TabPane")
        widgetref.pf = that.pf;
    else
        widgetref.pf = that.id;

    if(widgetref.wType == 'Map') {
        that[widgetref.id] = widgetref;
    }


}

function containerWidgetExtendCreateHierarchy(widgetarray) {
    for(var i = 0; i < widgetarray.length; i++) {
        var widgetref = widgetarray[i];
        __createHierarchy(this, widgetref, "container");
        widgetref.layoutConfig = {
            self: true,
            children: false
        }; 
        
        if(this.isMaster) {
            updateImmediateMasterToChilds(widgetref, this);
        }
        
        if(this.immediateMaster) {
            updateImmediateMasterToChilds(widgetref, $KW.Utils.getMasterWidgetModel(this));
        }
    }
};


function updateImmediateMasterToChilds(widgetModel, immediateMaster) {
    if(!widgetModel.immediateMaster) {
        if(immediateMaster[widgetModel.id] &&  immediateMaster[widgetModel.id] != widgetModel) {
            containerWidgetExtendRemoveReferences.call(immediateMaster[widgetModel.pf], widgetModel);
            throw new VoltmxError(1102, 'WidgetError', 'Duplicate widget ID found while adding to Container, Widget ID:-' + widgetModel.id);
        }
        immediateMaster[widgetModel.id] = widgetModel;
        widgetModel.immediateMaster = immediateMaster.id;
    }
    if(widgetModel.isMaster) {
        immediateMaster = widgetModel;
    }
    if(widgetModel.isContainerWidget) {
        for(var i = 0; i < widgetModel.children.length; i++) {
            var childModel = widgetModel[widgetModel.children[i]];
            updateImmediateMasterToChilds(childModel, immediateMaster);
        }
    }
};


function generateKMasterID(widgetModel) {
    var proxyModel = $KW.Utils.getActualWidgetModel(widgetModel, true);
    if(proxyModel.isContainerWidget) {
        var childArrLen = proxyModel.children.length;
        for(var i = 0; i < childArrLen; i++) {
            var childModel = proxyModel[proxyModel.children[i]];
            generateKMasterID(childModel);
        }
    }
    setKMasterIDToWidgetModel(proxyModel);
}

function setKMasterIDToWidgetModel(widgetModel) {
    var str = [];
    var pMaster = widgetModel.parent;
    if(widgetModel._userWidget) {
        pMaster = widgetModel.kComponentModel.parent;
    }
    while(pMaster) {
        if(pMaster.isMaster) {
            str.push(pMaster.id);
        }
        if(pMaster._userWidget) {
            pMaster = pMaster.kComponentModel.parent;
        } else {
            pMaster = pMaster.parent;
        }
    }
    var kmasterid = str.reverse().join("_");
    if(kmasterid != "") {
        widgetModel.kmasterid = kmasterid;
    }
}

function containerWidgetExtendRemoveReferences(widgetref) {
    delete this[widgetref.id];
    if((this.wType == "Form" || this.wType == "Popup") && this['screenLevelWidgets'] && this['screenLevelWidgets'][widgetref.id])
        delete this['screenLevelWidgets'][widgetref.id];

    if(this.children.remove)
        this.children.remove(widgetref.id);
    else {
        var chld = this.children;
        if(chld.indexOf(widgetref.id) >= 0) {
            chld && chld.splice(chld.indexOf(widgetref.id), 1);
        }
    }
    var chldref = this.ownchildrenref;
    chldref && chldref.splice(chldref.indexOf(widgetref), 1);
    removeReferencesFromTopLevelModel(widgetref);
    removeImmediateMasterProperty(widgetref);
};


function removeAllReferences(widgetRef) {
    var topLevelModel = $KU.getFormModel(widgetRef.pf);
    if(topLevelModel) {
        if(widgetRef instanceof _voltmxConstNS.ContainerWidget && !widgetRef.isMaster) {
            var widgets = widgetRef.widgets();
            for(var i = 0; i < widgets.length; i++) {
                delete topLevelModel[widgets[i].id];
                if(widgets[i] instanceof _voltmxConstNS.ContainerWidget)
                    removeAllReferences(widgets[i]);
            }
        } else
            delete topLevelModel[widgetRef.id];
    }
}

function containerWidgetExtendRemoveAll() {
    containerWidgetExtendRemoveAllReferences.call(this);
    this.ownchildrenref = [];
    this.children = [];
};

function containerWidgetExtendRemoveAllReferences() {
    var widgets = this.widgets();
    for(var i = 0; i < widgets.length; i++) {
        var widget = widgets[i];
        delete this[widget.id];
        removeReferencesFromTopLevelModel(widget);
        removeImmediateMasterProperty(widget);
    }
}

function boxWidgetExtendAdd(widgetarray) {
    _voltmxConstNS.ContainerWidget.prototype.add.call(this, widgetarray);
    if($KU.getFormModel(this.pf)) {
        $KU.getFormModel(this.pf).createFormLevelHierarchy(widgetarray);
    } else if(window[this.pf]) {
        var tempRef = window[this.pf];
        _voltmxConstNS.Form2.prototype.createFormLevelHierarchy.call(tempRef, tempRef.ownchildrenref);
    }
    _voltmxConstNS.Form2.getallboxes.call(this, widgetarray); 
    for(var i = 0; i < this.allboxes.length; i++) { 
        var boxWidget = this.allboxes[i]; 
        var childwidgets = boxWidget.ownchildrenref; 
        this.createhierarchy.call(this, childwidgets); 
    }
    $KW.FlexContainer.addChild(this, widgetarray);
};

function boxWidgetExtendAddAt(widgetref, index) {
    _voltmxConstNS.ContainerWidget.prototype.addAt.call(this, widgetref, index);
    if($KU.getFormModel(this.pf)) {
        $KU.getFormModel(this.pf).createFormLevelHierarchy([widgetref]);
    } else if(window[this.pf]) {
        var tempRef = window[this.pf];
        _voltmxConstNS.Form2.prototype.createFormLevelHierarchy.call(tempRef, tempRef.ownchildrenref);
    }

    $KW.FlexContainer.addChildat(this, [widgetref], index);
};

function boxWidgetExtendRemove(widgetref) {
    if(widgetref) {
        $KW.FlexContainer.DOMremove(this, widgetref);
        var widgetIndex = this.ownchildrenref.indexOf(widgetref);
        _voltmxConstNS.ContainerWidget.prototype.remove.call(this, widgetref);
        if(widgetIndex != -1)
            $KW.FlexUtils.onWidgetRemove(this, widgetIndex);
    }
};

function boxWidgetExtendRemoveAt(index) {
    $KW.FlexContainer.DOMremove(this, this.ownchildrenref[index - IndexJL]);
    var widgetRef = _voltmxConstNS.ContainerWidget.prototype.removeAt.call(this, index);
    $KW.FlexUtils.onWidgetRemove(this, index);
    return widgetRef;
};

function boxWidgetExtendRemoveAll() {
    if(this.widgets().length > 0) {
        $KW.FlexContainer.DOMremoveAll(this);
        _voltmxConstNS.ContainerWidget.prototype.removeAll.call(this);
    }
}

function boxWidgetExtendUpdateBoxWeight(widgetarray) {
    if(widgetarray.length) {
        for(var i = 0; i < widgetarray.length; ++i) {
            this.totalWt += widgetarray[i].containerweight;
        }
    } else if(widgetarray.containerweight) {
        this.totalWt += widgetarray.containerweight;
    }
    $KW[this.wType]["updateView"](this, "totalWt", this.totalWt);
};

function boxWidgetExtendRemoveUpdate(widgetarray, remove) {

}

function formWidgetExtendAdd(widgetarray) {
    _voltmxConstNS.ContainerWidget.prototype.add.call(this, widgetarray);
    this.createFormLevelHierarchy(widgetarray);
    $KW.Form.addChild(this, widgetarray);
};

function formWidgetExtendAddAt(widgetref, index) {
    _voltmxConstNS.ContainerWidget.prototype.addAt.call(this, widgetref, index);
    this.createFormLevelHierarchy([widgetref]);

    
    index = index < IndexJL ? 0 : ((index > this.children.length) ? this.children.length : index - IndexJL);
    $KW.Form.addChildAt(this, widgetref, index);
};

function formWidgetExtendRemove(widgetref) {
    if(widgetref) {
        $KW.Form.DOMremove(this, widgetref);
        var widgetIndex = this.ownchildrenref.indexOf(widgetref);
        _voltmxConstNS.ContainerWidget.prototype.remove.call(this, widgetref);
        
        updateFormAfterRemove(this, widgetref);
        if(widgetIndex != -1)
            $KW.FlexUtils.onWidgetRemove(this, widgetIndex);
    }
};

function formWidgetExtendRemoveAt(index) {
    $KW.Form.DOMremoveAt(this, index - IndexJL)
    var widgetRef = _voltmxConstNS.ContainerWidget.prototype.removeAt.call(this, index);
    
    updateFormAfterRemove(this, widgetRef);
    $KW.FlexUtils.onWidgetRemove(this, index);
    return widgetRef;
};

function updateFormAfterRemove(formModel, widgetRef) {
    if(widgetRef && widgetRef.screenLevelWidget) {
        $KW.Form.addChild(formModel, formModel.ownchildrenref);
    }
};

function formWidgetExtendRemoveAll(formModel) {
    if(this.widgets().length > 0) {
        $KW.Form.DOMremoveAll(this);
        _voltmxConstNS.ContainerWidget.prototype.removeAll.call(this);
    }
}

function formWidgetExtendCreateFormLevelHierarchy(widgetarray) {
    for(var i = 0; i < widgetarray.length; i++) {
        var widgetref = widgetarray[i];
        __createHierarchy(this, widgetref, "form");
    }

    _voltmxConstNS.Form2.getallboxes.call(this, widgetarray);

    for(var i = 0; i < this.allboxes.length; i++) {
        var boxWidget = this.allboxes[i];
        var childwidgets = boxWidget.ownchildrenref;
        this.createhierarchy.call(this, childwidgets);
        
        if(boxWidget instanceof voltmx.ui.FlexContainer) {
            
            if(!this.initdone && this._registerForAddWidgetsEvent) {
                boxWidget.addWidgets && this._registerForAddWidgetsEvent(boxWidget);
                boxWidget.init && this._registerForInitEvent(boxWidget);
            } else {
                $KU.invokeAddWidgets(boxWidget);
                $KU.invokeWidgetInit(boxWidget);
            }
            if(boxWidget.defineContainerGetter) {
                boxWidget.defineContainerGetter(this);
                boxWidget.defineContainerSetter(this);
            }
        }
    }

    generateKMasterID(this);
    this.allboxes = [];
};

function formWidgetExtendCommonHeaderFooterSetup(containertype) {
    var __container = {};
    __container.children = [];

    for(var list = 0; list < this[containertype].length; list++) {
        if(typeof this[containertype][list] == "string") {
            this[containertype][list] = _voltmx.mvc.initializeSubViewController(this[containertype][list]);
        }
    }

    for(var i = IndexJL; i < this[containertype].length; i++) {
        if(app && (app[containertype][this[containertype][i].id] && (app[containertype][this[containertype][i].id] != this[containertype][i]) || !app[containertype][this[containertype][i].id]))
            app[containertype][this[containertype][i].id] = this[containertype][i];

        
        var box = this[containertype][i];
        if(box.wType == 'VBox' && this.wType == 'Form')
            throw new VoltmxError(1102, 'WidgetError', 'Widget cannot be created due to invalid input data');

        if($KG.appbehaviors &&  $KG.appbehaviors[constants.API_LEVEL] < constants.API_LEVEL_9100) {
            _voltmxConstNS.Form2.prototype.createFormLevelHierarchy.call(this, [box]);
        }
        _voltmxConstNS.ContainerWidget.prototype.createhierarchy.call(box, [box]);
        app[containertype][this[containertype][i].id].isheader = true;
        _voltmxConstNS.Form2.prototype.createFormLevelHierarchy.call(this[containertype][i], [].slice.call([this[containertype][i]]));


        __container.children[i] = this[containertype][i].id;
        __container[this[containertype][i].id] = this[containertype][i];
        if(!window[this[containertype][i].id])
            window[this[containertype][i].id] = this[containertype][i];
    }

    __container.pf = this.id;
    __container.id = this[containertype.substr(0, 6)] = [this.id, containertype.substr(0, 6)].join('_');
    $KG[__container.id] = __container;
};

function formWidgetExtendGetAllBoxes(widgetarray) {
    for(var i = 0; i < widgetarray.length; i++) {
        var widget = widgetarray[i];
        if(widget.ownchildrenref) {
            this.allboxes.push(widget)
            _voltmxConstNS.Form2.getallboxes.call(this, widget.ownchildrenref);
        }
    }
};

function formWidgetExtendaddHeaderorFooter() {
    var widgetarray = [].slice.call(arguments[0]);

    for(var i = 0; i < widgetarray.length; i++) {
        if(widgetarray[i].wType == 'VBox' && this.wType == 'Form')
            throw new VoltmxError(1102, 'WidgetError', 'Widget cannot be created due to invalid input data');
    }

    _voltmxConstNS.ContainerWidget.prototype.createhierarchy.call(this, widgetarray);
    _voltmxConstNS.Form2.prototype.createFormLevelHierarchy.call(this, widgetarray);
};

function removeImmediateMasterProperty(widgetref) {
    var i = 0, proxyModel, childArrLen, childModel;
    delete widgetref['immediateMaster'];
    proxyModel = $KW.Utils.getActualWidgetModel(widgetref);
    if(proxyModel.isContainerWidget && !proxyModel.isMaster) {
        childArrLen = proxyModel.children.length;
        for(i = 0; i < childArrLen; i++) {
            childModel = proxyModel[proxyModel.children[i]];
            removeImmediateMasterProperty(childModel);
        }
    }
}

function getTopLevelModel(widgetModel) {
    var topLevelModel = null;
    if(widgetModel.immediateMaster) {
        topLevelModel = $KW.Utils.getMasterWidgetModel(widgetModel);
    } else {
        topLevelModel = $KU.getFormModel(widgetModel.pf) || window[widgetModel.pf];
    }
    return topLevelModel;
}

function removeReferencesFromTopLevelModel(widgetModel, topLevelModel) {
    var i = 0, proxyModel, childArrLen, childModel;
    topLevelModel = topLevelModel || getTopLevelModel(widgetModel);
    if(topLevelModel) {
        delete topLevelModel[widgetModel.id];
        proxyModel = $KW.Utils.getActualWidgetModel(widgetModel);
        if(proxyModel.isContainerWidget && !proxyModel.isMaster) {
            childArrLen = proxyModel.children.length;
            for(i = 0; i < childArrLen; i++) {
                childModel = proxyModel[proxyModel.children[i]];
                removeReferencesFromTopLevelModel(childModel, topLevelModel);
            }
        }
    }
}