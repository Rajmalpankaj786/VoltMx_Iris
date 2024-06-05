$KW.HotReload = (function() {
    

    var module = {}, formList = [], moduleList = [],
        isDefaultConnection = false, appGroupMap = {};

    function __flushModules() {
        var i;
        for(i = 0; i < moduleList.length; i++) {
            require.undef(moduleList[i]);
        }
    }

    function __reloadFormDefinition() {
        var currentForm = voltmx.application.getCurrentForm();
        var formID = currentForm.id;
        var index = formList.indexOf(formID);
        var friendlyName, controllerName, NavigationObj;
        var appName = currentForm.appName;
        var formInfo, registryInfo, tmpControllerName, userController;


        __flushModules();
        if(index != -1) {
            formInfo = _voltmx.mvc.resetBookKeepersAndGetFormInfo(formID, appName);
            registryInfo = formInfo.registryInfo;

            if(registryInfo && registryInfo.controllerName) {
                tmpControllerName = registryInfo.controllerName;
                userController = tmpControllerName.replace(formID+'Controller', 'user'+formID+'Controller');
                require.undef(tmpControllerName);
                require.undef(tmpControllerName+"Actions");
                require.undef(registryInfo.name);
                require.undef(userController);
            }
            currentForm.flush();

            require(moduleList, function() {
                $KG.__hotReload = true
                var nav = new voltmx.mvc.Navigation(formInfo.navigationObject);
                nav.navigate();
                voltmx.web.logger('log', 'modules  and form are reloaded');
            });

            formList.splice(index, 1);
        } else {
            require(moduleList, function () {
                voltmx.web.logger('log', 'modules are reloaded');
            })
        }
    }


    

    (function() {
        var appjsInterval = setInterval(function() {
            try {
                if(appConfig) {
                    $KW.HotReload.initializeHotReloadConnection();
                    $KW.HotReload.extendFormApis();
                    clearInterval(appjsInterval);
                }
            } catch (e) {
                voltmx.web.logger("warn", "unable to establish Hot reload preview connection");
            }

        }, 2000);
    }());

    module.initializeHotReloadConnection = function() {
        var connection = appConfig.hotReloadURL;
        var localConnection = 'ws://127.0.0.1:9099';


        window.WebSocket = window.WebSocket || window.MozWebSocket;
        connection = new WebSocket(connection);

        connection.onopen = function() {
            
            voltmx.web.logger('log', 'HotReload: Socket open');
        };

        connection.onerror = function (error) {
            
            voltmx.web.logger('warn', 'HotReload: Socket error');
            if(this.close) {
                this.close();
            }
        };

        connection.onmessage = function (message) {
            
            voltmx.web.logger('log', 'HotReload: Socket message recieved');
            var data = JSON.parse(message.data), frmName = null;
            if(data.eventName == 'HOT_RELOAD') {
                var payLoad = data.message;
                var modifiedForms = payLoad.modifiedForms;
                for(var i = 0; i < modifiedForms.length; i++) {
                    frmName = modifiedForms[i]['name'];
                    formList.push(frmName);
                    appGroupMap[frmName] = modifiedForms[i].formPath
                }

                var requireModules = payLoad.modifiedRequireModules;
                for(i = 0; i < requireModules.length; i++) {
                    moduleList.push(requireModules[i]['name']);
                }

                var globalModules = payLoad.modifiedGlobalModules;
                for(i = 0; i < globalModules.length; i++) {
                    moduleList.push(globalModules[i]['name']);
                }

                __reloadFormDefinition();
                moduleList = []; 
            }
        };

        connection.onclose = function(error) {
            if(isDefaultConnection) {
                localConnection = null;
                alert('HotReload connection is lost. Please check your network connection.')
            }
            if(error.code == 1006 && isDefaultConnection == false) {
                isDefaultConnection = true;
                localConnection = new WebSocket(localConnection);
                localConnection.onopen = connection.onopen;
                localConnection.onerror = connection.onerror;
                localConnection.onmessage = connection.onmessage;
                localConnection.onclose = connection.onclose;
                connection = null;
                voltmx.web.logger('log', 'HotReload: connection created on local ip');
            }


            voltmx.web.logger('log', 'HotReload: Socket close');
        };
    };

    module.extendFormApis = function() {
        voltmx.ui.Form2.prototype.flush = function() {
            this.removeAll();
            this.addWidgetsdone = false;
            this.initdone = false;
            clearInterval(this.scrollerTimer);
        };

    };




    return module;
}());