
Object.defineProperty(voltmx.$kwebfw$, 'hotreload', {configurable:false, enumerable:false, writable:false, value:(function() {
    var _ns = {}, formList = [], moduleList = [], dependencyModules = [],
        $K = voltmx.$kwebfw$, isDefaultConnection = false,
        appGroupMap = {};

    var _flushModules = function $KH_flushModules() {
        var i;
        for(i = 0; i < moduleList.length; i++) {
            require.undef(moduleList[i]);
        }
        for(i =0; i < dependencyModules.length; i++) {
            require.undef(dependencyModules[i]);
        }
    };

    var _reloadFormDefinition = function $KH_reloadFormDefinition() {
        var $K = voltmx.$kwebfw$, $KW = $K.widget, $KA = $K.app,
            tmpControllerName, userController, formInfo, registryInfo,
            cf, formID, appName;

        voltmx.print('HotReload: Reloading the current form');
        cf = $KW.model($KA.currentFormUID);
        formID = cf.id;
        appName = cf.appName;
        _flushModules();


        formInfo = _voltmx.mvc.resetBookKeepersAndGetFormInfo(formID, appName);
        registryInfo = formInfo.registryInfo;

        if(registryInfo && registryInfo.controllerName) {
            tmpControllerName = registryInfo.controllerName;
            userController = tmpControllerName.replace(formID+'Controller', 'user'+formID+'Controller');
            require.undef(tmpControllerName);
            require.undef(tmpControllerName+'Actions');
            require.undef(registryInfo.name);
            require.undef(userController);
        }

        cf.flush();

        require(moduleList, function() {
            var nav = new voltmx.mvc.Navigation(formInfo.navigationObject);
            nav.navigate();
            voltmx.print('HotReload: Current form reload is done');
        });

    };

    var _initializeHotReloadConnection = function $KH_initializeHotReloadConnection() {
        var connection = appConfig.hotReloadURL,
            localConnection = 'ws://127.0.0.1:9099';

        window.WebSocket = window.WebSocket || window.MozWebSocket;
        connection = new WebSocket(connection);

        connection.onopen = function() {
            voltmx.print('HotReload: Socket open');
        };

        connection.onerror = function(error) {
            voltmx.print('HotReload: Socket error ' + error);
            if(this.close) {
                this.close();
            }
        };

        connection.onmessage = function(message) {
            voltmx.print('HotReload: Socket message recieved');
            var data = JSON.parse(message.data), frmName = null,
                payLoad, modifiedForms, i, requireModules, globalModules,
                templates, components, depModules;

            if(data.eventName === 'HOT_RELOAD') {
                payLoad = data.message;
                modifiedForms = payLoad.modifiedForms;
                for(i = 0; i < modifiedForms.length; i++) {
                    frmName = modifiedForms[i]['name'];
                    formList.push(frmName);
                    appGroupMap[frmName] = modifiedForms[i].formPath;
                }

                requireModules = payLoad.modifiedRequireModules;
                for(i = 0; i < requireModules.length; i++) {
                    moduleList.push(requireModules[i]['name']);
                }

                globalModules = payLoad.modifiedGlobalModules;
                for(i = 0; i < globalModules.length; i++) {
                    moduleList.push(globalModules[i]['name']);
                }

                templates = payLoad.modifiedTemplates;
                for(i = 0; i < templates.length; i++) {
                    moduleList.push(templates[i]['name']);
                }

                components = payLoad.modifiedComponents;
                for(i = 0; i < components.length; i++) {
                    moduleList.push(components[i]['name']);
                }

                depModules = payLoad.dependencyModules;
                for(i =0; i < depModules.length; i++) {
                 dependencyModules.push(depModules[i]['name']);
                }



                _reloadFormDefinition();
                moduleList = []; //resetting to empty after loading modules.
            }
        };

        connection.onclose = function(error) {
            if(isDefaultConnection) {
                localConnection = null;
                //eslint-disable-next-line no-alert
                alert('HotReload connection is lost. Please check your network connection.');
            }
            if(error.code === 1006 && isDefaultConnection === false) {
                isDefaultConnection = true;
                localConnection = new WebSocket(localConnection);
                localConnection.onopen = connection.onopen;
                localConnection.onerror = connection.onerror;
                localConnection.onmessage = connection.onmessage;
                localConnection.onclose = connection.onclose;
                connection = null;
                voltmx.print('HotReload: connection created on local ip');
            }

            voltmx.print('HotReload: Socket close');
        };
    };

    var _extendFormApis = function $KH_extendFormApis() {
        voltmx.ui.Form2.prototype.flush = function() {
            this.removeAll();
        };
    };

    $K.defVoltmxProp(_ns, [
        {keey:'initializeHotReloadConnection', value:_initializeHotReloadConnection},
        {keey:'extendFormApis', value:_extendFormApis}
    ]);

    return _ns;
}())});