Object.defineProperty(voltmx.$kwebfw$, 'apm', {configurable:false, enumerable:false, writable:false, value:(function() {
    var $K = voltmx.$kwebfw$, _foreGroundAt = null, _formEntryAt = null,
        _ns = {}, _metricsService = null, _trackEvents = null, _validEvents = [
            'AppLoad', 'AppTransition',
            'Crash', 'Error', 'Exception',
            'Custom', 'Gesture', 'Touch',
            'FormEntry', 'FormExit', 'Orientation',
            'ServiceCall', 'ServiceRequest', 'ServiceResponse'
        ];


    var _send = function $KAPM_send(widget, event, params) {
        var $K = voltmx.$kwebfw$, $KW = $K.widget, $KA = $K.app, wid = '',
            cf = $KW.model($KA.currentFormUID), flowTag = '', fid = '';

        if(_metricsService && _trackEvents && _trackEvents.indexOf(event) >= 0) {
            fid = (cf) ? cf.id : '';
            wid = (widget) ? widget.id : '';

            switch(event) {
                case 'AppLoad':
                    _metricsService.sendEvent(event, $KA.id, null, null, flowTag, {
                        loaddur: (new Date() - $KA.startedAt)
                    });
                    break;

                case 'AppTransition':
                    if(params.status === 'Foreground') {
                        _foreGroundAt = new Date();
                        params.foredur = 0;
                    } else if(params.status === 'Background') {
                        params.foredur = (new Date() - _foreGroundAt);
                    }

                    _metricsService.sendEvent(event, params.status, wid, null, flowTag, {
                        foredur: params.foredur
                    });
                    break;

                case 'Error':
                    _metricsService.sendEvent(event, widget, fid, null, flowTag, params);
                    break;

                case 'Exception':
                    _metricsService.sendEvent(event, widget, fid, null, flowTag, params);
                    break;

                case 'FormEntry':
                    _formEntryAt = new Date();
                    _metricsService.sendEvent(event, wid, wid, null, flowTag, null);
                    break;

                case 'FormExit':
                    _metricsService.sendEvent(event, wid, wid, null, flowTag, {
                        formdur: (new Date() - _formEntryAt)
                    });
                    break;

                case 'Gesture': //TODO:: Usage
                    _metricsService.sendEvent(event, params.type, fid, wid, flowTag, null);
                    break;

                case 'Orientation':
                    _metricsService.sendEvent(event, params.from, wid, null, flowTag, null);
                    break;

                case 'ServiceRequest': //TODO:: Usage
                    _metricsService.sendEvent(event, widget, fid, null, flowTag, null);
                    break;

                case 'ServiceResponse': //TODO:: Usage
                    _metricsService.sendEvent(event, widget, fid, null, flowTag, params);
                    break;

                case 'Touch': //TODO:: Usage onslide:Slider, onrowselected:DataGrid, ontabclick:TabPane
                    _metricsService.sendEvent(event, params.type, fid, wid, flowTag, null);
                    break;

                default:
                    break;
            }
        }
    };


    var _startTracking = function $KAPM_startTracking(events) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, sdk = null;

        if($KU.is(events, 'array')) {
            _trackEvents = events.slice(0);
            //eslint-disable-next-line no-undef
        } else if($KU.is(appConfig.eventTypes, 'array')) {
            //eslint-disable-next-line no-undef
            _trackEvents = appConfig.eventTypes.slice(0);
        }

        if(_trackEvents) {
            try{
                sdk = voltmx.sdk.getDefaultInstance();
                _metricsService = sdk.getMetricsService();
                _metricsService.setEventConfig('BUFFER', 15, 20);
            } catch(e) {
                _trackEvents = _metricsService = null;
                voltmx.print('MetricsService can be initialize due to some issue in MBAAS SDK. ' + e.message);
            }

            if(_metricsService) {
                _metricsService.setEventTracking = function(events) {
                    var $K = voltmx.$kwebfw$, $KU = $K.utils;

                    if($KU.is(events, 'array')) {
                        _trackEvents = [];

                        $KU.each(events, function(event) {
                            if(_validEvents.indexOf(event) >= 0) {
                                _trackEvents.push(event);
                            }
                        });
                    }
                };
            }
        }
    };


    $K.defVoltmxProp(window, [
        {keey:'spaAPM', value:{}, items:[
            {keey:'startTracking', value:_startTracking}
        ]}
    ]);

    $K.defVoltmxProp(_ns, [
        {keey:'send', value:_send}
    ]);


    return _ns;
}())});
