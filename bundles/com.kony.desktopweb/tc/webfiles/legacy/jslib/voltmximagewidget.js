
$KW.Image = (function() {
    
    

    var module = {
        initialize: function() {
            voltmx.events.addEvent("click", "Image", this.eventHandler);
            voltmx.events.addEvent("onorientationchange", "Image", this.imgOrientationHandler);
        },

        imgOrientationHandler: function() {
            var widgetNode = arguments[0] ? $KU.getNodeByModel(arguments[0]) : document;
            var editImages = widgetNode && widgetNode.querySelectorAll("img[kwidgettype='Image']");
            if(editImages) {
                for(var i = 0; i < editImages.length; i++) {
                    var editImage = editImages[i];
                    module.imgResizeHandler(editImage, "orientationchange");
                }
            }
        },

        
        updateView: function(widgetModel, propertyName, propertyValue, oldPropertyValue) {
            var element = $KU.getNodeByModel(widgetModel), imageParent, scrollerNode;

            $KW.Utils.updateMasterData({
                "widgetModel": widgetModel,
                'widgetNode': element,
                'propertyName': propertyName
            });

            switch(propertyName) {
                case "src":

                    
                    widgetModel.srcType = 1;
                    if(!element)
                        return;
                    if(propertyValue == oldPropertyValue)
                        return;
                    var context = new $KW.WidgetGenerationContext(widgetModel.pf);
                    if(widgetModel.containerId) {
                        context.container = {"id":widgetModel.containerId};
                    }
                    element.parentNode.parentNode.innerHTML = this.render(widgetModel, context);

                    
                    if(widgetModel.touches) {
                        element = $KU.getNodeByModel(widgetModel);
                        var touchtypes = ["touchstart", "touchmove", "touchend"];
                        for(var i =0; i < touchtypes.length; i++) {
                            var eventtype = touchtypes[i];
                            if(widgetModel.touches[eventtype]){
                                $KW.Utils.removetouch(widgetModel, eventtype, false);
                                $KW.Utils.updateModelWithTouches(widgetModel, eventtype, widgetModel.touches[eventtype].callback);
                                widgetModel.touches[eventtype]["instance"] = new $KW.touch.TouchEvents(widgetModel, element.parentNode, eventtype,  widgetModel.touches[eventtype].callback);
                            }
                        }
                    }
                    break;

                case "base64":
                    widgetModel.srcType = 2;
                    
                    if(element && propertyValue) {
                        element.src = this.getBase64String(propertyValue);
                    }
                    break;
                
                case "rawBytes":
                    widgetModel.srcType = 3;
                    if (element && propertyValue) {
                        element.src = this.getBase64String(propertyValue);
                    }
                    break;

                case "referenceheight":
                case "referencewidth":
                case "imagescalemode":
                    element && (element.parentNode.parentNode.innerHTML = this.render(widgetModel, new $KW.WidgetGenerationContext(widgetModel.pf)));
                    $KW.FlexContainer.attachDragEvent(widgetModel);
                    break;

            }
        },

        
        render: function(imageModel, context) {
            var computedSkin = $KW.skins.getSplitSkinsBetweenWidgetAndParentDiv(imageModel, context);
            var htmlString = "";
            var style = "";
            imageModel.loaded = false;
            var isFlexWidget = $KW.FlexUtils.isFlexWidget(imageModel);
            var imgId = imageModel.pf + "_" + imageModel.id;
            var kmasterObj = $KW.Utils.getMasterIDObj(imageModel);
            if(kmasterObj.id != "") {
                imgId = kmasterObj.id;
            }

            if(context.scrollBoxID)
                imageModel.scrollBoxID = context.scrollBoxID;

            var isWaitAllowed = true;
            if($KU.inArray($KU.imgCache, imageModel.src, true))
                isWaitAllowed = false;
            
            if(isWaitAllowed && imageModel.imagewhiledownloading)
                new Image().src = $KU.getImageURL(imageModel.imagewhiledownloading);

            imageModel.imagewhiledownloading = imageModel.imagewhiledownloading || $KG["imagewhiledownloading"] || "imgload.gif";
            var css = $KW.skins.getVisibilitySkin(imageModel) + (isFlexWidget ? " middlecenteralign" : "");
            var useWidgetSize = '';

            if(context.ispercent === false) {
                useWidgetSize = context.layoutDir ? "float:" + context.layoutDir : "";
            } else {
                useWidgetSize = "width:100%";
            }

            if(imageModel.srcType == 2)
                imgsrc = this.getBase64String(imageModel.base64);
            else
                imgsrc = $KU.getImageURL(imageModel.src)

            var onimgonload = "$KU.imgLoadHandler(arguments[0],this)";


            var dimensions = this.getImageDimensions(imageModel, context.ispercent);

            style += (dimensions.width != undefined ? ("width:" + dimensions.width + "px;") : "") + (dimensions.height != undefined ? ("height:" + dimensions.height + "px;") : "") + (isFlexWidget ? "font-size:0px;display:block;" : "");

            onimgonload = dimensions.onimgonload || onimgonload;
            if(dimensions.maxwidth) {
                style = dimensions.maxwidth;
            }


            htmlString += "<span id='" + imgId + "_span' class='" + css + " " + computedSkin[0] + "' style='display:inline-block;" + (isWaitAllowed && imageModel.src ? "background:url(" + $KU.getImageURL(imageModel.imagewhiledownloading) + ") center center no-repeat;" : ";") + useWidgetSize + ";" + style + (isFlexWidget? 'height: 100%' : '') + "' " + kmasterObj.kmasterid + " >";

            
            style += $KW.skins.getBlurStyle(imageModel);

            htmlString += "<img class='" + "' src='" + imgsrc + "'" + $KW.Utils.getBaseHtml(imageModel, context) + "onload= " + onimgonload + " onerror='$KU.imgLoadHandler(arguments[0],this)' ";

            if(!(imageModel.name == "voltmx.ui.Image2" || imageModel.name == "voltmxLua.Image2") && imageModel.scalemode == "maintainaspectratio") {
                style = "width:100%;";
            } else if(imageModel.scalemode == "retaininitialimagedimensions") {
                style = "";
            }

            if(isWaitAllowed && imageModel.src) {
                style += "opacity:0;";
            }
            style += "visibility:hidden;";
            var downloadComplete = imageModel.ondownloadcomplete || "";
            if(downloadComplete) {
                downloadComplete = (typeof(downloadComplete) == 'function') ? $KU.getFunctionName(imageModel.ondownloadcomplete) : imageModel.ondownloadcomplete;
                downloadComplete = " ondownloadcomplete= '" + downloadComplete + "'";
            }
            htmlString += "style= '" + style + "'" + downloadComplete + "/></span>";


            return htmlString;
        },

        getImageDimensions: function(imageModel, contextIsPercent) {
            var dimensions = {}; 
            if(imageModel.imagescalemode == constants.IMAGE_SCALE_MODE_FIT_TO_DIMENSIONS) 
            {
                var isFlexWidget = $KW.FlexUtils.isFlexWidget(imageModel);
                if(!isFlexWidget) {
                    if(imageModel.referencewidth) {
                        if(contextIsPercent == false)
                            dimensions.width = imageModel.referencewidth;
                        else
                            dimensions.width = (((screen.width * (imageModel.containerweight / 100)) > imageModel.referencewidth) ? imageModel.referencewidth : (screen.width * (imageModel.containerweight / 100)));

                        dimensions.height = imageModel.referenceheight;
                    } else
                        dimensions.maxwidth = "max-width:100%;";
                }
            } else if((imageModel.name == "voltmx.ui.Image2" || imageModel.name == "voltmxLua.Image2") && imageModel.imagescalemode == constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO) 
            {
                imageModel.ispercent = contextIsPercent;
                dimensions.onimgonload = "$KW.Image.imgLoadHandler2(arguments[0])";
            } else if(!imageModel.referencewidth && imageModel.heightwidth && imageModel.imagescalemode != constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO) {
                var dim = (imageModel.heightwidth).split(",");
                dimensions.width = dim[1];
                dimensions.height = dim[0];
            } else {
                dimensions.maxwidth = "max-width:100%;";
            }
            return dimensions;
        },

        getBase64String: function (propertyValue) {
            if (propertyValue.includes('data:image/png;base64')) {
                return propertyValue;
            } else {
                return "data:image/png;base64," + propertyValue;
            }
        },

        eventHandler: function(eventObject, target) {
            var imgWidgetModel = $KU.getModelByNode(target),
                containerId = target.getAttribute("kcontainerID");
            

            $KAR && $KAR.sendRecording(imgWidgetModel, 'click', {'target': target, 'eventType': 'uiAction'});
            if(containerId) {
                $KW.Utils.updateContainerData(imgWidgetModel, target, true);
            } else {
                var executed = voltmx.events.executeBoxEvent(imgWidgetModel);
                var tabId = target.getAttribute("ktabid");
                if(!executed && tabId) {
                    $KW.TabPane && $KW.TabPane.executeTabEvent(imgWidgetModel, target, true);
                }
            }
        },

        imgLoadHandler2: function(event) {
            event = event || window.event;
            img = event.target || event.srcElement;
            if(!img.parentNode || (img.parentNode && !img.parentNode.parentNode)) return;
            this.imgResizeHandler(img, event.type);
        },

        imgResizeHandler: function(img, eventType) {
            if(!document.body.contains(img)) {
                return;
            }
            var tabPaneID = img.getAttribute("ktabpaneid");
            var type = img.getAttribute("kwidgettype");

            var targetWidgetID = (type == 'Image') ? $KU.getElementID(img.getAttribute("id")) : img.getAttribute("id");
            var src = img.src;
            var imageModel = $KU.getModelByNode(img);
            if(img.getAttribute("kcontainerID")) {
                imageModel = $KW.Utils.getClonedModelByContainer(imageModel, img, img.getAttribute("kcontainerID"));
            }

            var actimgdim = module.getNaturalDimensions(img);

            if(eventType == "load") {
                var isWaitAllowed = true;
                if($KU.inArray($KU.imgCache, imageModel.src, true))
                    isWaitAllowed = false;
                else
                    $KU.imgCache.push(imageModel.src);
                
                if(isWaitAllowed || img.parentNode.style.background.indexOf("url") != -1) {
                    var span = img.parentNode;
                    if(span) {
                        if(span.style.removeProperty)
                            span.style.removeProperty("background");
                        else
                            span.style.background = "none";
                    }
                    if($KU.isiPhone || voltmx.appinit.isSafari) {
                        setTimeout(function(){
                            img.style[$KU.transition] = "";
                        },500);
                    }
                    img.style[$KU.transition] = "opacity 500ms ease-in-out";
                    img.style.opacity = 1;
                }
            }

            
            imageModel.loaded = true;
            if(imageModel.animInfo) {
                var info = imageModel.animInfo;
                info.instance.animate(imageModel, info.animConfig, info.animCallback);
            }

            
            if(!img.parentNode || (!actimgdim.width || !actimgdim.height)) return;

            var ondownloadcompleteref = $KU.returnEventReference(imageModel.ondownloadcomplete);
            if(ondownloadcompleteref) {
                $KU.executeWidgetEventHandler(imageModel, ondownloadcompleteref, src, true);
            }

            var imgwidth = img.parentNode.parentNode.offsetWidth;
            if(imageModel.containerWeight >= 0 && imgwidth == 0)
                imgwidth = actimgdim.width;

            var isFlexWidget = $KW.FlexUtils.isFlexWidget(imageModel);
            
            if(!isFlexWidget) {
                var dimensions = []; 
                dimensions = module.imgDimCalculation(imageModel, actimgdim, imgwidth);
                img.style.width = img.parentNode.style.width = dimensions[1] + "px";
                img.style.height = img.parentNode.style.height = dimensions[0] + "px";
            }
            img.style.display = "";
            img.style.visibility = "visible";
            img.parentNode.parentNode.style["font-size"] = "0px";

            $KU.onImageLoadComplete(imageModel, img);
        },

        getNaturalDimensions: function(img) {
            var actimgdim = {};
            if(typeof img.naturalWidth == "undefined") { 
                var i = new Image();
                i.src = img.src;
                actimgdim.width = i.width;
                actimgdim.height = i.height;
            } else {
                actimgdim.width = img.naturalWidth;
                actimgdim.height = img.naturalHeight;
            }
            return actimgdim;
        },

        imgDimCalculation: function(imageModel, actimgdim, imgwidth) {
            var dimensions = [];
            var aspectRatio = (actimgdim.width / actimgdim.height);
            if(!imageModel.referencewidth) {
                if(imageModel.ispercent === false) {
                    dimensions[1] = actimgdim.width;
                    dimensions[0] = actimgdim.height;
                } else {
                    if(actimgdim.width <= imgwidth) {
                        if(imageModel.referenceheight && actimgdim.height > imageModel.referenceheight) {
                            dimensions[0] = imageModel.referenceheight;
                            dimensions[1] = dimensions[0] * aspectRatio;
                        } else {
                            dimensions[1] = actimgdim.width;
                            dimensions[0] = actimgdim.height;
                        }
                    } else {
                        dimensions[1] = imgwidth;
                        if(!imageModel.referenceheight)
                            dimensions[0] = dimensions[1] / aspectRatio;
                        else {
                            dimensions[0] = dimensions[1] / aspectRatio;
                            if(dimensions[0] > imageModel.referenceheight) {
                                dimensions[0] = imageModel.referenceheight;
                                dimensions[1] = dimensions[0] * aspectRatio;
                            }
                        }
                    }

                }
            } else {
                if(imageModel.ispercent === false) {
                    if(actimgdim.width < imageModel.referencewidth) {
                        dimensions[1] = actimgdim.width;
                        dimensions[0] = actimgdim.height;
                    } else {
                        dimensions[1] = imageModel.referencewidth;
                        dimensions[0] = dimensions[1] / aspectRatio;
                    }

                } else {
                    var computedimgwidth = (imageModel.referencewidth <= imgwidth) ? imageModel.referencewidth : imgwidth;
                    if(!imageModel.referenceheight) {
                        if(actimgdim.width < computedimgwidth) {
                            dimensions[0] = actimgdim.height;
                            dimensions[1] = actimgdim.width;
                        } else {
                            dimensions[1] = computedimgwidth;
                            dimensions[0] = dimensions[1] / aspectRatio;
                        }
                    } else {
                        var checkDim = (actimgdim.width < computedimgwidth) ? (actimgdim.height < imageModel.referenceheight ? true : false) : false;
                        if(!checkDim) {
                            dimensions[1] = (((imgwidth) > imageModel.referencewidth) ? imageModel.referencewidth : (imgwidth));
                            dimensions[0] = imageModel.referenceheight;
                            var imgdim = (dimensions[1] / aspectRatio) < dimensions[0] ? (dimensions[1] / aspectRatio) : false;
                            if(imgdim === false)
                                dimensions[1] = (dimensions[0] * aspectRatio <= imageModel.referencewidth) ? dimensions[0] * aspectRatio : false;
                            else
                                dimensions[0] = imgdim;
                        } else {
                            dimensions[0] = actimgdim.height;
                            dimensions[1] = actimgdim.width;
                        }
                    }
                }
            }

            if(dimensions[1] > 0 && dimensions[1] < 1)
                dimensions[1] = 1;

            if(dimensions[0] > 0 && dimensions[0] < 1)
                dimensions[0] = 1;

            if(document.getElementsByTagName('body')[0].getAttribute("formWidth") != null) {
                $KW.Form.adjustBodyWidth();
            }
            return dimensions;
        },

        setBase64Img: function(widgetModel) {
            if(widgetModel.src && !widgetModel.src.startsWith("http")) { 
                var req = new XMLHttpRequest();
                req.onreadystatechange = function() {
                    if(req.readyState == 4 && req.status == 200) {
                        widgetModel.base64 = $KU.getBase64(req.responseText) || null;
                    }
                }
                req.open('GET', $KU.getImageURL(widgetModel.src), true);
                if(req.overrideMimeType)
                    req.overrideMimeType('text/plain; charset=x-user-defined');
                req.send(null);
            } else
                widgetModel.base64 = null;
        },

    };


    return module;
}());
