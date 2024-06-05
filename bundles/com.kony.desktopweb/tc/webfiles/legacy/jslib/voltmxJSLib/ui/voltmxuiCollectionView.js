
voltmx.ui.CollectionView = function(bconfig, lconfig, pspconfig) {
    if(arguments.length < 3)
        bconfig = lconfig = pspconfig = $KU.mergeDefaults(bconfig, $KU.getAllDefaults("SegmentedUI2"));

    voltmx.ui.CollectionView.baseConstructor.call(this, bconfig, lconfig, pspconfig);

    this.skin = bconfig.skin;
    this.itemskin = bconfig.itemSkin;
    this.itemselectedskin = bconfig.itemSelectedSkin;
    this.sectionheaderskin = bconfig.sectionHeaderSkin;
    this.sectionfooterskin = bconfig.sectionFooterSkin;

    this.widgetdatamap = bconfig.widgetDataMap;
    this.itemtemplate = bconfig.itemTemplate;
    this.sectionheadertemplate = bconfig.sectionHeaderTemplate;
    this.sectionfootertemplate = bconfig.sectionFooterTemplate;
    this.pulltorefreshview = bconfig.pullToRefreshView;
    this.releasetopullrefreshview = bconfig.releaseToPullRefreshView;
    this.pushtorefreshview = bconfig.pushToRefreshView;
    this.releasetopushrefreshview = bconfig.releaseToPushRefreshView;

    this.enableReordering = bconfig.enableReordering || false;

    this.layouttype = bconfig.layout || voltmx.collectionview.LAYOUT_HORIZONTAL;
    this.autogrowMode = bconfig.autogrowMode;


    this.retainselection = bconfig.retainSelection || false;
    this.contentoffset = bconfig.contentOffset;

    this.selectionbehavior = bconfig.selectionBehavior || voltmx.collectionview.SINGLE_SELECT;
    this.selecteditemindex = bconfig.selectedItemIndex || null;
    this.selecteditemindices = bconfig.selectedItemIndices || null;
    this.selecteditems = null;

    this.minlinespace = bconfig.minLineSpace;
    this.minitemspace = bconfig.minItemSpace;

    this.onitemselect = bconfig.onItemSelect;
    this.scrolldirection = bconfig.scrollDirection;

    this.onscrollstart = bconfig.onScrollStart;
    defineGetter(this, "onScrollStart", function() {
        return this.onscrollstart;
    });
    defineSetter(this, "onScrollStart", function(val) {
        this.onscrollstart = val;
        $KW[this.wType]["updateView"](this, "onScrollStart", val);
    });
    this.onscrollend = bconfig.onScrollEnd;
    defineGetter(this, "onScrollEnd", function() {
        return this.onscrollend;
    });
    defineSetter(this, "onScrollEnd", function(val) {
        this.onscrollend = val;
        $KW[this.wType]["updateView"](this, "onScrollEnd", val);
    });

    this.onscrolling = bconfig.onScrolling;
    defineGetter(this, "onScrolling", function() {
        return this.onscrolling;
    });
    defineSetter(this, "onScrolling", function(val) {
        this.onscrolling = val;
        $KW[this.wType]["updateView"](this, "onScrolling", val);
    });
    this.onscrolltouchreleased = bconfig.onScrollTouchReleased;
    defineGetter(this, "onScrollTouchReleased", function() {
        return this.onscrolltouchreleased;
    });
    defineSetter(this, "onScrollTouchReleased", function(val) {
        this.onscrolltouchreleased = val;
        $KW[this.wType]["updateView"](this, "onScrollTouchReleased", val);
    });

    var data = bconfig.data;
    defineGetter(this, "data", function() {
        return data;
    });

    defineSetter(this, "data", function(val) {
        data = val;
        this.canUpdateUI && $KW[this.wType]["updateView"](this, "data", val);
    });
    this.showscrollbars = bconfig.showScrollbars;
    this.scrollingevents = bconfig.scrollingEvents || false;
    this.clonedTemplates = [];
    this.setGetterSetter();

    
    this.wType = "CollectionView";
    this.name = "voltmx.ui.CollectionView";
    this.canUpdateUI = true;
};

