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

    .when('wait for "(.*)" withTimeout "(.*)" ms', async function(widget, timeout){
          return await voltmx.automation.playback.waitFor(widget.split("."), parseInt(timeout));
    })

    .when('wait "(.*)" ms', async function(time){
          await voltmx.automation.playback.wait(parseInt(time));
    })
    .when('user scrolls to widget "(.*)"', async function(widgetPath){
          await voltmx.automation.scrollToWidget(widgetPath.split("."));
    })
    .when('user touches widget "(.*)" at startPoint "(.*)" movePoints "(.*)" and endPoint "(.*)"', async function(widgetPath, startPt, movePt, endPt){
          await voltmx.automation.widget.touch(widgetPath.split("."), JSON.parse(startPt), JSON.parse(movePt), JSON.parse(endPt));
    })


    .when('user captures screen', async function(){
          voltmx.automation.capture();
    })

    .when('on device back', async function(){
          voltmx.automation.device.deviceBack();
    })

    

    

    .when('user clicks alert', async function(index){
          voltmx.automation.alert.click();
    })
    .when('user clicks alert atIndex "(.*)"', async function(index){
          voltmx.automation.alert.click(parseInt(index));
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
    .when('user selects listbox item "(.*)" in "(.*)"', async function(listboxkey, widgetPath){
          voltmx.automation.listbox.selectItem(widgetPath.split("."), listboxkey);
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
    .when('user pushes segment "(.*)"', async function(widgetPath){
          voltmx.automation.segmentedui.push(widgetPath.split("."));
    })
    .when('user scrolls to row "(.*)" of segment "(.*)"', async function(index, widgetPath){
          var segmentpath = widgetPath + index;
          voltmx.automation.segmentedui.scrollToRow(segmentpath.split("."));
    })
    .when('user slides to "(.*)" in "(.*)"', async function(slidevalue, widgetPath){
          voltmx.automation.slider.slide(widgetPath.split("."), parseInt(slidevalue));
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

    .when('user executes code "(.*)"', async function(data) {
                   let context=this;
               let AsyncFunction = Object.getPrototypeOf(async function(){}).constructor
               var f=new AsyncFunction('context',data)
                   await f(context);
                 

    })
    

    .then('property "(.*)" of widget "(.*)" equals', async function(property, widgetPath, value){
          expect(voltmx.automation.widget.getWidgetProperty(widgetPath.split("."), property)).toBe(value);
    })
