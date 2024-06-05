
voltmx.ui.CheckBoxGroup = function(bconfig, lconfig, pspconfig) {
    if(arguments.length < 3)
        bconfig = lconfig = pspconfig = $KU.mergeDefaults(bconfig, $KU.getAllDefaults("CheckBoxGroup"));

    voltmx.ui.CheckBoxGroup.baseConstructor.call(this, bconfig, lconfig, pspconfig);

    this.itemorientation = lconfig.itemOrientation || constants.CHECKBOX_ITEM_ORIENTATION_VERTICAL;

    
    this.wType = "CheckBoxGroup";
    this.name = "voltmx.ui.CheckBoxGroup";

    this.selectedkeys = bconfig.selectedKeys || null;
    this.selectedkeyvalues = null;

    this.viewtype = pspconfig.viewType || "defaultview";

    this.size = pspconfig.size || 18;
    this.checkedimage = pspconfig.checkedImage || "checkboxselected.png";
    this.uncheckedimage = pspconfig.uncheckedImage || "checkboxnormal.png";

    voltmx.ui.CheckBoxGroup.prototype.setGetterSetter.call(this);
};

voltmx.inherits(voltmx.ui.CheckBoxGroup, voltmx.ui.GroupWidget);

voltmx.ui.CheckBoxGroup.prototype.setGetterSetter = function() {
    defineGetter(this, "selectedKeys", function() {
        return this.selectedkeys;
    });
    defineSetter(this, "selectedKeys", function(val) {
        this.selectedkeys = val;
        $KW[this.wType]["updateView"](this, "selectedkeys", val);
    });

    defineGetter(this, "selectedKeyValues", function() {
        return this.selectedkeyvalues;
    });


    defineSetter(this, "viewType", function(val) {
        this.viewtype = val;
        $KW[this.wType]["updateView"](this, "viewtype", val);
    });

    defineGetter(this, "viewType", function() {
        return this.viewtype;
    });

    defineSetter(this, "checkedImage", function(val) {
        this.checkedimage = val;
        $KW[this.wType]["updateView"](this, "checkedimage", val);
    });

    defineGetter(this, "checkedImage", function() {
        return this.checkedimage;
    });

    defineSetter(this, "uncheckedImage", function(val) {
        this.uncheckedimage = val;
        $KW[this.wType]["updateView"](this, "uncheckedimage", val);
    });

    defineGetter(this, "uncheckedImage", function() {
        return this.uncheckedimage;
    });


    defineSetter(this, "dimension", function(val) {
        this.size = val;
        $KW[this.wType]["updateView"](this, "size", val);
    });

    defineGetter(this, "dimension", function() {
        return this.size;
    });


};




voltmx.ui.ListBox = function(bconfig, lconfig, pspconfig) {
    if(arguments.length < 3)
        bconfig = lconfig = pspconfig = $KU.mergeDefaults(bconfig, $KU.getAllDefaults("ListBox"));

    voltmx.ui.ListBox.baseConstructor.call(this, bconfig, lconfig, pspconfig);

    
    this.wType = "ListBox";
    this.name = "voltmx.ui.ListBox";
    this.selectedkeys = pspconfig.selectedKeys || null;
    this.selectedkeyvalues = null;
    defineGetter(this, "selectedKeys", function() {
        return this.selectedkeys;
    });
    defineSetter(this, "selectedKeys", function(val) {
        this.selectedkeys = val;
        $KW[this.wType]["updateView"](this, "selectedkeys", val);
    });

    defineGetter(this, "selectedKeyValues", function() {
        return this.selectedkeyvalues;
    });
    this.multiple = pspconfig.multiSelect;
    this.multiselectrows = pspconfig.multiSelectRows;
    this.editableareaskin = pspconfig.editableAreaSkin || "";
    this.viewtype = pspconfig.viewType;
    this.autosuggest = pspconfig.autoSuggest || false;

    defineGetter(this, "multiSelectRows", function() {
        return this.multiselectrows;
    });
    defineSetter(this, "multiSelectRows", function(val) {
        this.multiselectrows = val;
        $KW[this.wType]["updateView"](this, "multiselectrows", val);
    });

    defineGetter(this, "editableAreaSkin", function() {
        return this.editableareaskin;
    });
    defineSetter(this, "editableAreaSkin", function(val) {
        this.editableareaskin = val;
        $KW[this.wType]["updateView"](this, "editableareaskin", val);
    });

    defineGetter(this, "viewType", function() {
        return this.viewtype;
    });
    defineSetter(this, "viewType", function(val) {
        this.viewtype = val;
        $KW[this.wType]["updateView"](this, "viewtype", val);
    });

    defineGetter(this, "autoSuggest", function() {
        return this.autosuggest;
    });
    defineSetter(this, "autoSuggest", function(val) {
        this.autosuggest = val;
        $KW[this.wType]["updateView"](this, "autosuggest", val);
    });
};