voltmx.inherits(voltmx.ui.CollectionView, voltmx.ui.Widget);

voltmx.ui.CollectionView.prototype.setGetterSetter = function() {
    defineGetter(this, "itemSkin", function() {
        return this.itemskin;
    });
    defineSetter(this, "itemSkin", function(val) {
        var oldvalue = this.itemskin;
        this.itemskin = val;
        $KW[this.wType]["updateView"](this, "itemskin", val, oldvalue);
    });

    defineGetter(this, "itemSelectedSkin", function() {
        return this.itemselectedskin;
    });
    defineSetter(this, "itemSelectedSkin", function(val) {
        var oldvalue = this.itemselectedskin;
        this.itemselectedskin = val;
        voltmx.model.updateView(this, "itemselectedskin", val, oldvalue);
    });


    defineGetter(this, "sectionHeaderSkin", function() {
        return this.sectionheaderskin;
    });
    defineSetter(this, "sectionHeaderSkin", function(val) {
        var oldvalue = this.sectionheaderskin;
        this.sectionheaderskin = val;
        $KW[this.wType]["updateView"](this, "sectionheaderskin", val, oldvalue);
    });

    defineGetter(this, "sectionFooterSkin", function() {
        return this.sectionfooterskin;
    });
    defineSetter(this, "sectionFooterSkin", function(val) {
        var oldvalue = this.sectionfooterskin;
        this.sectionfooterskin = val;
        $KW[this.wType]["updateView"](this, "sectionfooterskin", val, oldvalue);
    });

    defineGetter(this, "widgetDataMap", function() {
        return this.widgetdatamap;
    });
    defineSetter(this, "widgetDataMap", function(val) {
        this.widgetdatamap = val;
    });

    defineGetter(this, "itemTemplate", function() {
        return this.itemtemplate;
    });
    defineSetter(this, "itemTemplate", function(val) {
        this.itemtemplate = val;
    });

    defineGetter(this, "sectionHeaderTemplate", function() {
        return this.sectionheadertemplate;
    });
    defineSetter(this, "sectionHeaderTemplate", function(val) {
        this.sectionheadertemplate = val;
    });

    defineGetter(this, "sectionFooterTemplate", function() {
        return this.sectionfootertemplate;
    });
    defineSetter(this, "sectionFooterTemplate", function(val) {
        this.sectionfootertemplate = val;
    });

    defineGetter(this, "pullToRefreshView", function() {
        return this.pulltorefreshview;
    });
    defineSetter(this, "pullToRefreshView", function(val) {
        var oldvalue = this.pulltorefreshview;
        this.pulltorefreshview = val;
        $KW[this.wType]["updateView"](this, "pulltorefreshview", val, oldvalue);
    });

    defineGetter(this, "releaseToPullRefreshView", function() {
        return this.releasetopullrefreshview;
    });
    defineSetter(this, "releaseToPullRefreshView", function(val) {
        var oldvalue = this.releasetopullrefreshview;
        this.releasetopullrefreshview = val;
        $KW[this.wType]["updateView"](this, "releasetopullrefreshview", val, oldvalue);
    });

    defineGetter(this, "pushToRefreshView", function() {
        return this.pushtorefreshview;
    });
    defineSetter(this, "pushToRefreshView", function(val) {
        var oldvalue = this.pushtorefreshview;
        this.pushtorefreshview = val;
        $KW[this.wType]["updateView"](this, "pushtorefreshview", val, oldvalue);
    });

    defineGetter(this, "releaseToPushRefreshView", function() {
        return this.releasetopushrefreshview;
    });
    defineSetter(this, "releaseToPushRefreshView", function(val) {
        var oldvalue = this.releasetopushrefreshview;
        this.releasetopushrefreshview = val;
        $KW[this.wType]["updateView"](this, "releasetopushrefreshview", val, oldvalue);
    });

    defineGetter(this, "onItemSelect", function() {
        return this.onitemselect;
    });
    defineSetter(this, "onItemSelect", function(val) {
        this.onitemselect = val;
    });



    defineGetter(this, "showScrollbars", function() {
        return this.showscrollbars;
    });
    defineSetter(this, "showScrollbars", function(val) {
        this.showscrollbars = val;
    });

    defineGetter(this, "scrollingEvents", function() {
        return this.scrollingevents;
    });
    defineSetter(this, "scrollingEvents", function(val) {
        this.scrollingevents = val;
        $KW[this.wType]["updateView"](this, "scrollingevents", val);
    });

    defineGetter(this, "selectionBehavior", function() {
        return this.selectionbehavior;
    });
    defineSetter(this, "selectionBehavior", function(val) {
        var oldvalue = this.selectionbehavior;
        this.selectionbehavior = val;
        $KW[this.wType]["updateView"](this, "selectionbehavior", val, oldvalue);
    });

    defineGetter(this, "layout", function() {
        return this.layouttype;
    });
    defineSetter(this, "layout", function(val) {
        var oldvalue = this.layouttype;
        this.layouttype = val;
        $KW[this.wType]["updateView"](this, "layouttype", val, oldvalue);
    });
    defineGetter(this, "selectedItems", function() {
        return this.selecteditems;
    });

    defineGetter(this, "selectedItemIndex", function() {
        return this.selecteditemindex;
    });
    defineSetter(this, "selectedItemIndex", function(val) {
        this.selecteditemindex = val;
        $KW[this.wType]["updateView"](this, "selecteditemindex", val);
    });

    defineGetter(this, "selectedItemIndices", function() {
        return this.selecteditemindices;
    });
    defineSetter(this, "selectedItemIndices", function(val) {
        this.selecteditemindices = val;
        $KW[this.wType]["updateView"](this, "selecteditemindices", val);
    });

    defineGetter(this, "contentOffsetMeasured", function() {
        return $KW.APIUtils.getContentOffsetMeasured(this);
    });
    defineGetter(this, "contentOffset", function() {
        return this.contentoffset;
    });
    defineSetter(this, "contentOffset", function(val) {
        this.contentoffset = val;
        if(typeof val === "undefined" || val === null || typeof val.x === "undefined" || typeof val.y === "undefined") {
            return;
        }
        return $KW.APIUtils.setContentOffSet(this, val, true);
    });

    defineGetter(this, "minLineSpace", function() {
        return this.minlinespace;
    });

    defineSetter(this, "minLineSpace", function(val) {
        this.minlinespace = val;
        this.canUpdateUI && $KW[this.wType]["updateView"](this, "minLineSpace", val);
    });
    defineGetter(this, "minItemSpace", function() {
        return this.minitemspace;
    });

    defineSetter(this, "minItemSpace", function(val) {
        this.minitemspace = val;
        this.canUpdateUI && $KW[this.wType]["updateView"](this, "minItemSpace", val);
    });
    defineGetter(this, "onItemDisplay", function() {
        return this.onitemdisplay;
    });
    defineSetter(this, "onItemDisplay", function(val) {
        this.onitemdisplay = val;
    });

    defineGetter(this, "retainSelection", function() {
        return this.retainselection;
    });
    defineSetter(this, "retainSelection", function(val) {
        var oldvalue = this.retainselection;
        this.retainselection = val;
        if(oldvalue != val) {
            $KW[this.wType]["updateView"](this, "retainselection", val, oldvalue);
        }
    });
    defineGetter(this, "reachingBeginningOffset", function() {
        return this.reachingbeginningoffset;
    });
    defineSetter(this, "reachingBeginningOffset", function(val) {
        this.reachingbeginningoffset = val;
        $KW[this.wType]["updateView"](this, "reachingBeginningOffset", val);
    });

    defineGetter(this, "reachingEndOffset", function() {
        return this.reachingendoffset;
    });
    defineSetter(this, "reachingEndOffset", function(val) {
        this.reachingendoffset = val;
        $KW[this.wType]["updateView"](this, "reachingEndOffset", val);
    });
    defineGetter(this, "scrollDirection", function() {
        return this.scrolldirection;
    });
    defineSetter(this, "scrollDirection", function(val) {
        this.scrolldirection = val;
        $KW[this.wType]["updateView"](this, "scrollDirection", val);
    });
};



