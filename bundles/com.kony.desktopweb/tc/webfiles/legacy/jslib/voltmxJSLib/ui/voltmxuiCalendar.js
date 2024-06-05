
voltmx.ui.Calendar = function(bconfig, lconfig, pspconfig) {
    if(arguments.length < 3)
        bconfig = lconfig = pspconfig = $KU.mergeDefaults(bconfig, $KU.getAllDefaults("Calendar"));

    voltmx.ui.Calendar.baseConstructor.call(this, bconfig, lconfig, pspconfig);

    
    this.wType = "Calendar";
    this.name = "voltmx.ui.Calendar";
    this.datecomponents = bconfig.dateComponents || [];
    this.dateformat = this.format = bconfig.dateFormat || constants.CALENDAR_DATE_FORMAT_DEFAULT;
    this.formatteddate = this.date; 
    this.validstartdate = bconfig.validStartDate;
    this.validenddate = bconfig.validEndDate;
    this.viewtype = this.advview = bconfig.viewType || constants.CALENDAR_VIEW_TYPE_DEFAULT;
    this.viewconfig = bconfig.viewConfig || {gridconfig: {}};
    this.calendaricon = this.Image = bconfig.calendarIcon;
    this.calendariconalignment = bconfig.calendarIconAlignment;
    this.onselection = bconfig.onSelection;
    this.ondone = bconfig.onDone;
    this.titleonpopup = this.title = pspconfig.titleOnPopup;
    this.noofmonths = pspconfig.noOfMonths || pspconfig.noofmonths || 1;
    this.dateeditable = true;
    this.calimgheight = pspconfig.calImgHeight;
    this.gridtheme = pspconfig.gridTheme;
    this.celltemplate = pspconfig.cellTemplate;
    this.widgetdatamapforcell = pspconfig.widgetDataMapForCell;
    this.hidepreviousnextmonthdates = bconfig.hidePreviousNextMonthDates || false;
    if(voltmx.application.getApplicationBehavior("newCalendarskinApifeature")){
        this.skinprioritylist = bconfig.skinPriorityList || ["inactive" , "selected", "specialDates", "gridcell", "weekend", "today"];
    }


    var data = pspconfig.data;
    defineGetter(this, "data", function() {
        return data;
    });
    defineSetter(this, "data", function(val) {
        data = val;
        this.canUpdateUI && $KW[this.wType]["updateView"](this, "data", val);
    });

    defineGetter(this, "calendarIconAlignment", function() {
        return this.calendariconalignment;
    });
    defineSetter(this, "calendarIconAlignment", function(val) {
        var oldValue = this.calendariconalignment;
        if(oldValue !== val) {
            this.calendariconalignment = val;
            this.canUpdateUI && $KW[this.wType]["updateView"](this, "calendariconalignment", val);
        }
    });

    defineGetter(this, "widgetDataMapForCell", function() {
        return this.widgetdatamapforcell;
    });
    defineSetter(this, "widgetDataMapForCell", function(val) {
        this.widgetdatamapforcell = val;
    });

    defineGetter(this, "hidePreviousNextMonthDates", function() {
        return this.hidepreviousnextmonthdates;
    });
    defineSetter(this, "hidePreviousNextMonthDates", function(val) {
        var oldValue = this.hidepreviousnextmonthdates;
        if(oldValue !== val && this.canUpdateUI) {
            this.hidepreviousnextmonthdates = val;
            $KW[this.wType]["updateView"](this, "hidePreviousNextMonthDates", val);
         }
    });
    defineGetter(this, "skinPriorityList", function() {
        if(voltmx.application.getApplicationBehavior("newCalendarskinApifeature")){
            return this.skinprioritylist;
        }
        else
            return;
    });
    defineSetter(this, "skinPriorityList", function(val) {
        if(voltmx.application.getApplicationBehavior("newCalendarskinApifeature")){
            var oldValue = this.skinprioritylist;
            if(oldValue !== val && this.canUpdateUI) {
                this.skinprioritylist = val;
                $KW[this.wType]["updateView"](this, "skinPriorityList", val);
            }
        }
    });
    defineGetter(this, "calImgHeight", function() {
        return this.calimgheight;
    });
    defineSetter(this, "calImgHeight", function(val) {
        this.calimgheight = val;
    });

    var placeholder = bconfig.placeholder;
    defineGetter(this, "placeholder", function() {
        return placeholder;
    });

    defineSetter(this, "placeholder", function(val) {
        placeholder = val;
        this.canUpdateUI && $KW[this.wType]["updateView"](this, "placeholder", val);
    });

    defineGetter(this, "dateEditable", function() {
        return this.dateeditable;
    });

    defineSetter(this, "dateEditable", function(val) {
        if(!val == true || !!val == true) {
            this.dateeditable = val;
            this.canUpdateUI && $KW[this.wType]["updateView"](this, "dateeditable", val);
        }
    });

    defineGetter(this, "gridTheme", function() {
        return this.gridtheme;
    });

    defineSetter(this, "gridTheme", function(val) {
        var oldValue = this.gridtheme;
        if(oldValue !== val) {
            this.gridtheme = val;
            this.canUpdateUI && $KW[this.wType]["updateView"](this, "gridtheme", val);
        }
    });

    this.selectiontype = pspconfig.selectionType || constants.CALENDAR_SELECTION_TYPE_SINGLE_SELECT;
    defineGetter(this, "selectionType", function() {
        return this.selectiontype;
    });

    defineSetter(this, "selectionType", function(val) {
        var oldValue = this.selectiontype;
        if(oldValue !== val) {
            this.selectiontype = val;
            this.canUpdateUI && $KW[this.wType]["updateView"](this, "selectiontype", val);
        }
    });

    this.selecteddates = bconfig.selectedDates;
    defineGetter(this, "selectedDates", function() {
        return this.selecteddates;
    });

    defineSetter(this, "selectedDates", function(val) {
        var oldValue = this.selecteddates,
            isValidDateSet;
        if($KW.Calendar.isMultiRangeCalendar(this) &&
            !$KU.equals(oldValue, val)) {
            isValidDateSet = $KW.Calendar.isSelectedDatesValid(this, val);
            if(isValidDateSet) {
                this.selecteddates = $KW.Calendar.setTimeInDateComponents(val);
                this.canUpdateUI && $KW[this.wType]["updateView"](this, "selecteddates", val);
            } else {
                voltmx.web.logger("error", "Invalid date selection");
            }
        }
    });


    var date = bconfig.date;
    defineGetter(this, "date", function() {
        if($KW.Calendar.isMultiRangeCalendar(this)) {
            return;
        }
        $KW.Calendar.updateCalDOMNode(this);
        if(this.formatteddate) {
            return this.formatteddate;
        } else {
            return null;
        }
    });

    defineSetter(this, "date", function(val) {
        if($KW.Calendar.isMultiRangeCalendar(this)) {
            return;
        }
        this.Date = val;
        if(!val || !val.length) {
            return false;
        }
        if(typeof val == "string") {
            var dEY = $KW.Calendar.getDat(val, this);
        } else {
            var dEY = {
                dd: val[0],
                mm: val[1],
                yyyy: val[2]
            };
        }
        if(val && val.length) {
            this.day = dEY.dd;
            this.month = dEY.mm;
            this.year = dEY.yyyy || dEY.yy;

            if(!this.datecomponents) {
                this.datecomponents = [];
            }

            this.datecomponents[0] = dEY.dd;
            this.datecomponents[1] = dEY.mm;
            this.datecomponents[2] = dEY.yyyy || dEY.yy;
            this.datecomponents[3] = 0;
            this.datecomponents[4] = 0;
            this.datecomponents[5] = 0;
        } else {
            this.day = this.month = this.year = null;
        }
        this.hour = this.minutes = this.seconds = 0;
        this.canUpdateUI && $KW[this.wType]["updateView"](this, "date", val);
    });
    this.showcurrentdate = pspconfig.showCurrentDate;
    this.setGetterSetter();
};

