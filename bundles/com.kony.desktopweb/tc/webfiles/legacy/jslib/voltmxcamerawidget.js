$KW.Camera = (function() {

    var module = {

        initialize: function() {
            voltmx.events.addEvent("click", "Camera", this.eventHandler);
        },

        updateView: function(widgetModel, propertyName, propertyValue, oldPropertyValue) {
           var element = $KU.getNodeByModel(widgetModel);
           if(!element)
               return;
           element = element.firstElementChild;
           switch(propertyName) {
                case "poster":
                    element.setAttribute("poster", $KU.getImageURL(propertyValue));
                    break;
            }
        },

        render: function(widgetModel, context) {
            var computedSkin = $KW.skins.getWidgetSkinList(widgetModel, context);
            var posterImage = widgetModel.poster || "cameraicon.png" ;
            var PosterUrlImage = $KU.getImageURL(posterImage);
            var htmlString = "";
            htmlString = "<div " + $KW.Utils.getBaseHtml(widgetModel, context) + " kwidgettype = 'KCamera'  class= '" + computedSkin + "'>";
            htmlString += "<video autoplay playsinline poster = '" + PosterUrlImage + "' style='height:100%;width:100%' ></video>";
            htmlString += "<canvas style = 'display:none;' </canvas></div>";
            return htmlString;
        },

        isCameraVisible: function(widgetModel) {
            var pModel = null;
            if(!widgetModel.isvisible) {
                return false;
            }
            pModel = widgetModel.parent;
            while(pModel) {
                if (!pModel.isvisible) {
                    return false;
                }
                pModel = pModel.parent;
            }
            return true;
        },

        openCamera: function(widgetModel) {
            if(!module.isCameraVisible(widgetModel))
                return;
            var widgetNode = $KU.getNodeByModel(widgetModel);
            var constraints, feedSource;
            if(!widgetNode)
                return;
            widgetNode = widgetNode.firstElementChild;
            if(widgetModel.cameraSource === constants.CAMERA_SOURCE_REAR) {
                feedSource = "environment";
                constraints = { video: { facingMode: { exact: feedSource } }, audio: false }
            } else {
                feedSource = "user";
                if((voltmx.appinit.isChrome && voltmx.os.deviceInfo().userAgent.includes('Macintosh')) || voltmx.appinit.isFirefox) {
                    constraints = { video: { facingMode:  feedSource  }, audio: false }
                } else {
                    constraints = { video: { facingMode: { exact:  feedSource }  }, audio: false };
                }
            }
            if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
                    widgetNode.srcObject = stream;
                    widgetNode.play();
                }).catch(function(err) {
                    voltmx.web.logger("error", "Error: " + err);
                    var onFailEventRef = $KU.returnEventReference(widgetModel.onFailure);
                    if(err.name === "NotAllowedError") {
                        onFailEventRef && $KU.executeWidgetEventHandler(widgetModel, onFailEventRef, constants.CAMERA_PERMISSION_DENIED)
                    } else {
                        if(widgetModel.cameraSource === constants.CAMERA_SOURCE_REAR) {
                            onFailEventRef && $KU.executeWidgetEventHandler(widgetModel, onFailEventRef, constants.CAMERA_SOURCE_REAR_UNAVAILABLE);
                        } else {
                            onFailEventRef && $KU.executeWidgetEventHandler(widgetModel, onFailEventRef, constants.CAMERA_SOURCE_FRONT_UNAVAILABLE);
                        }
                    }
                });
            } else {
                var onFailEventRef = $KU.returnEventReference(widgetModel.onFailure);
                onFailEventRef && $KU.executeWidgetEventHandler(widgetModel, onFailEventRef, constants.CAMERA_NOT_SUPPORTED);
            }
        },

        closeCamera: function(widgetModel) {
            if(!module.isCameraVisible(widgetModel))
                return;
            var widgetNode = $KU.getNodeByModel(widgetModel);
            if(!widgetNode)
                return;
            widgetNode = widgetNode.firstElementChild;
            var tracks = [], i;
            if(widgetNode.srcObject) {
                tracks = widgetNode.srcObject.getTracks();
                for(i = 0; i < tracks.length; i++) {
                    tracks[i].stop();
                }
                widgetNode.srcObject = null;
            }
        },

        takePicture: function(widgetModel) {
            var scale = $KU.dpi;
            if(!module.isCameraVisible(widgetModel))
                return;
            var widgetNode = $KU.getNodeByModel(widgetModel);
            if(!widgetNode)
                return;
            widgetNode = widgetNode.firstElementChild;
            if(widgetModel.isvisible && widgetNode.srcObject) {
                var imageCanvas = $KU.getNodeByModel(widgetModel).lastElementChild;
                imageCanvas.height = widgetModel.frame.height * scale;
                imageCanvas.width = widgetModel.frame.width * scale;
                var context = imageCanvas.getContext('2d');
                context.scale(scale, scale);
                try {
                    context.drawImage(widgetNode , 0, 0, widgetModel.frame.height, widgetModel.frame.width);
                    widgetModel.base64 = imageCanvas.toDataURL();
                    widgetModel.rawBytes = imageCanvas.toDataURL().split(",")[1];
                    if(widgetModel.base64 && widgetModel.rawBytes){
                        var onCaptureEventRef = $KU.returnEventReference(widgetModel.oncapture);
                        onCaptureEventRef && $KU.executeWidgetEventHandler(widgetModel, onCaptureEventRef);
                    }
                } catch(err) {
                    var onCaptureFailEventRef = $KU.returnEventReference(widgetModel.oncapturefailure);
                    onCaptureFailEventRef && $KU.executeWidgetEventHandler(widgetModel, onCaptureFailEventRef);
                    var onFailEventRef = $KU.returnEventReference(widgetModel.onfailure);
                    onFailEventRef && $KU.executeWidgetEventHandler(widgetModel, onFailEventRef, constants.CAMERA_CAPTURE_FAILED);
                }
            }
        },

        startVideoCapture: function(widgetModel, config) {
            if(!module.isCameraVisible(widgetModel))
                return;
            var widgetNode = $KU.getNodeByModel(widgetModel);
            var constraints, feedSource, tracks = [], i;
            if(!widgetNode)
                return;
            widgetNode = widgetNode.firstElementChild;
            if(!widgetNode.srcObject)
                return;
            if(widgetModel.cameraSource === constants.CAMERA_SOURCE_REAR) {
                var feedSource = "environment";
                constraints = { video: { facingMode: { exact: feedSource } }, audio:true };
            } else {
                var feedSource = "user";
                if((voltmx.appinit.isChrome && voltmx.os.deviceInfo().userAgent.includes('Macintosh')) || voltmx.appinit.isFirefox) {
                    constraints = { video: { facingMode:  feedSource  }, audio:true }
                } else {
                    constraints = { video: { facingMode: { exact:  feedSource }  }, audio:true };
                }
            }
            if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
                    widgetModel.videoData = [];
                    widgetModel.Recorder = new MediaRecorder(stream);
                    widgetModel.Recorder.start();
                    voltmx.web.logger("log", widgetModel.Recorder.state);
                    if(widgetModel.videoDuration && config.callback) {
                        setTimeout(function() {
                            if(widgetModel.Recorder.state === "recording") {
                                widgetModel.Recorder.stop();
                                tracks = widgetModel.Recorder.stream.getTracks();
                                for(i = 0; i < tracks.length; i++) {
                                    tracks[i].stop();
                                }
                                $KW.Camera.dataAvailableCreateBlob(widgetModel, config.callback);
                            } else {
                                var onFailEventRef = $KU.returnEventReference(widgetModel.onFailure);
                                onFailEventRef && $KU.executeWidgetEventHandler(widgetModel, onFailEventRef, constants.CAMERA_VIDEO_RECORDING_FAILED);
                            }
                        }, widgetModel.videoDuration*1000);
                    }
                }).catch(function(err) {
                    voltmx.web.logger("error", "Error: " + err);
                    var onFailEventRef = $KU.returnEventReference(widgetModel.onFailure);
                    onFailEventRef && $KU.executeWidgetEventHandler(widgetModel, onFailEventRef, constants.CAMERA_VIDEO_RECORDING_FAILED);
                });
            } else {
                var onFailEventRef = $KU.returnEventReference(widgetModel.onFailure);
                onFailEventRef && $KU.executeWidgetEventHandler(widgetModel, onFailEventRef, constants.CAMERA_NOT_SUPPORTED);
            }
        },

        dataAvailableCreateBlob: function(widgetModel, callback) {
            widgetModel.Recorder.ondataavailable = function(e) {
                widgetModel.videoData.push(e.data);
                if(widgetModel.Recorder.state === "inactive") {
                    widgetModel.blob = new Blob(widgetModel.videoData, { type:'video/mp4' });
                    widgetModel.videoUrl = URL.createObjectURL(widgetModel.blob);
                    var configCallback = $KU.returnEventReference(callback);
                    configCallback && $KU.executeWidgetEventHandler(widgetModel, configCallback, widgetModel.videoUrl);
                }
            }
        },

        stopVideoCapture: function(widgetModel, config) {
            if(!module.isCameraVisible(widgetModel))
                return;
            var tracks = [], i;
            if(widgetModel.isvisible && config.callback && widgetModel.Recorder && widgetModel.Recorder.state === "recording") {
                widgetModel.Recorder.stop();
                tracks = widgetModel.Recorder.stream.getTracks();
                for(i = 0; i < tracks.length; i++) {
                    tracks[i].stop();
                }
                $KW.Camera.dataAvailableCreateBlob(widgetModel, config.callback);
            } else {
                var onFailEventRef = $KU.returnEventReference(widgetModel.onFailure);
                onFailEventRef && $KU.executeWidgetEventHandler(widgetModel, onFailEventRef, constants.CAMERA_VIDEO_RECORDING_FAILED);
            }
        },

        eventHandler: function(eventObject, target) {
            var widgetModel = $KU.getModelByNode(target);
            if(!target.firstElementChild.srcObject)
                $KW.Camera.openCamera(widgetModel);
        }
    }
    return module;

}());