voltmx.ui.CollectionView.prototype.setData = function(dataArray) {
    $KW.CollectionView.Data.setData(this, dataArray);
};

voltmx.ui.CollectionView.prototype.addAll = function(dataArray) {
    $KW.CollectionView.Data.addAll(this, dataArray);
};

voltmx.ui.CollectionView.prototype.addDataAt = function(dataArray, rowIndex, sectionIndex) {
    $KW.CollectionView.Data.addDataAt(this, dataArray, rowIndex, sectionIndex);
};

voltmx.ui.CollectionView.prototype.addSectionAt = function(dataArray, sectionIndex) {
    $KW.CollectionView.Data.addSectionAt(this, dataArray, sectionIndex);
};

voltmx.ui.CollectionView.prototype.removeAll = function() {
    $KW.CollectionView.Data.removeAll(this);
};

voltmx.ui.CollectionView.prototype.removeDataAt = function(rowIndex, sectionIndex, count) {
    $KW.CollectionView.Data.removeDataAt(this, rowIndex, sectionIndex, count);
};

voltmx.ui.CollectionView.prototype.removeSectionAt = function(sectionIndex, count) {
    $KW.CollectionView.Data.removeSectionAt(this, sectionIndex, count);
};

voltmx.ui.CollectionView.prototype.setDataAt = function(dataObj, rowIndex, sectionIndex) {
    $KW.CollectionView.Data.setDataAt(this, dataObj, rowIndex, sectionIndex);
};