voltmx.inherits(voltmx.ui.Calendar, voltmx.ui.Widget);

voltmx.ui.Calendar.prototype.setGetterSetter = function() {
    defineGetter(this, "titleOnPopup", function() {
        return this.title;
    });
    defineSetter(this, "titleOnPopup", function(val) {
        this.titleonpopup = this.title = val;
    });

    defineGetter(this, "onSelection", function() {
        return this.onselection;
    });
    defineSetter(this, "onSelection", function(val) {
        this.onselection = val;
    });

    defineGetter(this, "onDone", function() {
        return this.ondone;
    });
    defineSetter(this, "onDone", function(val) {
        this.ondone = val;
    });

    defineGetter(this, "calendarIcon", function() {
        return this.calendaricon;
    });
    defineSetter(this, "calendarIcon", function(val) {
        this.calendaricon = this.Image = val;
        $KW[this.wType]["updateView"](this, "calendaricon", val);
    });

    defineGetter(this, "viewConfig", function() {
        return this.viewconfig;
    });
    defineSetter(this, "viewConfig", function(val) {
        this.viewconfig = val;
        $KW[this.wType]["updateView"](this, "viewconfig", val);
    });

    defineGetter(this, "viewType", function() {
        return this.advview;
    });
    defineSetter(this, "viewType", function(val) {
        this.advview = val;
        $KW[this.wType]["updateView"](this, "viewtype", val);
    });

    defineGetter(this, "validEndDate", function() {
        return this.validenddate;
    });
    defineSetter(this, "validEndDate", function(val) {
        var oldval = this.validenddate
        this.validenddate = val;
        $KW[this.wType]["updateView"](this, "validenddate", val, oldval);
    });

    defineGetter(this, "validStartDate", function() {
        return this.validstartdate;
    });
    defineSetter(this, "validStartDate", function(val) {
        var oldval = this.validstartdate;
        this.validstartdate = val;

        $KW[this.wType]["updateView"](this, "validstartdate", val, oldval);
    });

    defineGetter(this, "dateFormat", function() {
        return this.format;
    });
    defineSetter(this, "dateFormat", function(val) {
        var oldval = this.dateformat;
        this.dateformat = this.format = val;
        $KW[this.wType]["updateView"](this, "dateformat", val);
        if(this.placeholder == oldval) {
            $KW[this.wType]["updateView"](this, "placeholder", val);
        } else {
            $KW[this.wType]["updateView"](this, "placeholder", this.placeholder || val);
        }
    });

    defineGetter(this, "dateComponents", function() {
        if($KW.Calendar.isMultiRangeCalendar(this)) {
            return;
        }
        if(this.hour === undefined) {
            this.hour = this.datecomponents[3];
        }
        if(this.minutes === undefined) {
            this.minutes = this.datecomponents[4];
        }
        if(this.seconds === undefined) {
            this.seconds = this.datecomponents[5];
        }
        return [this.day, this.month, this.year, this.hour, this.minutes, this.seconds];
    });
    defineSetter(this, "dateComponents", function(val) {
        if($KW.Calendar.isMultiRangeCalendar(this)) {
            return;
        }
        var oldval = this.datecomponents;
        if(voltmx.application.getApplicationBehavior("newCalendarskinApifeature")){
            isValidDateSet = $KW.Calendar.isSelectedDatesValid(this, val);
            if(isValidDateSet) {
               this.datecomponents = this.date = val.slice(0, 3);
            }
            else {
               this.datecomponents = this.date = oldval;
               voltmx.web.logger("error", "Disabled Dates can't be selected");
            }
        }
        else {
            this.datecomponents = this.date = val.slice(0, 3);


        }
        $KW[this.wType]["updateView"](this, "datecomponents", val);
    });

    defineGetter(this, "formattedDate", function() {
        $KW.Calendar.updateCalDOMNode(this);
        return this.formatteddate;
    });

    defineSetter(this, "showCurrentDate", function(val) {
        this.showcurrentdate = val;
    });

    defineGetter(this, "showCurrentDate", function() {
        return this.showcurrentdate;
    });
    defineGetter(this, "noOfMonths", function() {
        return this.noofmonths;
    });

    defineSetter(this, "noOfMonths", function(val) {
        this.noofmonths = val;
    });
};


