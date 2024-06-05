(function() {
    var _days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        _months = ['',
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ],
        _weekDays = {sun:0, mon:1, tue:2, wed:3, thu:4, fri:5, sat:6},
        _startDay = 'sun', _weekends = ['sat', 'sun'], _gridCellSkinTypePriorityOrder = [
            'gridCellFocusSkin', 'gridCellInactiveDaysSkin', 'gridCellSelectedSkin',
            'gridCellTodaySkin', 'gridCellWeekendSkin', 'gridCellSpecialSkin', 'gridCellSkin'
        ], $K = voltmx.$kwebfw$, _minYear = 1900, _maxYear = 2099;


    $K.defVoltmxProp($K.ui, [
        {keey:'Calendar', value:{}, items:[
            {keey:'cancelSelection', value:function(/*evt*/) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom, _ = this._kwebfw_, picker = _.picker,
                    selectedYear = null, cal = null,
                    selectedMonth = null, monthYearPicker = $KD.find(picker, '[kr="monthYearPicker"]')[0],
                    title = $KD.find(monthYearPicker, '[kr="title"]')[0],
                    years = $KD.find(monthYearPicker, '[kr="years"]')[0],
                    months = $KD.find(picker, '[kr="months"]')[0],
                    skinInfo = _getSkinRelatedSkinInfoByGridCell($KD.find(months, '[kr="month"]')[0]);

                cal = $KD.find(picker, '[kr="calendar"]')[0];
                $KD.setAttr(monthYearPicker, 'hidden', true);
                $KD.setAttr(cal, 'hidden', false);
                monthYearPicker = $KD.find(picker, '[kwh-click="onMonthYearClick"]')[0];
                monthYearPicker && $KD.focus(monthYearPicker);

                if(months) {
                    selectedMonth = $KD.find(months, '[class="'+ skinInfo.selectedValue +'"]')[0];
                    if(selectedMonth) {
                        $KD.removeCls(selectedMonth, skinInfo.selectedValue);
                        $KD.addCls(selectedMonth, skinInfo.normalValue);
                        $KD.removeAttr(selectedMonth, 'aria-selected');
                    }
                }
                if(years) {
                    selectedYear = $KD.find(years, '[class="'+ skinInfo.selectedValue +'"]')[0];
                    if(selectedYear) {
                        $KD.removeCls(selectedYear, skinInfo.selectedValue);
                        $KD.addCls(selectedYear, skinInfo.normalValue);
                        $KD.removeAttr(selectedYear, 'aria-selected');
                    }
                }

                $KD.html(title, '');

                return false;
            }},

            {keey:'correctSelection', value:function(/*evt*/) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom, _ = this._kwebfw_,
                    picker = _.picker, dm = _.displayedMonths[0],
                    selectedMonth, selectedYear,
                    monthYearPicker = $KD.find(picker, '[kr="monthYearPicker"]')[0],
                    years = $KD.find(monthYearPicker, '[kr="years"]')[0],
                    months = $KD.find(picker, '[kr="months"]')[0],
                    title = $KD.find(monthYearPicker, '[kr="title"]')[0];

                if(months) {
                    selectedMonth = _months.indexOf($KD.getAttr(title, 'titlemonth'));
                }
                if(years) {
                    selectedYear = Number($KD.getAttr(title, 'titleyear'));
                }

                _changePicker.call(this, selectedMonth, selectedYear);
                picker = this._kwebfw_.picker;
                monthYearPicker = $KD.find(picker, '[kwh-click="onMonthYearClick"]')[0];
                monthYearPicker && $KD.focus(monthYearPicker);

                return false;
            }},

            {keey:'dateNavigation', value:function(evt) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom,
                    code = evt.keyCode || evt.which;

                if([33, 34].indexOf(code) >= 0) {
                    $KD.preventDefault(evt);

                    if(code === 33) { //Page Up
                        evt.shiftKey ? _prevYear.call(this, 1) : _prevMonth.call(this, 1);
                    } else if(code === 34) { //Page Down
                        evt.shiftKey ? _nextYear.call(this, 1) : _nextMonth.call(this, 1);
                    }

                    $KD.focus($KD.find(this._kwebfw_.picker, '[kr="date"]')[0]);
                }

                return false;
            }},

            {keey:'dismissPicker', value:function(evt) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom,
                    code = evt.keyCode || evt.which;

                if(code === 27) { //Escape
                    $KD.preventDefault(evt);
                    _dismissPicker.call(this, true);
                }

                return false;
            }},

            {keey:'monthNavigation', value:function(evt) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom,
                    code = evt.keyCode || evt.which;

                if([33, 34, 37, 38, 39, 40].indexOf(code) >= 0) {
                    $KD.preventDefault(evt);

                    if(code === 37 || code === 38) { //Up Arrow
                        evt.shiftKey ? _prevMonth.call(this, 3) : _prevMonth.call(this, 1);
                    } else if(code === 39 || code === 40) { //Down Arrow
                        evt.shiftKey ? _nextMonth.call(this, 3) : _nextMonth.call(this, 1);
                    } else if(code === 33) { //Page Up
                        _prevYear.call(this, 1);
                    } else if(code === 34) { //Page Down
                        _nextYear.call(this, 1);
                    }

                    $KD.focus($KD.find(this._kwebfw_.picker, '[kr="month"]')[0]);
                }

                return false;
            }},

            {keey:'onApplyClick', value:function(/*evt*/) {
                _applySelectedDates.call(this);

                return false;
            }},

            {keey:'onCloseClick', value:function(/*evt*/) {
                _dismissPicker.call(this, true);

                return false;
            }},

            {keey:'onDateClick', value:function(evt) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget, $KD = $K.dom,
                    date = $KD.closest(evt.target, 'date'), valid = false;

                if(date) {
                    valid = $KD.hasAttr(date, 'aria-disabled') ? false : true;

                    if(valid) {
                        _selectDateFromPicker.call(this, date);
                        $KW.onPropertyChange(this, 'dateComponents');
                    }

                    $K.apm.send(this, 'Touch', {type:(this._kwebfw_.name+'_Selection')});
                    $KW.fire(this, 'onSelection', this, {isValidDateSelected:valid});
                }

                return false;
            }},

            {keey:'onDateFocus', value:function(/*evt*/) {
                /*
                var $K = voltmx.$kwebfw$, $KD = $K.dom, prop = this._kwebfw_.prop,
                    gridConfig = {}, selectedSkin = '', date = null, info = null;

                if(prop.viewConfig && prop.viewConfig.gridConfig) {
                    gridConfig = prop.viewConfig.gridConfig;
                    selectedSkin = (gridConfig.gridCellSelectedSkin || '-voltmx-calendar-cell-selected');
                }

                if(evt.relatedTarget
                && $KD.getAttr(evt.relatedTarget, 'kr') === 'date'
                && !$KD.hasAttr(evt.relatedTarget, 'aria-disabled')) {
                    date = $KD.getAttr(evt.relatedTarget, 'date').split('-');
                    date[0] = parseInt(date[0], 10);
                    date[1] = parseInt(date[1], 10);
                    date[2] = parseInt(date[2], 10);

                    info = _cellRenderInfo.call(this, date[2], date[1], date[0], date[1], date[0]);
                    $KD.removeCls(evt.relatedTarget, selectedSkin);
                    $KD.addCls(evt.relatedTarget, info.skin);
                }

                if($KD.getAttr(evt.target, 'kr') === 'date'
                && !$KD.hasAttr(evt.target, 'aria-disabled')) {
                    date = $KD.getAttr(evt.target, 'date').split('-');
                    date[0] = parseInt(date[0], 10);
                    date[1] = parseInt(date[1], 10);
                    date[2] = parseInt(date[2], 10);

                    info = _cellRenderInfo.call(this, date[2], date[1], date[0], date[1], date[0]);
                    $KD.removeCls(evt.target, info.skin);
                    $KD.addCls(evt.target, selectedSkin);
                }
                //*/
                return false;
            }},

            {keey:'onDateKeyDown', value:function(evt) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom,
                    prev = null, next = null, targetDate,
                    code = evt.keyCode || evt.which, currentDate,
                    picker, elementClass;

                if([37, 38, 39, 40].indexOf(code) >= 0) {
                    $KD.preventDefault(evt);

                    if(code === 37) { //Left Arrow
                        //TODO:: need to add valid date and date boundary checks
                        prev = $KD.prev(evt.target);
                        currentDate = new Date($KD.getAttr(evt.target, 'date'));

                        if(prev) {
                            targetDate = new Date($KD.getAttr(prev, 'date'));
                            if(targetDate.getMonth() !== currentDate.getMonth()) {
                                _prevMonth.call(this, 1);
                                picker = this._kwebfw_.picker;
                                prev = $KD.find(picker, '[date="' + _dateFormatter(targetDate, false) + '"]')[0];
                            }
                            prev.focus();
                        } else {
                            targetDate = currentDate;
                            targetDate.setDate(targetDate.getDate() - 1);
                            _prevMonth.call(this, 1);
                            picker = this._kwebfw_.picker;
                            prev = $KD.find(picker, '[date="' + _dateFormatter(targetDate, false) + '"]')[0];
                            if(prev) {
                                prev.focus();
                            }
                        }
                    } else if(code === 39) { //Right Arrow
                        //TODO:: need to add valid date and date boundary checks
                        next = $KD.next(evt.target);
                        currentDate = new Date($KD.getAttr(evt.target, 'date'));
                        elementClass = $KD.getAttr(next, 'class');

                        if(next && !(elementClass && elementClass === '-voltmx-clear')) {
                            targetDate = new Date($KD.getAttr(next, 'date'));
                            if(targetDate.getMonth() !== currentDate.getMonth()) {
                                _nextMonth.call(this, 1);
                                picker = this._kwebfw_.picker;
                                next = $KD.find(picker, '[date="' + _dateFormatter(targetDate, false) + '"]')[0];
                            }
                            next.focus();
                        } else {
                            targetDate = currentDate;
                            targetDate.setDate(targetDate.getDate() + 1);
                            _nextMonth.call(this, 1);
                            picker = this._kwebfw_.picker;
                            next = $KD.find(picker, '[date="' + _dateFormatter(targetDate, false) + '"]')[0];
                            if(next) {
                                next.focus();
                            }
                        }
                    } else if(code === 38) { //Up Arrow
                        //TODO:: need to add valid date and date boundary checks
                        currentDate = new Date($KD.getAttr(evt.target, 'date'));
                        targetDate = new Date($KD.getAttr(evt.target, 'date'));
                        targetDate.setDate(targetDate.getDate() - 7);
                        if(targetDate.getMonth() !== currentDate.getMonth()) {
                            _prevMonth.call(this, 1);
                        }
                        picker = this._kwebfw_.picker;
                        prev = $KD.find(picker, '[date="' + _dateFormatter(targetDate, false) + '"]')[0];
                        if(prev) {
                            prev.focus();
                        }
                    } else if(code === 40) { //Down Arrow
                        //TODO:: need to add valid date and date boundary checks
                        currentDate = new Date($KD.getAttr(evt.target, 'date'));
                        targetDate = new Date($KD.getAttr(evt.target, 'date'));
                        targetDate.setDate(targetDate.getDate() + 7);
                        if(targetDate.getMonth() !== currentDate.getMonth()) {
                            _nextMonth.call(this, 1);
                        }
                        picker = this._kwebfw_.picker;
                        next = $KD.find(picker, '[date="' + _dateFormatter(targetDate, false) + '"]')[0];
                        if(next) {
                            next.focus();
                        }
                    }
                }

                return false;
            }},

            {keey:'onDateKeyUp', value:function(evt) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget, $KD = $K.dom,
                    valid = false, code = evt.keyCode || evt.which;

                if([13, 32].indexOf(code) >= 0) {
                    $KD.preventDefault(evt);

                    if(code === 13 || code === 32) { //Enter or Space
                        valid = $KD.hasAttr(evt.target, 'aria-disabled') ? false : true;

                        if(valid) {
                            _selectDateFromPicker.call(this, evt.target);
                        }

                        $K.apm.send(this, 'Touch', {type:(this._kwebfw_.name+'_Selection')});
                        $KW.fire(this, 'onSelection', this, {isValidDateSelected:valid});
                    }
                }

                return false;
            }},

            {keey:'onFocusOut', value:function(/*evt*/) {
                var timeout = null, self = this;

                timeout = setTimeout(function() {
                    var $K = voltmx.$kwebfw$, $KD = $K.dom, _ = self._kwebfw_,
                        picker = _.picker;

                    if(picker && !(picker === $KD.active() || $KD.contains(picker, $KD.active()))) {
                        _dismissPicker.call(self, false);
                    }

                    clearTimeout(timeout); self = timeout = null; //For GC
                }, 0);

                return false;
            }},

            {keey:'onIconClick', value:function(/*evt*/) {
                if(!this._kwebfw_.picker) {
                    _openPicker.call(this);
                }

                return false;
            }},

            {keey:'onIconKeyUp', value:function(evt) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom,
                    code = evt.keyCode || evt.which;

                if([13, 32].indexOf(code) >= 0) { //Enter or Space
                    $KD.preventDefault(evt);
                    _openPicker.call(this);
                }

                return false;
            }},

            {keey:'onInputFocusOut', value:function(evt) {
                var _ = this._kwebfw_, prop = _.prop;

                if(evt.target.value !== prop.formattedDate) {
                    _onDateEdited.call(this, evt.target.value);
                }

                return false;
            }},

            {keey:'onInputKeyDown', value:function(evt) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom,
                    _ = this._kwebfw_, prop = _.prop,
                    code = evt.keyCode || evt.which;

                if(code === 13 && evt.target.value !== prop.formattedDate) {
                    $KD.preventDefault(evt);
                    _onDateEdited.call(this, evt.target.value);
                }

                return false;
            }},

            {keey:'onMonthYearClick', value:function(/*evt*/) {
                _showMonthYearPicker.call(this);
                return false;
            }},

            {keey:'onNextMonthClick', value:function(/*evt*/) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom, picker = null;

                _nextMonth.call(this, 1);

                picker = this._kwebfw_.picker;
                picker = $KD.find(picker, '[kwh-click="onNextMonthClick"]')[0];
                picker && $KD.focus(picker);

                return false;
            }},

            {keey:'onNextYearClick', value:function(/*evt*/) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom, picker = null;

                _nextYear.call(this, 1);

                picker = this._kwebfw_.picker;
                picker = $KD.find(picker, '[kwh-click="onNextYearClick"]')[0];
                picker && $KD.focus(picker);

                return false;
            }},

            {keey:'onPrevMonthClick', value:function(/*evt*/) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom, picker = null;

                _prevMonth.call(this, 1);

                picker = this._kwebfw_.picker;
                picker = $KD.find(picker, '[kwh-click="onPrevMonthClick"]')[0];
                picker && $KD.focus(picker);

                return false;
            }},

            {keey:'onPrevYearClick', value:function(/*evt*/) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom, picker = null;

                _prevYear.call(this, 1);

                picker = this._kwebfw_.picker;
                picker = $KD.find(picker, '[kwh-click="onPrevYearClick"]')[0];
                picker && $KD.focus(picker);

                return false;
            }},

            {keey:'onPrevYearSetClick', value:function(/*evt*/) {
                // On Click of Previous Year, Picker details are defined
                var $K = voltmx.$kwebfw$, $KD = $K.dom, picker = this._kwebfw_.picker;
                 monthYearPicker = $KD.find(picker, '[kr="monthYearPicker"]')[0],
                    title = $KD.find(monthYearPicker, '[kr="title"]')[0],
                    year = $KD.getAttr(title, 'titleyear'), selectedDiv = null;
                _showPrevYearSet.call(this, 1);

                picker = $KD.find(picker, '[kwh-click="onPrevYearSetClick"]')[0];
                picker && $KD.focus(picker);

                _selectMonthYear(monthYearPicker, '[year="'+year+'"]');

                return false;
            }},

            {keey:'onNextYearSetClick', value:function(/*evt*/) {
                 // On Click of Next Year, Picker details are defined
                var $K = voltmx.$kwebfw$, $KD = $K.dom, picker = this._kwebfw_.picker;
                monthYearPicker = $KD.find(picker, '[kr="monthYearPicker"]')[0],
                    title = $KD.find(monthYearPicker, '[kr="title"]')[0],
                    year = $KD.getAttr(title, 'titleyear'), selectedDiv = null;
                _showNextYearSet.call(this, 1);

                picker = $KD.find(picker, '[kwh-click="onNextYearSetClick"]')[0];
                picker && $KD.focus(picker);

                _selectMonthYear(monthYearPicker, '[year="'+year+'"]');

                return false;
            }},

            {keey:'onYearClick', value:function(evt) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom, _ = this._kwebfw_, picker = _.picker,
                    prevCell = null, prevSkinInfo = null, year = '', monthCell = null, title = null,
                    month = '', monthYearPicker = $KD.find(picker, '[kr="monthYearPicker"]')[0],
                    yearCell = $KD.closest(evt.target, 'year'),
                    currentSkinInfo = _getSkinRelatedSkinInfoByGridCell(yearCell),
                    years = $KD.find(monthYearPicker, '[kr="years"]')[0],
                    // On Click of Year getting the title details
                    title = $KD.find(monthYearPicker, '[kr="title"]')[0];
                //Deselect previously selected cell in UI
                if(years) {
                    prevCell = $KD.find(years, '[class="'+ currentSkinInfo.selectedValue +'"]')[0];
                    if(prevCell) {
                        $KD.removeAttr(prevCell, 'aria-selected');
                        prevSkinInfo = _getSkinRelatedSkinInfoByGridCell(prevCell);
                        $KD.removeCls(prevCell, prevSkinInfo.selectedValue);
                        $KD.addCls(prevCell, prevSkinInfo.normalValue);
                    }
                }

                $KD.setAttr(yearCell, 'aria-selected', true);
                $KD.removeCls(yearCell, currentSkinInfo.normalValue);
                $KD.addCls(yearCell, currentSkinInfo.selectedValue);

                year = $KD.getAttr(yearCell, 'year');
                month = $KD.getAttr(title, 'titlemonth');

                // Updating the title details on click of year
                $KD.setAttr(title,'titleyear', year);

                if(monthCell) month = $KD.getAttr(monthCell, 'month');

                title = $KD.find(monthYearPicker, '[kr="title"]')[0];
                _updateMonthYearHeaderLabel.call(this, title, month, year);

                return false;
            }},

            {keey:'onMonthClick', value:function(evt) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom, _ = this._kwebfw_, picker = _.picker,
                    prevCell = null, prevSkinInfo = null, yearCell = null, year = '', title = null,
                    month = '', MonthCell = $KD.closest(evt.target, 'month'),
                    monthYearPicker = $KD.find(picker, '[kr="monthYearPicker"]')[0],
                    title = $KD.find(monthYearPicker, '[kr="title"]')[0],
                    currentSkinInfo = _getSkinRelatedSkinInfoByGridCell(MonthCell),
                    months = $KD.find(picker, '[kr="months"]')[0];

                //Deselect previously selected cell in UI
                if(months) {
                    prevCell = $KD.find(months, '[class="'+ currentSkinInfo.selectedValue +'"]')[0];
                    if(prevCell) {
                        $KD.removeAttr(prevCell, 'aria-selected');
                        prevSkinInfo = _getSkinRelatedSkinInfoByGridCell(prevCell);
                        $KD.removeCls(prevCell, prevSkinInfo.selectedValue);
                        $KD.addCls(prevCell, prevSkinInfo.normalValue);
                    }
                }

                $KD.setAttr(MonthCell, 'aria-selected', true);
                $KD.removeCls(MonthCell, currentSkinInfo.normalValue);
                $KD.addCls(MonthCell, currentSkinInfo.selectedValue);

                month = $KD.getAttr(MonthCell, 'month');
                year = $KD.getAttr(title, 'titleyear');
                yearCell = $KD.find($KD.find(monthYearPicker, '[kr="years"]')[0], '[class="-voltmx-calendar-cell-selected"]')[0];
                if(yearCell) year = $KD.getAttr(yearCell, 'year');

                title = $KD.find(monthYearPicker, '[kr="title"]')[0];
                // Updating the titlemonth attribute value in elements 
                $KD.setAttr(title, 'titlemonth', month);
                _updateMonthYearHeaderLabel.call(this, title, month, year);

                return false;
            }},

            {keey:'setupUIInteraction', value:function(dom, clone) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget,
                    $KD = $K.dom, el = $KW.el(this), tabindex = '';

                if(!$KW.interactable(this)) {
                    if($KW.disabled(this)) {
                        $KD.setAttr(el.input, 'disabled', 'disabled');
                    } else {
                        $KD.setAttr(el.input, 'readonly', 'readonly');
                    }

                    $KD.setAttr(el.input, 'tabindex', -1);
                    $KD.removeAttr(dom, 'tabindex');
                } else {
                    tabindex = $KW.tabIndex(this, clone);
                    $KD.removeAttr(el.input, 'disabled');
                    this.dateEditable && $KD.removeAttr(el.input, 'readonly');

                    $KD.setAttr(el.input, 'tabindex', tabindex);
                    $KD.setAttr(dom, 'tabindex', tabindex);
                }
            }},

            {keey:'yearNavigation', value:function(evt) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom,
                    code = evt.keyCode || evt.which;

                if([33, 34, 37, 38, 39, 40].indexOf(code) >= 0) {
                    $KD.preventDefault(evt);

                    if(code === 37 || code === 38) { //Up Arrow
                        _prevYear.call(this, 1);
                    } else if(code === 39 || code === 40) { //Down Arrow
                        _nextYear.call(this, 1);
                    } else if(code === 33) { //Page Up
                        evt.shiftKey ? _prevYear.call(this, 50) : _prevYear.call(this, 10);
                    } else if(code === 34) { //Page Down
                        evt.shiftKey ? _nextYear.call(this, 50) : _nextYear.call(this, 10);
                    }

                    $KD.focus($KD.find(this._kwebfw_.picker, '[kr="year"]')[0]);
                }

                return false;
            }}
        ]}
    ]);


    //This functions will be called in the scope of widget instance
    var _anchorPicker = function Calendar$_anchorPicker() {
        var $K = voltmx.$kwebfw$, $KW = $K.widget, $KD = $K.dom, $KG = $K.globals,
            _ = this._kwebfw_, anchor = _.anchor, pel = null, top = 0, left = 0,
            size = null, offset = null, view = null, psize = {
                width: (parseInt(_.picker.style.width.replace('px', ''), 10)+2),
                height: (parseInt(_.picker.style.height.replace('px', ''), 10)+2)
            };

        if(!anchor.position) {
            top = (($K.device.height - psize.height) / 2);
            left = (($K.device.width - psize.width) / 2);

            $KD.add($KG.appDialogs, _.picker);
        } else {
            pel = $KW.el($KW.model(anchor.holder));

            view = document.getElementById(anchor.widget);
            offset = _getAnchorOffset(anchor.widget, anchor.holder);
            size = {width:view.offsetWidth, height:view.offsetHeight};

            if(anchor.position === 'top') {
                top = (offset.top - psize.height);
                left = offset.left;
            } else if(anchor.position === 'bottom') {
                top = (offset.top + size.height);
                left = offset.left;
            } else if(anchor.position === 'left') {
                left = (offset.left - psize.width);
                top = offset.top;
            } else if(anchor.position === 'right') {
                left = (offset.left + size.width);
                top = offset.top;
            }

            $KD.style(pel.node, 'zIndex', 2147483647);

            if($KW.isContainer(anchor.holder)) {
                $KW.addToView((pel.scrolee || pel.viewport || pel.node), _.picker);
            } else {
                $KD.add(pel.node, _.picker);
            }
        }

        $KD.style(_.picker, {left:(left+'px'), top:(top+'px')});
    };


    //This functions will be called in the scope of widget instance
    var _applySelectedDates = function Calendar$_applySelectedDates() {
        var _ = this._kwebfw_, prop = _.prop;

        if(_.dateSelectionStarted === true) {
            if(prop.selectionType === constants.CALENDAR_SELECTION_TYPE_MULTI_SELECT) {
                prop.selectedDates = _.selectedDates;
                prop.displayedMonth = null;
            } else if(prop.selectionType === constants.CALENDAR_SELECTION_TYPE_RANGE_SELECT
            && (_.selectedDates.length === 0 || (_.selectedDates[0] && _.selectedDates[1]))) {
                prop.selectedDates = _.selectedDates;
                prop.displayedMonth = null;
            }
        }

        _.selectedDates = [];
        _.dateSelectionStarted = false;
        _closePicker.call(this, true);
        _updateRelatedDateProperties.call(this);
    };

    var _applySkinSelectedCell = function Calendar$_applySkinSelectedCell(cell) {
        var $K = voltmx.$kwebfw$, $KD = $K.dom,
            currentSkinInfo = _getSkinRelatedSkinInfoByGridCell(cell);

        $KD.setAttr(cell, 'aria-selected', true);
        $KD.removeCls(cell, currentSkinInfo.normalValue);
        $KD.addCls(cell, currentSkinInfo.selectedValue);
    };

    //This functions will be called in the scope of widget instance
    var _cellRenderInfo = function Calendar$_cellRenderInfo(date, month, year, displayedMonth, displayedYear) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, prop = null, skins = [],
            info = {disable:false, skin:'', skinType:'', selectedSkin:'',
                appliedSkin:'', appliedSkinType:'', text:date},
            viewConfig = null, gridConfig = null, sd = null, to = null,
            from = null, appliedSkinIndex = -1, isDate = {
                getActiveSkin: function(dt, skinConfig) {
                    var key = '', skin = '';

                    if(this._kwebfw_.enableDatesInactive === false) {
                        key = _dateFormatter(dt, false);
                        skin = this._kwebfw_.enableDatesSkin[key] || '';
                    } else if(this._kwebfw_.enableDateRangeInactive === false) {
                        skin = this._kwebfw_.enableDateRangeSkin;
                    }

                    if(!skin) {
                        skin = skinConfig.gridCellSkin || '-voltmx-calendar-cell';
                    }

                    return skin;
                },

                getWeekendSkin: function(dt, skinConfig) {
                    var key = '', _ = this._kwebfw_,
                        enableOrDisableDates = this._kwebfw_.prop.enableOrDisableDates,
                        skin = skinConfig.gridCellWeekendSkin || '-voltmx-calendar-cell-weekend';

                    if(enableOrDisableDates && enableOrDisableDates.hasToEnable === true
                        && _inEnableDates.call(this, dt)) {
                        key = _dateFormatter(dt, false);
                        skin = _.enableDatesSkin[key];
                    }

                    return skin;
                },

                getInactiveSkin: function(dt, skinConfig) {
                    var key = '', skin = '', _ = this._kwebfw_,
                        startDateRange = _.enableDateRangeStart,
                        endDateRange = _.enableDateRangeEnd;

                    if(_.enableDatesInactive === true) {
                        key = _dateFormatter(dt, false);
                        skin = _.enableDatesSkin[key] || '';
                    } else if(_.enableDateRangeInactive === true
                    && _inValidRange(startDateRange, endDateRange, [dt.getDate(), dt.getMonth() + 1, dt.getFullYear()])) {
                        skin = _.enableDateRangeSkin;
                    }

                    if(!skin) {
                        skin = skinConfig.gridCellInactiveDaysSkin || '-voltmx-calendar-cell-inactive';
                    }

                    return skin;
                },

                getSpecialSkin: function(dt) {
                    var key = _dateFormatter(dt, false),
                        skin = this._kwebfw_.specialSkins[key] || '';

                    return skin;
                },

                hasSpecialSkin: function(dt) {
                    return isDate.getSpecialSkin.call(this, dt) ? true : false;
                },

                selected: function(dt) {
                    var from = null, to = null, i = 0, ilen = 0,
                        _ = this._kwebfw_, prop = _.prop, flag = false,
                        dc = prop.dateComponents, sd = _getAllSelectedDates.call(this);

                    if(dc && prop.selectionType === constants.CALENDAR_SELECTION_TYPE_SINGLE_SELECT) {
                        if(dt.getDate() === dc[0]
                        && dt.getMonth() === (dc[1] - 1)
                        && dt.getFullYear() === dc[2]) {
                            flag = true;
                        }
                    } else if(sd && prop.selectionType === constants.CALENDAR_SELECTION_TYPE_MULTI_SELECT) {
                        ilen = sd.length;

                        for(i=0; i<ilen; i++) {
                            if(dt.getDate() === sd[i][0]
                            && dt.getMonth() === (sd[i][1] - 1)
                            && dt.getFullYear() === sd[i][2]) {
                                flag = true;
                                break;
                            }
                        }
                    } else if(sd.length > 0 && prop.selectionType === constants.CALENDAR_SELECTION_TYPE_RANGE_SELECT) {
                        if(sd.length === 1) {
                            if(dt.getDate() === sd[0][0]
                            && dt.getMonth() === (sd[0][1] - 1)
                            && dt.getFullYear() === sd[0][2]) {
                                flag = true;
                            }
                        } else {
                            from = new Date(sd[0][2], (sd[0][1] - 1), sd[0][0], 0, 0, 0);
                            to = new Date(sd[1][2], (sd[1][1] - 1), sd[1][0], 0, 0, 0);

                            if(dt.valueOf() >= from.valueOf() && dt.valueOf() <= to.valueOf()) {
                                flag = true;
                            }
                        }
                    }

                    return flag;
                },

                today: function(dt, viewedMonth, viewedYear) {
                    var today = new Date(), flag = false;

                    if(dt.getMonth() === (viewedMonth-1)
                    && dt.getFullYear() === viewedYear) {
                        if(dt.getDate() === today.getDate()
                        && dt.getMonth() === today.getMonth()
                        && dt.getFullYear() === today.getFullYear()) {
                            flag = true;
                        }
                    }

                    return flag;
                },

                weekend: function(dt) {
                    return ([_weekDays[_weekends[0]], _weekDays[_weekends[1]]].indexOf(dt.getDay()) >= 0);
                }
            };

        prop = this._kwebfw_.prop;
        viewConfig = prop.viewConfig;
        gridConfig = (viewConfig && viewConfig.gridConfig) ? viewConfig.gridConfig : {};

        info.disabled = _isDateInactive.call(this, [date, month, year, 0, 0, 0]);

        if(!info.disabled) {
            if($KU.is(displayedMonth, 'integer')
            && $KU.is(displayedYear, 'integer')
            && !(month === displayedMonth && year === displayedYear)) {
                info.disabled = true;
            }
        }

        date = new Date(year, (month-1), date, 0, 0, 0);
        skins.push('gridCellSkin');
        if(info.disabled) skins.push('gridCellInactiveDaysSkin');
        if(isDate.today.call(this, date, displayedMonth, displayedYear)) {
            info.today = true;
            skins.push('gridCellTodaySkin');
        }
        if(isDate.weekend.call(this, date)) {
            info.weekend = true;
            skins.push('gridCellWeekendSkin');
        }
        if(isDate.selected.call(this, date)) {
            info.selected = true;
            skins.push('gridCellSelectedSkin');
        }
        if(isDate.hasSpecialSkin.call(this, date)) skins.push('gridCellSpecialSkin');

        $KU.each(_gridCellSkinTypePriorityOrder, function(gridCellSkinType) {
            if(skins.indexOf(gridCellSkinType) >= 0) {
                info.appliedSkinType = gridCellSkinType;
                return true; //break the loop
            }
        });

        //Today skin has higher prority over any other skin, except selected skin
        if(info.today && info.appliedSkinType !== 'gridCellSelectedSkin') {
            info.appliedSkinType = 'gridCellTodaySkin';
        }

        if(info.appliedSkinType !== 'gridCellSelectedSkin') {
            info.skinType = info.appliedSkinType;
        } else {
            appliedSkinIndex = _gridCellSkinTypePriorityOrder.indexOf(info.appliedSkinType);

            while(appliedSkinIndex !== -1
            && appliedSkinIndex < _gridCellSkinTypePriorityOrder.length) {
                if(skins.indexOf(_gridCellSkinTypePriorityOrder[++appliedSkinIndex]) >= 0) {
                    info.skinType = _gridCellSkinTypePriorityOrder[appliedSkinIndex];
                    break;
                }
            }
        }

        //START:: Logic to get selected cell skin
        info.selectedSkin = gridConfig.gridCellSelectedSkin || '-voltmx-calendar-cell-selected';
        sd = this._kwebfw_.prop.selectedDates;

        if(sd && this._kwebfw_.prop.selectionType === constants.CALENDAR_SELECTION_TYPE_RANGE_SELECT) {
            if(sd.length === 2) {
                from = new Date(sd[0][2], (sd[0][1] - 1), sd[0][0], 0, 0, 0);
                to = new Date(sd[1][2], (sd[1][1] - 1), sd[1][0], 0, 0, 0);

                if(date.valueOf() === from.valueOf() && gridConfig.gridCellFromDateSkin) {
                    info.selectedSkin = gridConfig.gridCellFromDateSkin || '-voltmx-calendar-cell-from';
                } else if(date.valueOf() === to.valueOf() && gridConfig.gridCellToDateSkin) {
                    info.selectedSkin = gridConfig.gridCellToDateSkin || '-voltmx-calendar-cell-to';
                }
            }
        }
        //END:: Logic to get selected cell skin

        if(info.skinType === 'gridCellSpecialSkin') {
            info.skin = isDate.getSpecialSkin.call(this, date);
        } else if(info.skinType === 'gridCellInactiveDaysSkin') {
            info.skin = isDate.getInactiveSkin.call(this, date, gridConfig);
        } else if(info.skinType === 'gridCellSelectedSkin') {
            info.skin = info.selectedSkin;
        } else if(info.skinType === 'gridCellTodaySkin') {
            info.skin = gridConfig.gridCellTodaySkin || '-voltmx-calendar-cell-today';
        } else if(info.skinType === 'gridCellWeekendSkin') {
            info.skin = isDate.getWeekendSkin.call(this, date, gridConfig);
        } else {
            info.skin = isDate.getActiveSkin.call(this, date, gridConfig);
        }

        if(info.appliedSkinType === 'gridCellSelectedSkin') {
            info.appliedSkin = info.selectedSkin;
        } else {
            info.appliedSkin = info.skin;
        }

        return info;
    };


    //This functions will be called in the scope of widget instance
    var _changePicker = function Calendar$_changePicker(month, year) {
        if(month >= 1 && month <= 12
        && year >= _minYear && year <= _maxYear) {
            _populateDisplayedMonths.call(this, month, year);

            if(this._kwebfw_.picker) {
                _closePicker.call(this, false);
                _openPicker.call(this);
            }
        }
    };


    //This functions will be called in the scope of widget instance
    var _closePicker = function Calendar$_closePicker(focus) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget, $KD = $K.dom,
            _ = this._kwebfw_, parent = null, el = null;

        if($KU.is(_.picker, 'dom')) {
            if(_.anchor.holder) {
                parent = $KW.model(_.anchor.holder);
                $KD.style(parent._kwebfw_.view, 'zIndex', parent.zIndex);
            }

            $KU.each($KD.find(_.picker, 'img'), function(node) {
                $KD.removeAttr(node, 'onmousedown');
            });
            $KD.remove(_.picker);
            delete _.picker;
            el = $KW.el(this);

            //Deleting dropdown instances
            if(_.monthDropdown && _.yearDropdown) {
                _.monthDropdown.destroy();
                _.yearDropdown.destroy();
            }

            $KD.setAttr(el.icon, 'aria-expanded', 'false');

            $KW.dismissPicker(this);

            if(focus !== false) {
                $KD.focus(el.icon);
            }
        }
    };


    //This function will be called in the scope of widget instance
    var _convertFormatedDateToDateComponents = function Calendar$_convertFormatedDateToDateComponents(str) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, _ = this._kwebfw_,
            prop = _.prop, dc = null, dates = [], valid = true,
            backupDateComponents = prop.dateComponents,
            backupSelectedDates = prop.selectedDates;

        if($KU.is(str, 'string') && str) {
            if(this.selectionType === constants.CALENDAR_SELECTION_TYPE_SINGLE_SELECT) {
                dc = _parseToDateComponent(str, prop.dateFormat);

                if(dc) {
                    dates.push(dc);
                    prop.dateComponents = dc;
                } else valid = false;
            } else if(this.selectionType === constants.CALENDAR_SELECTION_TYPE_MULTI_SELECT) {
                prop.selectedDates = [];

                $KU.each(str.split(','), function(date) {
                    date = _parseToDateComponent(date, prop.dateFormat);

                    if(date) {
                        dates.push(date);
                        prop.selectedDates.push(date);
                    } else {
                        valid = false;
                        return true;
                    }
                });
            } else if(this.selectionType === constants.CALENDAR_SELECTION_TYPE_RANGE_SELECT) {
                prop.selectedDates = [];

                $KU.each(str.split(' - '), function(date) {
                    date = _parseToDateComponent(date, prop.dateFormat);

                    if(date) {
                        dates.push(date);
                        prop.selectedDates.push(date);
                    } else {
                        valid = false;
                        return true;
                    }
                });
            }

            if(valid) {
                valid = _isValidDateCombination.call(this, prop);
            }

            if(!valid) dates = null;

            prop.dateComponents = backupDateComponents;
            prop.selectedDates = backupSelectedDates;
        }

        return dates;
    };


    var _dateFormatter = function Calendar$_dateFormatter(date, time, format) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils,
            year = -1, month = -1, day = -1, str = '';

        if(arguments.length === 2) {
            format = 'yyyy-MM-dd';
            if(time) format += ' hh:mm:ss';
        }

        if($KU.is(date, 'array')) {
            day = date[0];
            month = date[1];
            year = date[2];
        } else if($KU.is(date, 'date')) {
            day = date.getDate();
            month = (date.getMonth() + 1);
            year = date.getFullYear();
        }

        if(year !== -1 && month !== -1 && day !== -1) {
            year = year.toString();
            month = (month > 9) ? month.toString() : ('0'+month);
            day = (day > 9) ? day.toString() : ('0'+day);
            str = format;
            str = str.replace('dd', day);

            if(str.indexOf('MMM') !== -1) {
                month = _months[parseInt(month, 10)];
                str = str.replace('MMM', month.substr(0, 3));
            } else if(str.indexOf('MM') !== -1) {
                str = str.replace('MM', month);
            }

            if(str.indexOf('yyyy') !== -1) {
                str = str.replace('yyyy', year);
            } else if(str.indexOf('yy') !== -1) {
                year = year.substr(2, 2);
                str = str.replace('yy', year);
            }

            if(time) {
                //TODO::
            }
        }

        return str;
    };


    //This functions will be called in the scope of widget instance
    var _deduceCellHeightAndWidth = function Calendar$_deduceCellHeightAndWidth() {
        var size = null;

        size = {height:40, width:40};

        return size;
    };


    //This functions will be called in the scope of widget instance
    var _deduceDisplayedMonth = function Calendar$_deduceDisplayedMonth() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, date = new Date(),
            prop = this._kwebfw_.prop, dc = null, sd = null, dm = null;

        if(prop.displayedMonth) {
            dm = [prop.displayedMonth[0], prop.displayedMonth[1]];
        } else {
            if(prop.selectionType === constants.CALENDAR_SELECTION_TYPE_SINGLE_SELECT) {
                dc = prop.dateComponents;

                if($KU.is(dc, 'array')) {
                    dm = [dc[1], dc[2]];
                } else {
                    dm = [(date.getMonth()+1), date.getFullYear()];
                }
            } else {
                sd = prop.selectedDates;

                if(sd && sd.length > 0) {
                    sd = sd[sd.length-1];
                    dm = [sd[1], sd[2]];
                } else {
                    dm = [(date.getMonth()+1), date.getFullYear()];
                }
            }
        }

        return dm;
    };


    //All widget file must have this variable
    //All the functions will be called in the scope of widget instance
    var _dependentPropertiesValidationMessage = {
        Calendar: function Calendar$_dependentPropertiesValidationMessage(defProp, bconfig, lconfig, pspconfig) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils,
                prop = this._kwebfw_.prop, valid = false;

            prop.dateComponents = bconfig.dateComponents || defProp.dateComponents;
            prop.selectedDates = bconfig.selectedDates || defProp.selectedDates;
            prop.selectionType = (pspconfig && pspconfig.selectionType)
                                 || bconfig.selectionType || defProp.selectionType;
            prop.validEndDate = bconfig.validEndDate || defProp.validEndDate;
            prop.validStartDate = bconfig.validStartDate || defProp.validStartDate;
            prop.viewConfig = (pspconfig && pspconfig.viewConfig)
                              || bconfig.viewConfig || defProp.viewConfig;

            valid = _isValidDateComponents(prop.dateComponents);
            if($KU.is(valid, 'array')) {
                prop.dateComponents = valid[0];
                valid = valid[1];
            }

            if(valid) valid = _isValidDateCombination.call(this, prop);

            delete prop.dateComponents;
            delete prop.selectedDates;
            delete prop.selectionType;
            delete prop.validEndDate;
            delete prop.validStartDate;
            delete prop.viewConfig;

            return valid ? '' : 'Invalid date combination passed.';
        }
    };


    //This functions will be called in the scope of widget instance
    var _dismissPicker = function Calendar$_dismissPicker(focus) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, _ = this._kwebfw_, dm = null;

        if(_.picker) {
            if(!$KU.is(focus, 'boolean')) focus = true;

            _.selectedDates = [];
            _.dateSelectionStarted = false;

            dm = _deduceDisplayedMonth.call(this);
            _populateDisplayedMonths.call(this, dm[0], dm[1]);

            _closePicker.call(this, focus);
        }
    };


    //This functions will be called in the scope of widget instance
    var _formatDate = function Calendar$_formatDate() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, prop = this._kwebfw_.prop, result = '';

        if(prop.selectionType === constants.CALENDAR_SELECTION_TYPE_SINGLE_SELECT) {
            if(prop.dateComponents) {
                result = _dateFormatter(prop.dateComponents, false, prop.dateFormat);
            }
        } else if(prop.selectionType === constants.CALENDAR_SELECTION_TYPE_MULTI_SELECT) {
            if(prop.selectedDates) {
                $KU.each(prop.selectedDates, function(date, index) {
                    result += (((index > 0) ? ',' : '') + _dateFormatter(date, false, prop.dateFormat));
                });
            }
        } else if(prop.selectionType === constants.CALENDAR_SELECTION_TYPE_RANGE_SELECT) {
            if(prop.selectedDates && prop.selectedDates.length === 2) {
                result = (_dateFormatter(prop.selectedDates[0], false, prop.dateFormat)
                       + ' - '
                       + _dateFormatter(prop.selectedDates[1], false, prop.dateFormat));
            }
        }

        return result;
    };


    var _getAllSelectedDates = function Calendar$_getAllSelectedDates() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, _ = this._kwebfw_, dates = [];

        if(_.dateSelectionStarted === true) {
            dates = _.selectedDates;
        } else if($KU.is(_.prop.selectedDates, 'array')) {
            dates = _.prop.selectedDates;
        }

        return dates;
    };


    var _getAnchorOffset = function Calendar$_getAnchorOffset(widgetUID, holder) {
        var $K = voltmx.$kwebfw$, $KW = $K.widget, $KD = $K.dom,
            offsetParent = null, view = document.getElementById(widgetUID),
            offset = {left:view.offsetLeft, top:view.offsetTop};

        if(!$KW.isContainer(holder)) {
            offsetParent = view.offsetParent;
            //offset = {left:view.offsetLeft, top:0};

            while(offsetParent && $KD.getAttr(offsetParent, 'kr') !== 'item') {
                offset.left += offsetParent.offsetLeft;
                offset.top += offsetParent.offsetTop;
                offsetParent = offsetParent.offsetParent;
            }

            if($KD.getAttr(offsetParent, 'kr') === 'item') {
                offset.left += offsetParent.offsetLeft;
                offset.top += offsetParent.offsetTop;
            }
        }

        return offset;
    };


    var _getSkinRelatedSkinInfoByGridCell = function Calendar$_getSkinRelatedSkinInfoByGridCell(cell) {
        var $K = voltmx.$kwebfw$, $KD = $K.dom, info = {},
            types = _gridCellSkinTypePriorityOrder;

        info.normalType = $KD.getAttr(cell, 'cellskintype');
        info.normalValue = $KD.getAttr(cell, 'cellskinvalue');
        info.normalIndex = types.indexOf(info.normalType);
        info.selectedIndex = types.indexOf('gridCellSelectedSkin');
        info.selectedValue = $KD.getAttr(cell, 'cellselectedskin');

        return info;
    };


    //All widget file must have this variable
    //All the functions will be called in the scope of widget instance
    var _getter = {
        Calendar: {
            dateComponents: function Calendar$_getter_dateComponents(value) {
                return (value) ? value.slice(0) : value;
            },

            displayedMonth: function Calendar$_getter_displayedMonth(value) {
                return (value) ? value.slice(0) : value;
            },

            enableOrDisableDates: function Calendar$_getter_enableOrDisableDates(value) {
                if(value) {
                    return {dates: value.dates, hasToEnable: value.hasToEnable, skin: value.skin};
                }
                return value;
            },

            selectedDates: function Calendar$_getter_selectedDates(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, dates = [];

                if($KU.is(value, 'null')) {
                    dates = value;
                } else if(value.length > 0) {
                    $KU.each(value, function(dc) {
                        dates.push(dc.slice(0));
                    });
                }

                return dates;
            },

            toolTip: function Calendar$_getter_toolTip() {
                var $K = voltmx.$kwebfw$, $KU = $K.utils,
                    prop = this._kwebfw_.prop, toolTip = prop.toolTip;

                if(prop.i18n_toolTip) {
                    toolTip = $KU.getI18Nvalue(prop.i18n_toolTip);
                }

                return toolTip;
            },

            validEndDate: function Calendar$_getter_validEndDate(value) {
                return (value) ? value.slice(0) : value;
            },

            validStartDate: function Calendar$_getter_validStartDate(value) {
                return (value) ? value.slice(0) : value;
            },

            widgetDataMapForCell: function Calendar$_getter_widgetDataMapForCell(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils;

                return $KU.clone(value);
            }
        }
    };


    var _getMonthYearHeader = function() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom, _ = this._kwebfw_,
            prop = _.prop, viewConfig = prop.viewConfig ? prop.viewConfig.gridConfig : null,
            header, headerSkin = '-voltmx-calendar-header', row, labelCell,
            cancelSelectionCell, correctSelectionCell, cancelSelectSrc, correctSelectSrc;

        header = $KD.create('DIV', {kr:'header'}, {
            display:'table', width:'100%', height: '15%', 'table-layout':'fixed'
        });
        if(prop.gridTheme === voltmx.calendar.MODERN) {
            headerSkin = (viewConfig && viewConfig.headerSkin)
                ? viewConfig.headerSkin : '-voltmx-calendar-header';
            $KD.addCls(header, headerSkin);
        }

        row = $KD.create('DIV', {}, {display:'table-row', width: '100%', height: '100%'});
        cancelSelectionCell = $KD.create('DIV', {tabindex:0}, {display:'table-cell', width:'15%', 'text-align': 'left', 'vertical-align': 'middle'});
        labelCell = $KD.create('DIV', {kr:'title'}, {display:'table-cell', width: '70%', 'text-align': 'center', 'vertical-align': 'middle'});
        correctSelectionCell = $KD.create('DIV', {tabindex:0}, {display:'table-cell', width:'15%', 'text-align':'right', 'vertical-align': 'middle'});

        cancelSelectSrc = (viewConfig && viewConfig.monthYearCancel)
            ? viewConfig.monthYearCancel :'k-cancel.png';
        correctSelectSrc = (viewConfig && viewConfig.monthYearDone)
            ? viewConfig.monthYearDone : 'k-go.png';

        _updateMonthYearHeaderLabel.call(this, labelCell);

        $KD.html(cancelSelectionCell, ('<img loading="lazy" onmousedown="return false;" src="'+$KU.getImageURL(cancelSelectSrc)+'" style="height:50%; width:50%; position:relative; left:5px;"/>'));
        $KD.html(correctSelectionCell, ('<img loading="lazy" onmousedown="return false;" src="'+$KU.getImageURL(correctSelectSrc)+'" style="height:50%; width:50%; position:relative; right:5px;"/>'));

        $KD.setAttr(cancelSelectionCell, 'kwh-focusout', 'onFocusOut');
        $KD.setAttr(correctSelectionCell, 'kwh-focusout', 'onFocusOut');
        $KD.setAttr(cancelSelectionCell, 'kwh-click', 'cancelSelection');
        $KD.setAttr(correctSelectionCell, 'kwh-click', 'correctSelection');

        $KD.add(row, cancelSelectionCell);
        $KD.add(row, labelCell);
        $KD.add(row, correctSelectionCell);

        $KD.add(header, row);

        return header;
    };


    var _getMonths = function() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom, size = _months.length,
            monthsArray = _months.slice(1, size), monthsBlock,
            row, cell, html = '', _ = this._kwebfw_, prop = _.prop,
            viewConfig = prop.viewConfig ? prop.viewConfig.gridConfig : null,
            cellSelectedSkin = '-voltmx-calendar-cell-selected';

        if(viewConfig && viewConfig.gridMonthYearSelectedSkin) {
            cellSelectedSkin = viewConfig.gridMonthYearSelectedSkin;
        }
        var _monthChunks = function(array, size) {
            var results = [];
            while(array.length) {
                results.push(array.splice(0, size));
            }
            return results;
        };

        monthsBlock = $KD.create('DIV', {kr:'months'}, {display:'table', 'table-layout':'fixed', width: '100%', height: '30%', border: '1px solid #FAFAFA'});
        monthsArray = _monthChunks(monthsArray, 6);
        $KU.each(monthsArray, function(block) {
            row = $KD.create('DIV', {}, {display:'table-row', width: '100%', height: '50%'});

            $KU.each(block, function(month) {
                cell = $KD.create('DIV', {kr:'month'}, {display:'table-cell', width: '100%', height: '15%', 'text-align': 'center', 'vertical-align': 'middle'});
                html = '<label tabindex="0" aria-live="polite" role="option" aria-label="' + month + '">';
                html += month.substring(0, 3) +'</label>';
                $KD.html(cell, html);

                $KD.setAttr(cell, 'month', month);
                $KD.setAttr(cell, 'cellskinvalue', '-voltmx-calendar-cell');
                $KD.setAttr(cell, 'cellselectedskin', cellSelectedSkin);
                $KD.addCls(cell, '-voltmx-calendar-cell');
                $KD.setAttr(cell, 'kwh-click', 'onMonthClick');
                $KD.setAttr(cell, 'kwh-focusout', 'onFocusOut');
                $KD.add(row, cell);
            });

            $KD.add(monthsBlock, row);
        });

        return monthsBlock;
    };


    var _getCounter = function(selectedYearValue) {
        var temp, iterator, counter = 2001;

        if(selectedYearValue) {
            selectedYearValue = Number(selectedYearValue);
        } else {
            selectedYearValue = null;
        }
        if(selectedYearValue !== null) {
            if(selectedYearValue > counter) {
                iterator = Math.floor((selectedYearValue - 2001) / 16);
                for(temp = 0; temp < iterator; temp++) {
                    counter = counter + 16;
                }
            } else {
                iterator = Math.ceil((2001 - selectedYearValue) / 16);
                for(temp = 0; temp < iterator; temp++) {
                    counter = counter - 16;
                }
            }
        }
        return counter;
    };


    var _getYears = function(firstYear) {
        var $K = voltmx.$kwebfw$, $KD = $K.dom,
            _ = this._kwebfw_, prop = _.prop, i, j, html = '', counter, row,
            dc = prop.dateComponents, cell, yearBlock,
            viewConfig = prop.viewConfig ? prop.viewConfig.gridConfig : null,
            cellSelectedSkin = '-voltmx-calendar-cell-selected';

        if(viewConfig && viewConfig.gridMonthYearSelectedSkin) {
            cellSelectedSkin = viewConfig.gridMonthYearSelectedSkin;
        }

        if(firstYear) {
            counter = firstYear;
        } else {
            dc = _.displayedMonths[0][1];
            counter = _getCounter(dc);
        }

        yearBlock = $KD.create('DIV', {kr:'years'}, {display:'table', tableLayout:'fixed', width: '100%', height: '40%'});

        for(i = 1; i <= 4; i++) { // 4 is number of rows of years We want to display.
            row = $KD.create('DIV', {}, {display:'table-row', width: '100%', height: '25%'});

            for(j = 1; j <= 4; j++) { //  Number of columns of years I want to display in each row.
                // SO here 4 Columns * 4 Rows = 16 years will be displayed.
                cell = $KD.create('DIV', {kr:'year'}, {display:'table-cell', width: '25%', 'visibility': 'visible', 'text-align': 'center', 'vertical-align': 'middle'});
                html = '<label tabindex="0" aria-live="polite" role="option" aria-label="' + counter + '">';
                html += counter +'</label>';

                if((counter > _minYear && counter < _maxYear) || counter === _maxYear || counter === _minYear) {
                    cell.style.visibility = 'visible';
                } else {
                    cell.style.visibility = 'hidden';
                }

                $KD.setAttr(cell, 'year', counter);
                $KD.setAttr(cell, 'cellskinvalue', '-voltmx-calendar-cell');
                $KD.setAttr(cell, 'cellselectedskin', cellSelectedSkin);
                $KD.addCls(cell, '-voltmx-calendar-cell');
                $KD.setAttr(cell, 'kwh-click', 'onYearClick');
                $KD.setAttr(cell, 'kwh-focusout', 'onFocusOut');
                $KD.html(cell, html);
                $KD.add(row, cell);
                counter++;
            }

            $KD.add(yearBlock, row);
        }

        return yearBlock;
    };


    var _getYearNavigation = function() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom, _ = this._kwebfw_,
            prop = _.prop, viewConfig = prop.viewConfig ? prop.viewConfig.gridConfig : null,
            prevYearSrc, yearNavigationBlock, row, leftNavCell, rightNavCell, nextYearSrc, centerDiv;

        yearNavigationBlock = $KD.create('DIV', {}, {display:'table', 'table-layout':'fixed', width: '100%', height: '15%'});
        row = $KD.create('DIV', {}, {display:'table-row', width: '100%', height: '100%'});
        leftNavCell = $KD.create('DIV', {tabindex:0}, {display:'table-cell', width:'20%', 'text-align': 'left', 'vertical-align': 'middle'});
        centerDiv = $KD.create('DIV', {}, {display:'table-cell', width:'60%'});
        rightNavCell = $KD.create('DIV', {tabindex:0}, {display:'table-cell', width:'20%', 'text-align':'right', 'vertical-align': 'middle'});

        prevYearSrc = (viewConfig && viewConfig.leftNavigationImage)
            ? viewConfig.leftNavigationImage : 'kwebfw-prev-month.png';
        nextYearSrc = (viewConfig && viewConfig.rightNavigationImage)
            ? viewConfig.rightNavigationImage : 'kwebfw-next-month.png';

        $KD.setAttr(leftNavCell, 'kwh-click', 'onPrevYearSetClick');
        $KD.setAttr(rightNavCell, 'kwh-click', 'onNextYearSetClick');

        $KD.html(leftNavCell, ('<img loading="lazy" onmousedown="return false;" src="'+ $KU.getImageURL(prevYearSrc) +'" style="height:15px; width:25px; display:inline-block;"/>'));
        $KD.html(rightNavCell, ('<img loading="lazy" onmousedown="return false;" src="'+ $KU.getImageURL(nextYearSrc) +'" style="height:15px; width:25px; display:inline-block;"/>'));

        $KD.setAttr(leftNavCell, 'kwh-focusout', 'onFocusOut');
        $KD.setAttr(rightNavCell, 'kwh-focusout', 'onFocusOut');

        $KD.add(row, leftNavCell);
        $KD.add(row, centerDiv);
        $KD.add(row, rightNavCell);
        $KD.add(yearNavigationBlock, row);

        return yearNavigationBlock;
    };


    //This functions will be called in the scope of widget instance
    var _inEnableDateRange = function Calendar$_inEnableDateRange(dt) {
        var startDate = this._kwebfw_.enableDateRangeStart,
            endDate = this._kwebfw_.enableDateRangeEnd,
            flag = _inValidRange(startDate, endDate, dt);

        return flag;
    };


    //This functions will be called in the scope of widget instance
    var _inEnableDates = function Calendar$_inEnableDates(dt) {
        var flag = false, key = _dateFormatter(dt, false);

        if(this._kwebfw_.enableDates
        && this._kwebfw_.enableDates[key] === true) {
            flag = true;
        }

        return flag;
    };


    var _inValidRange = function Calendar$_inValidRange(start, end, target) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

        if(!target) {
            flag = true;
        } else {
            if($KU.is(start, 'array')) {
                start = new Date(start[2], (start[1] - 1), start[0], 0, 0, 0);
            }
            if($KU.is(end, 'array')) {
                end = new Date(end[2], (end[1] - 1), end[0], 0, 0, 0);
            }
            if($KU.is(target, 'array')) {
                target = new Date(target[2], (target[1] - 1), target[0], 0, 0, 0);
            }

            if(start && end && target >= start && target <= end) {
                flag = true;
            } else if(start && !end && target >= start) {
                flag = true;
            } else if(!start && end && target <= end) {
                flag = true;
            } else if(!start && !end) {
                flag = true;
            }
        }

        return flag;
    };


    //This functions will be called in the scope of widget instance
    var _isDateInactive = function Calendar$_isDateInactive(dc) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, dt = null,
            _ = this._kwebfw_, prop = _.prop, flag = null,
            weekends = [_weekDays[_weekends[0]], _weekDays[_weekends[1]]];

        if(!$KU.is(flag, 'boolean') && $KU.is(_.enableDatesInactive, 'boolean')) {
            if(_inEnableDates.call(this, dc)) {
                flag = _.enableDatesInactive;
            }
        }

        if(!$KU.is(flag, 'boolean') && $KU.is(_.enableDateRangeInactive, 'boolean')) {
            if(_inEnableDateRange.call(this, dc)) {
                flag = _.enableDateRangeInactive;
            } else {
                flag = !_.enableDateRangeInactive;
            }
        }

        if(!$KU.is(flag, 'boolean') && !_inValidRange(prop.validStartDate, prop.validEndDate, dc)) {
            flag = true;
        }

        if(flag !== true && prop.viewConfig && prop.viewConfig.gridConfig
        && prop.viewConfig.gridConfig.allowWeekendSelectable === false) {
            dt = new Date(dc[2], (dc[1] - 1), dc[0], 0, 0, 0);
            if(weekends.indexOf(dt.getDay()) >= 0) {
                flag = true;
            }
        }

        return (flag === true) ? true : false;
    };


    //This functions will be called in the scope of widget instance
    var _isValidDateCombination = function Calendar$_isValidDateCombination(prop) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, _ = this._kwebfw_,
            validStartDate = prop.validStartDate, from = null, to = null,
            validEndDate = prop.validEndDate, type = prop.selectionType,
            dc = prop.dateComponents, sd = prop.selectedDates, dates = null,
            enableDateRangeStart = null, enableDateRangeEnd = null,
            next = null, flag = true;

        if(flag && validStartDate && validEndDate) {
            validStartDate = new Date(validStartDate[2], (validStartDate[1] - 1), validStartDate[0], 0, 0, 0);
            validEndDate = new Date(validEndDate[2], (validEndDate[1] - 1), validEndDate[0], 0, 0, 0);

            if(validStartDate > validEndDate) flag = false;
        }

        if(flag && _.enableDateRangeStart && _.enableDateRangeEnd) {
            enableDateRangeStart = new Date(_.enableDateRangeStart[2], (_.enableDateRangeStart[1] - 1), _.enableDateRangeStart[0], 0, 0, 0);
            enableDateRangeEnd = new Date(_.enableDateRangeEnd[2], (_.enableDateRangeEnd[1] - 1), _.enableDateRangeEnd[0], 0, 0, 0);

            if(enableDateRangeStart > enableDateRangeEnd) flag = false;
        }

        if(flag && sd && type === constants.CALENDAR_SELECTION_TYPE_RANGE_SELECT) {
            from = new Date(sd[0][2], (sd[0][1] - 1), sd[0][0], 0, 0, 0);
            to = new Date(sd[1][2], (sd[1][1] - 1), sd[1][0], 0, 0, 0);

            if(from > to) flag = false;
        }

        if(flag) {
            if(dc && type === constants.CALENDAR_SELECTION_TYPE_SINGLE_SELECT) {
                flag = !_isDateInactive.call(this, dc);
            } else if(sd && type === constants.CALENDAR_SELECTION_TYPE_MULTI_SELECT) {
                $KU.each(sd, function(date) {
                    if(_isDateInactive.call(this, date)) {
                        flag = false;
                        return true;
                    }
                }, this);
            } else if(from && to && type === constants.CALENDAR_SELECTION_TYPE_RANGE_SELECT) {
                dates = [];
                next = from;

                while(next <= to) {
                    dates.push(next);
                    next = new Date((next.getTime() + (24*60*60*1000)));
                } next = null;

                $KU.each(dates, function(date) {
                    if(_isDateInactive.call(this, date)) {
                        flag = false;
                        return true;
                    }
                }, this);
            }
        }

        return flag;
    };


    var _isValidDateComponents = function Calendar$_isValidDateComponents(dc) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false,
            year = 0, month = 0, date = 0, hour = 0, min = 0, sec = 0;

        if($KU.is(dc, 'null')) {
            flag = true;
        } else if($KU.is(dc, 'array')) {
            if(dc.length === 3 || dc.length === 6) {
                if(dc.length === 3) {
                    dc.push(0, 0, 0);
                }

                if($K.F.EIWP) {
                    if($KU.is(dc[0], 'numeric')) {
                        dc[0] = parseInt(dc[0], 10);
                    }
                    if($KU.is(dc[1], 'numeric')) {
                        dc[1] = parseInt(dc[1], 10);
                    }
                    if($KU.is(dc[2], 'numeric')) {
                        dc[2] = parseInt(dc[2], 10);
                    }
                }

                year = $KU.is(dc[2], 'number') ? dc[2] : -1;
                month = $KU.is(dc[1], 'number') ? dc[1] : -1;
                date = $KU.is(dc[0], 'number') ? dc[0] : -1;
                hour = $KU.is(dc[3], 'number') ? dc[3] : -1;
                min = $KU.is(dc[4], 'number') ? dc[4] : -1;
                sec = $KU.is(dc[5], 'number') ? dc[5] : -1;

                if(year >= _minYear && year <= _maxYear
                && month >= 1 && month <= 12
                && date >= 1 && date <= 31
                && hour >= 0 && hour <= 23
                && min >= 0 && min <= 59
                && sec >= 0 && sec <= 59) {
                    if([4, 6, 9, 11].indexOf(month) >= 0 && date <= 30) {
                        flag = true;
                    } else if(month === 2) {
                        if($KU.is(year, 'leapyear') && date <= 29) {
                            flag = true;
                        } else if(date <= 28) {
                            flag = true;
                        }
                    } else {
                        flag = true;
                    }
                }
            }
        }

        if(!flag && $K.F.EIWP) {
            if($KU.is(dc, 'array') && $KU.is(dc[0], 'null')
            && $KU.is(dc[2], 'null') && $KU.is(dc[2], 'null')) {
                flag = [null, true];
            }
        }

        return flag;
    };


    var _maxDate = function Calendar$_maxDate(month, year) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, max = -1;

        if(month === 2) {
            max = $KU.is(year, 'leapyear') ? 29 : 28;
        } else if([4, 6, 9, 11].indexOf(month) >= 0) {
            max = 30;
        } else if([1, 3, 5, 7, 8, 10, 12].indexOf(month) >= 0) {
            max = 31;
        }

        return max;
    };


    //This functions will be called in the scope of widget instance
    var _nextMonth = function Calendar$_nextMonth(count) {
        var _ = this._kwebfw_, dm = _.displayedMonths[0], month = dm[0], year = dm[1];

        if(count >= 1 && count <= 12) {
            if(month >= 12) {
                year += 1;
                month = month - 12;
            }

            month += count;

            _changePicker.call(this, month, year);
        }
    };


    //This functions will be called in the scope of widget instance
    var _nextYear = function Calendar$_nextYear(count) {
        var _ = this._kwebfw_, dm = _.displayedMonths[0], month = dm[0], year = dm[1];

        if((year+count) <= _maxYear) {
            _changePicker.call(this, month, (year+count));
        }
    };


    //This functions will be called in the scope of widget instance
    var _onDateEdited = function Calendar$_onDateEdited(formattedDate) {
        var $K = voltmx.$kwebfw$, $KW = $K.widget, dates = null,
            _ = this._kwebfw_, prop = _.prop, valid = true;

        dates = _convertFormatedDateToDateComponents.call(this, formattedDate);

        if(!dates) {
            valid = false;
        } else if(prop.selectionType && !dates.length) {
            this.dateComponents = null;
            this.selectedDates = null;
        } else if(prop.selectionType === constants.CALENDAR_SELECTION_TYPE_SINGLE_SELECT) {
            this.dateComponents = dates[0];
        } else {
            this.selectedDates = dates;
        }

        $KW.fire(this, 'onDone', this, {isValidDateSelected:valid});
    };


    //This functions will be called in the scope of widget instance
    var _openPicker = function Calendar$_openPicker() {
        var $K = voltmx.$kwebfw$, $KW = $K.widget, $KD = $K.dom, picker = null,
            el = $KW.el(this), _ = this._kwebfw_, prop = _.prop,
            dc = prop.dateComponents, dm = _.displayedMonths[0], date = null,
            today = new Date(), selectedDates = _getAllSelectedDates.call(this),
            pickers = {};

        if(selectedDates.length > 0
        && prop.selectionType !== constants.CALENDAR_SELECTION_TYPE_SINGLE_SELECT) {
            date = selectedDates[selectedDates.length-1];
            date = new Date(date[2], (date[1]-1), date[0], 0, 0, 0);
        } else if(dc && prop.selectionType === constants.CALENDAR_SELECTION_TYPE_SINGLE_SELECT) {
            date = new Date(dc[2], (dc[1]-1), dc[0], dc[3], dc[4], dc[5]);
        } else if(today.getMonth() === (dm[0]-1) && today.getFullYear() === dm[1]) {
            date = today;
        } else {
            date = new Date(dm[1], (dm[0]-1), 1, 0, 0, 0);
        }

        pickers = $KW.pickers(this);

        pickers[_.uid] = _.uid;
        picker = _.picker = _renderPicker.call(this, date);

        $KD.setAttr(el.icon, 'aria-expanded', 'true');
        _anchorPicker.call(this);

        date = _dateFormatter(date, false);
        date = $KD.find(picker, '[date="'+date+'"]')[0];

        if(!date) {
            date = new Date(_.displayedMonths[0][1], (_.displayedMonths[0][0]-1), 1, 0, 0, 0);
            date = $KD.find(picker, '[date="'+_dateFormatter(date, false)+'"]')[0];
        }

        $KD.focus(date); //NOTE:: After focus, position the picker
    };


    var _parseToDateComponent = function Calendar$_parseToDateComponent(str, format) {
        var dc = null, date = null, dt = '', mth = '',
            yr = '', hr = '00', min = '00', sec = '00',
            strip = function(value, pattern, lookfor) {
                var index = pattern.indexOf(lookfor);
                return (index !== -1) ? value.substr(index, lookfor.length) : '';
            };

        dt = strip(str, format, 'dd');
        mth = strip(str, format, 'MMM');
        if(!mth) mth = strip(str, format, 'MM');
        yr = strip(str, format, 'yyyy');
        if(!yr) yr = strip(str, format, 'yy');

        hr = strip(str, format, 'hh') || '00';
        min = strip(str, format, 'mm') || '00';
        sec = strip(str, format, 'ss') || '00';

        if(!dt || !mth || !yr) {
            dc = null;
        } else {
            date = new Date((yr+'-'+mth+'-'+dt+' '+hr+':'+min+':'+sec));

            if(isNaN(date.valueOf()) || date.toString() === 'Invalid Date') {
                dc = null;
            } else {
                dt = parseInt(dt, 10);
                mth = parseInt(mth, 10);
                yr = parseInt(yr, 10);
                hr = parseInt(hr, 10);
                min = parseInt(min, 10);
                sec = parseInt(sec, 10);

                date = _dateFormatter([dt, mth, yr, hr, min, sec], false, format);

                dc = (date === str) ? [dt, mth, yr, hr, min, sec] : null;
            }
        }

        return dc;
    };


    //This functions will be called in the scope of widget instance
    var _populateDisplayedMonths = function Calendar$_populateDisplayedMonths(month, year) {
        var _ = this._kwebfw_, prop = _.prop, noOfMonths = prop.noOfMonths, i = 0;

        noOfMonths = 1; //Until this feature is implemented, hard coding its value to 1
        _.displayedMonths.splice(0, _.displayedMonths.length); //Making it empty

        for(i=0; i<noOfMonths; i++) {
            _.displayedMonths.push([month, year]);

            month = (month + 1);

            if(month > 12) {
                month = 1;
                year = (year + 1);
            }
        }
    };


    //All widget file must have this variable
    //This functions will be called in the scope of widget instance
    var _populateUnderscore = {
        Calendar: function Calendar$_populateUnderscore() {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, _ = null;

            if(!$KU.is(this._kwebfw_, 'object')) {
                $KU.defineProperty(this, '_kwebfw_', {}, null);
            }
            _ = this._kwebfw_;

            //NOTE:: Any changes to _ (underscore) may need a change in
            //       _cleanUnderscore function of voltmxui.js file.
            if(!_.ns) {
                if($KU.is(this.__$kwebfw$ns__, 'string') && this.__$kwebfw$ns__) {
                    $KU.defineProperty(_, 'ns', this.__$kwebfw$ns__, null);
                } else {
                    $KU.defineProperty(_, 'ns', 'voltmx.ui.Calendar', null);
                }
            }
            if(!_.name) {
                if($KU.is(this.__$kwebfw$name__, 'string') && this.__$kwebfw$name__) {
                    $KU.defineProperty(_, 'name', this.__$kwebfw$name__, null);
                } else {
                    $KU.defineProperty(_, 'name', 'Calendar', null);
                }
            }

            if(!_.anchor) $KU.defineProperty(_, 'anchor', {}, null);
            if(typeof _.tabIndex !== 'number') {
                $KU.defineProperty(_, 'tabIndex', 0, true);
            }
            $KU.defineProperty(_, 'dateSelectionStarted', false, true);
            $KU.defineProperty(_, 'displayedMonths', [], false); //Must not be writable
            $KU.defineProperty(_, 'enableDateRangeEnd', null, true);
            $KU.defineProperty(_, 'enableDateRangeInactive', null, true);
            $KU.defineProperty(_, 'enableDateRangeSkin', '', true);
            $KU.defineProperty(_, 'enableDateRangeStart', null, true);
            $KU.defineProperty(_, 'enableDates', {}, true);
            $KU.defineProperty(_, 'enableDatesInactive', null, true);
            $KU.defineProperty(_, 'enableDatesSkin', {}, true);
            $KU.defineProperty(_, 'selectedDates', [], true);
            $KU.defineProperty(_, 'specialSkins', {}, true);
        }
    };


    //All widget file must have this variable
    //This function will be called in the scope of widget instance
    var _postInitialization = {
        Calendar: function Calendar$_postInitialization() {
            var $K = voltmx.$kwebfw$, $KU = $K.utils,
                _ = this._kwebfw_, prop = _.prop;

            if($KU.is(prop.skin, 'null')) {
                prop.skin = 'slCalendar';
            }

            if($KU.is(prop.padding, 'null')) {
                prop.padding = [0, 0, 0, 0];
            }

            if(prop.i18n_toolTip) {
                prop.toolTip = prop.i18n_toolTip;
            }

            _updateRelatedDateProperties.call(this);
        }
    };


    //This function will be called in the scope of widget instance
    var _prepareDates = function Calendar$_prepareDates(month, year, startingDay) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, c = 0, prevYear = year,
            nextYear = year, prevMonth = (month-1), nextMonth = (month+1),
            currentMaxDate = -1, date = '', prevMaxDate = -1, dates = [],
            firstDay = -1, firstDiff = 0, nextDate = 1;

        if(month === 1) {
            prevMonth = 12;
            prevYear = (year - 1);
        } else if(month === 12) {
            nextMonth = 1;
            nextYear = (year + 1);
        }

        prevMaxDate = _maxDate(prevMonth, prevYear);
        currentMaxDate = _maxDate(month, year);

        if($KU.is(startingDay, 'string') && startingDay
        && Object.prototype.hasOwnProperty.call(_weekDays, startingDay)) {
            startingDay = _weekDays[startingDay];
        } else {
            startingDay = 0;
        }

        firstDay = new Date(year, (month-1), 1, 0, 0, 0);
        firstDay = firstDay.getDay();

        if(firstDay <= 6 && firstDay >= startingDay) {
            firstDiff = firstDay - startingDay;
        } else {
            firstDiff = 6 - startingDay + 1;
            firstDiff += firstDay;
        }

        for(c=0; c<42; c++) {
            if(c < firstDiff) {
                date = prevMaxDate - firstDiff + c + 1; //Add previous month dates in reverse
                date = [prevYear, prevMonth, date];
            } else if(c >= firstDiff && c <= (currentMaxDate + firstDiff)) {
                date = c - firstDiff + 1; //Add current month dates in forward

                if(date > currentMaxDate) {
                    date = nextDate++;
                    date = [nextYear, nextMonth, date];
                } else {
                    date = [year, month, date];
                }
            } else {
                date = nextDate++; //Add next month dates in forward
                date = [nextYear, nextMonth, date];
            }

            dates.push(date);
        }

        return dates;
    };


    //This function will be called in the scope of widget instance
    var _prepareDays = function Calendar$_prepareDays(startingDay) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, c = 0, days = [];

        if($KU.is(startingDay, 'string') && startingDay
        && Object.prototype.hasOwnProperty.call(_weekDays, startingDay)) {
            startingDay = _weekDays[startingDay];
        } else {
            startingDay = 0;
        }

        for(c=startingDay; c<7; c++) {
            days.push(c);
        }

        for(c=0; c<startingDay; c++) {
            days.days(c);
        }

        return days;
    };


    //This functions will be called in the scope of widget instance
    var _prevMonth = function Calendar$_prevMonth(count) {
        var _ = this._kwebfw_, dm = _.displayedMonths[0], month = dm[0], year = dm[1];

        if(count >= 1 && count <= 12) {
            month -= count;

            if(month <= 0) {
                year -= 1;
                month = 12 - month;
            }

            _changePicker.call(this, month, year);
        }
    };


    //This functions will be called in the scope of widget instance
    var _prevYear = function Calendar$_prevYear(count) {
        var _ = this._kwebfw_, dm = _.displayedMonths[0], month = dm[0], year = dm[1];

        if((year-count) >= _minYear) {
            _changePicker.call(this, month, (year-count));
        }
    };


    //All widget file must have this variable
    //This functions will be called in the scope of widget instance
    var _relayoutActiveTriggerer = {
        Calendar: function Calendar$_relayoutActiveTriggerer() {
            return [];
        }
    };


    //All widget file must have this variable
    //This functions will be called in the scope of widget instance
    var _relayoutPassiveTriggerer = {
        Calendar: function Calendar$_relayoutPassiveTriggerer() {
            return [];
        }
    };


    //This function will be called in the scope of widget instance
    var _renderAction = function Calendar$_renderAction() {
        var $K = voltmx.$kwebfw$, $KD = $K.dom,
            action = $KD.create('DIV', {kr:'actions'});

        //

        return action;
    };


    //This function will be called in the scope of widget instance
    var _renderCalendar = function Calendar$_renderCalendar(month, year, date) {
        var $K = voltmx.$kwebfw$, $KD = $K.dom, calendar = null, size = null, calheight = 0,
            _ = this._kwebfw_, prop = _.prop, viewConfig = prop.viewConfig,
            gridConfig = (viewConfig && viewConfig.gridConfig) ? viewConfig.gridConfig : {};

        size = _deduceCellHeightAndWidth.call(this);
        if(prop.gridTheme === voltmx.calendar.LEGACY) {
            calheight = ((size.height * 6) + 41 + 40 + 19) + 'px';
        } else if($K.behavior[constants.API_LEVEL] >= constants.API_LEVEL_9200
        || $K.behavior.calendarMonthYearSelectionDropdownView) {/* grid *//* header *//* weekdays */
            calheight = ((size.height * 6) + 44 + 22) + 'px';
        } else {
            calheight = ((size.height * 6) + 38 + 22) + 'px';
        }

        //Extra height for apply and close buttons in calendar for modern theme
        if(prop.gridTheme === voltmx.calendar.MODERN
        && prop.selectionType !== constants.CALENDAR_SELECTION_TYPE_SINGLE_SELECT) {
            calheight = parseInt(calheight) + 20 + 'px';
        }

        calendar = $KD.create('DIV', {kr:'calendar'}, {
            position: 'relative',
            top: '0px', left: '0px',
            height: calheight,
            width: ((size.width * 7) + 'px')
        });

        $KD.addCls(calendar, (gridConfig.gridSkin || '-voltmx-calendar-grid'));
        $KD.add(calendar, _renderHeader.call(this, month, year));
        $KD.add(calendar, _renderDays.call(this, _startDay));
        $KD.add(calendar, _renderDates.call(this, month, year, _startDay, _weekends));
        if(prop.gridTheme === voltmx.calendar.LEGACY
        || prop.selectionType !== constants.CALENDAR_SELECTION_TYPE_SINGLE_SELECT) {
            $KD.add(calendar, _renderFooter.call(this, date));
        }

        return calendar;
    };


    //This function will be called in the scope of widget instance
    var _renderDates = function Calendar$_renderDates(month, year, startingDay/*, weekends*/) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom, grid = null,
            row = null, tpl = null, size = _deduceCellHeightAndWidth.call(this),
            dates = _prepareDates.call(this, month, year, startingDay);

        grid = $KD.create('DIV', {role:'grid'});
        row = $KD.create('DIV', {kr:'dates', role:'row'});

        $KU.each(dates, function(date) {
            var $K = voltmx.$kwebfw$, $KD = $K.dom, info = null,
                dt = '', cell = $KD.create('DIV', {
                    kr: 'date', role: 'gridcell'
                }, {
                    height:(size.height+'px'),
                    width:(size.width+'px')
                });

            info = _cellRenderInfo.call(this, date[2], date[1], date[0], month, year);

            dt = '<label';
            if(!(date[1] === month && date[0] === year)
            && this.hidePreviousNextMonthDates) {
                dt += ' hidden';
            }
            dt += ' class="-voltmx-ca-';
            dt += this.dayTextAlignmentInCell;
            dt += ('">' + info.text + '</label>');

            tpl = _renderTemplate.call(this, date);

            $KD.setAttr(cell, 'aria-label',
                (new Date(date[0], (date[1]-1), date[2], 0, 0, 0).toDateString())
            );
            if(info.today) $KD.setAttr(cell, 'aria-current', 'date');
            if(info.disabled) $KD.setAttr(cell, 'aria-disabled', true);
            if(info.selected) $KD.setAttr(cell, 'aria-selected', true);

            date = _dateFormatter([date[2], date[1], date[0]], false);
            $KD.setAttr(cell, 'date', date);
            $KD.setAttr(cell, 'cellskintype', info.skinType);
            $KD.setAttr(cell, 'cellskinvalue', info.skin);
            $KD.setAttr(cell, 'cellselectedskin', info.selectedSkin);
            $KD.setAttr(cell, 'tabindex', 0);
            $KD.setAttr(cell, 'kwh-click', 'onDateClick');
            $KD.setAttr(cell, 'kwh-focusin', 'onDateFocus');
            $KD.setAttr(cell, 'kwh-keydown', 'onDateKeyDown,dismissPicker,dateNavigation');
            $KD.setAttr(cell, 'kwh-keyup', 'onDateKeyUp');
            $KD.setAttr(cell, 'kwh-focusout', 'onFocusOut');

            dt && $KD.html(cell, dt);
            tpl && $KD.add(cell, tpl);
            $KD.addCls(cell, info.appliedSkin);
            $KD.add(row, cell);
        }, this);

        $KD.add(row, $KD.create('DIV', {class:'-voltmx-clear'}));
        $KD.add(grid, row);

        return grid;
    };


    //This function will be called in the scope of widget instance
    var _renderDays = function Calendar$_renderDays(startingDay/*, weekends*/) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom,
            _ = this._kwebfw_, prop = _.prop, days = null,
            wrapper = null, size = null;

        days = _prepareDays.call(this, startingDay);
        size = _deduceCellHeightAndWidth.call(this);
        wrapper = $KD.create('DIV', {kr:'weekdays'});

        $KU.each(days, function(day) {
            var $K = voltmx.$kwebfw$, $KD = $K.dom,
                cell = $KD.create('LABEL', {
                    kr: 'day', day: day
                }, {
                    width: (size.width+'px'),
                    textAlign: 'center'
                });

            //$KD.addCls(cell, 'textAlign', ('-voltmx-ca-'+this.dayTextAlignmentInCell));
            $KD.html(cell, _days[day].toUpperCase());
            $KD.add(wrapper, cell);
        }, this);

        $KD.add(wrapper, $KD.create('DIV', {class:'-voltmx-clear'}));

        if(prop.hideDaysHeader) {
            $KD.style(wrapper, 'visibility', 'hidden');
        }

        return wrapper;
    };


    //This function will be called in the scope of widget instance
    var _renderFooter = function Calendar$_renderFooter(/*date*/) {
        var $K = voltmx.$kwebfw$, $KD = $K.dom, _ = this._kwebfw_,
            config = _.prop.viewConfig ? _.prop.viewConfig.gridConfig : null, footer = null,
            html = '', row = null, left = null, apply = null, close = null;

        footer = $KD.create('DIV', {kr:'footer'}, {
            display:'table', width:'100%', height:'20px', tableLayout:'auto'
        });

        row = $KD.create('DIV', {}, {display:'table-row'});
        left = $KD.create('DIV', {}, {display:'table-cell', verticalAlign:'middle', width:'100%'});
        $KD.add(row, left);

        if(this.selectionType !== constants.CALENDAR_SELECTION_TYPE_SINGLE_SELECT) {
            apply = $KD.create('DIV', {}, {display:'table-cell', verticalAlign:'middle'});
            html = '<input type="button" value="Apply"';
            if(config && config.doneButtonSkin) {
                html += (' class="'+config.doneButtonSkin+'"');
            }
            html +=' kr="apply" kwh-click="onApplyClick" kwh-keydown="dismissPicker"/>';
            $KD.html(apply, html); $KD.add(row, apply);
        }

        close = $KD.create('DIV', {}, {display:'table-cell', verticalAlign:'middle'});
        html = '<input type="button" value="Close"';
        if(config && config.cancelButtonSkin) {
            html += (' class="'+config.cancelButtonSkin+'"');
        }
        html += ' kr="close" kwh-click="onCloseClick" kwh-keydown="dismissPicker"/>';
        $KD.html(close, html); $KD.add(row, close);

        $KD.add(footer, row);

        return footer;
    };


    //This function will be called in the scope of widget instance
    var _renderHeader = function Calendar$_renderHeader(month, year) {
        var $K = voltmx.$kwebfw$, header = null;

        if($K.behavior[constants.API_LEVEL] >= constants.API_LEVEL_9200
        || $K.behavior.calendarMonthYearSelectionDropdownView) {
            header = _renderMonthYearDropDownHeader.call(this, month, year);
        } else {
            header = _renderMonthYearPopupHeader.call(this, month, year);
        }

        return header;
    };


    //This function will be called in the scope of widget instance
    var _renderMonthYearDropDownHeader = function Calendar$_renderMonthYearDropDownHeader(month, year) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom, header = null, _ = this._kwebfw_,
            prop = _.prop, viewConfig = prop.viewConfig ? prop.viewConfig.gridConfig : null,
            row = null, prevMonthCell = null, nextMonthCell = null, prevMonthSrc = '',
            nextMonthSrc = '', monthHolder = null, yearHolder = null, selectedSkin = '-voltmx-calendar-cell-selected',
            hoverSkin = '-voltmx-calendar-cell-hover', headerSkin = '-voltmx-calendar-header',
            _generateYearsArray = function(start, end, step) {
                var i = null, years = [];

                for(i=start; i<=end; i+= step) {
                    years.push(i.toString());
                }

                return years;
            };

        if(viewConfig) {
            selectedSkin = viewConfig.gridMonthYearSelectedSkin || '-voltmx-calendar-cell-selected';
            hoverSkin = viewConfig.gridMonthYearHoverSkin || '-voltmx-calendar-cell-hover';
        }

        header = $KD.create('DIV', {kr:'header'}, {
            width:'100%'
        });
        if(prop.gridTheme === voltmx.calendar.MODERN) {
            prevMonthSrc = (viewConfig && viewConfig.leftNavigationImage)
                ? viewConfig.leftNavigationImage : 'leftnav.png';
            nextMonthSrc = (viewConfig && viewConfig.rightNavigationImage)
                ? viewConfig.rightNavigationImage : 'rightnav.png';
            headerSkin = (viewConfig && viewConfig.headerSkin)
                ? viewConfig.headerSkin : '-voltmx-calendar-header';
            $KD.addCls(header, headerSkin);
        } else {
            prevMonthSrc = (viewConfig && viewConfig.leftNavigationImage)
                ? viewConfig.leftNavigationImage : 'kwebfw-prev-month.png';
            nextMonthSrc = (viewConfig && viewConfig.rightNavigationImage)
                ? viewConfig.rightNavigationImage : 'kwebfw-next-month.png';
        }

        row = $KD.create('DIV', {}, {display:'flex', width:'100%'});
        prevMonthCell = $KD.create('DIV', {tabindex:0}, {width:'20px', marginRight: 'auto'});
        nextMonthCell = $KD.create('DIV', {tabindex:0}, {width:'20px', marginLeft: 'auto'});
        monthHolder = $KD.create('DIV', {tabindex:0, kr:'month'}, {height:'24px', width:'85px', position:'relative', marginLeft:'0px', marginRight:'5px'});
        yearHolder = $KD.create('DIV', {tabindex:0, kr:'year'}, {height:'24px', width:'55px', position:'relative', marginLeft:'5px', marginRight:'0px'});

        $KD.setAttr(prevMonthCell, 'kwh-click', 'onPrevMonthClick');
        $KD.setAttr(prevMonthCell, 'kwh-focusout', 'onFocusOut');
        $KD.setAttr(monthHolder, 'kwh-focusout', 'onFocusOut');
        $KD.setAttr(yearHolder, 'kwh-focusout', 'onFocusOut');
        $KD.setAttr(prevMonthCell, 'kwh-keydown', 'dismissPicker');
        $KD.setAttr(nextMonthCell, 'kwh-click', 'onNextMonthClick');
        $KD.setAttr(nextMonthCell, 'kwh-focusout', 'onFocusOut');

        _.monthDropdown = new $K.plugins.DropDown(_months.slice(1),
            {
                focusOutInstance: true,
                focusSkin: '',
                hoverSkin: hoverSkin,
                selectedSkin: selectedSkin,
                renderTo: monthHolder,
                position:$K.constants.POSITION_BOTTOM, selectedOption:_months[month], height: '150px',
                callback: function(selectedOption) {
                    _renderSelectedMonthYear.call(this, selectedOption);
                }.bind(this)
            });
        _.yearDropdown = new $K.plugins.DropDown(_generateYearsArray.call(this, _minYear, _maxYear, 1),
            {
                focusOutInstance: true,
                focusSkin: '',
                hoverSkin: hoverSkin,
                selectedSkin: selectedSkin,
                renderTo: yearHolder,
                position:$K.constants.POSITION_BOTTOM, selectedOption:year.toString(), height: '150px',
                callback: function(selectedOption) {
                    _renderSelectedMonthYear.call(this, selectedOption);
                }.bind(this)
            });

        $KD.html(prevMonthCell, (
            '<img loading="lazy" onmousedown="return false;"'
            +' src="'+$KU.getImageURL(prevMonthSrc)+'"'
            +'style="height:16px; position:relative; left:8px; top:3px;"/>'
        ));
        $KD.html(nextMonthCell, (
            '<img loading="lazy" onmousedown="return false;"'
            +' src="'+$KU.getImageURL(nextMonthSrc)+'"'
            +'style="height:16px; position:relative; right:4px; top:3px;"/>'
        ));

        $KD.add(row, prevMonthCell);
        $KD.add(row, monthHolder);
        $KD.add(row, yearHolder);
        $KD.add(row, nextMonthCell);
        if(prop.hideMonthsHeader) {
            $KD.style(monthHolder, 'visibility', 'hidden');
            $KD.style(yearHolder, 'visibility', 'hidden');
        }

        $KD.add(header, row);

        return header;
    };


    //This function will be called in the scope of widget instance
    var _renderMonthYearPopupHeader = function Calendar$_renderMonthYearPopHeader(month, year) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom, header = null, _ = this._kwebfw_,
            prop = _.prop, viewConfig = prop.viewConfig ? prop.viewConfig.gridConfig : null,
            html = '', row = null, prevYearCell = null, prevMonthCell = null,
            labelCell = null, nextMonthCell = null, nextYearCell = null,
            prevYearSrc = '', prevMonthSrc = '', nextMonthSrc = '',
            nextYearSrc = '', headerSkin = '-voltmx-calendar-header';

        header = $KD.create('DIV', {kr:'header'}, {
            width:'100%'
        });
        if(prop.gridTheme === voltmx.calendar.MODERN) {
            prevYearSrc = (viewConfig && viewConfig.leftNavigationImage)
                ? viewConfig.leftNavigationImage : 'leftnav.png';
            prevMonthSrc = (viewConfig && viewConfig.leftNavigationImage)
                ? viewConfig.leftNavigationImage : 'leftnav.png';
            nextMonthSrc = (viewConfig && viewConfig.rightNavigationImage)
                ? viewConfig.rightNavigationImage : 'rightnav.png';
            nextYearSrc = (viewConfig && viewConfig.rightNavigationImage)
                ? viewConfig.rightNavigationImage : 'rightnav.png';
            headerSkin = (viewConfig && viewConfig.headerSkin)
                ? viewConfig.headerSkin : '-voltmx-calendar-header';
            $KD.addCls(header, headerSkin);
        } else {
            prevYearSrc = (viewConfig && viewConfig.leftNavigationImage)
                ? viewConfig.leftNavigationImage : 'kwebfw-prev-month.png';
            prevMonthSrc = (viewConfig && viewConfig.leftNavigationImage)
                ? viewConfig.leftNavigationImage : 'kwebfw-prev-month.png';
            nextMonthSrc = (viewConfig && viewConfig.rightNavigationImage)
                ? viewConfig.rightNavigationImage : 'kwebfw-next-month.png';
            nextYearSrc = (viewConfig && viewConfig.rightNavigationImage)
                ? viewConfig.rightNavigationImage : 'kwebfw-next-month.png';
        }

        row = $KD.create('DIV', {}, {display:'flex'});
        prevYearCell = $KD.create('DIV', {tabindex:0}, {display:'flex', width:'30px'});
        prevMonthCell = $KD.create('DIV', {tabindex:0}, {width:'20px'});
        labelCell = $KD.create('DIV', {tabindex:0}, {flex:1});
        nextMonthCell = $KD.create('DIV', {tabindex:0, align:'right'}, {width:'20px'});
        nextYearCell = $KD.create('DIV', {tabindex:0}, {display:'flex', width:'30px'});

        $KD.setAttr(prevYearCell, 'kwh-click', 'onPrevYearClick');
        $KD.setAttr(prevYearCell, 'kwh-focusout', 'onFocusOut');
        $KD.setAttr(prevYearCell, 'kwh-keydown', 'dismissPicker');
        $KD.setAttr(prevMonthCell, 'kwh-click', 'onPrevMonthClick');
        $KD.setAttr(prevMonthCell, 'kwh-focusout', 'onFocusOut');
        $KD.setAttr(prevMonthCell, 'kwh-keydown', 'dismissPicker');
        $KD.setAttr(nextMonthCell, 'kwh-click', 'onNextMonthClick');
        $KD.setAttr(nextMonthCell, 'kwh-focusout', 'onFocusOut');
        $KD.setAttr(nextMonthCell, 'kwh-keydown', 'dismissPicker');
        $KD.setAttr(nextYearCell, 'kwh-click', 'onNextYearClick');
        $KD.setAttr(nextYearCell, 'kwh-focusout', 'onFocusOut');
        $KD.setAttr(nextYearCell, 'kwh-keydown', 'dismissPicker');
        $KD.setAttr(labelCell, 'kwh-click', 'onMonthYearClick');
        $KD.setAttr(labelCell, 'kwh-focusout', 'onFocusOut');
        $KD.setAttr(labelCell, 'kwh-keydown', 'dismissPicker');

        $KD.html(prevYearCell, (
            '<img loading="lazy" onmousedown="return false;"'
            +' src="'+$KU.getImageURL(prevYearSrc)+'"'
            +' style="height:15px; position:relative; left:8px;"/>'
            +'<img onmousedown="return false;" src="'+$KU.getImageURL(prevYearSrc)+'"'
            +' style="height:15px; position:relative; left:-1px;"/>'
        ));
        $KD.html(prevMonthCell, (
            '<img loading="lazy" onmousedown="return false;"'
            +' src="'+$KU.getImageURL(prevMonthSrc)+'"'
            +' style="height:15px; position:relative; left:5px;"/>'
        ));
        $KD.html(nextMonthCell, (
            '<img loading="lazy" onmousedown="return false;"'
            +' src="'+$KU.getImageURL(nextMonthSrc)+'"'
            +' style="height:15px; position:relative; right:5px;"/>'
        ));
        $KD.html(nextYearCell, (
            '<img loading="lazy" onmousedown="return false;"'
            +' src="'+$KU.getImageURL(nextYearSrc)+'"'
            +' style="height:15px; position:relative; right:-1px;"/>'
            +'<img loading="lazy" onmousedown="return false;" src="'+$KU.getImageURL(nextYearSrc)+'"'
            +' style="height:15px; position:relative; right:8px;"/>'
        ));

        html = '<div style="text-align:center;">';
        html += '<label kr="month" tabindex="0" aria-live="polite"';
        html += ' kwh-keydown="dismissPicker,monthNavigation">';
        html += _months[month]+'</label>';
        html += ', ';
        html += '<label kr="year" tabindex="0" aria-live="polite"';
        html += ' kwh-keydown="dismissPicker,yearNavigation">';
        html += year+'</label>';
        html += '</div>';
        $KD.html(labelCell, html);

        $KD.add(row, prevYearCell);
        $KD.add(row, prevMonthCell);
        $KD.add(row, labelCell);
        $KD.add(row, nextMonthCell);
        $KD.add(row, nextYearCell);
        if(prop.hideMonthsHeader) {
            $KD.style(labelCell, 'visibility', 'hidden');
        }

        $KD.add(header, row);

        return header;
    };

    var _renderSelectedMonthYear = function Calendar$_renderSelectedMonthYear(selectedOption) {
        var $K = voltmx.$kwebfw$, $KD = $K.dom, _ = this._kwebfw_, displayedMonths = _.displayedMonths[0],
            selectedMonth = null, selectedYear = null, picker = null, focusItem = null,
            focusElement = null;

        if(_months.indexOf(selectedOption) > -1) {
            selectedMonth = _months.indexOf(selectedOption);
            selectedYear = displayedMonths[1];
            focusItem = '[kr="month"]';
        } else {
            selectedMonth = displayedMonths[0];
            selectedYear = parseInt(selectedOption);
            focusItem = '[kr="year"]';
        }
        _changePicker.call(this, selectedMonth, selectedYear);
        picker = _.picker;
        focusElement = $KD.find(picker, focusItem)[0];
        focusElement && $KD.focus(focusElement);
    };


    //This function will be called in the scope of widget instance
    var _renderPicker = function Calendar$_renderPicker(date) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom,
            _ = this._kwebfw_, prop = _.prop, uid = _.uid, title = null, holder = null,
            picker = null, size = null, calheight = '';

        size = _deduceCellHeightAndWidth.call(this);

        if(prop.gridTheme === voltmx.calendar.LEGACY) {/*grid*//* header *//* weekdays *//*footer*//*unknown*/
            calheight = ((size.height * 6) + 41 + 16 + 40 - 3) + 'px';
        } else if($K.behavior[constants.API_LEVEL] >= constants.API_LEVEL_9200
        || $K.behavior.calendarMonthYearSelectionDropdownView) {/*grid*//* header *//* weekdays */
            calheight = ((size.height * 6) + 44 + 22) + 'px';
        } else {
            calheight = ((size.height * 6) + 38 + 22) + 'px';
        }

        //Extra height for apply and close buttons in calendar for modern theme
        if(prop.gridTheme === voltmx.calendar.MODERN
        && prop.selectionType !== constants.CALENDAR_SELECTION_TYPE_SINGLE_SELECT) {
            calheight = parseInt(calheight) + 20 + 'px';
        }

        //Extra height for title
        if(prop.titleOnPopup) {
            calheight = parseInt(calheight) + 15 + 'px';
        }

        picker = $KD.create('DIV', {
            id:(uid+'_picker'), kwf:uid,
            theme: this.gridTheme, role: 'dialog',
            tabindex: -1
        }, {
            display: 'block',
            zIndex: 2147483647,
            position: 'absolute',
            height: calheight,
            width: ((size.width * 7) + 'px')
        });

        title = $KD.create('DIV', {kr:'title'});
        $KD.text(title, this._kwebfw_.prop.titleOnPopup);
        $KD.setAttr(picker, 'kwh-focusout', 'onFocusOut');

        holder = $KD.create('DIV');

        $KU.each(_.displayedMonths, function(dm) {
            $KD.add(holder, _renderCalendar.call(this, dm[0], dm[1], date));
        }, this);

        if(!($K.behavior[constants.API_LEVEL] >= constants.API_LEVEL_9200
        || $K.behavior.calendarMonthYearSelectionDropdownView)) {
            $KD.add(holder, _renderMonthYear.call(this));
        }

        $KD.add(picker, title);
        $KD.add(picker, holder);
        $KD.add(picker, _renderAction.call(this));

        return picker;
    };


    var _renderMonthYear = function() {
        var $K = voltmx.$kwebfw$, $KD = $K.dom, _ = this._kwebfw_,
            prop = _.prop, viewConfig = prop.viewConfig ? prop.viewConfig.gridConfig : null,
            headerBlock, navigatorBlock, yearsBlock, monthBlock, MonthYearPicker, size, calheight = 0;

        size = _deduceCellHeightAndWidth.call(this);

        if(prop.gridTheme === voltmx.calendar.LEGACY) {// -10px is to balance height with extra height because of header padding
            calheight = ((size.height * 6) + 41 + 40 + 19 - 10) + 'px';
        } else {
            calheight = ((size.height * 6) + 38 + 22 - 10) + 'px';
        }

        MonthYearPicker = $KD.create('DIV', {
            kr : 'monthYearPicker',
            tabindex : 0,
            hidden : true
        }, {
            width: ((size.width * 7) + 'px'),
            height: calheight,
            top: '0px', left: '0px',
            position: 'relative',
            backgroundColor: 'White'
        });

        $KD.setAttr(MonthYearPicker, 'kwh-focusout', 'onFocusOut');
        $KD.addCls(MonthYearPicker, ((viewConfig && viewConfig.gridSkin) ? viewConfig.gridSkin : '-voltmx-calendar-grid'));

        //navigator header containing OK image, cancel image and selected year, month display box
        headerBlock = _getMonthYearHeader.call(this);

        //displayMonths
        monthBlock = _getMonths.call(this);

        //display years navigation arrows
        navigatorBlock = _getYearNavigation.call(this);

        //Years to be displayed
        yearsBlock = _getYears.call(this);

        $KD.add(MonthYearPicker, headerBlock);
        $KD.add(MonthYearPicker, monthBlock);
        $KD.add(MonthYearPicker, navigatorBlock);
        $KD.add(MonthYearPicker, yearsBlock);

        ///year wrapper end + navigator teamplate wrapper end
        return MonthYearPicker;
    };


    //This function will be called in the scope of widget instance
    var _renderTemplate = function Calendar$_renderTemplate(date) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom,
            $KW = $K.widget, cellData = null, view = null, formattedDate = '',
            _ = this._kwebfw_, prop = _.prop, tpl = null, template = null;

        if(prop.data && prop.widgetDataMapForCell) {
            formattedDate = _dateFormatter([date[2], date[1], date[0]], false, 'dd/MM/yyyy');
            cellData = prop.data[formattedDate];

            if(cellData) {
                tpl = cellData.template || prop.cellTemplate;

                if($KU.is(tpl, 'string')) {
                    $K.app.allowSetter_voltmxControllerName = true;
                    tpl = _voltmx.mvc.initializeSubViewController(tpl);
                    delete $K.app.allowSetter_voltmxControllerName;

                    if($KU.is(tpl, 'widget', 'FlexContainer')) {
                        tpl._kwebfw_.is.template = true;
                        $KW.root(tpl, 'template');
                    }
                }

                template = $KW.cloneTemplate(tpl, cellData, prop.widgetDataMapForCell);
                view = template._render();
                $KD.style(view, {position:'absolute', top: '0px', left:'0px'});
            }
        }

        return view;
    };


    //This function will be called in the scope of widget instance
    var _selectDateFromPicker = function Calendar$_selectDateFromPicker(cell) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom, prevSkinInfo = null, fdate = null,
            tdate = null, date = $KD.getAttr(cell, 'date').split('-'), pos = -1, prevCell = null,
            _ = this._kwebfw_, currentSkinInfo = _getSkinRelatedSkinInfoByGridCell(cell);

        date = [parseInt(date[2], 10), parseInt(date[1], 10), parseInt(date[0], 10)];

        if(this.selectionType === constants.CALENDAR_SELECTION_TYPE_SINGLE_SELECT) {
            prevCell = _.prop.dateComponents;
            _.prop.dateComponents = [date[0], date[1], date[2], 0, 0, 0];
            _.prop.displayedMonth = null;

            //Deselect previously selected cell in UI
            if(prevCell) {
                prevCell = _dateFormatter(prevCell, false);
                prevCell = $KD.find(_.picker, '[date="'+prevCell+'"]')[0];
                if(prevCell) {
                    $KD.removeAttr(prevCell, 'aria-selected');
                    prevSkinInfo = _getSkinRelatedSkinInfoByGridCell(prevCell);

                    if(prevSkinInfo.selectedIndex < prevSkinInfo.normalIndex) {
                        $KD.removeCls(prevCell, prevSkinInfo.selectedValue);
                        $KD.addCls(prevCell, prevSkinInfo.normalValue);
                    }
                }
            }

            $KD.setAttr(cell, 'aria-selected', true);

            if(currentSkinInfo.selectedIndex < currentSkinInfo.normalIndex) {
                $KD.removeCls(cell, currentSkinInfo.normalValue);
                $KD.addCls(cell, currentSkinInfo.selectedValue);
            }

            _closePicker.call(this, true);
            _updateRelatedDateProperties.call(this);
        } else if(this.selectionType === constants.CALENDAR_SELECTION_TYPE_MULTI_SELECT) {
            if(_.dateSelectionStarted === false) {
                _.dateSelectionStarted = true;
                _.selectedDates = this.selectedDates || [];
            }

            $KU.each(_.selectedDates, function(dc, index) {
                if(dc[0] === date[0] && dc[1] === date[1] && dc[2] === date[2]) {
                    pos = index;
                    return true;
                }
            });

            if(pos !== -1) {
                _.selectedDates.splice(pos, 1);
                $KD.removeAttr(cell, 'aria-selected');

                if(currentSkinInfo.selectedIndex < currentSkinInfo.normalIndex) {
                    $KD.removeCls(cell, currentSkinInfo.selectedValue);
                    $KD.addCls(cell, currentSkinInfo.normalValue);
                }
            } else {
                _.selectedDates.push([date[0], date[1], date[2], 0, 0, 0]);
                $KD.setAttr(cell, 'aria-selected', true);

                if(currentSkinInfo.selectedIndex < currentSkinInfo.normalIndex) {
                    $KD.removeCls(cell, currentSkinInfo.normalValue);
                    $KD.addCls(cell, currentSkinInfo.selectedValue);
                }
            }
        } else if(this.selectionType === constants.CALENDAR_SELECTION_TYPE_RANGE_SELECT) {
            if(_.dateSelectionStarted === false) {
                _.dateSelectionStarted = true;
                _.selectedDates = this.selectedDates || [];
            }

            if(_.selectedDates[0] && _.selectedDates[1]) {
                //Deselect every cell in UI
                _toggleRangeOfCells(
                    _.picker, _.selectedDates[0],
                    _.selectedDates[1], false
                );

                _.selectedDates = [[date[0], date[1], date[2], 0, 0, 0]];

                //Select only this cell in UI
                $KD.setAttr(cell, 'aria-selected', true);
                if(currentSkinInfo.selectedIndex < currentSkinInfo.normalIndex) {
                    $KD.removeCls(cell, currentSkinInfo.normalValue);
                    $KD.addCls(cell, currentSkinInfo.selectedValue);
                }
            } else if(!_.selectedDates[0] && !_.selectedDates[1]) {
                _.selectedDates = [[date[0], date[1], date[2], 0, 0, 0]];

                //Select only this cell in UI
                $KD.setAttr(cell, 'aria-selected', true);
                if(currentSkinInfo.selectedIndex < currentSkinInfo.normalIndex) {
                    $KD.removeCls(cell, currentSkinInfo.normalValue);
                    $KD.addCls(cell, currentSkinInfo.selectedValue);
                }
            } else if(_.selectedDates[0] && !_.selectedDates[1]) {
                _.selectedDates[1] = [date[0], date[1], date[2], 0, 0, 0];

                fdate = new Date(_.selectedDates[0][2], (_.selectedDates[0][1] - 1), _.selectedDates[0][0], 0, 0, 0);
                tdate = new Date(_.selectedDates[1][2], (_.selectedDates[1][1] - 1), _.selectedDates[1][0], 0, 0, 0);

                if($KU.is(fdate, 'equals', tdate)) {
                    _.selectedDates = [];
                } else if(fdate > tdate) {
                    _.selectedDates = [_.selectedDates[1], _.selectedDates[0]];
                }

                if(_.selectedDates.length === 0) { //Deselect every cell in UI
                    _toggleRangeOfCells(
                        _.picker, [date[0], date[1], date[2], 0, 0, 0],
                        [date[0], date[1], date[2], 0, 0, 0], false
                    );
                } else { //Select every cell in range
                    _toggleRangeOfCells(
                        _.picker, _.selectedDates[0],
                        _.selectedDates[1], true
                    );
                }
            }
        }
    };


    //All widget file must have this variable
    //All the functions will be called in the scope of widget instance
    var _setter = {
        Calendar: {
            dateComponents: function Calendar$_setter_dateComponents(/*old*/) {
                var _ = this._kwebfw_, prop = _.prop, dc = prop.dateComponents;

                if(prop.selectionType === constants.CALENDAR_SELECTION_TYPE_SINGLE_SELECT) {
                    prop.displayedMonth = (dc) ? [dc[1], dc[2]] : null;
                }

                _updateRelatedDateProperties.call(this);
            },

            displayedMonth: function Calendar$_setter_displayedMonth(/*old*/) {
                var dm = _deduceDisplayedMonth.call(this);

                _populateDisplayedMonths.call(this, dm[0], dm[1]);
            },

            selectedDates: function Calendar$_setter_selectedDates(/*old*/) {
                var _ = this._kwebfw_, prop = _.prop, sd = prop.selectedDates;

                if(prop.selectionType !== constants.CALENDAR_SELECTION_TYPE_SINGLE_SELECT) {
                    if(sd && sd.length) {
                        sd = sd[(sd.length-1)];
                        prop.displayedMonth = [sd[1], sd[2]];
                    } else {
                        prop.displayedMonth = null;
                    }
                }

                _updateRelatedDateProperties.call(this);
            },

            selectionType: function Calendar$_setter_selectionType(old) {
                if(old === constants.CALENDAR_SELECTION_TYPE_SINGLE_SELECT) {
                    this._kwebfw_.prop.dateComponents = null;
                } else {
                    this._kwebfw_.prop.selectedDates = null;
                }

                _updateRelatedDateProperties.call(this);
            },

            toolTip: function Calendar$_setter_toolTip(/*old*/) {
                this._kwebfw_.prop.i18n_toolTip = '';
            }
        }
    };


    var _showMonthYearPicker = function() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom, labelCell,
            monthBlock, _ = this._kwebfw_, picker = _.picker, cal, py, cy,
            dm = _.displayedMonths[0], yearBlock = null,
            monthYearPicker = $KD.find(picker, '[kr="monthYearPicker"]')[0],
            // On Click of Month or Year Picker, getting month, year values and setting the title value
            month = _months[dm[0]], year= dm[1],
            title = $KD.find(monthYearPicker, '[kr="title"]')[0];

        $KD.setAttr(title, 'titleyear', year);
        $KD.setAttr(title, 'titlemonth', month);


        yearBlock = $KD.find(monthYearPicker, '[kr="years"]')[0];
        monthBlock = $KD.find(monthYearPicker, '[kr="months"]')[0];
        labelCell = $KD.find(monthYearPicker, '[kr="title"]')[0];
        py = Number($KD.getAttr(($KD.find(yearBlock, '[kr="year"]')[0]), 'year'));
        cy = _getCounter(dm[1]);

        if(py !== cy) {
            $KD.remove(yearBlock);
            yearBlock = _getYears.call(this, cy);
            $KD.add(monthYearPicker, yearBlock);
        }

        // loop through month and year block and apply selected month and year skin default
        $KU.each($KD.children(yearBlock), function(block) {
            $KU.each($KD.children(block), function(cell) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom,
                    year = this._kwebfw_.prop.year + '';

                if($KD.getAttr(cell, 'year') === year) {
                    _applySkinSelectedCell(cell);
                }
            }, this);
        }, this);

        $KU.each($KD.children(monthBlock), function(block) {
            $KU.each($KD.children(block), function(cell) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom,
                    month = _months[this._kwebfw_.prop.month];

                if($KD.getAttr(cell, 'month') === month) {
                    _applySkinSelectedCell(cell);
                }
            }, this);
        }, this);

        _updateMonthYearHeaderLabel.call(this, labelCell);

        cal = $KD.find(picker, '[kr="calendar"]')[0];
        $KD.setAttr(monthYearPicker, 'hidden', false);
        $KD.setAttr(cal, 'hidden', true);
        $KD.focus(monthYearPicker);

        _selectMonthYear(monthYearPicker, '[month="'+month+'"]');
        _selectMonthYear(monthYearPicker, '[year="'+year+'"]');
        $KD.html(title, (month || '') + ' ' + (year || ''));
    };

    var _selectMonthYear = function Calendar$_selectMonthYear(picker, selector) {
        var $K = voltmx.$kwebfw$, $KD = $K.dom, selectedDiv;

        selectedDiv=$KD.find(picker, selector)[0];

        if(selectedDiv) {
            currentSkinInfo = _getSkinRelatedSkinInfoByGridCell(selectedDiv);
            $KD.setAttr(selectedDiv, 'aria-selected', true);
            $KD.removeCls(selectedDiv, currentSkinInfo.normalValue);
            $KD.addCls(selectedDiv, currentSkinInfo.selectedValue);
            $KD.focus(selectedDiv);
        }
    };

    var _toggleRangeOfCells = function Calendar$_toggleRangeOfCells(picker, from, to, select) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom, fstr = '', fdate = null,
            tdate = null, skinInfo = null, ndate = null, nstr = '', ncell = null;

        if($KU.is(from, 'array')) {
            fdate = new Date(from[2], (from[1] - 1), from[0], 0, 0, 0);
        }
        if($KU.is(to, 'array')) {
            tdate = new Date(to[2], (to[1] - 1), to[0], 0, 0, 0);
        }

        fstr = _dateFormatter(fdate, false);
        ndate = fdate; nstr = fstr;

        while(ndate >= fdate && ndate <= tdate) {
            ncell = $KD.find(picker, '[date="'+nstr+'"]')[0];

            if(ncell) {
                if(select) {
                    $KD.setAttr(ncell, 'aria-selected', true);
                } else {
                    $KD.removeAttr(ncell, 'aria-selected');
                }
                skinInfo = _getSkinRelatedSkinInfoByGridCell(ncell);

                if(skinInfo.selectedIndex < skinInfo.normalIndex) {
                    if(select) {
                        $KD.removeCls(ncell, skinInfo.normalValue);
                        $KD.addCls(ncell, skinInfo.selectedValue);
                    } else {
                        $KD.removeCls(ncell, skinInfo.selectedValue);
                        $KD.addCls(ncell, skinInfo.normalValue);
                    }
                }
            }

            ndate = new Date((ndate.getTime() + (24*60*60*1000)));
            nstr = _dateFormatter(ndate, false);
        }
    };


    var _showNextYearSet = function() {
        var $K = voltmx.$kwebfw$, $KD = $K.dom,
            counter, yearsEl, yearBlock, picker;

        yearBlock = $KD.find(this._kwebfw_.picker, '[kr="years"]')[0];
        yearsEl = $KD.find(yearBlock, '[kr="year"]')[0];
        counter = Number($KD.getAttr(yearsEl, 'year'));
        counter = counter + 16;
        if(counter <= _getCounter(_maxYear)) {
            $KD.remove(yearBlock);
            yearBlock = _getYears.call(this, counter);
            picker = $KD.find(this._kwebfw_.picker, '[kr="monthYearPicker"]')[0];
            $KD.add(picker, yearBlock);
        }
    };


    var _showPrevYearSet = function() {
        var $K = voltmx.$kwebfw$, $KD = $K.dom,
            counter, yearsEl, yearBlock, picker;

        yearBlock = $KD.find(this._kwebfw_.picker, '[kr="years"]')[0];
        yearsEl = $KD.find(yearBlock, '[kr="year"]')[0];
        counter = Number($KD.getAttr(yearsEl, 'year'));
        counter = counter - 16;
        if(counter >= _getCounter(_minYear)) {
            $KD.remove(yearBlock);
            yearBlock = _getYears.call(this, counter);
            picker = $KD.find(this._kwebfw_.picker, '[kr="monthYearPicker"]')[0];
            $KD.add(picker, yearBlock);
        }
    };


    //This function will be called in the scope of widget instance
    var _updateRelatedDateProperties = function Calendar$_updateRelatedDateProperties() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
            $KD = $K.dom, _ = this._kwebfw_, prop = _.prop,
            dm = null, dc = prop.dateComponents, el = $KW.el(this);

        if($KU.is(dc, 'array')) {
            prop.year = dc[2];
            prop.month = dc[1];
            prop.day = dc[0];
            prop.hour = dc[3];
            prop.minutes = dc[4];
            prop.seconds = dc[5];
        } else {
            prop.year = -1;
            prop.month = -1;
            prop.day = -1;
            prop.hour = -1;
            prop.minutes = -1;
            prop.seconds = -1;
        }

        dm = _deduceDisplayedMonth.call(this);
        _populateDisplayedMonths.call(this, dm[0], dm[1]);
        prop.formattedDate = _formatDate.call(this);

        if(el.input) {
            $KD.setAttr(el.input, 'value', prop.formattedDate);
        }

        dm = _.displayedMonths[0];
        _changePicker.call(this, dm[0], dm[1]);
    };

    var _updateMonthYearHeaderLabel = function Calendar$_updateMonthYearHeaderLabel(label, selectedMonth, selectedYear) {
        var $K = voltmx.$kwebfw$, $KD = $K.dom, prop = this._kwebfw_.prop,
            month = selectedMonth || _months[prop.month],
            year = selectedYear || prop.year;

        $KD.html(label, ((month || '') + ' ' + (year || '')));
    };


    //All widget file must have this variable
    //All the functions will be called in the scope of widget instance
    //These function should always return a boolean value
    var _valid = {
        Calendar: {
            calendarIcon: function Calendar$_valid_calendarIcon(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'string')) {
                    flag = true;
                }

                return flag;
            },

            calendarIconAlignment: function Calendar$_valid_calendarIconAlignment(value) {
                var flag = false, options = [
                    constants.CALENDAR_ICON_ALIGN_AUTO,
                    constants.CALENDAR_ICON_ALIGN_LEFT,
                    constants.CALENDAR_ICON_ALIGN_RIGHT
                ];

                if(options.indexOf(value) >= 0) {
                    flag = true;
                }

                return flag;
            },

            cellTemplate: function Calendar$_valid_cellTemplate(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'null')
                || $KU.is(value, 'widget')
                || $KU.is(value, 'string')) {
                    flag = true;
                }

                return flag;
            },

            data: function Calendar$_valid_data(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'object') || $KU.is(value, 'null')) {
                    flag = true;
                }

                return flag;
            },

            dateComponents: function Calendar$_valid_dateComponents(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, prop = this._kwebfw_.prop,
                    flag = _isValidDateComponents(value), dc = null, date = null;

                if(flag === true || ($KU.is(flag, 'array') && flag[1] === true)) {
                    date = ($KU.is(flag, 'array')) ? flag[0] : value;

                    if(date) {
                        if(Object.prototype.hasOwnProperty.call(prop, 'validStartDate')
                        && Object.prototype.hasOwnProperty.call(prop, 'validEndDate')
                        && Object.prototype.hasOwnProperty.call(prop, 'selectionType')
                        && Object.prototype.hasOwnProperty.call(prop, 'selectedDates')) {
                            dc = prop.dateComponents;
                            prop.dateComponents = value;
                            flag = _isValidDateCombination.call(this, prop);
                            /*if(!flag) */prop.dateComponents = dc;
                        }
                    }
                }

                return flag;
            },

            dateEditable: function Calendar$_valid_dateEditable(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'boolean')) {
                    flag = true;
                }

                return flag;
            },

            dateFormat: function Calendar$_valid_dateFormat(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'string')) {
                    flag = true;
                }

                return flag;
            },

            day: function Calendar$_valid_day(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'integer') && value >= 1 && value <= 31) {
                    flag = true;
                }

                return flag;
            },

            dayTextAlignmentInCell: function Calendar$_valid_dayTextAlignmentInCell(value) {
                var flag = false, options = [
                    constants.CONTENT_ALIGN_BOTTOM_CENTER,
                    constants.CONTENT_ALIGN_BOTTOM_LEFT,
                    constants.CONTENT_ALIGN_BOTTOM_RIGHT,
                    constants.CONTENT_ALIGN_MIDDLE_LEFT,
                    constants.CONTENT_ALIGN_MIDDLE_RIGHT,
                    constants.CONTENT_ALIGN_TOP_CENTER,
                    constants.CONTENT_ALIGN_TOP_LEFT,
                    constants.CONTENT_ALIGN_TOP_RIGHT,
                    constants.CONTENT_ALIGN_CENTER
                ];

                if(options.indexOf(value) >= 0) {
                    flag = true;
                }

                return flag;
            },

            displayedMonth: function Calendar$_valid_displayedMonth(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'null')) {
                    flag = true;
                } else if($KU.is(value, 'array') && value.length === 2
                && $KU.is(value[0], 'integer') && $KU.is(value[1], 'integer')
                && value[0] >= 1 && value[0] <= 12
                && value[1] >= _minYear && value[1] <= _maxYear) {
                    flag = true;
                }

                return flag;
            },

            enableOrDisableDates: function Calendar$_valid_enableOrDisableDates(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'object') || $KU.is(value, 'null')) {
                    flag = true;
                }
                return flag;
            },

            formattedDate: function Calendar$_valid_formattedDate(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'string') && value === '') {
                    flag = true;
                }

                if(!flag && $K.F.EIWP) {
                    flag = ['', true];
                }

                return flag;
            },

            gridTheme: function Calendar$_valid_gridTheme(value) {
                var flag = false, options = [
                    voltmx.calendar.LEGACY,
                    voltmx.calendar.MODERN
                ];

                if(options.indexOf(value) >= 0) {
                    flag = true;
                }

                return flag;
            },

            hideDaysHeader: function Calendar$_valid_hideDaysHeader(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'boolean')) {
                    flag = true;
                }

                return flag;
            },

            hideMonthsHeader: function Calendar$_valid_hideMonthsHeader(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'boolean')) {
                    flag = true;
                }

                return flag;
            },

            hidePreviousNextMonthDates: function Calendar$_valid_hidePreviousNextMonthDates(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'boolean')) {
                    flag = true;
                }

                return flag;
            },

            hour: function Calendar$_valid_hour(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'integer') && value >= 0 && value <= 23) {
                    flag = true;
                }

                return flag;
            },

            i18n_toolTip: function Calendar$_valid_i18n_toolTip(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'string')) {
                    if(!value) {
                        flag = true;
                    } else if(value.toLowerCase().indexOf('voltmx.i18n.getlocalizedstring') === 0) {
                        flag = true;
                    }
                }

                return flag;
            },

            minutes: function Calendar$_valid_minutes(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'integer') && value >= 0 && value <= 59) {
                    flag = true;
                }

                return flag;
            },

            month: function Calendar$_valid_month(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'integer') && value >= 1 && value <= 12) {
                    flag = true;
                }

                return flag;
            },

            noOfMonths: function Calendar$_valid_noOfMonths(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'integer') && value >= 1 && value <= 12) {
                    flag = true;
                }

                return flag;
            },

            onDone: function Calendar$_valid_onDone(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'null') || $KU.is(value, 'function')) {
                    flag = true;
                }

                if(!flag && $K.F.EIWP) {
                    if($KU.is(value, 'undefined')) {
                        flag = [null, true];
                    }
                }

                return flag;
            },

            onSelection: function Calendar$_valid_onSelection(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'null') || $KU.is(value, 'function')) {
                    flag = true;
                }

                if(!flag && $K.F.EIWP) {
                    if($KU.is(value, 'undefined')) {
                        flag = [null, true];
                    }
                }

                return flag;
            },

            placeholder: function Calendar$_valid_placeholder(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'string')) {
                    flag = true;
                }

                return flag;
            },

            seconds: function Calendar$_valid_seconds(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'integer') && value >= 0 && value <= 59) {
                    flag = true;
                }

                return flag;
            },

            selectedDates: function Calendar$_valid_selectedDates(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils,
                    prop = this._kwebfw_.prop, flag = false,
                    backupSelectedDates = prop.selectedDates;

                if($KU.is(value, 'null')) {
                    flag = true;
                } else if($KU.is(value, 'array')) {
                    flag = true;

                    $KU.each(value, function(dc) {
                        var $K = voltmx.$kwebfw$, $KU = $K.utils,
                            valid = _isValidDateComponents(dc);

                        if(valid === false) {
                            flag = false;
                            return true;
                        } else if($KU.is(valid, 'array')) {
                            if(valid[1] === false) {
                                flag = false;
                                return true;
                            }
                            value = valid[0];
                        }
                    });

                    if(flag) {
                        if(Object.prototype.hasOwnProperty.call(prop, 'validStartDate')
                        && Object.prototype.hasOwnProperty.call(prop, 'validEndDate')
                        && Object.prototype.hasOwnProperty.call(prop, 'selectionType')
                        && Object.prototype.hasOwnProperty.call(prop, 'dateComponents')) {
                            if(prop.selectionType === constants.CALENDAR_SELECTION_TYPE_MULTI_SELECT) {
                                prop.selectedDates = value;
                                flag = _isValidDateCombination.call(this, prop);
                            } else if(prop.selectionType === constants.CALENDAR_SELECTION_TYPE_RANGE_SELECT) {
                                if(value.length !== 2) {
                                    flag = false;
                                } else {
                                    prop.selectedDates = value;
                                    flag = _isValidDateCombination.call(this, prop);
                                }
                            }

                            /*if(!flag) */prop.selectedDates = backupSelectedDates;
                        }
                    }
                }

                return flag;
            },

            selectionType: function Calendar$_valid_selectionType(value) {
                var flag = false, options = [
                    constants.CALENDAR_SELECTION_TYPE_MULTI_SELECT,
                    constants.CALENDAR_SELECTION_TYPE_RANGE_SELECT,
                    constants.CALENDAR_SELECTION_TYPE_SINGLE_SELECT
                ];

                if(options.indexOf(value) >= 0) {
                    flag = true;
                }

                return flag;
            },

            titleOnPopup: function Calendar$_valid_titleOnPopup(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'string')) {
                    flag = true;
                }

                return flag;
            },

            toolTip: function Calendar$_valid_toolTip(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'string')) {
                    flag = true;
                }

                return flag;
            },

            validEndDate: function Calendar$_valid_validEndDate(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, endDate = null,
                    flag = _isValidDateComponents(value), prop = this._kwebfw_.prop,
                    backupEndDate = prop.validEndDate;

                if(flag === true || ($KU.is(flag, 'array') && flag[1] === true)) {
                    endDate = ($KU.is(flag, 'array')) ? flag[0] : value;

                    if(endDate) {
                        if(Object.prototype.hasOwnProperty.call(prop, 'validStartDate')
                        && Object.prototype.hasOwnProperty.call(prop, 'selectionType')
                        && Object.prototype.hasOwnProperty.call(prop, 'dateComponents')
                        && Object.prototype.hasOwnProperty.call(prop, 'selectedDates')) {
                            prop.validEndDate = endDate;
                            flag = _isValidDateCombination.call(this, prop);
                            /*if(!flag) */prop.validEndDate = backupEndDate;
                        }
                    }
                }

                return flag;
            },

            validStartDate: function Calendar$_valid_validStartDate(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, startDate = null,
                    flag = _isValidDateComponents(value), prop = this._kwebfw_.prop,
                    backupStartDate = prop.validStartDate;

                if(flag === true || ($KU.is(flag, 'array') && flag[1] === true)) {
                    startDate = ($KU.is(flag, 'array')) ? flag[0] : value;

                    if(startDate) {
                        if(Object.prototype.hasOwnProperty.call(prop, 'validEndDate')
                        && Object.prototype.hasOwnProperty.call(prop, 'selectionType')
                        && Object.prototype.hasOwnProperty.call(prop, 'dateComponents')
                        && Object.prototype.hasOwnProperty.call(prop, 'selectedDates')) {
                            prop.validStartDate = startDate;
                            flag = _isValidDateCombination.call(this, prop);
                            /*if(!flag) */prop.validStartDate = backupStartDate;
                        }
                    }
                }

                return flag;
            },

            viewConfig: function Calendar$_valid_viewConfig(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false,
                    backupViewConfig = null, prop = this._kwebfw_.prop;

                if($KU.is(value, 'null')) {
                    flag = true;
                } else if($KU.is(value, 'object')) {
                    if(!Object.prototype.hasOwnProperty.call(value, 'gridConfig')) {
                        flag = true;
                    } else {
                        if($KU.is(value.gridConfig, 'object')) {
                            flag = true;
                        }
                    }
                }

                if(flag) {
                    backupViewConfig = prop.viewConfig;
                    prop.viewConfig = value;
                    flag = _isValidDateCombination.call(this, prop);

                    if(!flag) {
                        prop.viewConfig = backupViewConfig;
                    }
                }

                return flag;
            },

            viewType: function Calendar$_valid_viewType(value) {
                var flag = false, options = [
                    constants.CALENDAR_VIEW_TYPE_DEFAULT,
                    constants.CALENDAR_VIEW_TYPE_GRID_ONSCREEN,
                    constants.CALENDAR_VIEW_TYPE_GRID_POPUP
                ];

                if(options.indexOf(value) >= 0) {
                    flag = true;
                }

                return flag;
            },

            widgetDataMapForCell: function Calendar$_valid_widgetDataMapForCell(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'object') || $KU.is(value, 'null')) {
                    flag = true;
                }

                return flag;
            },

            year: function Calendar$_valid_year(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'integer') && value >= _minYear && value <= _maxYear) {
                    flag = true;
                }

                return flag;
            }
        }
    };


    //All widget file must have this variable
    //All the functions will be called in the scope of widget instance
    //Any property here, which is set to "false", will not create a setter
    var _view = {
        Calendar: {
            calendarIcon: function Calendar$_view_calendarIcon(el/*, old*/) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom;

                if(this.calendarIcon) {
                    $KD.setAttr(el.icon, 'src', $KU.getImageURL(this.calendarIcon));
                } else {
                    $KD.removeAttr(el.icon, 'src');
                }
            },

            calendarIconAlignment: function Calendar$_view_calendarIconAlignment(el/*, old*/) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom;

                if(this.calendarIconAlignment === constants.CALENDAR_ICON_ALIGN_LEFT
                || (this.calendarIconAlignment === constants.CALENDAR_ICON_ALIGN_AUTO
                && [constants.CONTENT_ALIGN_BOTTOM_RIGHT,
                    constants.CONTENT_ALIGN_MIDDLE_RIGHT,
                    constants.CONTENT_ALIGN_TOP_RIGHT].indexOf(this.contentAlignment) >= 0)) {
                    $KD.addAt(el.node, el.icon, 0);
                } else {
                    $KD.addAt(el.node, el.input, 0);
                }
            },

            cellTemplate: function Calendar$_view_cellTemplate(/*el, old*/) {
                var displayedMonth = this._kwebfw_.prop.displayedMonth || [-1, -1];

                _changePicker.call(this, displayedMonth[0], displayedMonth[1]);
            },

            data: function Calendar$_view_data(/*el, old*/) {
                var displayedMonth = this._kwebfw_.prop.displayedMonth || [-1, -1];

                _changePicker.call(this, displayedMonth[0], displayedMonth[1]);
            },

            dateComponents: function Calendar$_view_dateComponents(el/*, old*/) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom, prop = this._kwebfw_.prop,
                    displayedMonth = prop.displayedMonth || [-1, -1];


                $KD.setAttr(el.input, 'value', prop.formattedDate);
                _changePicker.call(this, displayedMonth[0], displayedMonth[1]);
            },

            dateEditable: function Calendar$_view_dateEditable(el/*, old*/) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom;

                if(this._kwebfw_.prop.dateEditable) {
                    $KD.removeAttr(el.input, 'readonly');
                } else {
                    $KD.setAttr(el.input, 'readonly', 'readonly');
                }
            },

            dateFormat: function Calendar$_view_dateFormat(/*el, old*/) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget, $KD = $K.dom, el = $KW.el(this),
                    prop = this._kwebfw_.prop, formattedDate = _formatDate.call(this);

                if(!prop.placeholder && prop.dateFormat) {
                    $KD.setAttr(el.input, 'placeholder', prop.dateFormat);
                } else if(this.placeholder) {
                    $KD.setAttr(el.input, 'placeholder', prop.placeholder);
                } else {
                    $KD.removeAttr(el.input, 'placeholder');
                }

                formattedDate && $KD.setAttr(el.input, 'value', formattedDate);
            },

            day: false,

            dayTextAlignmentInCell: function Calendar$_view_dayTextAlignmentInCell(/*el, old*/) {
                var displayedMonth = this._kwebfw_.prop.displayedMonth || [-1, -1];

                _changePicker.call(this, displayedMonth[0], displayedMonth[1]);
            },

            displayedMonth: function Calendar$_view_displayedMonth(/*el, old*/) {
                var displayedMonth = this._kwebfw_.prop.displayedMonth || [-1, -1];

                _changePicker.call(this, displayedMonth[0], displayedMonth[1]);
            },

            enableOrDisableDates: function Calendar$_view_enableOrDisableDates(/*el, old*/) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, _ = this._kwebfw_, dc = _.prop.dateComponents,
                    valid = true, displayedMonth = _.prop.displayedMonth || [-1, -1],
                    config = this.enableOrDisableDates, dates = null, skin = '', enable = true;

                if(config) {
                    dates = config.dates;
                    skin = config.skin;
                    enable = config.hasToEnable;
                }

                if($KU.is(dates, 'array')) {
                    if($KU.is(skin, 'string') && $KU.is(enable, 'boolean')) {
                        $KU.each(dates, function(date) {
                            var $K = voltmx.$kwebfw$, $KU = $K.utils, dt = null;

                            if(dc && $KU.is(date, 'date')) {
                                dt = new Date(date[2], (date[1] - 1), date[0], 0, 0, 0);

                                if(dt.valueOf() === dc.valueOf()) {
                                    valid = false;
                                    return true;
                                }
                            }
                        });

                        if(!valid) {
                            //ERROR:: throw error
                        } else {
                            _.enableDates = {};
                            _.enableDatesSkin = {};
                            _.enableDatesInactive = ($KU.is(dates, 'array') && dates.length > 0) ? !enable : null;

                            $KU.each(dates, function(date) {
                                var key = _dateFormatter(date, false);

                                _.enableDates[key] = true;
                                if(skin) _.enableDatesSkin[key] = skin;
                                else delete _.enableDatesSkin[key];
                            });

                            _changePicker.call(this, displayedMonth[0], [1]);
                        }
                    }
                } else {
                    _.enableDates = {};
                    _.enableDatesSkin = {};
                    _.enableDatesInactive = null;
                    _changePicker.call(this, displayedMonth[0], [1]);
                }
            },

            formattedDate: false,

            gridTheme: function Calendar$_view_gridTheme(/*el, old*/) {
                var displayedMonth = this._kwebfw_.prop.displayedMonth || [-1, -1];

                _changePicker.call(this, displayedMonth[0], displayedMonth[1]);
            },

            hideDaysHeader: function Calendar$_view_hideDaysHeader(/*el, old*/) {
                var displayedMonth = this._kwebfw_.prop.displayedMonth || [-1, -1];

                _changePicker.call(this, displayedMonth[0], displayedMonth[1]);
            },

            hideMonthsHeader: function Calendar$_view_hideMonthsHeader(/*el, old*/) {
                var displayedMonth = this._kwebfw_.prop.displayedMonth || [-1, -1];

                _changePicker.call(this, displayedMonth[0], displayedMonth[1]);
            },

            hidePreviousNextMonthDates: function Calendar$_view_hidePreviousNextMonthDates(/*el, old*/) {
                var displayedMonth = this._kwebfw_.prop.displayedMonth || [-1, -1];

                _changePicker.call(this, displayedMonth[0], displayedMonth[1]);
            },

            hour: false,

            i18n_toolTip: false,

            minutes: false,

            month: false,

            noOfMonths: function Calendar$_view_noOfMonths(/*el, old*/) {
                var displayedMonth = this._kwebfw_.prop.displayedMonth || [-1, -1];

                _changePicker.call(this, displayedMonth[0], displayedMonth[1]);
            },

            onDone: true,

            onSelection: true,

            placeholder: function Calendar$_view_placeholder(el/*, old*/) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom, prop = this._kwebfw_.prop;

                if(!prop.placeholder && prop.dateFormat) {
                    $KD.setAttr(el.input, 'placeholder', prop.dateFormat);
                } else if(this.placeholder) {
                    $KD.setAttr(el.input, 'placeholder', prop.placeholder);
                } else {
                    $KD.removeAttr(el.input, 'placeholder');
                }
            },

            seconds: false,

            selectedDates: function Calendar$_view_selectedDates(el/*, old*/) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom, prop = this._kwebfw_.prop,
                    displayedMonth = prop.displayedMonth || [-1, -1];


                $KD.setAttr(el.input, 'value', prop.formattedDate);
                _changePicker.call(this, displayedMonth[0], displayedMonth[1]);
            },

            selectionType: function Calendar$_view_selectionType(/*el, old*/) {
                var displayedMonth = this._kwebfw_.prop.displayedMonth || [-1, -1];

                _changePicker.call(this, displayedMonth[0], displayedMonth[1]);
            },

            titleOnPopup: function Calendar$_view_titleOnPopup(/*el, old*/) {
                var displayedMonth = this._kwebfw_.prop.displayedMonth || [-1, -1];

                _changePicker.call(this, displayedMonth[0], displayedMonth[1]);
            },

            toolTip: function Calendar$_view_toolTip(el/*, old*/) {
                var $K = voltmx.$kwebfw$, $KD = $K.dom;

                if(this.toolTip) {
                    $KD.setAttr(el.node, 'title', this.toolTip);
                } else {
                    $KD.removeAttr(el.node, 'title');
                }
            },

            validEndDate: function Calendar$_view_validEndDate(/*el, old*/) {
                var displayedMonth = this._kwebfw_.prop.displayedMonth || [-1, -1];

                _changePicker.call(this, displayedMonth[0], displayedMonth[1]);
            },

            validStartDate: function Calendar$_view_validStartDate(/*el, old*/) {
                var displayedMonth = this._kwebfw_.prop.displayedMonth || [-1, -1];

                _changePicker.call(this, displayedMonth[0], displayedMonth[1]);
            },

            viewConfig: function Calendar$_view_viewConfig(/*el, old*/) {
                var displayedMonth = this._kwebfw_.prop.displayedMonth || [-1, -1];

                _changePicker.call(this, displayedMonth[0], displayedMonth[1]);
            },

            viewType: false,

            widgetDataMapForCell: function Calendar$_view_widgetDataMapForCell(/*el, old*/) {
                var displayedMonth = this._kwebfw_.prop.displayedMonth || [-1, -1];

                _changePicker.call(this, displayedMonth[0], displayedMonth[1]);
            },

            year: false
        }
    };


    Object.defineProperty(voltmx.ui, 'Calendar', {configurable:false, enumerable:false, writable:false, value:(function() {
        var $K = voltmx.$kwebfw$;


        /**
         * voltmx.ui.Calendar constructor.
         *
         * @class
         * @namespace   voltmx.ui
         * @extends     voltmx.ui.BasicWidget
         * @author      Goutam Sahu <goutam.sahu@voltmx.com>
         *
         * @param       {object} bconfig - An object with basic properties.
         * @param       {object} lconfig - An object with layout properties.
         * @param       {object} pspconfig - An object with platform specific properties.
         *
         * @throws      {InvalidArgumentException} - Invalid argument is passed.
         * @throws      {InvalidPropertyException} - Invalid property or invalid value of a property is passed.
         *
         * @classdesc   A brief description about the class.
         *              -
         *              -
         *
         * @todo        Anything that thought for but not yet implemented.
         *              -
         *              -
         */
        var Calendar = function Calendar(bconfig, lconfig, pspconfig) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, self = this,
                dependentPropertiesValidationMessage = '', prop = null;

            if(!$KU.is(bconfig, 'object')) bconfig = {};

            if(!bconfig.isPreValidated) {
                prop = {
                    calendarIcon: 'calbtn.png', //(Read + Write) This property is applicable only when the viewType is set as CALENDAR_VIEW_TYPE_GRID_POPUP
                    calendarIconAlignment: constants.CALENDAR_ICON_ALIGN_RIGHT,
                    cellTemplate: '', //(Read + Write) This property is available only when viewType is set as CALENDAR_VIEW_TYPE_GRID_POPUP or CALENDAR_VIEW_TYPE_GRID_ONSCREEN
                    data: null, //(Read + Write) This is required if cellTemplate is defined
                    dateComponents: [18, 2, 2020, 12, 59, 59], //(Read + Write)
                    dateEditable: true, //(Read + Write)
                    dateFormat: 'dd/MM/yyyy', //(Read + Write)
                    day: -1, //(Read only)
                    dayTextAlignmentInCell: constants.CONTENT_ALIGN_CENTER, //(Read + Write) This property is available only when viewType is set as CALENDAR_VIEW_TYPE_GRID_POPUP or CALENDAR_VIEW_TYPE_GRID_ONSCREEN.
                    displayedMonth: null, //(Read + Write) This property is applicable only when viewType is set as CALENDAR_VIEW_TYPE_GRID_POPUP or CALENDAR_VIEW_TYPE_GRID_ONSCREEN.
                    enableOrDisableDates: null,
                    formattedDate: '', //(Read only)
                    gridTheme: voltmx.calendar.MODERN, //(Read + Write)
                    hideDaysHeader: false, //(Read + Write) This property is available only when viewType is set as CALENDAR_VIEW_TYPE_GRID_POPUP or CALENDAR_VIEW_TYPE_GRID_ONSCREEN. It indicates if the weekdays are hidden on the header for grid calendar.
                    hideMonthsHeader: false, //(Read + Write) This property is available only when viewType is set as CALENDAR_VIEW_TYPE_GRID_POPUP or CALENDAR_VIEW_TYPE_GRID_ONSCREEN. It indicates if the months header is hidden for grid calendar including the navigation buttons.
                    hidePreviousNextMonthDates: false,
                    hour: -1, //(Read only)
                    i18n_toolTip: '', //(Read only)
                    minutes: -1, //(Read only)
                    month: -1, //(Read only)
                    noOfMonths: 1, //(Read + Write)
                    onDone: null, //(Read + Write)
                    onSelection: null, //(Read + Write)
                    placeholder: '', //(Read + Write)
                    seconds: -1, //(Read only)
                    selectedDates: null,
                    selectionType: constants.CALENDAR_SELECTION_TYPE_SINGLE_SELECT, //(Read + Write)
                    titleOnPopup: '', //(Read + Write)
                    toolTip: '', //(Read + Write)
                    validEndDate: null, //(Read + Write)
                    validStartDate: null, //(Read + Write)
                    viewConfig: {}, //(Read +Write)
                    viewType: constants.CALENDAR_VIEW_TYPE_GRID_POPUP, //(Read +Write)
                    widgetDataMapForCell: null, //(Read + Write)
                    year: -1 //(Read only)
                };
            }

            _populateUnderscore.Calendar.call(this);

            if(!$KU.is(bconfig.id, 'string') || !bconfig.id) {
                bconfig.id = (this._kwebfw_.name + $KU.uid());
            }

            Calendar.base.call(this, bconfig, lconfig, pspconfig);

            if(!bconfig.isPreValidated) {
                if($KU.is(_dependentPropertiesValidationMessage.Calendar, 'function')) {
                    dependentPropertiesValidationMessage = _dependentPropertiesValidationMessage.Calendar.call(this, prop, bconfig, lconfig, pspconfig);
                }
            }

            if(dependentPropertiesValidationMessage) {
                throw new Error(dependentPropertiesValidationMessage);
            } else {
                if(!bconfig.isPreValidated) {
                    //Defaulting to platfom values specific to Calendar
                    $KU.each(prop, function(value, key) {
                        var $K = voltmx.$kwebfw$, $KU = $K.utils,
                            $KW = $K.widget, valid = false, message = '';

                        if(!Object.prototype.hasOwnProperty.call(bconfig, key)) {
                            bconfig[key] = value;
                        } else if($KW.getNonConstructorProperties(self._kwebfw_.name).indexOf(key) >= 0) {
                            throw new Error('<' + key + '> is a non-constructor property of <' + self._kwebfw_.ns + '> class.');
                        } else if(!$KU.is(_valid.Calendar[key], 'function')) {
                            throw new Error('<' + key + '> is available in default widget properties of <voltmx.ui.Calendar>, but not in <_valid.Calendar> namespace.');
                        } else {
                            valid = _valid.Calendar[key].call(self, bconfig[key]);
                            if($KU.is(valid, 'array')) {
                                bconfig[key] = valid[0]; valid = valid[1];
                            }

                            if(valid === false || ($KU.is(valid, 'string') && valid)) {
                                message = ('Invalid value passed to property <' + key + '> of widget <' + self._kwebfw_.ns + '>.');

                                if($KU.is(valid, 'string')) {
                                    message += ('\n' + valid);
                                }

                                throw new Error(message);
                            }
                        }
                    });
                }

                //Defining Getters/Setters specific to Calendar
                $KU.each(_view.Calendar, function(value, key) {
                    var $K = voltmx.$kwebfw$, $KU = $K.utils;

                    $KU.defineProperty(self._kwebfw_.prop, key, bconfig[key], {configurable:false, enumerable:true, writable:true});

                    $KU.defineGetter(self, key, function Calendar$_getter() {
                        var $K = voltmx.$kwebfw$, $KU = $K.utils;

                        if($KU.is(_getter.Calendar[key], 'function')) {
                            return _getter.Calendar[key].call(this, this._kwebfw_.prop[key]);
                        }
                        return this._kwebfw_.prop[key];
                    }, true);

                    $KU.defineSetter(self, key, function Calendar$_setter(val) {
                        var $K = voltmx.$kwebfw$, $KU = $K.utils, old = null,
                            valid = false, $KW = $K.widget, rmodel = null,
                            final = null, message = '', el = null;

                        if(value === false) {
                            throw new Error('<'+key+'> is a readonly property of <'+this._kwebfw_.ns+'> widget.');
                        } else if(this._kwebfw_.prop[key] !== val) {
                            rmodel = $KW.rmodel(this);

                            if(rmodel && rmodel._kwebfw_.is.template && !rmodel._kwebfw_.is.cloned) {
                                throw new Error('Cannot set any value of a widget, which is either a raw template or any of its widget.');
                            } else {
                                valid = _valid.Calendar[key].call(this, val);
                                if($KU.is(valid, 'array')) {
                                    val = valid[0]; valid = valid[1];
                                }

                                if(valid === false || ($KU.is(valid, 'string') && valid)) {
                                    message = ('Invalid value passed to property <'+key+'> of widget <'+self._kwebfw_.ns+'>.');

                                    if($KU.is(valid, 'string')) {
                                        message += ('\n' + valid);
                                    }

                                    throw new Error(message);
                                } else {
                                    old = this._kwebfw_.prop[key];
                                    this._kwebfw_.prop[key] = val;

                                    if($KU.is(_setter.Calendar[key], 'function')) {
                                        _setter.Calendar[key].call(this, old);
                                    }

                                    if(_relayoutActiveTriggerer.Calendar().indexOf(key) >= 0) {
                                        $KW.markRelayout(this);
                                    }

                                    if(_relayoutPassiveTriggerer.Calendar().indexOf(key) >= 0) {
                                        final = this._kwebfw_.flex.final;

                                        if(!(final.height && final.width)) {
                                            $KW.markRelayout(this);
                                        }
                                    }

                                    $KW.onPropertyChange(this, key, old);

                                    if($KU.is(value, 'function')) {
                                        el = $KW.el(this);
                                        el.node && value.call(this, el, old);
                                    }
                                }
                            }
                        }
                    }, false);
                });

                if($KU.is(_postInitialization.Calendar, 'function')) {
                    _postInitialization.Calendar.call(this);
                }
            }

            pspconfig = lconfig = bconfig = null; //For GC
        };


        $K.utils.inherits(Calendar, voltmx.ui.BasicWidget);

        var calendar__flush = function Calendar$_flush() {
            var $super = voltmx.ui.Calendar.base.prototype,
                $K = voltmx.$kwebfw$, $KW = $K.widget, $KD = $K.dom, el = $KW.el(this);

            el.icon && $KD.off(el.icon, 'onmousedown');
            $super._flush.call(this);
        };

        /**
         * Builds the view layer for voltmx.ui.Calendar widget.
         *
         * @override
         * @access      protected
         * @method      _render
         * @memberof    voltmx.ui.Calendar
         * @author      Goutam Sahu <goutam.sahu@voltmx.com>
         *
         * @returns     {HTMLElement} – Calendar view.
         */
        var calendar__render = function Calendar$_render(tag) {
            var $super = voltmx.ui.Calendar.base.prototype, icon = null,
                _ = this._kwebfw_, prop = _.prop, input = null, view = _.view,
                $K = voltmx.$kwebfw$, $KD = $K.dom, $KW = $K.widget, el = $KW.el(view);

            if(this.isVisible || $K.F.RIVW) {
                if(!view) {
                    input = $KD.create('INPUT', {
                        type: 'text',
                        autocomplete: 'off',
                        value: prop.formattedDate
                    });

                    icon = $KD.create('IMG', {
                        alt:'Calendar Icon', role:'button',
                        loading:'lazy'
                    });
                    $KD.on(icon, 'mousedown', 'image', function(e) {
                        $KD.preventDefault(e);
                    });
                    $KD.setAttr(icon, 'aria-label', 'Calendar Icon');
                    $KD.setAttr(icon, 'aria-haspopup', 'true');
                    $KD.setAttr(icon, 'kwh-click', 'onIconClick');
                    $KD.setAttr(icon, 'kwh-keyup', 'onIconKeyUp');
                    $KD.setAttr(input, 'kwh-focusout', 'onInputFocusOut');
                    $KD.setAttr(input, 'kwh-keydown', 'onInputKeyDown');
                    $KD.setAttr(input, 'aria-label', 'Calendar Input');

                    view = $super._render.call(this, tag, [input, icon]);
                    el = $KW.el(view);

                    _view.Calendar.dateFormat.call(this, el, this.dateFormat);
                    _view.Calendar.dateEditable.call(this, el, this.dateEditable);
                    _view.Calendar.calendarIcon.call(this, el, this.calendarIcon);
                    _view.Calendar.calendarIconAlignment.call(this, el, this.calendarIconAlignment);
                    _view.Calendar.enableOrDisableDates.call(this, el, this.enableOrDisableDates);
                }

                $KD.setAttr(el.icon, 'aria-expanded', 'false');
                _view.Calendar.placeholder.call(this, el, this.placeholder);
                _view.Calendar.toolTip.call(this, el, this.toolTip);

                $KW.accessibility(this);
            }

            return view;
        };


        var calendar_clear = function Calendar$clear() {
            var _ = this._kwebfw_, prop = _.prop;

            if(prop.selectionType === constants.CALENDAR_SELECTION_TYPE_SINGLE_SELECT) {
                this.dateComponents = null;
            } else {
                this.selectedDates = null;
            }
        };


        var calendar_clearData = function Calendar$clearData() {
            this.data = null;
        };


        var calendar_dismiss = function Calendar$dismiss() {
            _dismissPicker.call(this, true);
        };


        var calendar_enableRangeOfDates = function Calendar$enableRangeOfDates(startDate, endDate, skin, enable) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, _ = this._kwebfw_,
                backupStartDate = _.enableDateRangeStart,
                backupEndDate = _.enableDateRangeEnd, valid = false,
                displayedMonth = _.prop.displayedMonth || [-1, -1];

            if($KU.is(skin, 'string') && $KU.is(enable, 'boolean')) {
                valid = _isValidDateComponents(startDate);
                if(valid === false) {
                    //ERROR:: throw error
                } else if($KU.is(valid, 'array')) {
                    if(!startDate[1]) {
                        //ERROR:: throw error
                    } else {
                        startDate = valid[0];
                        valid = valid[1];
                    }
                }
                if(valid && startDate) {
                    _.enableDateRangeStart = [startDate[0], startDate[1], startDate[2]];
                    startDate = new Date(startDate[2], (startDate[1] - 1), startDate[0], 0, 0, 0);
                }

                valid = _isValidDateComponents(endDate);
                if(valid === false) {
                    //ERROR:: throw error
                } else if($KU.is(valid, 'array')) {
                    if(!valid[1]) {
                        //ERROR:: throw error
                    } else {
                        endDate = valid[0];
                        valid = valid[1];
                    }
                }
                if(valid && endDate) {
                    _.enableDateRangeEnd = [endDate[0], endDate[1], endDate[2]];
                    endDate = new Date(endDate[2], (endDate[1] - 1), endDate[0], 0, 0, 0);
                }
                if($KU.is(_.enableDateRangeInactive, 'boolean')) {
                    _.enableDateRangeInactive = (!startDate && !endDate) ? null : !enable;
                }

                valid = _isValidDateCombination.call(this, this._kwebfw_.prop);
            }

            if(!valid) {
                _.enableDateRangeStart = backupStartDate;
                _.enableDateRangeEnd = backupEndDate;
                //ERROR:: throw error
            } else {
                _.enableDateRangeStart = (!startDate) ? null : [startDate.getDate(), (startDate.getMonth() + 1), startDate.getFullYear()];
                _.enableDateRangeEnd = (!endDate) ? null : [endDate.getDate(), (endDate.getMonth() + 1), endDate.getFullYear()];
                _.enableDateRangeSkin = skin;
                _.enableDateRangeInactive = (!startDate && !endDate) ? null : !enable;
                _changePicker.call(this, displayedMonth[0], [1]);
            }
        };


        var calendar_navigateToNextMonth = function Calendar$navigateToNextMonth() {
            _nextMonth.call(this, 1);
        };


        var calendar_navigateToPreviousMonth = function Calendar$navigateToPreviousMonth() {
            _prevMonth.call(this, 1);
        };


        var calendar_open = function Calendar$open() {
            !this._kwebfw_.picker && _openPicker.call(this);
        };


        var calendar_removeDataAt = function Calendar$removeDataAt(date) {
            var prop = this._kwebfw_.prop, displayedMonth = null;

            if(prop.data && Object.prototype.hasOwnProperty.call(prop.data, date)) {
                delete prop.data[date];
                displayedMonth = prop.displayedMonth || [-1, -1];
                _changePicker.call(this, displayedMonth[0], displayedMonth[1]);
            }
        };


        var calendar_setContext = function Calendar$setContext(context) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
                _ = this._kwebfw_, anchor = _.anchor, omodel = null,
                anchorWidget = null, anchorTemplate = null;

            if($KU.is(context, 'object')
            && ['top', 'bottom', 'left', 'right'].indexOf(context.anchor) >= 0
            && ($KU.is(context.widget, 'widget')
            || ($KU.is(context.widget, 'string') && context.widget))) {
                omodel = $KW.omodel(this);
                anchorWidget = context.widget;

                if(!omodel && $KU.is(context.widget, 'string')) {
                    delete anchor.position;
                    delete anchor.widget;
                    delete anchor.holder;

                    throw new Error('context.widget cannot be a string.');
                } else {
                    if($KU.is(context.widget, 'string')) {
                        anchorTemplate = $KW.tmodel(this);
                        anchorWidget = $KU.get(context.widget, anchorTemplate);
                    }

                    anchor.position = context.anchor;
                    anchor.widget = anchorWidget;
                    anchor.holder = (omodel) ? omodel : anchorWidget.parent;

                    if(!$KU.is(anchor.widget, 'widget', 'Form2')) {
                        anchor.widget = anchor.widget._kwebfw_.uid;
                    } else {
                        delete anchor.position;
                        delete anchor.widget;
                        delete anchor.holder;
                    }
                }
            } else {
                delete anchor.position;
                delete anchor.widget;
                delete anchor.holder;
            }
        };


        var calendar_setData = function Calendar$setData(data) {
            this.data = data;
        };


        var calendar_setDataAt = function Calendar$setDataAt(date, data) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, prop = this._kwebfw_.prop,
                displayedMonth = prop.displayedMonth || [-1, -1];

            if($KU.is(data, 'object')) {
                if(!prop.data) prop.data = {};

                prop.data[date] = data;
                _changePicker.call(this, displayedMonth[0], displayedMonth[1]);
            }
        };


        var calendar_setDatesSkin = function Calendar$setDatesSkin(dates, skin) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, _ = this._kwebfw_, valid = true;

            $KU.each(dates, function(date) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils,
                    valid = _isValidDateComponents(date);

                if(valid === false || ($KU.is(valid, 'array') && valid[1] === false)) {
                    valid = false;
                    return true;
                }
            });

            if(!valid) {
                //ERROR:: throw error
            } else {
                _.specialSkins = {};

                $KU.each(dates, function(date) {
                    var key = _dateFormatter(date, false);

                    if(skin) _.specialSkins[key] = skin;
                    else delete _.specialSkins[key];
                });
            }
        };


        var calendar_setEnabled = function Calendar$setEnabled(dates, skin, enable) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils;

            if(arguments.length === 1) {
                if($KU.is(dates, 'boolean')) {
                    voltmx.ui.Calendar.base.prototype.setEnabled.call(this, dates);
                }
            } else if(arguments.length === 3) {
                this.enableOrDisableDates = {
                    dates: dates,
                    skin: skin,
                    hasToEnable: enable
                };
            }
        };


        var calendar_setEnableAll = function Calendar$setEnableAll(arg0) {
            var enable = (arg0 === false) ? false : true;

            this.enableRangeOfDates([1, 1, _minYear], [31, 12, _maxYear], '', enable);
        };

        $K.defVoltmxProp(Calendar.prototype, [
            {keey:'_flush', value:calendar__flush},
            {keey:'_render', value:calendar__render},
            {keey:'clear', value:calendar_clear},
            {keey:'clearData', value:calendar_clearData},
            {keey:'dismiss', value:calendar_dismiss},
            {keey:'enableRangeOfDates', value:calendar_enableRangeOfDates},
            {keey:'navigateToNextMonth', value:calendar_navigateToNextMonth},
            {keey:'navigateToPreviousMonth', value:calendar_navigateToPreviousMonth},
            {keey:'open', value:calendar_open},
            {keey:'removeDataAt', value:calendar_removeDataAt},
            {keey:'setContext', value:calendar_setContext},
            {keey:'setData', value:calendar_setData},
            {keey:'setDataAt', value:calendar_setDataAt},
            {keey:'setDatesSkin', value:calendar_setDatesSkin},
            {keey:'setEnabled', value:calendar_setEnabled},
            {keey:'setEnableAll', value:calendar_setEnableAll}
        ]);


        return Calendar;
    }())});
}());