voltmx.ui.CollectionView.prototype.setSectionAt = function(dataArray, sectionIndex) {
    $KW.CollectionView.Data.setSectionAt(this, dataArray, sectionIndex);
};


voltmx.ui.CollectionView.prototype.setDataWithSections = function(dataArray) {
    $KW.CollectionView.Data.setDataWithSections(this, dataArray);
};

voltmx.ui.CollectionView.prototype.animateRows = function(animContext) {
    new $KW.CollectionView.Data.animateRows(this, animContext);
};

voltmx.ui.CollectionView.prototype.setAnimations = function(animObj) {
    if(this.listAnimation) 
        this.listAnimation.destroy();
    this.listAnimation = new $KW.CollectionView.setAnimations(this, animObj);
};

voltmx.ui.CollectionView.prototype.getFirstVisibleItem = function() {
    return $KW.CollectionView.Data.getFirstVisibleItem(this);
};

voltmx.ui.CollectionView.prototype.getLastVisibleItem = function() {
    return $KW.CollectionView.Data.getLastVisibleItem(this);
};

voltmx.ui.CollectionView.prototype.scrollToItemAtIndex = function(itemObject) {
    return $KW.CollectionView.scrollToItemAtIndex(this, itemObject);
};

voltmx.ui.CollectionView.prototype.getVisibleItems = function() {
    return $KW.CollectionView.Animation.getVisibleItems(this);
};

voltmx.ui.CollectionView.prototype.getIndicesForVisibleItems = function() {
    return $KW.CollectionView.Animation.getIndicesForVisibleItems(this);
};

voltmx.ui.CollectionView.prototype.appendLayoutDataAt = function(dataObj, rowIndex, sectionIndex) {
    $KW.CollectionView.Data.appendLayoutDataAt(this, dataObj, rowIndex, sectionIndex);
};
