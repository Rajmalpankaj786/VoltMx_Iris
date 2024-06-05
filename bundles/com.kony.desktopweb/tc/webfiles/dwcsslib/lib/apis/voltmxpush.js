

Object.defineProperty(voltmx, 'push', {configurable:false, enumerable:false, writable:false, value:(function() {
    var _ns = {}, $K = voltmx.$kwebfw$, $KU = $K.utils;

    var onsuccessfulregistration, onfailureregistration,
        onlinenotification,
        onsuccessfulderegistration, onfailurederegistration, messaging;

    //eslint-disable-next-line no-unused-vars
    var offlinenotification;

    (function() {
        var config = localStorage.getItem(voltmx.$kwebfw$.app.id + '_' + 'pushConfig');
        if(config) {
            config = JSON.parse(config);
            if(!messaging) {
                firebase.initializeApp(config);
                messaging = firebase.messaging();
                messaging.usePublicVapidKey(config.publicKey);
            }
            messaging.onMessage(function(payload) {
                $KU.log('Push notification received data is '+ JSON.stringify(payload));
                onlinenotification && onlinenotification(payload);
            });
        }
    })();


    function __getPermission(config) {
        messaging.requestPermission().then(function() {
            $KU.log('Notification permission granted.');
            //voltmxSwRegistration at PWA level.
            if(voltmxSwRegistration) {
                $KU.log('Service worker registration succeeded.');
                messaging.useServiceWorker(voltmxSwRegistration);
                localStorage.setItem(voltmx.$kwebfw$.app.id + '_' + 'pushConfig', JSON.stringify(config));
                __getToken(messaging);
            } else {
                $KU.log('Service worker registration failed:');
                onfailureregistration && onfailureregistration({'errorCode' : '1406',
                    'errormessage' : 'Service worker registration failed'});
            }
        }).catch(function(err) {
            $KU.log('Unable to get permission to notify.'+ err);
            onfailureregistration && onfailureregistration({'errorCode' : '1403',
                'errormessage' : 'permission is not available'});
        });
    }


    function __getToken(messaging) {
        messaging.getToken().then(function(token) {
            if(token) {
                localStorage.setItem(voltmx.$kwebfw$.app.id + '_' + 'pushId', token);
                $KU.log('token is '+ token);
                messaging.onMessage(function(payload) {
                    $KU.log('Push notification received. Data is '+ JSON.stringify(payload));
                    onlinenotification && onlinenotification(payload);
                });
                onsuccessfulregistration(token);
            } else {
                $KU.log('No Instance ID token available. Request permission to generate one.');
                onfailureregistration && onfailureregistration({'errorCode' : '1403',
                    'errormessage' : 'Unknown Error'});
            }
        }).catch(function(err) {
            $KU.log('An error occurred while retrieving token. '+ err);
            onfailureregistration && onfailureregistration({'errorCode' : '1402',
                'errormessage' : 'PNS token is not available'});
        });
    }


    var deRegister = function() {
        $KU.log({api:'voltmx.push.deRegister', enter:true});
        var config = localStorage.getItem(voltmx.$kwebfw$.app.id + '_' + 'pushConfig');
        config = JSON.parse(config);
        var token =localStorage.getItem(voltmx.$kwebfw$.app.id + '_' + 'pushId');

        if(config && token) {
            $KU.log('voltmx.push.deRegister');
            messaging.deleteToken(token).then(function() {
                $KU.log('succssfully unregistered from FCM.');
                onsuccessfulderegistration && onsuccessfulderegistration();
                localStorage.removeItem(voltmx.$kwebfw$.app.id + '_' + 'pushId');
                localStorage.removeItem(voltmx.$kwebfw$.app.id + '_' + 'pushConfig');
            }).catch(function(err) {
                //eslint-disable-next-line no-console
                console.error('unable to unregister from FCM. '+ JSON.stringify(err));
                onfailurederegistration && onfailurederegistration();
            });
        } else {
            //eslint-disable-next-line no-console
            console.warn('User is not subscribed for FCM');
        }
        $KU.log({api:'voltmx.push.deRegister', exit:true});
    };


    var register = function(config) {
        $KU.log({api:'voltmx.push.register', enter:true});
        if(!firebase.messaging.isSupported()) {
            //eslint-disable-next-line no-console
            console.warn('Browser does not have the Push Notifications support');
            return;
        }
        if(!messaging) {
            firebase.initializeApp(config);
            messaging = firebase.messaging();
            messaging.usePublicVapidKey(config.publicKey);
            __getPermission(config);
        }
        $KU.log({api:'voltmx.push.register', exit:true});
    };


    var setCallbacks = function(data) {
        $KU.log({api:'voltmx.push.setCallbacks', enter:true});
        //$KU.log('voltmx.push.setCallbacks', data);
        onsuccessfulregistration = data.onsuccessfulregistration;
        onfailureregistration = data.onfailureregistration;
        onlinenotification = data.onlinenotification;
        offlinenotification = data.offlinenotification;
        onsuccessfulderegistration = data.onsuccessfulderegistration;
        onfailurederegistration = data.onfailurederegistration;
        $KU.log({api:'voltmx.push.setCallbacks', exit:true});
    };


    $K.defVoltmxProp(_ns, [
        {keey:'setCallbacks', value:setCallbacks},
        {keey:'register', value:register},
        {keey:'deRegister', value:deRegister}
    ]);

    return _ns;
}())});
