featureSteps('Test:')
    .given('widget "(.*)" is loaded', async function(widget){
           return this.when('wait for "'+widget+'"')
    })
    .given('widget "(.*)" is loaded withinTimeout "(.*)"', async function(widget, timeout){
           return this.when('wait for "'+widget+'" withTimeout "'+timeout+'"');
    })
    .when('wait for "(.*)"', async function(widget){
          return await voltmx.automation.playback.waitFor(widget.split("."));
    })
    .when('wait for "(.*)" withTimeout "(.*)"', async function(widget, timeout){
          return await voltmx.automation.playback.waitFor(widget.split("."), timeout);
    })
    .when('wait "(.*)" ms', async function(time){
          await voltmx.automation.playback.wait(parseInt(time));
    })
    .when('user scrolls to widget "(.*)"', async function(widgetPath){
          await voltmx.automation.scrollToWidget(widgetPath.split("."));
    })
    .when('user touches widget "(.*)" at StartPt "(.*)" movePoints "(.*)" and endPoint "(.*)" ', async function(widgetPath, startPt, movePt, endPt){
          await voltmx.automation.widget.touch(widgetPath.split("."), startPt, movePt, endPt);
    })
    .when('user captures screen', async function(){
          voltmx.automation.capture();
    })
    .when('on device back', async function(){
          voltmx.automation.device.deviceBack();
    })
    .when('wait for "(.*)" withTimeout "(.*)"', async function(widget, timeout){
         return await voltmx.automation.playback.waitFor(widget.split("."), parseInt(timeout));
    })

    //widget definitions

    //alert for native channels alone
    .when('user clicks alert', async function(index){
          voltmx.automation.alert.click();
    })
    .when('user clicks alert atIndex "(.*)"', async function(index){
          voltmx.automation.alert.click(index);
    })
    .when('user clicks button "(.*)"', async function(widgetPath){
          voltmx.automation.button.click(widgetPath.split("."));
    })
    .when('user clicks box "(.*)"', async function(widgetPath){
          voltmx.automation.box.click(widgetPath.split("."));
    })
    .when('user selects date "(.*)" in "(.*)"', async function(date, widgetPath){
          voltmx.automation.calendar.selectDate(widgetPath.split("."), JSON.parse(date));
    })
    .when('user clicks checkbox "(.*)" in "(.*)"', async function(checkboxkey, widgetPath){
          voltmx.automation.checkboxgroup.click(widgetPath.split("."), checkboxkey);
    })
    .when('user selects combobox "(.*)" in "(.*)"', async function(comboboxkey, widgetPath){
          voltmx.automation.combobox.selectItem(widgetPath.split("."), comboboxkey);
    })
    .when('user selects listbox item "(.*)" in "(.*)"', async function(listboxkey, listboxpath){
          voltmx.automation.listbox.selectItem(listboxpath.split("."), listboxkey);
    })
    .when('user clicks radiobutton "(.*)" in "(.*)"', async function(radiobuttongroupkey, widgetPath){
          voltmx.automation.radiobuttongroup.click(widgetPath.split("."), radiobuttongroupkey);
    })
    .when('user clicks segment "(.*)" at "(.*)"', async function(widgetPath, index){
          var segmentpath = widgetPath + index;
          voltmx.automation.segmentedui.click(segmentpath.split("."));
    })
    .when('user pulls segment "(.*)"', async function(widgetPath){
          voltmx.automation.segmentedui.pull(widgetPath.split("."));
    })
    .when('user pushes segment (.*)"', async function(widgetPath){
          voltmx.automation.segmentedui.push(widgetPath.split("."));
    })
    .when('user scrolls to top of segment "(.*)"', async function(widgetPath){
          voltmx.automation.segmentedui.scrollToTop(widgetPath.split("."));
    })
    .when('user scrolls to bottom of segment "(.*)"', async function(widgetPath){
          voltmx.automation.segmentedui.scrollToBottom(widgetPath.split("."));
    })
    .when('user scrolls to row "(.*)" of segment "(.*)"', async function(index, widgetPath){
          var segmentpath = widgetPath + index;
          voltmx.automation.segmentedui.scrollToRow(segmentpath.split("."));
    })
    .when('user slides to "(.*)" in "(.*)"', async function(slidevalue, widgetPath){
          voltmx.automation.slider.slide(widgetPath.split("."), Number(slidevalue));//may be Number is not needed. It is validated in platform
    })
    .when('user toggles "(.*)"', async function(widgetPath){
          voltmx.automation.switch.toggle(widgetPath.split("."));
    })
    .when('user clicks tab "(.*)" in "(.*)"', async function(tabid, widgetPath){
          voltmx.automation.tabpane.click(widgetPath.split("."), tabid);
    })
    .when('user enters text "(.*)" in textbox "(.*)"', async function(text, widgetPath){
          voltmx.automation.textbox.enterText(widgetPath.split("."), text);
    })
    .when('user enters text "(.*)" in textarea "(.*)"', async function(text, widgetPath){
          voltmx.automation.textarea.enterText(widgetPath.split("."), text);
    })
    .when('user clicks flexcontainer "(.*)"', async function(widgetPath){
          voltmx.automation.flexcontainer.click(widgetPath.split("."));
    })
    .when('user executes code "(.*)"', async function(data) { //comment, rawdata, uuid){
          //var data = "// :User Injected Code Snippet [" + comment + "]\n        " + rawdata + "\n        // :End User Injected Code Snippet {" + uuid + "}";
           eval ("(async () => {" + data + "})()")

    })
    .then('property "(.*)" of "(.*)" equals "(.*)"', async function(property, widgetPath, value){
          expect(voltmx.automation.widget.getWidgetProperty(widgetPath.split("."), property)).toBe(value);
    })