voltmx.inherits(voltmx.ui.ListBox, voltmx.ui.GroupWidget);


voltmx.ui.RadioButtonGroup = function(bconfig, lconfig, pspconfig) {
    if(arguments.length < 3)
        bconfig = lconfig = pspconfig = $KU.mergeDefaults(bconfig, $KU.getAllDefaults("RadioButtonGroup"));

    voltmx.ui.RadioButtonGroup.baseConstructor.call(this, bconfig, lconfig, pspconfig);

    this.itemorientation = lconfig.itemOrientation || constants.RADIOGROUP_ITEM_ORIENTATION_VERTICAL;

    
    this.wType = "RadioButtonGroup";
    this.name = "voltmx.ui.RadioButtonGroup";

    this.viewtype = pspconfig.viewType || "defaultview";
    this.size = pspconfig.size || 18;
    this.checkedimage = pspconfig.checkedImage || "radiobuttonselected.png";
    this.uncheckedimage = pspconfig.uncheckedImage || "radiobuttonnormal.png";

    voltmx.ui.RadioButtonGroup.prototype.setGetterSetter.call(this);
};

voltmx.inherits(voltmx.ui.RadioButtonGroup, voltmx.ui.GroupWidget);

voltmx.ui.RadioButtonGroup.prototype.setGetterSetter = function() {
    defineSetter(this, "viewType", function(val) {
        this.viewtype = val;
        $KW[this.wType]["updateView"](this, "viewtype", val);
    });

    defineGetter(this, "viewType", function() {
        return this.viewtype;
    });

    defineSetter(this, "checkedImage", function(val) {
        this.checkedimage = val;
        $KW[this.wType]["updateView"](this, "checkedimage", val);
    });

    defineGetter(this, "checkedImage", function() {
        return this.checkedimage;
    });

    defineSetter(this, "uncheckedImage", function(val) {
        this.uncheckedimage = val;
        $KW[this.wType]["updateView"](this, "uncheckedimage", val);
    });

    defineGetter(this, "uncheckedImage", function() {
        return this.uncheckedimage;
    });

    defineSetter(this, "dimension", function(val) {
        this.size = val;
        $KW[this.wType]["updateView"](this, "size", val);
    });

    defineGetter(this, "dimension", function() {
        return this.size;
    });



};


voltmx.ui.PickerView = function(bconfig, lconfig, pspconfig) {
    if(arguments.length < 3)
        bconfig = lconfig = pspconfig = $KU.mergeDefaults(bconfig, $KU.getAllDefaults("PickerView"));

    voltmx.ui.PickerView.baseConstructor.call(this, bconfig, lconfig, pspconfig);

    
    this.wType = "PickerView";
    this.name = "voltmx.ui.PickerView";

    this.onselect = bconfig.onSelect;
    this.setGetterSetter();
};

voltmx.inherits(voltmx.ui.PickerView, voltmx.ui.CheckBoxGroup);


voltmx.ui.PickerView.prototype.setComponentData = function(compIndex, compData) {
    $KW.PickerView.setcomponentdata(this, compIndex, compData);
};

voltmx.ui.PickerView.prototype.setSelectedKeyInComponent = function(key, compIndex) {
    $KW.PickerView.setselectedkeyincomponent(this, key, compIndex);
};

voltmx.ui.PickerView.prototype.setGetterSetter = function() {
    defineGetter(this, "onSelect", function() {
        return this.onselect;
    });

    defineSetter(this, "onSelect", function(val) {
        this.onselect = val;
    });
};