voltmx.ui.Calendar.prototype.setEnabled = function(dates, skin, enable) {
    if(typeof dates == "boolean") { 
        $KW.APIUtils.setenabled(this, dates);
        return false;
    } else {
        if(dates instanceof Array && typeof skin == "string") {
            if(voltmx.application.getApplicationBehavior("newCalendarskinApifeature")) {
               $KW.Calendar.setEnablednew(this, dates, 0, skin, enable);
            }
            else {
                $KW.Calendar.setEnabled(this, dates, 0, skin, enable);
            }
        }
        else
           voltmx.web.logger("error", "Invalid parameters");

    }
};

voltmx.ui.Calendar.prototype.displayedMonth = function(month, year) {
    $KW.Calendar.displayedMonth(this, month, year);
};
voltmx.ui.Calendar.prototype.navigateToPreviousMonth = function() {
    $KW.Calendar.navigateToPreviousMonth(this);
};
voltmx.ui.Calendar.prototype.navigateToNextMonth = function() {
    $KW.Calendar.navigateToNextMonth(this);
};

voltmx.ui.Calendar.prototype.enableRangeOfDates = function(startdate, enddate, skin, enable) {
    if(voltmx.application.getApplicationBehavior("newCalendarskinApifeature")) {
        $KW.Calendar.setEnablednew(this, startdate, enddate, skin, enable);
    }
    else {
        $KW.Calendar.setEnabled(this, startdate, enddate, skin, enable);
    }
};

voltmx.ui.Calendar.prototype.setEnableAll = function(flag) {
    if(voltmx.application.getApplicationBehavior("newCalendarskinApifeature")) {
        $KW.Calendar.setEnableAllnew(this, flag);
    }
    else {
        $KW.Calendar.setEnableAll(this);
    }
};

voltmx.ui.Calendar.prototype.setDatesSkin = function(dates, skin) {
    $KW.Calendar.setDateSkin(this, dates, skin, true);
};

voltmx.ui.Calendar.prototype.clear = function() {
    $KW.Calendar.clear(this)
};

voltmx.ui.Calendar.prototype.open = function() {
    $KW.Calendar.open(this);
};

voltmx.ui.Calendar.prototype.dismiss = function() {
    $KW.Calendar.dismiss(this);
};

voltmx.ui.Calendar.prototype.setContext = function(context) {
    $KW.Calendar.setcontext(this, context);
};

voltmx.ui.Calendar.prototype.clearAppointments =
voltmx.ui.Calendar.prototype.clearData =
voltmx.ui.Calendar.prototype.deleteAppointments =
voltmx.ui.Calendar.prototype.getAppointments =
voltmx.ui.Calendar.prototype.modifyAppointment =
voltmx.ui.Calendar.prototype.removeDataAt =
voltmx.ui.Calendar.prototype.setData =
voltmx.ui.Calendar.prototype.setDataAt =
voltmx.ui.Calendar.prototype.switchToDate = function() {
    voltmx.web.logger("warn", "This Calendar method is not supported in SPA");
};
