/* globals InfoBox */
/* globals google  */
(function() {
    var $K = voltmx.$kwebfw$, _scriptsRequested = false;

    $K.defVoltmxProp($K.ui, [
        {keey:'Map', value:{}, items:[
            {keey:'onLoad', value:function() {
                var $K = voltmx.$kwebfw$, $KW = $K.widget, $KA = $K.app;

                $KW.iterate($KW.model($KA.currentFormUID), function(widget) {
                    var $K = voltmx.$kwebfw$, $KU = $K.utils;

                    if($KU.is(widget, 'widget', 'Map') && $KW.visible(widget)) {
                        _initializeInfoBox.call(widget);
                        _setUpInteractiveCanvasMap.call(widget);
                    }
                }, {tabs:false});
            }},


            {keey:'onMapClick', value:function(/*evt*/) {
                return false;
            }},

            {keey:'InfoWindow', value:function(evt) {
                var $K = voltmx.$kwebfw$, $KW = $K.widget, $KD = $K.dom, $KU = $K.utils,
                    loc = null, mapPointNo = $KD.getAttr(evt.target, 'mappointno');

                if($KU.is(parseInt(mapPointNo, 10), 'number')) {
                    loc = this._kwebfw_.prop.locationData[parseInt(mapPointNo, 10)];
                } else {
                    loc = this._kwebfw_.gmapoptions.navigateToLocationData;
                }

                $KW.fire(this, 'onSelection', this, {location: loc});
                return false;
            }},

            {keey:'setupUIInteraction', value:function(dom, clone) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, $KW = $K.widget,
                    $KD = $K.dom, tabindex = '';

                if($KW.disabled(this)) {
                    $KD.setAttr(dom, 'aria-disabled', true);
                    $KD.removeAttr(dom, 'tabindex');
                    $KD.addCls(dom, '-voltmx-blocker');
                } else if(!$KW.interactable(this)) {
                    $KD.removeAttr(dom, 'tabindex');
                    $KD.addCls(dom, '-voltmx-blocker');
                } else {
                    tabindex = $KW.tabIndex(this, clone);
                    $KD.removeAttr(dom, 'aria-disabled');

                    if($KU.is(tabindex, 'integer')) {
                        $KD.setAttr(dom, 'tabindex', tabindex);
                    } else {
                        $KD.removeAttr(dom, 'tabindex');
                    }
                    $KD.removeCls(dom, '-voltmx-blocker');
                }
            }}
        ]}
    ]);


    //All the functions will be called in the scope of widget instance
    var _cachePinSizeAndSetupMarkers = function Map$_cachePinSizeAndSetupMarkers(imageObj, markerOptions) {
        var $K = voltmx.$kwebfw$, $KD = $K.dom, mapModel = this, img = null,
            imgName = null, anchorPosition = voltmx.map.PIN_IMG_ANCHOR_BOTTOM_CENTER,
            imgURL = _getPinImageURL(imageObj);

        if(typeof imageObj === 'object' && imageObj.anchor) {
            anchorPosition = imageObj.anchor;
        }

        markerOptions.icon = imgURL;

        if(anchorPosition === voltmx.map.PIN_IMG_ANCHOR_BOTTOM_CENTER) {
            _setMarkerOnMap.call(this, markerOptions);
        } else {
            imgName = imgURL.slice(imgURL.lastIndexOf('/') + 1);

            if(this._kwebfw_.gmapoptions.pinImageSize[imgName]) {
                _invokeAnchorMarker.call(this, markerOptions, imgURL, anchorPosition);
            } else {
                img = $KD.create('IMG', {
                    loading: 'lazy'
                });
                $KD.on(img, 'mousedown', 'image', function(e) {
                    $KD.preventDefault(e);
                });
                $KD.on(img, 'load', 'image', function() {
                    mapModel._kwebfw_.gmapoptions.pinImageSize[imgName] = {
                        height: this.naturalHeight,
                        width: this.naturalWidth
                    };
                    _invokeAnchorMarker.call(mapModel, markerOptions, imgURL, anchorPosition);
                });

                $KD._setAttr(img, 'src', imgURL);
            }
        }
    };


    //All the functions will be called in the scope of widget instance
    var _createMarkersForLocations = function Map$_createMarkersForLocations(locationdata) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        $KU.each(locationdata, function(locationitem, index) {
            var imageURL = null, markerOptions = null,
                gLatlng = new google.maps.LatLng(locationitem.lat, locationitem.lon);

            imageURL = locationitem.image || this.defaultPinImage;
            markerOptions = {
                position: gLatlng,
                html:  locationitem.desc,
                hdrdescp: locationitem.name,
                map: this._kwebfw_.gmapoptions.map,
                indexpoint: index,
                visible: true,
                pinId: (locationitem.id || 'noPinId' + index),
                coData: (locationitem.calloutData || locationitem.calloutdata),
                showcallout: (locationitem.showcallout || locationitem.showCallout)
            };

            _cachePinSizeAndSetupMarkers.call(this, imageURL, markerOptions);
        }, this);
    };


    //All the functions will be called in the scope of widget instance
    var _createInfobox = function Map$_createInfobox(infoOptions) {
        var $K = voltmx.$kwebfw$, $KW = $K.widget, $KU = $K.utils,
            _ = this._kwebfw_, calloutPostion = _.prop.calloutPostion,
            el = $KW.el(this), icon = null, iconKey =null, infobox = null,
            infobox_left = 0, infobox_top = 0, infobox_width = 0;

        if(_.prop.enableMultipleCallouts) {
            infobox = new InfoBox();
        } else {
            _pinInfoWindowCloseAll.call(this);
            infobox = _.gmapoptions.infobox;
        }

        if(_.prop.calloutWidth < 1 || _.prop.calloutWidth > 100) {
            _.prop.calloutWidth = 80;
        }

        infobox_width = (_.prop.calloutWidth * 0.01 * el.node.offsetWidth) + 'px';
        infobox_left = parseInt(infobox_width, 10) / -2;
        if(calloutPostion !== 'bottom') {
            infobox.alignBottom_ = true;
            icon = infoOptions.icon;

            if($KU.is(infoOptions.icon, 'object')) {
                icon = infoOptions.icon.url;
            }

            iconKey = icon.slice(icon.lastIndexOf('/') + 1);
            if(_.gmapoptions.pinImageSize[iconKey]) {
                infobox_top = -(_.gmapoptions.pinImageSize[iconKey].height);
            } else {
                infobox_top = -30;
            }
        }

        infobox.content_ = _getContentNode.call(this, infoOptions.coData);
        infobox.disableAutoPan_ = false;
        infobox.position_ = infoOptions.position;
        infobox.maxWidth_ = 450,
        infobox.pixelOffset_ = new google.maps.Size(infobox_left, infobox_top);
        infobox.zIndex_ = 10;
        infobox.boxStyle_ = {
            opacity: 1,
            width: infobox_width,
            background: 'none'
        };
        infobox.enableEventPropagation_ = true;
        infobox.closeBoxURL_ = '';
        infobox.infoBoxClearance_ = new google.maps.Size(0, 0);

        return infobox;
    };


    //All widget file must have this variable
    //All the functions will be called in the scope of widget instance
    var _dependentPropertiesValidationMessage = {};


    //All the functions will be called in the scope of widget instance
    var _drawCircle = function Map$_drawCircle(circledt) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, lineColor = '#FF0000', _circle = null,
            fillColor = 'white', lineWidth = 2, navigateandzoom = true,
            centerLoc = null, latValue = null, lonValue = null, radius = null;

        if(!$KU.is(circledt, 'undefined')) {
            latValue = circledt.centerLocation.lat;
            lonValue = circledt.centerLocation.lon;
            radius = circledt.radius * 10000;
            centerLoc = new google.maps.LatLng(latValue, lonValue);

            if(circledt.circleConfig) {
                lineColor = circledt.circleConfig.lineColor;
                fillColor = circledt.circleConfig.fillColor;
                lineWidth = circledt.circleConfig.lineWidth;
            }

            if(circledt.navigateAndZoom) {
                navigateandzoom = circledt.navigateAndZoom;
            }

            if(navigateandzoom) {
                this._kwebfw_.gmapoptions.map.panTo(centerLoc);
            }

            _circle = new google.maps.Circle({
                strokeColor: lineColor,
                strokeWeight: lineWidth,
                fillColor: fillColor,
                map: this._kwebfw_.gmapoptions.map,
                center: centerLoc,
                radius: radius
            });

            this._kwebfw_.gmapoptions.circleDataMap[circledt.id] = _circle;
        }
    };


    //All the functions will be called in the scope of widget instance
    var _drawPolygon = function Map$_drawPolygon(polygondt) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, polyGon = null,
            lineColor = '#FF0000', fillColor = 'white',
            lineWidth = 2, polyArrya = [];

        if(!$KU.is(polygondt, 'undefined')) {
            $KU.each(polygondt.locations, function(polydata/*, index*/) {
                polyArrya.push(new google.maps.LatLng(polydata.lat, polydata.lon));
            });

            if(polygondt.polygonConfig) {
                lineColor = polygondt.polygonConfig.lineColor;
                fillColor = polygondt.polygonConfig.fillColor;
                lineWidth = polygondt.polygonConfig.lineWidth;

                $KU.each(polygondt.polygonConfig.innerPolygons, function(innerpolydata/*, index*/) {
                    $KU.each(innerpolydata, function(innerpd/*, index*/) {
                        polyArrya.push(new google.maps.LatLng(innerpd.lat, innerpd.lon));
                    });
                });
            }
        }

        polyGon = new google.maps.Polygon({
            strokeColor: lineColor,
            strokeWeight: lineWidth,
            fillColor: fillColor
        });

        polyGon.setMap(this._kwebfw_.gmapoptions.map);
        polyGon.setPaths(polyArrya);
        this._kwebfw_.gmapoptions.polygonDataMap[polygondt.id] = polyGon;
    };


    //All the functions will be called in the scope of widget instance
    var _drawPolyline = function Map$_drawPolyline(polylinedata) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, polyLine = null,
            polyCoords = null, lineColor = '#FF0000', lineWidth = 2,
            polylineCoordinates = [], pindata = [];

        if(!$KU.is(polylinedata, 'undefined')) {
            pindata = _getPolylinePinData.call(this, polylinedata);

            if(pindata.length > 0) {
                _createMarkersForLocations.call(this, pindata);
            }

            polyCoords = polylinedata.locations;

            $KU.each(polyCoords, function(polydata/*, index*/) {
                polylineCoordinates.push(new google.maps.LatLng(polydata.lat, polydata.lon));
            });

            if(polylinedata.polygonConfig) {
                lineColor = polylinedata.polygonConfig.lineColor;
                lineWidth = polylinedata.polygonConfig.lineWidth;
            }
        }

        polyLine = new google.maps.Polyline({
            path: polylineCoordinates,
            strokeColor: lineColor,
            strokeWeight: lineWidth
        });

        polyLine.setMap(this._kwebfw_.gmapoptions.map);
        this._kwebfw_.gmapoptions.polylineDataMap[polylinedata.id] = polyLine;
    };


    //All the functions will be called in the scope of widget instance
    var _drawShapes = function Map$_drawShapes() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, _ = this._kwebfw_;

        $KU.each(_.gmapoptions.circleData, function(circleData) {
            _drawCircle.call(this, circleData);
        }, this);

        $KU.each(_.gmapoptions.polygonData, function(polygonData) {
            _drawPolygon.call(this, polygonData);
        }, this);

        $KU.each(_.gmapoptions.polylineData, function(polylineData) {
            _drawPolyline.call(this, polylineData);
        }, this);
    };


    var _getAnchorMarkerIcon = function Map$_getAnchorMarkerIcon(imgURL, anchorPosition, height, width) {
        switch(anchorPosition) {
            case voltmx.map.PIN_IMG_ANCHOR_TOP_LEFT:
                height = height + height;
                break;
            case voltmx.map.PIN_IMG_ANCHOR_TOP_RIGHT:
                height = height + height;
                width = 0;
                break;
            case voltmx.map.PIN_IMG_ANCHOR_TOP_CENTER:
                height = height + height;
                width = parseInt(width / 2, 10);
                break;
            case voltmx.map.PIN_IMG_ANCHOR_CENTER:
                height = parseInt(height / 2, 10) + height;
                width = parseInt(width / 2, 10);
                break;
            case voltmx.map.PIN_IMG_ANCHOR_BOTTOM_LEFT:
                break;
            case voltmx.map.PIN_IMG_ANCHOR_BOTTOM_RIGHT:
                width = 0;
                break;
            case voltmx.map.PIN_IMG_ANCHOR_MIDDLE_LEFT:
                height = parseInt(height / 2, 10) + height;
                break;
            case voltmx.map.PIN_IMG_ANCHOR_MIDDLE_RIGHT:
                height = parseInt(height / 2, 10) + height;
                width = 0;
                break;
            case voltmx.map.PIN_IMG_ANCHOR_BOTTOM_CENTER:
                width = parseInt(width / 2, 10);
                break;
            default : break;
        }

        return {
            url: imgURL,
            anchor: new google.maps.Point(width, height)
        };
    };


    //All the functions will be called in the scope of widget instance
    var _getContentNode = function Map$_getContentNode(mapCalloutData) {
        var $K = voltmx.$kwebfw$, $KW = $K.widget, prop = this._kwebfw_.prop,
            $KD = $K.dom, contentNode = null, tpl = null, template = null;

        tpl = mapCalloutData.template || prop.calloutTemplate;
        tpl = $KW.getTemplate(this, tpl);

        if(tpl) {
            template = $KW.cloneTemplate(tpl, mapCalloutData, prop.widgetDataMapForCallout);
            template._kwebfw_.forceLayout = true;
            contentNode = template._render();
            $KD.style(contentNode, {position:'relative'});
            template.forceLayout();
        }

        return contentNode;
    };


    var _getMapMode = function Map$_getMapMode(mode) {
        var mapMode = null;

        switch(mode) {
            case constants.MAP_VIEW_MODE_SATELLITE:
                mapMode = window.google.maps.MapTypeId.SATELLITE;
                break;

            case constants.MAP_VIEW_MODE_HYBRID:
                mapMode = window.google.maps.MapTypeId.HYBRID;
                break;

            case constants.MAP_VIEW_MODE_TERRAIN:
                mapMode = window.google.maps.MapTypeId.TERRAIN;
                break;

            case constants.MAP_VIEW_MODE_NORMAL:
            default:
                mapMode = window.google.maps.MapTypeId.ROADMAP;
        }

        return mapMode;
    };


    //All the functions will be called in the scope of widget instance
    var _getPinAndIndexFromLocationData = function Map$_getPinAndIndexFromLocationData(pinId) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, output = null,
            locDataArr = this._kwebfw_.prop.locationData;

        $KU.each(locDataArr, function(locationdata, index) {
            if(locationdata.id === pinId) {
                output = {index:index, data:locationdata};
                return true;
            }
        });

        return output;
    };


    var _getPinImageURL = function Map$_getPinImageURL(imageURL) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        if($KU.is(imageURL, 'object')) {
            imageURL = imageURL.source;
        }

        return $KU.getImageURL(imageURL);
    };


    var _getPolylinePinData = function Map$_getPolylinePinData(polylinedata) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, pindata = [],
            locationpts = ['startLocation', 'endLocation'];

        $KU.each(locationpts, function(locationpt/*, index*/) {
            var pinLocation = polylinedata[locationpt];

            if(pinLocation && !pinLocation.id) {
                pinLocation.id = polylinedata.id + '_' + locationpt;
                pindata.push(pinLocation);
            }
        });

        return pindata;
    };


    //All widget file must have this variable
    //All the functions will be called in the scope of widget instance
    var _getter = {
        Map: {
            locationData: function Map$_getter_locationData(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils;

                return $KU.clone(value);
            }
        }
    };


    var _initializeInfoBox = function Map$_initializeInfoBox() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils,
            $KG = $K.globals, src = null,
            gmapoptions = this._kwebfw_.gmapoptions;

        if($KU.is(window.InfoBox, 'undefined')) {
            src = $KG.platform+'/jslib/tparty/googlemaps/infobox.js';
            $KU.loadScript(src, false, function() {
                gmapoptions.infobox = new InfoBox();
            });
        }
    };


    var _invokeAnchorMarker = function Map$_invokeAnchorMarker(markerOptions, imgURL, anchorPosition) {
        var height = null, width = null, imgName = null;

        if(anchorPosition !== voltmx.map.PIN_IMG_ANCHOR_BOTTOM_CENTER) {
            imgName = imgURL.slice(imgURL.lastIndexOf('/') + 1);
            height = this._kwebfw_.gmapoptions.pinImageSize[imgName].height;
            width = this._kwebfw_.gmapoptions.pinImageSize[imgName].width;
            markerOptions.icon = _getAnchorMarkerIcon(imgURL, anchorPosition, height, width);
            _setMarkerOnMap.call(this, markerOptions);
        }
    };


    //All the functions will be called in the scope of widget instance
    var _loadMapScripts = function Map$_loadMapScripts() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, $KD = $K.dom,
            script = null, src = '', clientId = null, mapKey = null;

        if(!_scriptsRequested
        && ($KU.is(window.google, 'undefined')
        || $KU.is(window.google.maps, 'undefined'))) {
            mapKey = this.mapKey;
            clientId = this.mapClientId;
            _scriptsRequested = true;

            src = '';
            src += '//maps-api-ssl.google.com/maps/api/js?callback=voltmx.$kwebfw$.ui.Map.onLoad';
            src += (mapKey) ? ('&key=' + mapKey) : ('&client=' + clientId);

            script = $KD.create('script', {'type':'text/javascript', 'src':src});
            $KD.add($KD.body(), script);
        } else {
            window.google && $K.ui.Map.onLoad();
        }
    };


    //All the functions will be called in the scope of widget instance
    var _mapBoundsChangeHandler = function Map$_mapBoundsChangeHandler() {
        var $K = voltmx.$kwebfw$, $KW = $K.widget,
            bounds = null, boundsval = null;

        if(this.onBoundsChanged) {
            bounds = this._kwebfw_.gmapoptions.map.getBounds();
            boundsval = {
                center: [bounds.getCenter().lat(), bounds.getCenter().lng()],
                northEast: [bounds.getNorthEast().lat(), bounds.getNorthEast().lng()],
                southWest: [bounds.getSouthWest().lat(), bounds.getSouthWest().lng()],
                latspan: bounds.toSpan().lat(),
                lonspan: bounds.toSpan().lng()
            };

            $KW.fire(this, 'onBoundsChanged', this, boundsval);
        }
    };


    //All the functions will be called in the scope of widget instance
    var _mapClickEventHandler = function Map$_mapClickEventHandler(event) {
        var $K = voltmx.$kwebfw$, $KW = $K.widget,
            lat = null, lng = null, latLng = null;

        if(this._kwebfw_.prop.onClick) {
            lat = event.latLng && event.latLng.lat();
            lng = event.latLng && event.latLng.lng();
            latLng = {lat:lat, lon:lng};

            $KW.fire(this, 'onClick', this, {latLng:latLng});
        }

        event.preventDefault && event.preventDefault();
        event.stopPropagation && event.stopPropagation();
    };


    //All the functions will be called in the scope of widget instance
    var _markerClickListener = function Map$_markerClickListener(markerOptions) {
        var mapModel = this;

        return function() {
            var $K = voltmx.$kwebfw$, $KW = $K.widget, $KD = $K.dom,
                $KU = $K.utils, infowindow = null, infobox = null,
                b = null, br = null, div = null, _ = mapModel._kwebfw_;

            if(!this.eventFromNavigateTo) {
                $KW.fire(mapModel, 'onPinClick', mapModel, {locationData: _.prop.locationData[this.indexpoint]});
                //$KAR && $KAR.sendRecording(mapModel, 'clickOnPin', {locationData: _.prop.locationData[this.indexpoint], eventType: 'uiAction'});
            }

            _pinInfoWindowClose.call(mapModel, this.pinId);

            if($KU.is(this.showcallout, 'undefined') || this.showcallout) {
                if(!$KU.is(this.coData, 'undefined')) {
                    if($KW.visible(mapModel)) {
                        infobox = _createInfobox.call(mapModel, markerOptions);
                        infobox.open(this.map, this);
                        _.gmapoptions.pinInfowindow[this.pinId] = infobox;
                    }
                } else {
                    infowindow = new google.maps.InfoWindow({
                        content: 'holding...'
                    });

                    div = $KD.create('DIV', {'kwh-click': 'InfoWindow', kwf: mapModel._kwebfw_.uid, mappointno: this.indexpoint});
                    b = $KD.create('B', {mappointno: this.indexpoint});
                    $KD.text(b, this.hdrdescp);
                    br = $KD.create('BR');
                    $KD.add(div, b);
                    $KD.add(div, br);
                    $KD.add(div, document.createTextNode(this.html));
                    infowindow.setContent(div);
                    infowindow.open(this.map, this);

                    if(mapModel.autoCenterPinOnClick) {
                        this.map.setCenter(this.getPosition());
                    }

                    _.gmapoptions.pinInfowindow[this.pinId] = infowindow;
                }
            }

            this.eventFromNavigateTo = false;
        };
    };


    //All the functions will be called in the scope of widget instance
    var _navigateTo = function Map$_navigateTo() {
        var _ = this._kwebfw_, mapdata = this.locationData, centrallon = 0,
            centrallat = 0, index = _.gmapoptions.navigateToArgs.index,
            marker = _.gmapoptions.markers[index];

        if(mapdata[index]) {
            centrallat = mapdata[index].lat;
            centrallon = mapdata[index].lon;
            if(mapdata[index].lat === undefined) {
                centrallat = mapdata[index][0];
                centrallon = mapdata[index][1];
            }
        }

        _.gmapoptions.map.setCenter(new google.maps.LatLng(centrallat, centrallon));

        if(_.gmapoptions.navigateToArgs.showCallout) {
            marker.eventFromNavigateTo = true;
            marker && google.maps.event.trigger(marker, 'click');
        }
        _.gmapoptions.navigateToArgs = null;
    };


    //All the functions will be called in the scope of widget instance
    var _navigateToLocation = function() {
        var marker = null, _= this._kwebfw_, lat = null, lon = null,
            desc = null, name = null, imageURL = null, urlt = '', position = null,
            navArgs = _.gmapoptions.navigateToLocationArgs, markerOptions = null,
            data = navArgs.navLocationData;

        lat = (data.lat) ? data.lat : data[0];
        lon = (data.lon) ? data.lon : data[1];
        desc = (data.lat === undefined) ? data[3] : data.desc;
        name = (data.lat === undefined) ? data[2] : data.name;
        imageURL = (data.lat === undefined) ? data[4] : (data.image || this.defaultPinImage);

        position = new google.maps.LatLng(lat, lon);
        _.gmapoptions.map.setCenter(position);
        _.gmapoptions.navigateToLocationData = data;

        markerOptions = {
            position: position,
            html: desc,
            icon: _getPinImageURL(imageURL),
            hdrdescp: name,
            visible: navArgs.dropPin,
            map: _.gmapoptions.map,
            indexpoint: 'navLoc',
            pinId: 'navPinId',
            coData: (data.calloutData || data.calloutdata),
            showcallout: navArgs.showCallout
        };

        _cachePinSizeAndSetupMarkers.call(this, urlt, markerOptions);

        if(navArgs.showCallout && navArgs.dropPin) {
            marker = _.gmapoptions.pinMarkers[markerOptions.pinId];
            marker.eventFromNavigateTo = true;
            marker && google.maps.event.trigger(marker, 'click');
        }

        _.gmapoptions.navigateToLocationArgs = null;
    };


    //All the functions will be called in the scope of widget instance
    var _onMapLoadedHandler = function Map$_onMapLoadedHandler() {
        var $K = voltmx.$kwebfw$, $KW = $K.widget;

        if(!this._kwebfw_.gmapoptions.loadedFlag) {
            this._kwebfw_.gmapoptions.loadedFlag = true;

            if(this.onMapLoaded) {
                $KW.fire(this, 'onMapLoaded', this);
            }
        }

        new google.maps.event.removeListener(this._kwebfw_.gmapoptions.tilesLoadedEventListener);
    };


    //All the functions will be called in the scope of widget instance
    var _pinInfoWindowClose = function Map$_pinInfoWindowClose(pinId) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils,
            infowindow = this._kwebfw_.gmapoptions.pinInfowindow[pinId];

        if(!$KU.is(infowindow, 'undefined')) {
            infowindow.close();
            delete this._kwebfw_.gmapoptions.pinInfowindow[pinId];
        }
    };


    //All the functions will be called in the scope of widget instance
    var _pinInfoWindowCloseAll = function Map$_pinInfoWindowCloseAll() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        $KU.each(this._kwebfw_.gmapoptions.pinInfowindow, function(pinData, pinId) {
            _pinInfoWindowClose.call(this, pinId);
        }, this);
    };


    //All widget file must have this variable
    //This functions will be called in the scope of widget instance
    var _populateUnderscore = {
        Map: function Map$_populateUnderscore() {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, _ = null,
                gmapoptionsVal = {
                    circleData: {},
                    circleDataMap: {},
                    infobox:  null,
                    map: '',
                    markers: [],
                    pinInfowindow: {},
                    pinImageSize: {},
                    pinMarkers: {},
                    polygonData: {},
                    polygonDataMap: {},
                    polylineData: {},
                    polylineDataMap: {},
                    tilesLoadedEventListener: '',
                    polygonModePath: null,
                    navigateToLocationData: null
                };

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
                    $KU.defineProperty(_, 'ns', 'voltmx.ui.Map', null);
                }
            }
            if(!_.name) {
                if($KU.is(this.__$kwebfw$name__, 'string') && this.__$kwebfw$name__) {
                    $KU.defineProperty(_, 'name', this.__$kwebfw$name__, null);
                } else {
                    $KU.defineProperty(_, 'name', 'Map', null);
                }
            }

            if(!_.gmapoptions) $KU.defineProperty(_, 'gmapoptions', gmapoptionsVal, null);
            //This holds the templateControllers used in this Map
            if(!_.templates) $KU.defineProperty(_, 'templates', {}, null);
        }
    };


    //All widget file must have this variable
    //This function will be called in the scope of widget instance
    var _postInitialization = {};


    //All widget file must have this variable
    //This functions will be called in the scope of widget instance
    var _relayoutActiveTriggerer = {
        Map: function Map$_relayoutActiveTriggerer() {
            return [];
        }
    };


    //All widget file must have this variable
    //This functions will be called in the scope of widget instance
    var _relayoutPassiveTriggerer = {
        Map: function Map$_relayoutPassiveTriggerer() {
            return [];
        }
    };


    //This functions will be called in the scope of widget instance
    var _removeShape = function Map$_removeShape(shapeType, shapeId) {
        var _ = this._kwebfw_;

        if(_.gmapoptions[shapeType+'DataMap'][shapeId]) {
            _.gmapoptions[shapeType+'DataMap'][shapeId].setMap(null);
            delete _.gmapoptions[shapeType+'DataMap'][shapeId];
            delete _.gmapoptions[shapeType+'Data'][shapeId];
        }
    };


    //All the functions will be called in the scope of widget instance
    var _setMarkerOnMap = function Map$_setMarkerOnMap(markerOptions) {
        var marker = null, gmapoptions = this._kwebfw_.gmapoptions;

        if(gmapoptions.pinMarkers[markerOptions.pinId]) {
            marker = gmapoptions.pinMarkers[markerOptions.pinId];
            marker.setMap(null);
        }

        marker = new google.maps.Marker(markerOptions);
        gmapoptions.markers.push(marker);
        new google.maps.event.addListener(marker, 'click', _markerClickListener.call(this, markerOptions));
        if(markerOptions.visible) {
            marker.setMap(markerOptions.map);
        }
        gmapoptions.pinMarkers[markerOptions.pinId] = marker;
    };


    //All the functions will be called in the scope of widget instance
    var _setPins = function Map$_setPins(mapData) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, pinIdsArr = [],
            locDataArr = this._kwebfw_.prop.locationData;

        $KU.each(locDataArr, function(locationdata/*, index*/) {
            pinIdsArr.push(locationdata.id);
        });

        $KU.each(mapData, function(locationdata/*, index*/) {
            if(pinIdsArr.indexOf(locationdata.id) === -1) {
                locDataArr.push(locationdata);
            }
        });
        _setUpInteractiveCanvasMap.call(this);
    };


    //All widget file must have this variable
    //All the functions will be called in the scope of widget instance
    var _setter = {
        Map: {
            //
        }
    };


    /**
     * One liner description about what this function/method is for.
     *
     * @access      private
     * @method      setUpInteractiveCanvasMap
     * @memberof    voltmx.ui.Map
     * @author      Shanker Pulugam <shanker.pulugam@voltmx.com>
     *
     * @param       None
     *
     * @fires       Once Google map scripts loaded or New locationData is set.
     *
     * @throws      None
     *
     * @returns     None
     *
     * @desc        A brief description about the class.
     *              -
     *              -
     *
     * @todo        None
     *              -
     *              -
     */
    var _setUpInteractiveCanvasMap = function Map$_setUpInteractiveCanvasMap() {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, _ = this._kwebfw_, prop = _.prop,
            map = null, mapdata = null, mapOptions = null,
            points = [], bermudaTriangle = null, geocoder = null;

        if($KU.is(window.google, 'undefined')
        || $KU.is(window.google.maps, 'undefined')) {
            _.gmapoptions.loadedFlag = false;
            return;
        }

        mapdata = prop.locationData;
        mapOptions= {
            zoom: prop.zoomLevel,
            disableDefaultUI: true,
            zoomControl: prop.showZoomControl,
            navigationControl: true,
            mapTypeControl: this.displaymaptypecontrols,
            scaleControl: true,
            mapTypeId: _getMapMode(prop.mode)
        };

        $KU.each(this._kwebfw_.gmapoptions.markers, function(marker/*, index*/) {
            marker.setMap(null);
        });

        this._kwebfw_.gmapoptions.markers = [];
        this._kwebfw_.gmapoptions.pinMarkers = {};

        if(_.gmapoptions.map) {
            map = _.gmapoptions.map;
        } else {
            map = new google.maps.Map(_.view, mapOptions);
            _.gmapoptions.map = map;
        }

        if(mapdata.length > 0) {
            mapOptions.center = new google.maps.LatLng(mapdata[0].lat, mapdata[0].lon);
            map.setOptions(mapOptions);

            if(prop.mode !== constants.MAP_VIEW_MODE_POLYGON) {
                _createMarkersForLocations.call(this, mapdata);
            } else {
                $KU.each(mapdata, function(mdata/*, index*/) {
                    var polyPoint = null;

                    if(mdata.lat === undefined) {
                        polyPoint = new google.maps.LatLng(mdata[0], mdata[0]);
                    } else {
                        polyPoint = new google.maps.LatLng(mdata.lat, mdata.lon);
                    }
                    points.push(polyPoint);
                });

                bermudaTriangle = new google.maps.Polygon({
                    paths: points,
                    strokeColor: '#FF0000',
                    strokeOpacity: 0.8,
                    strokeWeight: 3,
                    fillColor: '#FF0000',
                    fillOpacity: 0.35
                });
                bermudaTriangle.setMap(map);
                _.gmapoptions.polygonModePath = bermudaTriangle;
            }
        } else if(prop.address && prop.address.location) {
            geocoder = new google.maps.Geocoder();
            geocoder.geocode({
                'address': prop.address.location
            }, function(results, status) {
                if(status === google.maps.GeocoderStatus.OK) {
                    map.setCenter(results[0].geometry.location);
                    new google.maps.Marker({
                        map: map,
                        position: results[0].geometry.location
                    });
                }
            });
        } else {
            map.setCenter(new google.maps.LatLng(0, 0));
        }

        if(_.gmapoptions.navigateToArgs) {
            _navigateTo.call(this);
        }

        if(_.gmapoptions.navigateToLocationArgs) {
            _navigateToLocation.call(this);
        }

        new google.maps.event.addListener(map, 'zoom_changed', function() {
            _.prop.zoomLevel = map.getZoom();
        });
        new google.maps.event.addListener(map, 'click', _mapClickEventHandler.bind(this));
        new google.maps.event.addListener(map, 'bounds_changed', _mapBoundsChangeHandler.bind(this));
        _.gmapoptions.tilesLoadedEventListener = new google.maps.event.addListener(map, 'tilesloaded', _onMapLoadedHandler.bind(this));
        _drawShapes.call(this);
    };


    //All widget file must have this variable
    //All the functions will be called in the scope of widget instance
    //These function should always return a boolean value
    var _valid = {
        Map: {
            address: function Map$_valid_address(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'object')) {
                    flag = true;
                }

                return flag;
            },

            autoCenterPinOnClick: function Map$_valid_autoCenterPinOnClick(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'boolean')) {
                    flag = true;
                }

                return flag;
            },

            calloutPostion: function Map$_valid_calloutPostion(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'string')) {
                    flag = true;
                }

                return flag;
            },

            calloutTemplate: function Map$_valid_calloutTemplate(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'object') || $KU.is(value, 'string')) {
                    flag = true;
                }

                return flag;
            },

            calloutWidth: function Map$_valid_calloutWidth(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'number')) {
                    flag = true;
                }

                return flag;
            },

            defaultPinImage: function Map$_valid_defaultPinImage(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'string') || $KU.is(value, 'object')) {
                    flag = true;
                }

                return flag;
            },

            displayMapTypeControls: function Map$_valid_displayMapTypeControls(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'boolean')) {
                    flag = true;
                }

                return flag;
            },

            enableMultipleCallouts: function Map$_valid_enableMultipleCallouts(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'boolean')) {
                    flag = true;
                }

                return flag;
            },

            locationData: function Map$_valid_locationData(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'array')) {
                    flag = true;
                }

                return flag;
            },

            mapKey: function Map$_valid_mapKey(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'string')) {
                    flag = true;
                }

                return flag;
            },

            mapClientId: function Map$_valid_mapClientId(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'string')) {
                    flag = true;
                }

                return flag;
            },

            mapSource: function Map$_valid_mapSource(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'string')) {
                    flag = true;
                }

                return flag;
            },

            mode: function Map$_valid_mode(value) {
                var flag = false, options = [
                    constants.MAP_VIEW_MODE_HYBRID,
                    constants.MAP_VIEW_MODE_NORMAL,
                    constants.MAP_VIEW_MODE_SATELLITE,
                    constants.MAP_VIEW_MODE_POLYGON,
                    constants.MAP_VIEW_MODE_TERRAIN
                ];

                if(options.indexOf(value) >= 0) {
                    flag = true;
                }

                return flag;
            },

            navControlsImageConfig: function Map$_valid_navControlsImageConfig(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'object')) {
                    flag = true;
                }

                return flag;
            },

            onBoundsChanged: function Map$_valid_onBoundsChanged(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'function')) {
                    flag = true;
                }

                return flag;
            },

            onMapLoaded: function Map$_valid_onMapLoaded(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'function')) {
                    flag = true;
                }

                return flag;
            },

            onPinClick: function Map$_valid_onPinClick(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'function')) {
                    flag = true;
                }

                return flag;
            },

            onSelection: function Map$_valid_onSelection(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'function')) {
                    flag = true;
                }

                return flag;
            },

            provider: function Map$_valid_provider(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'string')) {
                    flag = true;
                }

                return flag;
            },

            showZoomControl: function Map$_valid_showZoomControl(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'boolean')) {
                    flag = true;
                }

                return flag;
            },

            widgetDataMapForCallout: function Map$_valid_widgetDataMapForCallout(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'object')) {
                    flag = true;
                }

                return flag;
            },

            zoomLevel: function Map$_valid_zoomLevel(value) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, flag = false;

                if($KU.is(value, 'number')) {
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
        Map: {
            address: function Map$_view_locationData(/*el, old*/) {
                _setUpInteractiveCanvasMap.call(this);
            },

            autoCenterPinOnClick: true,

            calloutPostion: true,

            calloutTemplate:  true,

            calloutWidth: true,

            defaultPinImage: function Map$_view_defaultPinImage(/*el, old*/) {
                _setUpInteractiveCanvasMap.call(this);
            },

            displayMapTypeControls: true,

            enableMultipleCallouts: true,

            locationData: function Map$_view_locationData(/*el, old*/) {
                _setUpInteractiveCanvasMap.call(this);
            },

            mapKey: true,

            mapClientId: false,

            mapSource: false,

            mode: function Map$_view_mode(/*el,*/ old) {
                var _ = this._kwebfw_, mapMode = null;

                if(_.gmapoptions.polygonModePath) {
                    _.gmapoptions.polygonModePath.setMap(null);
                    _.gmapoptions.polygonModePath = null;
                }

                if(_.gmapoptions.loadedFlag) {
                    if(old === constants.MAP_VIEW_MODE_POLYGON
                    || _.prop.mode === constants.MAP_VIEW_MODE_POLYGON) {
                        _setUpInteractiveCanvasMap.call(this);
                    } else {
                        mapMode = _getMapMode(_.prop.mode);
                        _.gmapoptions.map.setMapTypeId(mapMode);
                    }
                }
            },

            navControlsImageConfig: true,

            onBoundsChanged: true,

            onMapLoaded: true,

            onPinClick: true,

            onSelection: true,

            provider: false,

            showZoomControl: function Map$_view_showZoomControl(/*el, old*/) {
                var _ = this._kwebfw_;

                if(_.gmapoptions.loadedFlag) {
                    _.gmapoptions.map.setOptions({zoomControl: _.prop.showZoomControl});
                }
            },

            widgetDataMapForCallout: true,

            zoomLevel: function Map$_view_zoomLevel(/*el, old*/) {
                var _ = this._kwebfw_;

                if(_.gmapoptions.loadedFlag) _.gmapoptions.map.setZoom(_.prop.zoomLevel);
            }
        }
    };


    Object.defineProperty(voltmx.ui, 'Map', {configurable:false, enumerable:false, writable:false, value:(function() {
        var $K = voltmx.$kwebfw$;


        /**
         * voltmx.ui.Map constructor.
         *
         * @class
         * @namespace   voltmx.ui
         * @extends     voltmx.ui.BasicWidget
         * @author      Shanker Pulugam <shanker.pulugam@voltmx.com>
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
         * @todo        None
         *              -
         *              -
         */
        var Map = function Map(bconfig, lconfig, pspconfig) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, self = this,
                dependentPropertiesValidationMessage = '', prop = null, p = null;

            if(!$KU.is(bconfig, 'object')) bconfig = {};

            if(!bconfig.isPreValidated) {
                prop = {
                    address: {},
                    autoCenterPinOnClick: false,
                    calloutPostion: 'top',
                    calloutTemplate: '',
                    calloutWidth: 80,
                    defaultPinImage: 'pinb.png',
                    displayMapTypeControls: true,
                    enableMultipleCallouts: false,
                    locationData: [],
                    mapKey: '',
                    mapClientId: '',
                    mapSource: '',
                    mode: constants.MAP_VIEW_MODE_NORMAL,
                    navControlsImageConfig: '',
                    onBoundsChanged: '',
                    onMapLoaded: '',
                    onPinClick: '',
                    onSelection: '',
                    provider: constants.MAP_PROVIDER_GOOGLE,
                    showZoomControl: true,
                    widgetDataMapForCallout: '',
                    zoomLevel: 15
                };
            }

            _populateUnderscore.Map.call(this);

            if(!$KU.is(bconfig.id, 'string') || !bconfig.id) {
                bconfig.id = (this._kwebfw_.name+$KU.uid());
            }

            Map.base.call(this, bconfig, lconfig, pspconfig);

            if(!bconfig.isPreValidated) {
                if($KU.is(_dependentPropertiesValidationMessage.Map, 'function')) {
                    dependentPropertiesValidationMessage = _dependentPropertiesValidationMessage.Map.call(this, prop, bconfig, lconfig, pspconfig);
                }
            }

            if(dependentPropertiesValidationMessage) {
                throw new Error(dependentPropertiesValidationMessage);
            } else {
                if(!bconfig.isPreValidated) {
                    //Defaulting to platfom values specific to Map
                    $KU.each(prop, function(value, key) {
                        var $K = voltmx.$kwebfw$, $KU = $K.utils,
                            $KW = $K.widget, valid = false, message = '';

                        if(!Object.prototype.hasOwnProperty.call(bconfig, key)) {
                            bconfig[key] = value;
                        } else if($KW.getNonConstructorProperties(self._kwebfw_.name).indexOf(key) >= 0) {
                            throw new Error('<' + key + '> is a non-constructor property of <' + self._kwebfw_.ns + '> class.');
                        } else if(!$KU.is(_valid.Map[key], 'function')) {
                            throw new Error('<' + key + '> is available in default widget properties of <voltmx.ui.Map>, but not in <_valid.Map> namespace.');
                        } else {
                            valid = _valid.Map[key].call(self, bconfig[key]);
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

                //Defining Getters/Setters specific to Map
                $KU.each(_view.Map, function(value, key) {
                    var $K = voltmx.$kwebfw$, $KU = $K.utils;

                    $KU.defineProperty(self._kwebfw_.prop, key, bconfig[key], {configurable:false, enumerable:true, writable:true});

                    $KU.defineGetter(self, key, function Map$_getter() {
                        var $K = voltmx.$kwebfw$, $KU = $K.utils;

                        if($KU.is(_getter.Map[key], 'function')) {
                            return _getter.Map[key].call(this, this._kwebfw_.prop[key]);
                        }
                        return this._kwebfw_.prop[key];
                    }, true);

                    $KU.defineSetter(self, key, function Map$_setter(val) {
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
                                valid = _valid.Map[key].call(this, val);
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

                                    if($KU.is(_setter.Map[key], 'function')) {
                                        _setter.Map[key].call(this, old);
                                    }

                                    if(_relayoutActiveTriggerer.Map().indexOf(key) >= 0) {
                                        $KW.markRelayout(this);
                                    }

                                    if(_relayoutPassiveTriggerer.Map().indexOf(key) >= 0) {
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

                if(bconfig.isPreValidated) {
                    p = this._kwebfw_.prop;

                    if($KU.is(p.navControlsImageConfig, undefined)) p.navControlsImageConfig = '';
                    if($KU.is(p.onBoundsChanged, undefined)) p.onBoundsChanged = '';
                    if($KU.is(p.onMapLoaded, undefined)) p.onMapLoaded = '';
                    if($KU.is(p.onPinClick, undefined)) p.onPinClick = '';
                    if($KU.is(p.onSelection, undefined)) p.onSelection = '';
                    if($KU.is(p.widgetDataMapForCallout, undefined)) p.widgetDataMapForCallout = '';
                    if($KU.is(p.address, undefined)) p.address = {};
                }

                if($KU.is(_postInitialization.Map, 'function')) {
                    _postInitialization.Map.call(this);
                }
            }

            pspconfig = lconfig = bconfig = null; //For GC
        };


        $K.utils.inherits(Map, voltmx.ui.BasicWidget);

        /**
         * Resets markers and  pinMarker to empty for voltmx.ui.Map widget.
         *
         * @override
         * @access      protected
         * @method      _flush
         * @memberof    voltmx.ui.Map
         * @author      Shanker Pulugam <shanker.pulugam@voltmx.com>
         *
         * @returns     void
         */
        var map__flush = function Map$_flush(/*tag*/) {
            var $super = voltmx.ui.Map.base.prototype,
                $K = voltmx.$kwebfw$, $KU = $K.utils;

            $KU.each(this._kwebfw_.gmapoptions.markers, function(marker/*, index*/) {
                marker.setMap(null);
            }, this);

            this._kwebfw_.gmapoptions.markers = [];
            this._kwebfw_.gmapoptions.pinMarkers = {};
            this._kwebfw_.gmapoptions.map = null;

            $super._flush.call(this);
        };


        /**
         * Builds the view layer for voltmx.ui.Map widget.
         *
         * @override
         * @access      protected
         * @method      _render
         * @memberof    voltmx.ui.Map
         * @author      Shanker Pulugam <shanker.pulugam@voltmx.com>
         *
         * @returns     {HTMLElement} – Map view.
         */
        var map__render = function Map$_render(tag) {
            var $super = voltmx.ui.Map.base.prototype, _ = this._kwebfw_, el = null,
                $K = voltmx.$kwebfw$, $KW = $K.widget, $KD = $K.dom, view = _.view;

            if(this.isVisible || $K.F.RIVW) {
                if(!view) {
                    view = $super._render.call(this, tag);
                    el = $KW.el(view);
                    $KD.setAttr(el.node, 'kwh-click', 'onMapClick');

                    _loadMapScripts.call(this);
                }

                $KW.accessibility(this);
                _.gmapoptions.loadedFlag = false;
            }

            return view;
        };


        var map_dismissCallout = function Map$dismissCallout(location) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, pinId = null,
                ginfobox = this._kwebfw_.gmapoptions.infobox;

            if(!this._kwebfw_.prop.enableMultipleCallouts) {
                /*if(!$KU.is(infobox, 'null')) infobox.close();*/
                if(!$KU.is(ginfobox, 'null')) ginfobox.close();
            } else if(location) {
                if(location instanceof Array) {
                    pinId = location[0].id;
                } else {
                    pinId = location.id;
                }
                _pinInfoWindowClose.call(this, pinId);
            }
        };


        var map_addPin = function Map$addPin(pindata) {
            _setPins.call(this, [pindata]);
        };


        var map_addPins = function Map$addPins(pindataArr) {
            _setPins.call(this, pindataArr);
        };


        var map_updatePin = function Map$updatePin(pindata) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, existingPindata = null,
                existingPindataObj = _getPinAndIndexFromLocationData.call(this, pindata.id);

            if(!$KU.is(existingPindataObj, 'null')) {
                existingPindata = existingPindataObj.data;
                map_removePin.call(this, pindata, false);
                $KU.each(pindata, function(value, key) {
                    existingPindata[key] = value;
                });
                this._kwebfw_.prop.locationData[existingPindataObj.index] = existingPindata;
                _createMarkersForLocations.call(this, [existingPindata]);
            }
        };


        var map_updatePins = function Map$updatePins(pindataArr) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils;

            $KU.each(pindataArr, function(pindata/*, index*/) {
                map_updatePin.call(this, pindata);
            }, this);
        };


        var map_removePin = function Map$removePin(pindata, delLocDataFlag) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, existingPindataObj = null,
                marker = this._kwebfw_.gmapoptions.pinMarkers[pindata.id];

            if(!$KU.is(marker, 'undefined')) {
                marker.setMap(null);
                delLocDataFlag = ($KU.is(delLocDataFlag, 'undefined')) ? true : delLocDataFlag;
                if(delLocDataFlag) {
                    existingPindataObj = _getPinAndIndexFromLocationData.call(this, pindata.id);
                    if(!$KU.is(existingPindataObj, 'null')) {
                        this._kwebfw_.prop.locationData.splice(existingPindataObj.index, 1);
                    }
                }
                delete this._kwebfw_.gmapoptions.pinMarkers[pindata.id];
            }
        };


        var map_removePins = function Map$removePins(pindataArr) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils;

            $KU.each(pindataArr, function(pindata/*, index*/) {
                map_removePin.call(this, pindata, true);
            }, this);
        };


        var map_addPolygon = function Map$addPolygon(polydata) {
            map_removePolygon.call(this, polydata.id);
            this._kwebfw_.gmapoptions.polygonData[polydata.id] = polydata;
            _drawPolygon.call(this, polydata);
        };


        var map_addCircle = function Map$addCircle(circledata) {
            map_removeCircle.call(this, circledata.id);
            this._kwebfw_.gmapoptions.circleData[circledata.id] = circledata;
            _drawCircle.call(this, circledata);
        };


        var map_addPolyline = function Map$addPolyline(polylinedata) {
            if(this._kwebfw_.gmapoptions.polylineData[polylinedata.id]) {
                map_removePolyline.call(this, polylinedata.id);
            }
            this._kwebfw_.gmapoptions.polylineData[polylinedata.id] = polylinedata;
            _drawPolyline.call(this, polylinedata);
        };


        var map_removePolygon = function Map$removePolygon(polygonID) {
            _removeShape.call(this, 'polygon', polygonID);
        };


        var map_removeCircle = function Map$removeCircle(circleID) {
            _removeShape.call(this, 'circle', circleID);
        };


        var map_removePolyline = function Map$removePolyline(polylineID) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils, pindata = [],
                polylinedata = this._kwebfw_.gmapoptions.polylineData[polylineID];

            if(!$KU.is(polylinedata, 'undefined')) {
                pindata = _getPolylinePinData.call(this, polylinedata);
                if(pindata.length > 0) {
                    _createMarkersForLocations.call(this, pindata);
                }
                if(pindata.length > 0) {
                    map_removePins.call(this, pindata, false);
                }
                _removeShape.call(this, 'polyline', polylineID);
            }
        };


        var map_setCalloutVisibility = function Map$setCalloutVisibility(visibilityFlag, pindataArr) {
            var $K = voltmx.$kwebfw$, $KU = $K.utils;

            if(!this._kwebfw_.prop.enableMultipleCallouts)
                return;

            $KU.each(pindataArr, function(pindata/*, index*/) {
                var marker = null;

                if(visibilityFlag) {
                    marker = this._kwebfw_.gmapoptions.pinMarkers[pindata.id];
                    marker && google.maps.event.trigger(marker, 'click');
                } else {
                    _pinInfoWindowClose.call(this, pindata.id);
                }
            }, this);
        };


        var map_clear = function Map$clear() {
            var $K = voltmx.$kwebfw$, $KU = $K.utils;

            $KU.each(this._kwebfw_.gmapoptions.circleDataMap, function(circleData, circleId) {
                map_removeCircle.call(this, circleId);
            }, this);
            $KU.each(this._kwebfw_.gmapoptions.polygonDataMap, function(polygonData, polygonId) {
                map_removePolygon.call(this, polygonId);
            }, this);
            $KU.each(this._kwebfw_.gmapoptions.polylineDataMap, function(polylinenData, polylineId) {
                map_removePolyline.call(this, polylineId);
            }, this);

            $KU.each(this._kwebfw_.gmapoptions.markers, function(marker/*, index*/) {
                marker.setMap(null);
            });

            _pinInfoWindowCloseAll.call(this);

            this._kwebfw_.gmapoptions.markers = [];
            this._kwebfw_.gmapoptions.pinMarkers = {};
            this._kwebfw_.prop.locationData = [];
        };


        var map_navigateTo = function Map$navigateTo(index, showcallout) {
            var $K = voltmx.$kwebfw$, $KW = $K.widget,
                mapdata = this._kwebfw_.prop.locationData;

            index = parseInt(index);

            if(index < 1 || index >= mapdata.length) {
                return;
            }

            if(!this._kwebfw_.gmapoptions.navigateToArgs) {
                this._kwebfw_.gmapoptions.navigateToArgs = {
                    'index': index,
                    'showCallout': showcallout
                };
            }

            if($KW.visible(this)) _navigateTo.call(this);
        };


        var map_navigateToLocation = function Map$navigateToLocation(locationData, showcallout, dropPin) {
            var $K = voltmx.$kwebfw$, $KW = $K.widget, _ = this._kwebfw_;

            if(!_.gmapoptions.navigateToLocationArgs) {
                _.gmapoptions.navigateToLocationArgs = {
                    'navLocationData': locationData,
                    'showCallout': showcallout,
                    'dropPin': dropPin
                };
            }

            if($KW.visible(this)) _navigateToLocation.call(this);
        };


        $K.defVoltmxProp(Map.prototype, [
            {keey:'_flush', value:map__flush},
            {keey:'_render', value:map__render},
            {keey:'addCircle', value:map_addCircle},
            {keey:'addPin', value:map_addPin},
            {keey:'addPins', value:map_addPins},
            {keey:'addPolygon', value:map_addPolygon},
            {keey:'addPolyline', value:map_addPolyline},
            {keey:'clear', value:map_clear},
            {keey:'dismissCallout', value:map_dismissCallout},
            {keey:'navigateTo', value:map_navigateTo},
            {keey:'navigateToLocation', value:map_navigateToLocation},
            {keey:'removeCircle', value:map_removeCircle},
            {keey:'removePin', value:map_removePin},
            {keey:'removePins', value:map_removePins},
            {keey:'removePolygon', value:map_removePolygon},
            {keey:'removePolyline', value:map_removePolyline},
            {keey:'setCalloutVisibility', value:map_setCalloutVisibility},
            {keey:'updatePin', value:map_updatePin},
            {keey:'updatePins', value:map_updatePins}
        ]);

        return Map;
    }())});
}());
