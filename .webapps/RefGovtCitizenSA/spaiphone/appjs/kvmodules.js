define('applicationController',{
    appInit: function(params) {
        skinsInit();
        voltmx.mvc.registry.add("com.hclacademy.categories", {
            "viewName": "categories",
            "controllerName": "categoriesController",
            "appName": "RefCommonsMA"
        });
        voltmx.application.registerMaster({
            "namespace": "com.hclacademy",
            "classname": "categories",
            "name": "com.hclacademy.categories"
        });
        voltmx.mvc.registry.add("com.hclacademy.custombuttonwithimageandtext", {
            "viewName": "custombuttonwithimageandtext",
            "controllerName": "custombuttonwithimageandtextController",
            "appName": "RefCommonsMA"
        });
        voltmx.application.registerMaster({
            "namespace": "com.hclacademy",
            "classname": "custombuttonwithimageandtext",
            "name": "com.hclacademy.custombuttonwithimageandtext"
        });
        voltmx.mvc.registry.add("com.hclacademy.formheader", {
            "viewName": "formheader",
            "controllerName": "formheaderController",
            "appName": "RefCommonsMA"
        });
        voltmx.application.registerMaster({
            "namespace": "com.hclacademy",
            "classname": "formheader",
            "name": "com.hclacademy.formheader"
        });
        voltmx.mvc.registry.add("com.hclacademy.hamburgermenu", {
            "viewName": "hamburgermenu",
            "controllerName": "hamburgermenuController",
            "appName": "RefCommonsMA"
        });
        voltmx.application.registerMaster({
            "namespace": "com.hclacademy",
            "classname": "hamburgermenu",
            "name": "com.hclacademy.hamburgermenu"
        });
        voltmx.mvc.registry.add("com.hclacademy.infoalert", {
            "viewName": "infoalert",
            "controllerName": "infoalertController",
            "appName": "RefCommonsMA"
        });
        voltmx.application.registerMaster({
            "namespace": "com.hclacademy",
            "classname": "infoalert",
            "name": "com.hclacademy.infoalert"
        });
        voltmx.mvc.registry.add("com.hclacademy.newsarticles", {
            "viewName": "newsarticles",
            "controllerName": "newsarticlesController",
            "appName": "RefCommonsMA"
        });
        voltmx.application.registerMaster({
            "namespace": "com.hclacademy",
            "classname": "newsarticles",
            "name": "com.hclacademy.newsarticles"
        });
        voltmx.mvc.registry.add("com.hclacademy.userinput", {
            "viewName": "userinput",
            "controllerName": "userinputController",
            "appName": "RefCommonsMA"
        });
        voltmx.application.registerMaster({
            "namespace": "com.hclacademy",
            "classname": "userinput",
            "name": "com.hclacademy.userinput"
        });
        voltmx.mvc.registry.add("com.hclacademy.createcomplaintorrequest", {
            "viewName": "createcomplaintorrequest",
            "controllerName": "createcomplaintorrequestController",
            "appName": "RefCommonsMA"
        });
        voltmx.application.registerMaster({
            "namespace": "com.hclacademy",
            "classname": "createcomplaintorrequest",
            "name": "com.hclacademy.createcomplaintorrequest"
        });
        voltmx.mvc.registry.add("flxMapWeatherCallout", {
            "viewName": "flxMapWeatherCallout",
            "controllerName": "flxMapWeatherCalloutController",
            "appName": "RefCommonsMA"
        });
        voltmx.mvc.registry.add("flxSampleRowTemplate", {
            "viewName": "flxSampleRowTemplate",
            "controllerName": "flxSampleRowTemplateController",
            "appName": "RefCommonsMA"
        });
        voltmx.mvc.registry.add("flxSectionHeaderTemplate", {
            "viewName": "flxSectionHeaderTemplate",
            "controllerName": "flxSectionHeaderTemplateController",
            "appName": "RefCommonsMA"
        });
        voltmx.mvc.registry.add("flxSegCategories", {
            "viewName": "flxSegCategories",
            "controllerName": "flxSegCategoriesController",
            "appName": "RefCommonsMA"
        });
        voltmx.mvc.registry.add("flxSegRowRecord", {
            "viewName": "flxSegRowRecord",
            "controllerName": "flxSegRowRecordController",
            "appName": "RefCommonsMA"
        });
        voltmx.mvc.registry.add("flxSegRowWithImageAndLabel", {
            "viewName": "flxSegRowWithImageAndLabel",
            "controllerName": "flxSegRowWithImageAndLabelController",
            "appName": "RefCommonsMA"
        });
        voltmx.mvc.registry.add("flxSegWithImageAndLabel", {
            "viewName": "flxSegWithImageAndLabel",
            "controllerName": "flxSegWithImageAndLabelController",
            "appName": "RefCommonsMA"
        });
        voltmx.mvc.registry.add("flxSampleRowTemplate", {
            "viewName": "flxSampleRowTemplate",
            "controllerName": "flxSampleRowTemplateController",
            "appName": "RefEComplaintsMA"
        });
        voltmx.mvc.registry.add("flxSectionHeaderTemplate", {
            "viewName": "flxSectionHeaderTemplate",
            "controllerName": "flxSectionHeaderTemplateController",
            "appName": "RefEComplaintsMA"
        });
        voltmx.mvc.registry.add("flxSampleRowTemplate", {
            "viewName": "flxSampleRowTemplate",
            "controllerName": "flxSampleRowTemplateController",
            "appName": "RefERequestsMA"
        });
        voltmx.mvc.registry.add("flxSectionHeaderTemplate", {
            "viewName": "flxSectionHeaderTemplate",
            "controllerName": "flxSectionHeaderTemplateController",
            "appName": "RefERequestsMA"
        });
        voltmx.mvc.registry.add("flxSampleRowTemplate", {
            "viewName": "flxSampleRowTemplate",
            "controllerName": "flxSampleRowTemplateController",
            "appName": "RefGovtCitizenSA"
        });
        voltmx.mvc.registry.add("flxSectionHeaderTemplate", {
            "viewName": "flxSectionHeaderTemplate",
            "controllerName": "flxSectionHeaderTemplateController",
            "appName": "RefGovtCitizenSA"
        });
        voltmx.mvc.registry.add("Form1", {
            "viewName": "Form1",
            "controllerName": "Form1Controller",
            "appName": "RefCommonsMA"
        });
        voltmx.mvc.registry.add("frmEComplaintCategories", {
            "viewName": "frmEComplaintCategories",
            "controllerName": "frmEComplaintCategoriesController",
            "appName": "RefEComplaintsMA"
        });
        voltmx.mvc.registry.add("frmEComplaintsCreate", {
            "viewName": "frmEComplaintsCreate",
            "controllerName": "frmEComplaintsCreateController",
            "appName": "RefEComplaintsMA"
        });
        voltmx.mvc.registry.add("frmEComplaintsDashboard", {
            "viewName": "frmEComplaintsDashboard",
            "controllerName": "frmEComplaintsDashboardController",
            "appName": "RefEComplaintsMA"
        });
        voltmx.mvc.registry.add("frmEComplaintsFetch", {
            "viewName": "frmEComplaintsFetch",
            "controllerName": "frmEComplaintsFetchController",
            "appName": "RefEComplaintsMA"
        });
        voltmx.mvc.registry.add("frmERequestsCategories", {
            "viewName": "frmERequestsCategories",
            "controllerName": "frmERequestsCategoriesController",
            "appName": "RefERequestsMA"
        });
        voltmx.mvc.registry.add("frmERequestsCreate", {
            "viewName": "frmERequestsCreate",
            "controllerName": "frmERequestsCreateController",
            "appName": "RefERequestsMA"
        });
        voltmx.mvc.registry.add("frmERequestsDashboard", {
            "viewName": "frmERequestsDashboard",
            "controllerName": "frmERequestsDashboardController",
            "appName": "RefERequestsMA"
        });
        voltmx.mvc.registry.add("frmERequestsFetch", {
            "viewName": "frmERequestsFetch",
            "controllerName": "frmERequestsFetchController",
            "appName": "RefERequestsMA"
        });
        voltmx.mvc.registry.add("frmDashboard", {
            "viewName": "frmDashboard",
            "controllerName": "frmDashboardController",
            "appName": "RefGovtCitizenSA"
        });
        voltmx.mvc.registry.add("frmInterstitial", {
            "viewName": "frmInterstitial",
            "controllerName": "frmInterstitialController",
            "appName": "RefGovtCitizenSA"
        });
        voltmx.mvc.registry.add("frmLogin", {
            "viewName": "frmLogin",
            "controllerName": "frmLoginController",
            "appName": "RefGovtCitizenSA"
        });
        voltmx.mvc.registry.add("frmUserPreferences", {
            "viewName": "frmUserPreferences",
            "controllerName": "frmUserPreferencesController",
            "appName": "RefGovtCitizenSA"
        });
        voltmx.mvc.registry.add("frmUserProfile", {
            "viewName": "frmUserProfile",
            "controllerName": "frmUserProfileController",
            "appName": "RefGovtCitizenSA"
        });
        voltmx.mvc.registry.add("frmWeather", {
            "viewName": "frmWeather",
            "controllerName": "frmWeatherController",
            "appName": "RefGovtCitizenSA"
        });
        setAppBehaviors();
        if (typeof startBackgroundWorker != "undefined") {
            startBackgroundWorker();
        }
    },
    postAppInitCallBack: function(eventObj) {},
    appmenuseq: function() {
        new voltmx.mvc.Navigation({
            "friendlyName": "frmLogin",
            "appName": "RefGovtCitizenSA"
        }).navigate();
    }
});
define("com/hclacademy/categories/usercategoriesController", [],function() {
    return {};
});
define("com/hclacademy/categories/categoriesControllerActions", {
    /* 
    This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
});
define("com/hclacademy/categories/categoriesController", ["com/hclacademy/categories/usercategoriesController", "com/hclacademy/categories/categoriesControllerActions"], function() {
    var controller = require("com/hclacademy/categories/usercategoriesController");
    var actions = require("com/hclacademy/categories/categoriesControllerActions");
    for (var key in actions) {
        controller[key] = actions[key];
    }
    return controller;
});

define('com/hclacademy/categories/categories',[],function() {
    return function(controller) {
        var categories = new voltmx.ui.FlexContainer(extendConfig({
            "autogrowMode": voltmx.flex.AUTOGROW_NONE,
            "clipBounds": false,
            "isMaster": true,
            "height": "100%",
            "id": "categories",
            "isVisible": true,
            "layoutType": voltmx.flex.FREE_FORM,
            "left": "0dp",
            "isModalContainer": false,
            "skin": "slFbox",
            "top": "0dp",
            "width": "100%",
            "zIndex": 1,
            "appName": "RefCommonsMA"
        }, controller.args[0], "categories"), extendConfig({
            "paddingInPixel": false
        }, controller.args[1], "categories"), extendConfig({}, controller.args[2], "categories"));
        categories.setDefaultUnit(voltmx.flex.DP);
        var segCategories = new voltmx.ui.SegmentedUI2(extendConfig({
            "autogrowMode": voltmx.flex.AUTOGROW_NONE,
            "data": [{
                "lblCategory": "Category"
            }, {
                "lblCategory": "Category"
            }, {
                "lblCategory": "Category"
            }, {
                "lblCategory": "Category"
            }, {
                "lblCategory": "Category"
            }, {
                "lblCategory": "Category"
            }, {
                "lblCategory": "Category"
            }, {
                "lblCategory": "Category"
            }, {
                "lblCategory": "Category"
            }, {
                "lblCategory": "Category"
            }],
            "groupCells": false,
            "height": "100%",
            "id": "segCategories",
            "isVisible": true,
            "left": "0dp",
            "needPageIndicator": true,
            "pageOffDotImage": "pageoffdot.png",
            "pageOnDotImage": "pageondot.png",
            "retainSelection": false,
            "rowFocusSkin": "seg2Focus",
            "rowSkin": "sknSegTransparent",
            "rowTemplate": kony.mvc.resolveNameFromContext({
                "appName": "RefCommonsMA",
                "friendlyName": "flxSegCategories"
            }),
            "scrollingEvents": {},
            "sectionHeaderSkin": "sliPhoneSegmentHeader",
            "selectionBehavior": constants.SEGUI_DEFAULT_BEHAVIOR,
            "separatorColor": "aaaaaa00",
            "separatorRequired": true,
            "separatorThickness": 1,
            "showScrollbars": false,
            "top": "0dp",
            "viewType": constants.SEGUI_VIEW_TYPE_TABLEVIEW,
            "widgetDataMap": {
                "flxSegCategories": "flxSegCategories",
                "lblCategory": "lblCategory"
            },
            "width": "100%",
            "zIndex": 1,
            "appName": "RefCommonsMA"
        }, controller.args[0], "segCategories"), extendConfig({
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, controller.args[1], "segCategories"), extendConfig({}, controller.args[2], "segCategories"));
        categories.add(segCategories);
        return categories;
    }
});
define("com/hclacademy/createcomplaintorrequest/usercreatecomplaintorrequestController", [],function() {
    return {
        /**
         * This object represents a new complaint 
         **/
        complaintOrRequestObject: {
            "CategoryID": "",
            "Name": "",
            "Phone": "",
            "Location": "",
            "Description": "",
            "Photo": "",
            "Status": "",
            "CreatedBy": "",
            "AssignedTo": ""
        },
        /**
         * This funtion is preShow event handler of the component.
         * This function is executed everytime this component is rendered 
         * on any form and this function does UI related activities
         **/
        preShowHandler: function() {
            voltmx.print("Entering into com.hclacademy.createcomplaintorrequest : preShowHandler");
            this.view.lblCapturePhoto.setVisibility(true);
            this.view.imgPhoto.setVisibility(false);
            this.view.inputName.tbxInput.text = "";
            this.view.inputDescription.tbxInput.text = "";
            this.view.inputLocation.tbxInput.text = "";
            this.view.inputPhone.tbxInput.text = "";
            this.view.infoalert.setVisibility(false);
            voltmx.print("Exiting out of com.hclacademy.createcomplaintorrequest : preShowHandler");
        },
        /**
         * This funtion is responsible to create a new complaint or a request
         **/
        submit: function() {
            voltmx.print("Entering into com.hclacademy.createcomplaintorrequest : submit");
            this.complaintOrRequestObject.Name = this.view.inputName.tbxInput.text;
            this.complaintOrRequestObject.Description = this.view.inputDescription.tbxInput.text;
            this.complaintOrRequestObject.Location = this.view.inputLocation.tbxInput.text;
            this.complaintOrRequestObject.Phone = this.view.inputPhone.tbxInput.text;
            voltmx.print("complaintOrRequestObject: " + JSON.stringify(this.complaintOrRequestObject));
            var objSvc = null;
            var dataObject = null;
            if ("Request" === this.createComplaintOrRequest) {
                objSvc = voltmx.sdk.getCurrentInstance().getObjectService("ERequests", {
                    "access": "online"
                });
                dataObject = new voltmx.sdk.dto.DataObject("Request");
            } else if ("Complaint" === this.createComplaintOrRequest) {
                objSvc = voltmx.sdk.getCurrentInstance().getObjectService("EComplaints", {
                    "access": "online"
                });
                dataObject = new voltmx.sdk.dto.DataObject("Complaint");
            }
            dataObject.addField("CategoryID", this.complaintOrRequestObject.CategoryID);
            dataObject.addField("Name", this.complaintOrRequestObject.Name);
            dataObject.addField("Description", this.complaintOrRequestObject.Description);
            dataObject.addField("Location", this.complaintOrRequestObject.Location);
            dataObject.addField("Phone", this.complaintOrRequestObject.Phone);
            dataObject.addField("Photo", this.complaintOrRequestObject.Photo);
            dataObject.addField("Status", this.complaintOrRequestObject.Status);
            dataObject.addField("CreatedBy", gblLoggedInUserID);
            dataObject.addField("AssignedTo", "");
            var options = {
                "dataObject": dataObject
            };
            if ("Request" === this.createComplaintOrRequest) {
                voltmx.application.showLoadingScreen(null, "Creating new request ...", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, null);
            } else {
                voltmx.application.showLoadingScreen(null, "Creating new complaint ...", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, null);
            }
            objSvc.create(options, this.submitSuccessCallback.bind(this), this.submitErrorCallback.bind(this));
            voltmx.print("Exiting out of com.hclacademy.createcomplaintorrequest : submit");
        },
        /**
         * This funtion is responsible to handle the success response 
         * while creating a new complaint or a request
         **/
        submitSuccessCallback: function(response) {
            voltmx.print("Entering into com.hclacademy.createcomplaintorrequest : submitSuccessCallback");
            if ("Request" === this.createComplaintOrRequest) {
                voltmx.print("New request created: " + JSON.stringify(response));
                this.view.infoalert.lblAlertTitle.text = "Request Submitted";
                this.view.infoalert.lblAlertMessage.text = "Thank you for submitting this request. Your request number is " + response.RequestID + ".";
            } else {
                voltmx.print("New complaint created: " + JSON.stringify(response));
                this.view.infoalert.lblAlertTitle.text = "Complaint Submitted";
                this.view.infoalert.lblAlertMessage.text = "Thank you for submitting this complaint. Your complaint number is " + response.ComplaintID + ".";
            }
            this.view.infoalert.setVisibility(true);
            voltmx.application.dismissLoadingScreen();
            voltmx.print("Exiting out of com.hclacademy.createcomplaintorrequest : submitSuccessCallback");
        },
        /**
         * This funtion is responsible to handle the error response 
         * while creating the new complaint 
         **/
        submitErrorCallback: function(error) {
            voltmx.print("Entering into com.hclacademy.createcomplaintorrequest : submitErrorCallback");
            if ("Request" === this.createComplaintOrRequest) {
                voltmx.print("Failed to create the new request: " + JSON.stringify(error));
                this.view.infoalert.lblAlertTitle.text = "Failed to create request";
                this.view.infoalert.lblAlertMessage.text = "Unable to submit request. Please submit the request again.";
            } else {
                voltmx.print("Failed to create the new complaint: " + JSON.stringify(error));
                this.view.infoalert.lblAlertTitle.text = "Failed to create complaint";
                this.view.infoalert.lblAlertMessage.text = "Unable to submit complaint. Please submit the complaint again.";
            }
            this.view.infoalert.setVisibility(true);
            voltmx.application.dismissLoadingScreen();
            voltmx.print("Exiting out of com.hclacademy.createcomplaintorrequest : submitErrorCallback");
        },
        /**
         * This funtion is responsible to capture and show the photo of the complaint
         **/
        capturePhoto: function() {
            voltmx.print("Entering into com.hclacademy.createcomplaintorrequest : capturePhoto");
            this.view.lblCapturePhoto.setVisibility(false);
            this.view.imgPhoto.setVisibility(true);
            voltmx.print("Exiting out of com.hclacademy.createcomplaintorrequest : capturePhoto");
        }
    };
});
define("com/hclacademy/createcomplaintorrequest/createcomplaintorrequestControllerActions", {
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onClick defined for btnCreate **/
    AS_Button_e9c7259bf6494f758143a18ce8a31461: function AS_Button_e9c7259bf6494f758143a18ce8a31461(eventobject) {
        var self = this;
        return self.submit.call(this);
    },
    /** onCapture defined for camCapturePhoto **/
    AS_Camera_f8e18a5014db4f6d8abce83b43035ad0: function AS_Camera_f8e18a5014db4f6d8abce83b43035ad0(eventobject, metadata) {
        var self = this;
        return self.capturePhoto.call(this);
    },
    /** preShow defined for createcomplaintorrequest **/
    AS_FlexContainer_f0f289bfda5c40c5912d866b8e2eb58d: function AS_FlexContainer_f0f289bfda5c40c5912d866b8e2eb58d(eventobject) {
        var self = this;
        return self.preShowHandler.call(this);
    }
});
define("com/hclacademy/createcomplaintorrequest/createcomplaintorrequestController", ["com/hclacademy/createcomplaintorrequest/usercreatecomplaintorrequestController", "com/hclacademy/createcomplaintorrequest/createcomplaintorrequestControllerActions"], function() {
    var controller = require("com/hclacademy/createcomplaintorrequest/usercreatecomplaintorrequestController");
    var actions = require("com/hclacademy/createcomplaintorrequest/createcomplaintorrequestControllerActions");
    for (var key in actions) {
        controller[key] = actions[key];
    }
    controller.initializeProperties = function() {
        defineSetter(this, "lblTitleText", function(val) {
            this.view.lblTitle.text = val;
        });
        defineGetter(this, "lblTitleText", function() {
            return this.view.lblTitle.text;
        });
        defineSetter(this, "lblCapturePhotoText", function(val) {
            this.view.lblCapturePhoto.text = val;
        });
        defineGetter(this, "lblCapturePhotoText", function() {
            return this.view.lblCapturePhoto.text;
        });
        if (this.initGettersSetters) {
            this.initGettersSetters.apply(this, arguments);
        }
    };
    return controller;
});

define('com/hclacademy/createcomplaintorrequest/createcomplaintorrequest',[],function() {
    return function(controller) {
        var createcomplaintorrequest = new voltmx.ui.FlexContainer(extendConfig({
            "autogrowMode": voltmx.flex.AUTOGROW_NONE,
            "clipBounds": false,
            "isMaster": true,
            "height": "100%",
            "id": "createcomplaintorrequest",
            "isVisible": true,
            "layoutType": voltmx.flex.FREE_FORM,
            "left": "0dp",
            "isModalContainer": false,
            "preShow": function(eventobject) {
                controller.AS_FlexContainer_f0f289bfda5c40c5912d866b8e2eb58d(eventobject);
            },
            "skin": "slFbox",
            "top": "0dp",
            "width": "100%",
            "zIndex": 1,
            "appName": "RefCommonsMA"
        }, controller.args[0], "createcomplaintorrequest"), extendConfig({
            "paddingInPixel": false
        }, controller.args[1], "createcomplaintorrequest"), extendConfig({}, controller.args[2], "createcomplaintorrequest"));
        createcomplaintorrequest.setDefaultUnit(voltmx.flex.DP);
        var flxMainContent = new voltmx.ui.FlexContainer(extendConfig({
            "autogrowMode": voltmx.flex.AUTOGROW_NONE,
            "clipBounds": false,
            "height": "100%",
            "id": "flxMainContent",
            "isVisible": true,
            "layoutType": voltmx.flex.FLOW_VERTICAL,
            "left": "0dp",
            "isModalContainer": false,
            "skin": "slFbox",
            "top": "0dp",
            "width": "100%",
            "zIndex": 1,
            "appName": "RefCommonsMA"
        }, controller.args[0], "flxMainContent"), extendConfig({
            "paddingInPixel": false
        }, controller.args[1], "flxMainContent"), extendConfig({}, controller.args[2], "flxMainContent"));
        flxMainContent.setDefaultUnit(voltmx.flex.DP);
        var flxPhoto = new voltmx.ui.FlexContainer(extendConfig({
            "autogrowMode": voltmx.flex.AUTOGROW_NONE,
            "clipBounds": false,
            "height": "225dp",
            "id": "flxPhoto",
            "isVisible": true,
            "layoutType": voltmx.flex.FREE_FORM,
            "left": "0dp",
            "isModalContainer": false,
            "skin": "sknFlx2",
            "top": "0dp",
            "width": "100%",
            "zIndex": 1,
            "appName": "RefCommonsMA"
        }, controller.args[0], "flxPhoto"), extendConfig({
            "paddingInPixel": false
        }, controller.args[1], "flxPhoto"), extendConfig({}, controller.args[2], "flxPhoto"));
        flxPhoto.setDefaultUnit(voltmx.flex.DP);
        var imgPhoto = new voltmx.ui.Image2(extendConfig({
            "height": "100%",
            "id": "imgPhoto",
            "isVisible": false,
            "left": "0dp",
            "skin": "slImage",
            "src": "imagedrag.png",
            "top": "0dp",
            "width": "100%",
            "zIndex": 1
        }, controller.args[0], "imgPhoto"), extendConfig({
            "imageScaleMode": constants.IMAGE_SCALE_MODE_FIT_TO_DIMENSIONS,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, controller.args[1], "imgPhoto"), extendConfig({}, controller.args[2], "imgPhoto"));
        var lblCapturePhoto = new voltmx.ui.Label(extendConfig({
            "centerX": "50%",
            "centerY": "65%",
            "id": "lblCapturePhoto",
            "isVisible": true,
            "skin": "sknLblHeading2",
            "text": "Tap here to capture photo of complaint",
            "textStyle": {},
            "width": voltmx.flex.USE_PREFERRED_SIZE,
            "zIndex": 1
        }, controller.args[0], "lblCapturePhoto"), extendConfig({
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, controller.args[1], "lblCapturePhoto"), extendConfig({
            "renderAsAnchor": false,
            "textCopyable": false
        }, controller.args[2], "lblCapturePhoto"));
        flxPhoto.add(imgPhoto, lblCapturePhoto);
        var lblTitle = new voltmx.ui.Label(extendConfig({
            "centerX": "50%",
            "id": "lblTitle",
            "isVisible": true,
            "skin": "sknLblHeading2",
            "text": "Report Flooding Complaint",
            "textStyle": {},
            "top": "20dp",
            "width": voltmx.flex.USE_PREFERRED_SIZE,
            "zIndex": 1
        }, controller.args[0], "lblTitle"), extendConfig({
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, controller.args[1], "lblTitle"), extendConfig({
            "renderAsAnchor": false,
            "textCopyable": false
        }, controller.args[2], "lblTitle"));
        var inputLocation = new com.hclacademy.userinput(extendConfig({
            "autogrowMode": voltmx.flex.AUTOGROW_NONE,
            "centerX": "50%",
            "height": "10%",
            "id": "inputLocation",
            "isVisible": true,
            "layoutType": voltmx.flex.FLOW_VERTICAL,
            "masterType": constants.MASTER_TYPE_DEFAULT,
            "isModalContainer": false,
            "skin": "slFbox",
            "top": "10dp",
            "width": "90%",
            "zIndex": 1,
            "appName": "RefCommonsMA",
            "overrides": {
                "lblInputTitle": {
                    "text": "Location"
                },
                "tbxInput": {
                    "placeholder": "Enter address"
                },
                "userinput": {
                    "centerX": "50%",
                    "left": "viz.val_cleared",
                    "top": "10dp",
                    "width": "90%"
                }
            }
        }, controller.args[0], "inputLocation"), extendConfig({
            "paddingInPixel": false,
            "overrides": {}
        }, controller.args[1], "inputLocation"), extendConfig({
            "overrides": {}
        }, controller.args[2], "inputLocation"));
        var inputDescription = new com.hclacademy.userinput(extendConfig({
            "autogrowMode": voltmx.flex.AUTOGROW_NONE,
            "centerX": "50%",
            "height": "10%",
            "id": "inputDescription",
            "isVisible": true,
            "layoutType": voltmx.flex.FLOW_VERTICAL,
            "masterType": constants.MASTER_TYPE_DEFAULT,
            "isModalContainer": false,
            "skin": "slFbox",
            "top": "10dp",
            "width": "90%",
            "zIndex": 1,
            "appName": "RefCommonsMA",
            "overrides": {
                "lblInputTitle": {
                    "text": "Description"
                },
                "tbxInput": {
                    "placeholder": "Enter description"
                },
                "userinput": {
                    "centerX": "50%",
                    "left": "viz.val_cleared",
                    "top": "10dp",
                    "width": "90%"
                }
            }
        }, controller.args[0], "inputDescription"), extendConfig({
            "paddingInPixel": false,
            "overrides": {}
        }, controller.args[1], "inputDescription"), extendConfig({
            "overrides": {}
        }, controller.args[2], "inputDescription"));
        var inputName = new com.hclacademy.userinput(extendConfig({
            "autogrowMode": voltmx.flex.AUTOGROW_NONE,
            "centerX": "50%",
            "height": "10%",
            "id": "inputName",
            "isVisible": true,
            "layoutType": voltmx.flex.FLOW_VERTICAL,
            "masterType": constants.MASTER_TYPE_DEFAULT,
            "isModalContainer": false,
            "skin": "slFbox",
            "top": "10dp",
            "width": "90%",
            "zIndex": 1,
            "appName": "RefCommonsMA",
            "overrides": {
                "lblInputTitle": {
                    "text": "Name"
                },
                "tbxInput": {
                    "placeholder": "Enter your name"
                },
                "userinput": {
                    "centerX": "50%",
                    "left": "viz.val_cleared",
                    "top": "10dp",
                    "width": "90%"
                }
            }
        }, controller.args[0], "inputName"), extendConfig({
            "paddingInPixel": false,
            "overrides": {}
        }, controller.args[1], "inputName"), extendConfig({
            "overrides": {}
        }, controller.args[2], "inputName"));
        var inputPhone = new com.hclacademy.userinput(extendConfig({
            "autogrowMode": voltmx.flex.AUTOGROW_NONE,
            "centerX": "50%",
            "height": "10%",
            "id": "inputPhone",
            "isVisible": true,
            "layoutType": voltmx.flex.FLOW_VERTICAL,
            "masterType": constants.MASTER_TYPE_DEFAULT,
            "isModalContainer": false,
            "skin": "slFbox",
            "top": "10dp",
            "width": "90%",
            "zIndex": 1,
            "appName": "RefCommonsMA",
            "overrides": {
                "lblInputTitle": {
                    "text": "Phone"
                },
                "tbxInput": {
                    "placeholder": "Enter phone number"
                },
                "userinput": {
                    "centerX": "50%",
                    "left": "viz.val_cleared",
                    "top": "10dp",
                    "width": "90%"
                }
            }
        }, controller.args[0], "inputPhone"), extendConfig({
            "paddingInPixel": false,
            "overrides": {}
        }, controller.args[1], "inputPhone"), extendConfig({
            "overrides": {}
        }, controller.args[2], "inputPhone"));
        var btnCreate = new voltmx.ui.Button(extendConfig({
            "centerX": "50%",
            "focusSkin": "sknBtnFocus",
            "height": "40dp",
            "id": "btnCreate",
            "isVisible": true,
            "onClick": controller.AS_Button_e9c7259bf6494f758143a18ce8a31461,
            "skin": "sknBtnNormal",
            "text": "Submit",
            "top": "15dp",
            "width": "200dp",
            "zIndex": 1
        }, controller.args[0], "btnCreate"), extendConfig({
            "contentAlignment": constants.CONTENT_ALIGN_CENTER,
            "displayText": true,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, controller.args[1], "btnCreate"), extendConfig({}, controller.args[2], "btnCreate"));
        flxMainContent.add(flxPhoto, lblTitle, inputLocation, inputDescription, inputName, inputPhone, btnCreate);
        var infoalert = new com.hclacademy.infoalert(extendConfig({
            "autogrowMode": voltmx.flex.AUTOGROW_NONE,
            "centerX": "50%",
            "centerY": "50%",
            "height": "100%",
            "id": "infoalert",
            "isVisible": false,
            "layoutType": voltmx.flex.FREE_FORM,
            "masterType": constants.MASTER_TYPE_DEFAULT,
            "isModalContainer": false,
            "skin": "sknFlex4",
            "width": "100%",
            "zIndex": 1,
            "appName": "RefCommonsMA",
            "overrides": {
                "infoalert": {
                    "isVisible": false
                }
            }
        }, controller.args[0], "infoalert"), extendConfig({
            "paddingInPixel": false,
            "overrides": {}
        }, controller.args[1], "infoalert"), extendConfig({
            "overrides": {}
        }, controller.args[2], "infoalert"));
        createcomplaintorrequest.add(flxMainContent, infoalert);
        return createcomplaintorrequest;
    }
});
define('com/hclacademy/createcomplaintorrequest/createcomplaintorrequestConfig',[],function() {
    return {
        "properties": [{
            "name": "lblTitleText",
            "enumerable": true,
            "configurable": false,
            "writable": true
        }, {
            "name": "lblCapturePhotoText",
            "enumerable": true,
            "configurable": false,
            "writable": true
        }, {
            "name": "createComplaintOrRequest",
            "enumerable": true,
            "configurable": false,
            "writable": true
        }, {
            "name": "complaintOrRequestObject",
            "enumerable": true,
            "configurable": false,
            "writable": true
        }],
        "apis": [],
        "events": []
    }
});
define("com/hclacademy/custombuttonwithimageandtext/usercustombuttonwithimageandtextController", [],function() {
    return {};
});
define("com/hclacademy/custombuttonwithimageandtext/custombuttonwithimageandtextControllerActions", {
    /* 
    This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
});
define("com/hclacademy/custombuttonwithimageandtext/custombuttonwithimageandtextController", ["com/hclacademy/custombuttonwithimageandtext/usercustombuttonwithimageandtextController", "com/hclacademy/custombuttonwithimageandtext/custombuttonwithimageandtextControllerActions"], function() {
    var controller = require("com/hclacademy/custombuttonwithimageandtext/usercustombuttonwithimageandtextController");
    var actions = require("com/hclacademy/custombuttonwithimageandtext/custombuttonwithimageandtextControllerActions");
    for (var key in actions) {
        controller[key] = actions[key];
    }
    return controller;
});

define('com/hclacademy/custombuttonwithimageandtext/custombuttonwithimageandtext',[],function() {
    return function(controller) {
        var custombuttonwithimageandtext = new voltmx.ui.FlexContainer(extendConfig({
            "autogrowMode": voltmx.flex.AUTOGROW_NONE,
            "clipBounds": false,
            "isMaster": true,
            "height": "50dp",
            "id": "custombuttonwithimageandtext",
            "isVisible": true,
            "layoutType": voltmx.flex.FLOW_HORIZONTAL,
            "left": "0dp",
            "isModalContainer": false,
            "skin": "sknFlxBtnNormal",
            "top": "0dp",
            "width": "100%",
            "zIndex": 1,
            "appName": "RefCommonsMA"
        }, controller.args[0], "custombuttonwithimageandtext"), extendConfig({
            "paddingInPixel": false
        }, controller.args[1], "custombuttonwithimageandtext"), extendConfig({}, controller.args[2], "custombuttonwithimageandtext"));
        custombuttonwithimageandtext.setDefaultUnit(voltmx.flex.DP);
        var imgAction = new voltmx.ui.Image2(extendConfig({
            "centerY": "50%",
            "height": "50dp",
            "id": "imgAction",
            "isVisible": true,
            "left": "10dp",
            "skin": "slImage",
            "src": "plus.png",
            "width": "50dp",
            "zIndex": 1
        }, controller.args[0], "imgAction"), extendConfig({
            "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, controller.args[1], "imgAction"), extendConfig({}, controller.args[2], "imgAction"));
        var lblAction = new voltmx.ui.Label(extendConfig({
            "centerY": "50%",
            "id": "lblAction",
            "isVisible": true,
            "left": "10dp",
            "skin": "sknLblDescription",
            "text": "New Request",
            "textStyle": {},
            "width": voltmx.flex.USE_PREFERRED_SIZE,
            "zIndex": 1
        }, controller.args[0], "lblAction"), extendConfig({
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, controller.args[1], "lblAction"), extendConfig({
            "renderAsAnchor": false,
            "textCopyable": false
        }, controller.args[2], "lblAction"));
        custombuttonwithimageandtext.add(imgAction, lblAction);
        return custombuttonwithimageandtext;
    }
});
define("com/hclacademy/formheader/userformheaderController", [],function() {
    return {};
});
define("com/hclacademy/formheader/formheaderControllerActions", {
    /* 
    This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
});
define("com/hclacademy/formheader/formheaderController", ["com/hclacademy/formheader/userformheaderController", "com/hclacademy/formheader/formheaderControllerActions"], function() {
    var controller = require("com/hclacademy/formheader/userformheaderController");
    var actions = require("com/hclacademy/formheader/formheaderControllerActions");
    for (var key in actions) {
        controller[key] = actions[key];
    }
    return controller;
});

define('com/hclacademy/formheader/formheader',[],function() {
    return function(controller) {
        var formheader = new voltmx.ui.FlexContainer(extendConfig({
            "autogrowMode": voltmx.flex.AUTOGROW_NONE,
            "clipBounds": false,
            "isMaster": true,
            "height": "10%",
            "id": "formheader",
            "isVisible": true,
            "layoutType": voltmx.flex.FREE_FORM,
            "left": "0dp",
            "isModalContainer": false,
            "skin": "slFbox",
            "top": "0dp",
            "width": "100%",
            "zIndex": 1,
            "appName": "RefCommonsMA"
        }, controller.args[0], "formheader"), extendConfig({
            "paddingInPixel": false
        }, controller.args[1], "formheader"), extendConfig({}, controller.args[2], "formheader"));
        formheader.setDefaultUnit(voltmx.flex.DP);
        var imgMenu = new voltmx.ui.Image2(extendConfig({
            "centerY": "50%",
            "height": "40dp",
            "id": "imgMenu",
            "isVisible": true,
            "left": "5dp",
            "skin": "slImage",
            "src": "menu.png",
            "width": "40dp",
            "zIndex": 1
        }, controller.args[0], "imgMenu"), extendConfig({
            "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, controller.args[1], "imgMenu"), extendConfig({}, controller.args[2], "imgMenu"));
        var imgBack = new voltmx.ui.Image2(extendConfig({
            "centerY": "50%",
            "height": "40dp",
            "id": "imgBack",
            "isVisible": true,
            "right": 50,
            "skin": "slImage",
            "src": "backarrow.png",
            "width": "40dp",
            "zIndex": 1
        }, controller.args[0], "imgBack"), extendConfig({
            "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, controller.args[1], "imgBack"), extendConfig({}, controller.args[2], "imgBack"));
        var lblCompanyName = new voltmx.ui.Label(extendConfig({
            "centerX": "50%",
            "centerY": "50%",
            "id": "lblCompanyName",
            "isVisible": true,
            "skin": "sknLblHeading1",
            "text": "HCLSOFTWARE",
            "textStyle": {},
            "width": voltmx.flex.USE_PREFERRED_SIZE,
            "zIndex": 1
        }, controller.args[0], "lblCompanyName"), extendConfig({
            "contentAlignment": constants.CONTENT_ALIGN_CENTER,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, controller.args[1], "lblCompanyName"), extendConfig({
            "renderAsAnchor": false,
            "textCopyable": false
        }, controller.args[2], "lblCompanyName"));
        var flxProfilePhoto = new voltmx.ui.FlexContainer(extendConfig({
            "autogrowMode": voltmx.flex.AUTOGROW_NONE,
            "centerY": "50%",
            "clipBounds": true,
            "height": "40dp",
            "id": "flxProfilePhoto",
            "isVisible": true,
            "layoutType": voltmx.flex.FREE_FORM,
            "isModalContainer": false,
            "right": 5,
            "skin": "sknFlx5",
            "width": "40dp",
            "zIndex": 1,
            "appName": "RefCommonsMA"
        }, controller.args[0], "flxProfilePhoto"), extendConfig({
            "paddingInPixel": false
        }, controller.args[1], "flxProfilePhoto"), extendConfig({}, controller.args[2], "flxProfilePhoto"));
        flxProfilePhoto.setDefaultUnit(voltmx.flex.DP);
        var imgProfile = new voltmx.ui.Image2(extendConfig({
            "centerX": "50%",
            "centerY": "50%",
            "height": "100%",
            "id": "imgProfile",
            "isVisible": true,
            "skin": "slImage",
            "src": "userprofile.png",
            "width": "100%",
            "zIndex": 1
        }, controller.args[0], "imgProfile"), extendConfig({
            "imageScaleMode": constants.IMAGE_SCALE_MODE_FIT_TO_DIMENSIONS,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, controller.args[1], "imgProfile"), extendConfig({}, controller.args[2], "imgProfile"));
        flxProfilePhoto.add(imgProfile);
        formheader.add(imgMenu, imgBack, lblCompanyName, flxProfilePhoto);
        return formheader;
    }
});
define("com/hclacademy/hamburgermenu/userhamburgermenuController", [],function() {
    return {
        /*
         * This function is responsible for navigation 
         * from hamburger menu
         */
        hamburgerMenuCallback: function() {
            var selectedMenuOption = this.view.segMenu.selectedRowItems[0].lblMenuOption;
            var navigationConfig = {
                "appName": "GovtCitizenSA",
                "friendlyName": "frmDashboard"
            };
            var dashboard = voltmx.i18n.getLocalizedString("dashboard");
            var requests = voltmx.i18n.getLocalizedString("requests");
            var complaints = voltmx.i18n.getLocalizedString("complaints");
            var weather = voltmx.i18n.getLocalizedString("weather");
            var userProfile = voltmx.i18n.getLocalizedString("userProfile");
            var userPreferences = voltmx.i18n.getLocalizedString("userPreferences");
            if (dashboard === selectedMenuOption) {
                navigationConfig.appName = "GovtCitizenSA";
                navigationConfig.friendlyName = "frmDashboard";
            } else if (requests === selectedMenuOption) {
                navigationConfig.appName = "ERequestsMA";
                navigationConfig.friendlyName = "frmERequestsDashboard";
            } else if (complaints === selectedMenuOption) {
                navigationConfig.appName = "EComplaintsMA";
                navigationConfig.friendlyName = "frmEComplaintsDashboard";
            } else if (weather === selectedMenuOption) {
                navigationConfig.appName = "GovtCitizenSA";
                navigationConfig.friendlyName = "frmWeather";
            } else if (userProfile === selectedMenuOption) {
                navigationConfig.appName = "GovtCitizenSA";
                navigationConfig.friendlyName = "frmUserProfile";
            } else if (userPreferences === selectedMenuOption) {
                navigationConfig.appName = "GovtCitizenSA";
                navigationConfig.friendlyName = "frmUserPreferences";
            }
            var navigationManager = new voltmx.mvc.Navigation(navigationConfig);
            navigationManager.navigate();
        }
    };
});
define("com/hclacademy/hamburgermenu/hamburgermenuControllerActions", {
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onRowClick defined for segMenu **/
    AS_Segment_ff281e5d63c84b0fad38895ba3bd529b: function AS_Segment_ff281e5d63c84b0fad38895ba3bd529b(eventobject, sectionNumber, rowNumber) {
        var self = this;

        function MOVE_ACTION_ce23dc7eb4e24dfc87c7b4f5715f39fb_Callback() {
            self.hamburgerMenuCallback.call(this);
        }
        self.view.animate(voltmx.ui.createAnimation({
            "100": {
                "left": "-90%",
                "stepConfig": {
                    "timingFunction": voltmx.anim.EASE
                }
            }
        }), {
            "delay": 0,
            "iterationCount": 1,
            "fillMode": voltmx.anim.FILL_MODE_FORWARDS,
            "duration": 1
        }, {
            "animationEnd": MOVE_ACTION_ce23dc7eb4e24dfc87c7b4f5715f39fb_Callback
        });
    }
});
define("com/hclacademy/hamburgermenu/hamburgermenuController", ["com/hclacademy/hamburgermenu/userhamburgermenuController", "com/hclacademy/hamburgermenu/hamburgermenuControllerActions"], function() {
    var controller = require("com/hclacademy/hamburgermenu/userhamburgermenuController");
    var actions = require("com/hclacademy/hamburgermenu/hamburgermenuControllerActions");
    for (var key in actions) {
        controller[key] = actions[key];
    }
    return controller;
});

define('com/hclacademy/hamburgermenu/hamburgermenu',[],function() {
    return function(controller) {
        var hamburgermenu = new voltmx.ui.FlexContainer(extendConfig({
            "autogrowMode": voltmx.flex.AUTOGROW_NONE,
            "clipBounds": false,
            "isMaster": true,
            "height": "100%",
            "id": "hamburgermenu",
            "isVisible": true,
            "layoutType": voltmx.flex.FREE_FORM,
            "left": "-90%",
            "isModalContainer": false,
            "skin": "sknFlexWithShadowPrimaryGradientBg",
            "top": "0dp",
            "width": "80%",
            "zIndex": 1,
            "appName": "RefCommonsMA"
        }, controller.args[0], "hamburgermenu"), extendConfig({
            "paddingInPixel": false
        }, controller.args[1], "hamburgermenu"), extendConfig({}, controller.args[2], "hamburgermenu"));
        hamburgermenu.setDefaultUnit(voltmx.flex.DP);
        var flxTitle = new voltmx.ui.FlexContainer(extendConfig({
            "autogrowMode": voltmx.flex.AUTOGROW_NONE,
            "clipBounds": false,
            "height": "150dp",
            "id": "flxTitle",
            "isVisible": true,
            "layoutType": voltmx.flex.FREE_FORM,
            "left": "0dp",
            "isModalContainer": false,
            "skin": "sknFlx2",
            "top": "0dp",
            "width": "100%",
            "zIndex": 1,
            "appName": "RefCommonsMA"
        }, controller.args[0], "flxTitle"), extendConfig({
            "paddingInPixel": false
        }, controller.args[1], "flxTitle"), extendConfig({}, controller.args[2], "flxTitle"));
        flxTitle.setDefaultUnit(voltmx.flex.DP);
        var flxProfilePhoto = new voltmx.ui.FlexContainer(extendConfig({
            "autogrowMode": voltmx.flex.AUTOGROW_NONE,
            "clipBounds": true,
            "height": "100dp",
            "id": "flxProfilePhoto",
            "isVisible": true,
            "layoutType": voltmx.flex.FREE_FORM,
            "left": 10,
            "isModalContainer": false,
            "skin": "sknFlx5",
            "top": 10,
            "width": "100dp",
            "zIndex": 1,
            "appName": "RefCommonsMA"
        }, controller.args[0], "flxProfilePhoto"), extendConfig({
            "paddingInPixel": false
        }, controller.args[1], "flxProfilePhoto"), extendConfig({}, controller.args[2], "flxProfilePhoto"));
        flxProfilePhoto.setDefaultUnit(voltmx.flex.DP);
        var imgUserPhoto = new voltmx.ui.Image2(extendConfig({
            "centerX": "50%",
            "centerY": "50%",
            "height": "100%",
            "id": "imgUserPhoto",
            "isVisible": true,
            "skin": "slImage",
            "src": "userprofile.png",
            "width": "100%",
            "zIndex": 1
        }, controller.args[0], "imgUserPhoto"), extendConfig({
            "imageScaleMode": constants.IMAGE_SCALE_MODE_FIT_TO_DIMENSIONS,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, controller.args[1], "imgUserPhoto"), extendConfig({}, controller.args[2], "imgUserPhoto"));
        flxProfilePhoto.add(imgUserPhoto);
        var lblUserName = new voltmx.ui.Label(extendConfig({
            "id": "lblUserName",
            "isVisible": true,
            "left": "20dp",
            "skin": "sknLblHeading3",
            "text": "Citizen User",
            "textStyle": {},
            "top": "120dp",
            "width": voltmx.flex.USE_PREFERRED_SIZE,
            "zIndex": 1
        }, controller.args[0], "lblUserName"), extendConfig({
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, controller.args[1], "lblUserName"), extendConfig({
            "renderAsAnchor": false,
            "textCopyable": false
        }, controller.args[2], "lblUserName"));
        flxTitle.add(flxProfilePhoto, lblUserName);
        var segMenu = new voltmx.ui.SegmentedUI2(extendConfig({
            "autogrowMode": voltmx.flex.AUTOGROW_NONE,
            "data": [{
                "imgMenuOption": "overview.png",
                "lblMenuOption": "Dashboard"
            }, {
                "imgMenuOption": "erequest.png",
                "lblMenuOption": "Requests"
            }, {
                "imgMenuOption": "ecomplaint.png",
                "lblMenuOption": "Complaints"
            }, {
                "imgMenuOption": "weatheralert.png",
                "lblMenuOption": "Weather Alert"
            }, {
                "imgMenuOption": "userprofile.png",
                "lblMenuOption": "User Profile"
            }, {
                "imgMenuOption": "userpreferences.png",
                "lblMenuOption": "User Preferences"
            }],
            "groupCells": false,
            "height": "100%",
            "id": "segMenu",
            "isVisible": true,
            "left": "0%",
            "needPageIndicator": true,
            "onRowClick": controller.AS_Segment_ff281e5d63c84b0fad38895ba3bd529b,
            "pageOffDotImage": "pageoffdot.png",
            "pageOnDotImage": "pageondot.png",
            "retainSelection": false,
            "rowFocusSkin": "seg2Focus",
            "rowSkin": "sknSegTransparent",
            "rowTemplate": kony.mvc.resolveNameFromContext({
                "appName": "RefCommonsMA",
                "friendlyName": "flxSegRowWithImageAndLabel"
            }),
            "scrollingEvents": {},
            "sectionHeaderSkin": "sliPhoneSegmentHeader",
            "selectionBehavior": constants.SEGUI_DEFAULT_BEHAVIOR,
            "separatorColor": "aaaaaa00",
            "separatorRequired": true,
            "separatorThickness": 1,
            "showScrollbars": false,
            "top": "150dp",
            "viewType": constants.SEGUI_VIEW_TYPE_TABLEVIEW,
            "widgetDataMap": {
                "flxSegRowWithImageAndLabel": "flxSegRowWithImageAndLabel",
                "imgMenuOption": "imgMenuOption",
                "lblMenuOption": "lblMenuOption"
            },
            "width": "100%",
            "zIndex": 1,
            "appName": "RefCommonsMA"
        }, controller.args[0], "segMenu"), extendConfig({
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, controller.args[1], "segMenu"), extendConfig({}, controller.args[2], "segMenu"));
        hamburgermenu.add(flxTitle, segMenu);
        return hamburgermenu;
    }
});
define("com/hclacademy/infoalert/userinfoalertController", [],function() {
    return {};
});
define("com/hclacademy/infoalert/infoalertControllerActions", {
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onClick defined for btnAlertOK **/
    AS_Button_d9163928d8484284867a96aa4ef625c2: function AS_Button_d9163928d8484284867a96aa4ef625c2(eventobject) {
        var self = this;
        self.view.isVisible = false;
    }
});
define("com/hclacademy/infoalert/infoalertController", ["com/hclacademy/infoalert/userinfoalertController", "com/hclacademy/infoalert/infoalertControllerActions"], function() {
    var controller = require("com/hclacademy/infoalert/userinfoalertController");
    var actions = require("com/hclacademy/infoalert/infoalertControllerActions");
    for (var key in actions) {
        controller[key] = actions[key];
    }
    return controller;
});

define('com/hclacademy/infoalert/infoalert',[],function() {
    return function(controller) {
        var infoalert = new voltmx.ui.FlexContainer(extendConfig({
            "autogrowMode": voltmx.flex.AUTOGROW_NONE,
            "centerX": "50%",
            "centerY": "50%",
            "clipBounds": false,
            "isMaster": true,
            "height": "100%",
            "id": "infoalert",
            "isVisible": true,
            "layoutType": voltmx.flex.FREE_FORM,
            "isModalContainer": false,
            "skin": "sknFlex4",
            "width": "100%",
            "zIndex": 1,
            "appName": "RefCommonsMA"
        }, controller.args[0], "infoalert"), extendConfig({
            "paddingInPixel": false
        }, controller.args[1], "infoalert"), extendConfig({}, controller.args[2], "infoalert"));
        infoalert.setDefaultUnit(voltmx.flex.DP);
        var flxInfoAlert = new voltmx.ui.FlexContainer(extendConfig({
            "autogrowMode": voltmx.flex.AUTOGROW_NONE,
            "centerX": "50%",
            "centerY": "50%",
            "clipBounds": false,
            "height": "200dp",
            "id": "flxInfoAlert",
            "isVisible": true,
            "layoutType": voltmx.flex.FLOW_VERTICAL,
            "isModalContainer": false,
            "skin": "sknFlexWithShadowWhiteBg",
            "width": "80%",
            "zIndex": 1,
            "appName": "RefCommonsMA"
        }, controller.args[0], "flxInfoAlert"), extendConfig({
            "paddingInPixel": false
        }, controller.args[1], "flxInfoAlert"), extendConfig({}, controller.args[2], "flxInfoAlert"));
        flxInfoAlert.setDefaultUnit(voltmx.flex.DP);
        var lblAlertTitle = new voltmx.ui.Label(extendConfig({
            "id": "lblAlertTitle",
            "isVisible": true,
            "left": "25dp",
            "skin": "sknLblHeading3",
            "text": "Complaint Submitted",
            "textStyle": {},
            "top": "25dp",
            "width": voltmx.flex.USE_PREFERRED_SIZE,
            "zIndex": 1
        }, controller.args[0], "lblAlertTitle"), extendConfig({
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, controller.args[1], "lblAlertTitle"), extendConfig({
            "renderAsAnchor": false,
            "textCopyable": false
        }, controller.args[2], "lblAlertTitle"));
        var lblAlertMessage = new voltmx.ui.Label(extendConfig({
            "id": "lblAlertMessage",
            "isVisible": true,
            "left": "25dp",
            "skin": "sknLblDescription",
            "text": "Thank you for submitting this complaint. Your complaint number is 08949.",
            "textStyle": {},
            "top": "40dp",
            "width": "90%",
            "zIndex": 1
        }, controller.args[0], "lblAlertMessage"), extendConfig({
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, controller.args[1], "lblAlertMessage"), extendConfig({
            "renderAsAnchor": false,
            "textCopyable": false
        }, controller.args[2], "lblAlertMessage"));
        var btnAlertOK = new voltmx.ui.Button(extendConfig({
            "bottom": 10,
            "focusSkin": "sknBtnNormal1",
            "height": "40dp",
            "id": "btnAlertOK",
            "isVisible": true,
            "onClick": controller.AS_Button_d9163928d8484284867a96aa4ef625c2,
            "right": 25,
            "skin": "sknBtnNormal1",
            "text": "OK",
            "top": 25,
            "width": "100dp",
            "zIndex": 1
        }, controller.args[0], "btnAlertOK"), extendConfig({
            "contentAlignment": constants.CONTENT_ALIGN_CENTER,
            "displayText": true,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, controller.args[1], "btnAlertOK"), extendConfig({}, controller.args[2], "btnAlertOK"));
        flxInfoAlert.add(lblAlertTitle, lblAlertMessage, btnAlertOK);
        infoalert.add(flxInfoAlert);
        return infoalert;
    }
});
define("com/hclacademy/newsarticles/usernewsarticlesController", [],function() {
    return {};
});
define("com/hclacademy/newsarticles/newsarticlesControllerActions", {
    /* 
    This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
});
define("com/hclacademy/newsarticles/newsarticlesController", ["com/hclacademy/newsarticles/usernewsarticlesController", "com/hclacademy/newsarticles/newsarticlesControllerActions"], function() {
    var controller = require("com/hclacademy/newsarticles/usernewsarticlesController");
    var actions = require("com/hclacademy/newsarticles/newsarticlesControllerActions");
    for (var key in actions) {
        controller[key] = actions[key];
    }
    return controller;
});

define('com/hclacademy/newsarticles/newsarticles',[],function() {
    return function(controller) {
        var newsarticles = new voltmx.ui.FlexContainer(extendConfig({
            "clipBounds": false,
            "isMaster": true,
            "height": "220dp",
            "id": "newsarticles",
            "isVisible": true,
            "layoutType": voltmx.flex.FREE_FORM,
            "left": "40dp",
            "isModalContainer": false,
            "skin": "sknFlexWithShadow",
            "top": "10dp",
            "width": "80%",
            "zIndex": 1,
            "appName": "RefCommonsMA"
        }, controller.args[0], "newsarticles"), extendConfig({
            "paddingInPixel": false
        }, controller.args[1], "newsarticles"), extendConfig({}, controller.args[2], "newsarticles"));
        newsarticles.setDefaultUnit(voltmx.flex.DP);
        var lblNewsAdvisor = new voltmx.ui.Label(extendConfig({
            "id": "lblNewsAdvisor",
            "isVisible": true,
            "left": "10dp",
            "skin": "sknLblNormal1",
            "text": "Latest News",
            "textStyle": {},
            "top": "10dp",
            "width": voltmx.flex.USE_PREFERRED_SIZE,
            "zIndex": 2
        }, controller.args[0], "lblNewsAdvisor"), extendConfig({
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [1, 1, 1, 1],
            "paddingInPixel": false
        }, controller.args[1], "lblNewsAdvisor"), extendConfig({
            "renderAsAnchor": false,
            "textCopyable": false
        }, controller.args[2], "lblNewsAdvisor"));
        var segLatestNews = new voltmx.ui.SegmentedUI2(extendConfig({
            "autogrowMode": voltmx.flex.AUTOGROW_NONE,
            "centerX": "50%",
            "centerY": "50%",
            "data": [{
                "imgDisplayPic": "weather1.jpg",
                "lblTitle": "Microsoft Bets Big on the Creator of ChatGPT in Race to Dominate A.I."
            }, {
                "imgDisplayPic": "weather2.jpg",
                "lblTitle": "Don’t Ban ChatGPT in Schools. Teach With It."
            }, {
                "imgDisplayPic": "weather3.jpg",
                "lblTitle": "SEC Charges Crypto Companies With Offering Unregistered Securities"
            }, {
                "imgDisplayPic": "weather4.jpg",
                "lblTitle": "A Teacher Who Loves ChatGPT and Is ‘M3GAN’ Real?"
            }, {
                "imgDisplayPic": "weather5.jpg",
                "lblTitle": "Alarmed by A.I. Chatbots, Universities Start Revamping How They Teach"
            }],
            "groupCells": false,
            "height": "100%",
            "id": "segLatestNews",
            "isVisible": true,
            "needPageIndicator": true,
            "pageOffDotImage": "pageoffdot.png",
            "pageOnDotImage": "pageondot.png",
            "retainSelection": false,
            "rowTemplate": kony.mvc.resolveNameFromContext({
                "appName": "RefCommonsMA",
                "friendlyName": "flxSegWithImageAndLabel"
            }),
            "scrollingEvents": {},
            "selectionBehavior": constants.SEGUI_DEFAULT_BEHAVIOR,
            "separatorRequired": false,
            "showScrollbars": false,
            "viewType": constants.SEGUI_VIEW_TYPE_PAGEVIEW,
            "widgetDataMap": {
                "flxSegWithImageAndLabel": "flxSegWithImageAndLabel",
                "imgDisplayPic": "imgDisplayPic",
                "lblTitle": "lblTitle"
            },
            "widgetSkin": "sknSegWithRoundedCorners",
            "width": "100%",
            "zIndex": 1,
            "appName": "RefCommonsMA"
        }, controller.args[0], "segLatestNews"), extendConfig({
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, controller.args[1], "segLatestNews"), extendConfig({}, controller.args[2], "segLatestNews"));
        newsarticles.add(lblNewsAdvisor, segLatestNews);
        return newsarticles;
    }
});
define("com/hclacademy/userinput/useruserinputController", [],function() {
    return {};
});
define("com/hclacademy/userinput/userinputControllerActions", {
    /* 
    This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
});
define("com/hclacademy/userinput/userinputController", ["com/hclacademy/userinput/useruserinputController", "com/hclacademy/userinput/userinputControllerActions"], function() {
    var controller = require("com/hclacademy/userinput/useruserinputController");
    var actions = require("com/hclacademy/userinput/userinputControllerActions");
    for (var key in actions) {
        controller[key] = actions[key];
    }
    return controller;
});

define('com/hclacademy/userinput/userinput',[],function() {
    return function(controller) {
        var userinput = new voltmx.ui.FlexContainer(extendConfig({
            "autogrowMode": voltmx.flex.AUTOGROW_NONE,
            "clipBounds": false,
            "isMaster": true,
            "height": "10%",
            "id": "userinput",
            "isVisible": true,
            "layoutType": voltmx.flex.FLOW_VERTICAL,
            "left": "0dp",
            "isModalContainer": false,
            "skin": "slFbox",
            "top": "0dp",
            "width": "100%",
            "zIndex": 1,
            "appName": "RefCommonsMA"
        }, controller.args[0], "userinput"), extendConfig({
            "paddingInPixel": false
        }, controller.args[1], "userinput"), extendConfig({}, controller.args[2], "userinput"));
        userinput.setDefaultUnit(voltmx.flex.DP);
        var lblInputTitle = new voltmx.ui.Label(extendConfig({
            "id": "lblInputTitle",
            "isVisible": true,
            "left": "10dp",
            "skin": "sknLblHeading3",
            "text": "Label",
            "textStyle": {},
            "top": "10dp",
            "width": "90%",
            "zIndex": 1
        }, controller.args[0], "lblInputTitle"), extendConfig({
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, controller.args[1], "lblInputTitle"), extendConfig({
            "renderAsAnchor": false,
            "textCopyable": false
        }, controller.args[2], "lblInputTitle"));
        var tbxInput = new voltmx.ui.TextBox2(extendConfig({
            "autoCapitalize": constants.TEXTBOX_AUTO_CAPITALIZE_NONE,
            "focusSkin": "sknTbx1",
            "height": "40dp",
            "id": "tbxInput",
            "isVisible": true,
            "keyBoardStyle": constants.TEXTBOX_KEY_BOARD_STYLE_DEFAULT,
            "left": "10dp",
            "placeholder": "Placeholder",
            "secureTextEntry": false,
            "skin": "sknTbx1",
            "textInputMode": constants.TEXTBOX_INPUT_MODE_ANY,
            "top": "0dp",
            "width": "90%",
            "zIndex": 1
        }, controller.args[0], "tbxInput"), extendConfig({
            "containerHeightMode": constants.TEXTBOX_FONT_METRICS_DRIVEN_HEIGHT,
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, controller.args[1], "tbxInput"), extendConfig({
            "autoComplete": false,
            "autoCorrect": false,
            "placeholderSkin": "sknTbx1"
        }, controller.args[2], "tbxInput"));
        var flxInput = new voltmx.ui.FlexContainer(extendConfig({
            "autogrowMode": voltmx.flex.AUTOGROW_NONE,
            "clipBounds": false,
            "height": "2dp",
            "id": "flxInput",
            "isVisible": true,
            "layoutType": voltmx.flex.FREE_FORM,
            "left": "10dp",
            "isModalContainer": false,
            "skin": "sknFlx3",
            "top": "-5dp",
            "width": "90%",
            "zIndex": 1,
            "appName": "RefCommonsMA"
        }, controller.args[0], "flxInput"), extendConfig({
            "paddingInPixel": false
        }, controller.args[1], "flxInput"), extendConfig({}, controller.args[2], "flxInput"));
        flxInput.setDefaultUnit(voltmx.flex.DP);
        flxInput.add();
        userinput.add(lblInputTitle, tbxInput, flxInput);
        return userinput;
    }
});
define("RefCommonsMA/flxSampleRowTemplate", [],function() {
    return function(controller) {
        var flxSampleRowTemplate = new voltmx.ui.FlexContainer({
            "autogrowMode": voltmx.flex.AUTOGROW_NONE,
            "clipBounds": true,
            "height": "75dp",
            "id": "flxSampleRowTemplate",
            "isVisible": true,
            "layoutType": voltmx.flex.FREE_FORM,
            "isModalContainer": false,
            "skin": "sknSampleRowTemplate",
            "width": "100%",
            "appName": "RefCommonsMA"
        }, {
            "paddingInPixel": false
        }, {});
        flxSampleRowTemplate.setDefaultUnit(voltmx.flex.DP);
        var lblHeading = new voltmx.ui.Label({
            "id": "lblHeading",
            "isVisible": true,
            "left": "4%",
            "maxWidth": "50%",
            "skin": "sknLblRowHeading",
            "text": "Heading",
            "textStyle": {},
            "top": "8.00%",
            "width": "45%",
            "zIndex": 1
        }, {
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {
            "renderAsAnchor": false,
            "textCopyable": false
        });
        var lblDescription = new voltmx.ui.Label({
            "bottom": "10%",
            "id": "lblDescription",
            "isVisible": true,
            "left": "4%",
            "maxNumberOfLines": 3,
            "maxWidth": "70%",
            "skin": "sknLblDescription",
            "text": "Sub-Heading",
            "textStyle": {},
            "textTruncatePosition": constants.TEXT_TRUNCATE_NONE,
            "top": "42%",
            "width": "70%",
            "zIndex": 1
        }, {
            "contentAlignment": constants.CONTENT_ALIGN_TOP_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {
            "renderAsAnchor": false,
            "textCopyable": false
        });
        var lblTime = new voltmx.ui.Label({
            "id": "lblTime",
            "isVisible": true,
            "right": "9%",
            "skin": "sknLblTimeStamp",
            "text": "Timestamp",
            "textStyle": {},
            "top": "10%",
            "width": voltmx.flex.USE_PREFERRED_SIZE,
            "zIndex": 1
        }, {
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {
            "renderAsAnchor": false,
            "textCopyable": false
        });
        var lblStrip = new voltmx.ui.Label({
            "height": "100%",
            "id": "lblStrip",
            "isVisible": true,
            "left": "0dp",
            "maxWidth": "1%",
            "skin": "sknLblStrip",
            "textStyle": {},
            "top": "0dp",
            "width": voltmx.flex.USE_PREFERRED_SIZE,
            "zIndex": 1
        }, {
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {
            "renderAsAnchor": false,
            "textCopyable": false
        });
        flxSampleRowTemplate.add(lblHeading, lblDescription, lblTime, lblStrip);
        return flxSampleRowTemplate;
    }
});
define("RefCommonsMA/flxSectionHeaderTemplate", [],function() {
    return function(controller) {
        var flxSectionHeaderTemplate = new voltmx.ui.FlexContainer({
            "autogrowMode": voltmx.flex.AUTOGROW_NONE,
            "clipBounds": true,
            "height": "45dp",
            "id": "flxSectionHeaderTemplate",
            "isVisible": true,
            "layoutType": voltmx.flex.FREE_FORM,
            "isModalContainer": false,
            "skin": "sknSampleSectionHeaderTemplate",
            "width": "100%",
            "appName": "RefCommonsMA"
        }, {
            "paddingInPixel": false
        }, {});
        flxSectionHeaderTemplate.setDefaultUnit(voltmx.flex.DP);
        var lblHeading = new voltmx.ui.Label({
            "centerY": "50%",
            "id": "lblHeading",
            "isVisible": true,
            "left": "4%",
            "maxWidth": "50%",
            "skin": "sknSectionHeaderLabelSkin",
            "text": "Heading",
            "textStyle": {},
            "width": "75%",
            "zIndex": 1
        }, {
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {
            "renderAsAnchor": false,
            "textCopyable": false
        });
        flxSectionHeaderTemplate.add(lblHeading);
        return flxSectionHeaderTemplate;
    }
});
define("RefCommonsMA/flxSegCategories", [],function() {
    return function(controller) {
        var flxSegCategories = new voltmx.ui.FlexContainer({
            "autogrowMode": voltmx.flex.AUTOGROW_NONE,
            "clipBounds": false,
            "height": "40dp",
            "id": "flxSegCategories",
            "isVisible": true,
            "layoutType": voltmx.flex.FREE_FORM,
            "left": "0dp",
            "isModalContainer": false,
            "skin": "slFbox",
            "top": "0dp",
            "width": "100%",
            "appName": "RefCommonsMA"
        }, {
            "paddingInPixel": false
        }, {});
        flxSegCategories.setDefaultUnit(voltmx.flex.DP);
        var lblCategory = new voltmx.ui.Label({
            "centerY": "50%",
            "id": "lblCategory",
            "isVisible": true,
            "left": "3%",
            "skin": "sknLblHeading2",
            "text": "Category",
            "textStyle": {},
            "width": voltmx.flex.USE_PREFERRED_SIZE,
            "zIndex": 1
        }, {
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {
            "renderAsAnchor": false,
            "textCopyable": false
        });
        flxSegCategories.add(lblCategory);
        return flxSegCategories;
    }
});
define("RefCommonsMA/flxSegRowRecord", [],function() {
    return function(controller) {
        var flxSegRowRecord = new voltmx.ui.FlexContainer({
            "autogrowMode": voltmx.flex.AUTOGROW_NONE,
            "clipBounds": false,
            "height": "230dp",
            "id": "flxSegRowRecord",
            "isVisible": true,
            "layoutType": voltmx.flex.FLOW_VERTICAL,
            "left": "0dp",
            "isModalContainer": false,
            "skin": "sknFlexTransparent",
            "top": "0dp",
            "width": "100%",
            "appName": "RefCommonsMA"
        }, {
            "paddingInPixel": false
        }, {});
        flxSegRowRecord.setDefaultUnit(voltmx.flex.DP);
        var flxID = new voltmx.ui.FlexContainer({
            "autogrowMode": voltmx.flex.AUTOGROW_NONE,
            "clipBounds": false,
            "height": "20dp",
            "id": "flxID",
            "isVisible": true,
            "layoutType": voltmx.flex.FLOW_HORIZONTAL,
            "left": "0dp",
            "isModalContainer": false,
            "skin": "slFbox",
            "top": "5dp",
            "width": "100%",
            "zIndex": 1,
            "appName": "RefCommonsMA"
        }, {
            "paddingInPixel": false
        }, {});
        flxID.setDefaultUnit(voltmx.flex.DP);
        var lblID = new voltmx.ui.Label({
            "centerY": "50%",
            "id": "lblID",
            "isVisible": true,
            "left": "15dp",
            "skin": "sknLblHeading3",
            "text": "ID",
            "textStyle": {},
            "width": "150dp",
            "zIndex": 1
        }, {
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {
            "renderAsAnchor": false,
            "textCopyable": false
        });
        var lblIDValue = new voltmx.ui.Label({
            "centerY": "50%",
            "id": "lblIDValue",
            "isVisible": true,
            "left": "15dp",
            "skin": "sknLblHeading3",
            "text": "1",
            "textStyle": {},
            "width": "40%",
            "zIndex": 1
        }, {
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {
            "renderAsAnchor": false,
            "textCopyable": false
        });
        flxID.add(lblID, lblIDValue);
        var flxCategory = new voltmx.ui.FlexContainer({
            "autogrowMode": voltmx.flex.AUTOGROW_NONE,
            "clipBounds": false,
            "height": "20dp",
            "id": "flxCategory",
            "isVisible": true,
            "layoutType": voltmx.flex.FLOW_HORIZONTAL,
            "left": "0dp",
            "isModalContainer": false,
            "skin": "slFbox",
            "top": 0,
            "width": "100%",
            "zIndex": 1,
            "appName": "RefCommonsMA"
        }, {
            "paddingInPixel": false
        }, {});
        flxCategory.setDefaultUnit(voltmx.flex.DP);
        var lblCategory = new voltmx.ui.Label({
            "centerY": "50%",
            "id": "lblCategory",
            "isVisible": true,
            "left": "15dp",
            "skin": "sknLblHeading3",
            "text": "Category Name",
            "textStyle": {},
            "width": "150dp",
            "zIndex": 1
        }, {
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {
            "renderAsAnchor": false,
            "textCopyable": false
        });
        var lblCategoryValue = new voltmx.ui.Label({
            "centerY": "50%",
            "id": "lblCategoryValue",
            "isVisible": true,
            "left": "15dp",
            "skin": "sknLblHeading3",
            "text": "Electrical",
            "textStyle": {},
            "width": "40%",
            "zIndex": 1
        }, {
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {
            "renderAsAnchor": false,
            "textCopyable": false
        });
        flxCategory.add(lblCategory, lblCategoryValue);
        var flxDescription = new voltmx.ui.FlexContainer({
            "autogrowMode": voltmx.flex.AUTOGROW_HEIGHT,
            "clipBounds": false,
            "id": "flxDescription",
            "isVisible": true,
            "layoutType": voltmx.flex.FLOW_HORIZONTAL,
            "left": "0dp",
            "isModalContainer": false,
            "skin": "slFbox",
            "top": "0dp",
            "width": "100%",
            "zIndex": 1,
            "appName": "RefCommonsMA"
        }, {
            "paddingInPixel": false
        }, {});
        flxDescription.setDefaultUnit(voltmx.flex.DP);
        var lblDescription = new voltmx.ui.Label({
            "id": "lblDescription",
            "isVisible": true,
            "left": "15dp",
            "skin": "sknLblHeading3",
            "text": "Description",
            "textStyle": {},
            "top": "5dp",
            "width": "150dp",
            "zIndex": 1
        }, {
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {
            "renderAsAnchor": false,
            "textCopyable": false
        });
        var lblDescriptionValue = new voltmx.ui.Label({
            "id": "lblDescriptionValue",
            "isVisible": true,
            "left": "15dp",
            "skin": "sknLblHeading3",
            "text": "Street lights not working",
            "textStyle": {},
            "top": "5dp",
            "width": "175dp",
            "zIndex": 1
        }, {
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {
            "renderAsAnchor": false,
            "textCopyable": false
        });
        flxDescription.add(lblDescription, lblDescriptionValue);
        var flxAddress = new voltmx.ui.FlexContainer({
            "autogrowMode": voltmx.flex.AUTOGROW_HEIGHT,
            "clipBounds": false,
            "id": "flxAddress",
            "isVisible": true,
            "layoutType": voltmx.flex.FLOW_HORIZONTAL,
            "left": "0dp",
            "isModalContainer": false,
            "skin": "slFbox",
            "top": 0,
            "width": "100%",
            "zIndex": 1,
            "appName": "RefCommonsMA"
        }, {
            "paddingInPixel": false
        }, {});
        flxAddress.setDefaultUnit(voltmx.flex.DP);
        var lblAddress = new voltmx.ui.Label({
            "id": "lblAddress",
            "isVisible": true,
            "left": "15dp",
            "skin": "sknLblHeading3",
            "text": "Address",
            "textStyle": {},
            "top": "7dp",
            "width": "150dp",
            "zIndex": 1
        }, {
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {
            "renderAsAnchor": false,
            "textCopyable": false
        });
        var lblAddressValue = new voltmx.ui.Label({
            "id": "lblAddressValue",
            "isVisible": true,
            "left": "15dp",
            "skin": "sknLblHeading3",
            "text": "Mayurinagar, Miyapur, Hyderabad",
            "textStyle": {},
            "top": "7dp",
            "width": "175dp",
            "zIndex": 1
        }, {
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {
            "renderAsAnchor": false,
            "textCopyable": false
        });
        flxAddress.add(lblAddress, lblAddressValue);
        var flxCreatedBy = new voltmx.ui.FlexContainer({
            "autogrowMode": voltmx.flex.AUTOGROW_NONE,
            "clipBounds": false,
            "height": "14%",
            "id": "flxCreatedBy",
            "isVisible": true,
            "layoutType": voltmx.flex.FLOW_HORIZONTAL,
            "left": "0dp",
            "isModalContainer": false,
            "skin": "slFbox",
            "top": 0,
            "width": "100%",
            "zIndex": 1,
            "appName": "RefCommonsMA"
        }, {
            "paddingInPixel": false
        }, {});
        flxCreatedBy.setDefaultUnit(voltmx.flex.DP);
        var lblCreatedBy = new voltmx.ui.Label({
            "centerY": "50%",
            "id": "lblCreatedBy",
            "isVisible": true,
            "left": "15dp",
            "skin": "sknLblHeading3",
            "text": "Created By",
            "textStyle": {},
            "width": "150dp",
            "zIndex": 1
        }, {
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {
            "renderAsAnchor": false,
            "textCopyable": false
        });
        var lblCreatedByValue = new voltmx.ui.Label({
            "centerY": "50%",
            "id": "lblCreatedByValue",
            "isVisible": true,
            "left": "15dp",
            "skin": "sknLblHeading3",
            "text": "Citizen User",
            "textStyle": {},
            "width": voltmx.flex.USE_PREFERRED_SIZE,
            "zIndex": 1
        }, {
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {
            "renderAsAnchor": false,
            "textCopyable": false
        });
        flxCreatedBy.add(lblCreatedBy, lblCreatedByValue);
        var flxCreatedDateTime = new voltmx.ui.FlexContainer({
            "autogrowMode": voltmx.flex.AUTOGROW_NONE,
            "clipBounds": false,
            "height": "20dp",
            "id": "flxCreatedDateTime",
            "isVisible": true,
            "layoutType": voltmx.flex.FLOW_HORIZONTAL,
            "left": "0dp",
            "isModalContainer": false,
            "skin": "slFbox",
            "top": 0,
            "width": "100%",
            "zIndex": 1,
            "appName": "RefCommonsMA"
        }, {
            "paddingInPixel": false
        }, {});
        flxCreatedDateTime.setDefaultUnit(voltmx.flex.DP);
        var lblCreateDateTime = new voltmx.ui.Label({
            "centerY": "50%",
            "id": "lblCreateDateTime",
            "isVisible": true,
            "left": "15dp",
            "skin": "sknLblHeading3",
            "text": "Created Date",
            "textStyle": {},
            "width": "150dp",
            "zIndex": 1
        }, {
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {
            "renderAsAnchor": false,
            "textCopyable": false
        });
        var lblCreateDateTimeValue = new voltmx.ui.Label({
            "centerY": "50%",
            "id": "lblCreateDateTimeValue",
            "isVisible": true,
            "left": "15dp",
            "skin": "sknLblHeading3",
            "text": "2023-02-10 09:49:37.085",
            "textStyle": {},
            "width": voltmx.flex.USE_PREFERRED_SIZE,
            "zIndex": 1
        }, {
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {
            "renderAsAnchor": false,
            "textCopyable": false
        });
        flxCreatedDateTime.add(lblCreateDateTime, lblCreateDateTimeValue);
        var flxStatus = new voltmx.ui.FlexContainer({
            "autogrowMode": voltmx.flex.AUTOGROW_NONE,
            "clipBounds": false,
            "height": "14%",
            "id": "flxStatus",
            "isVisible": true,
            "layoutType": voltmx.flex.FLOW_HORIZONTAL,
            "left": "0dp",
            "isModalContainer": false,
            "skin": "slFbox",
            "top": 0,
            "width": "100%",
            "zIndex": 1,
            "appName": "RefCommonsMA"
        }, {
            "paddingInPixel": false
        }, {});
        flxStatus.setDefaultUnit(voltmx.flex.DP);
        var lblStatus = new voltmx.ui.Label({
            "centerY": "50%",
            "id": "lblStatus",
            "isVisible": true,
            "left": "15dp",
            "skin": "sknLblHeading3",
            "text": "Status",
            "textStyle": {},
            "width": "150dp",
            "zIndex": 1
        }, {
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {
            "renderAsAnchor": false,
            "textCopyable": false
        });
        var lblStatusValue = new voltmx.ui.Label({
            "centerY": "50%",
            "id": "lblStatusValue",
            "isVisible": true,
            "left": "15dp",
            "skin": "sknLblHeading3",
            "text": "Open",
            "textStyle": {},
            "width": voltmx.flex.USE_PREFERRED_SIZE,
            "zIndex": 1
        }, {
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {
            "renderAsAnchor": false,
            "textCopyable": false
        });
        flxStatus.add(lblStatus, lblStatusValue);
        var flxAssignedTo = new voltmx.ui.FlexContainer({
            "autogrowMode": voltmx.flex.AUTOGROW_NONE,
            "clipBounds": false,
            "height": "14%",
            "id": "flxAssignedTo",
            "isVisible": true,
            "layoutType": voltmx.flex.FLOW_HORIZONTAL,
            "left": "0dp",
            "isModalContainer": false,
            "skin": "slFbox",
            "top": 0,
            "width": "100%",
            "zIndex": 1,
            "appName": "RefCommonsMA"
        }, {
            "paddingInPixel": false
        }, {});
        flxAssignedTo.setDefaultUnit(voltmx.flex.DP);
        var lblAssignedTo = new voltmx.ui.Label({
            "centerY": "50%",
            "id": "lblAssignedTo",
            "isVisible": true,
            "left": "15dp",
            "skin": "sknLblHeading3",
            "text": "Assigned to",
            "textStyle": {},
            "width": "150dp",
            "zIndex": 1
        }, {
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {
            "renderAsAnchor": false,
            "textCopyable": false
        });
        var lblAssignedToValue = new voltmx.ui.Label({
            "centerY": "50%",
            "id": "lblAssignedToValue",
            "isVisible": true,
            "left": "15dp",
            "skin": "sknLblHeading3",
            "text": "GHMC-Electrical",
            "textStyle": {},
            "width": voltmx.flex.USE_PREFERRED_SIZE,
            "zIndex": 1
        }, {
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {
            "renderAsAnchor": false,
            "textCopyable": false
        });
        flxAssignedTo.add(lblAssignedTo, lblAssignedToValue);
        flxSegRowRecord.add(flxID, flxCategory, flxDescription, flxAddress, flxCreatedBy, flxCreatedDateTime, flxStatus, flxAssignedTo);
        return flxSegRowRecord;
    }
});
define("RefCommonsMA/flxSegRowWithImageAndLabel", [],function() {
    return function(controller) {
        var flxSegRowWithImageAndLabel = new voltmx.ui.FlexContainer({
            "autogrowMode": voltmx.flex.AUTOGROW_NONE,
            "clipBounds": false,
            "height": "75dp",
            "id": "flxSegRowWithImageAndLabel",
            "isVisible": true,
            "layoutType": voltmx.flex.FLOW_HORIZONTAL,
            "left": "0dp",
            "isModalContainer": false,
            "skin": "slFbox",
            "top": "0dp",
            "width": "100%",
            "appName": "RefCommonsMA"
        }, {
            "paddingInPixel": false
        }, {});
        flxSegRowWithImageAndLabel.setDefaultUnit(voltmx.flex.DP);
        var imgMenuOption = new voltmx.ui.Image2({
            "centerY": "50%",
            "height": "40dp",
            "id": "imgMenuOption",
            "isVisible": true,
            "left": "10dp",
            "skin": "slImage",
            "src": "imagedrag.png",
            "width": "40dp",
            "zIndex": 1
        }, {
            "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {});
        var lblMenuOption = new voltmx.ui.Label({
            "centerY": "50%",
            "id": "lblMenuOption",
            "isVisible": true,
            "left": "10dp",
            "skin": "sknLblHeading2",
            "text": "Category",
            "textStyle": {},
            "width": voltmx.flex.USE_PREFERRED_SIZE,
            "zIndex": 1
        }, {
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {
            "renderAsAnchor": false,
            "textCopyable": false
        });
        flxSegRowWithImageAndLabel.add(imgMenuOption, lblMenuOption);
        return flxSegRowWithImageAndLabel;
    }
});
define("RefCommonsMA/flxSegWithImageAndLabel", [],function() {
    return function(controller) {
        var flxSegWithImageAndLabel = new voltmx.ui.FlexContainer({
            "autogrowMode": voltmx.flex.AUTOGROW_HEIGHT,
            "clipBounds": false,
            "id": "flxSegWithImageAndLabel",
            "isVisible": true,
            "layoutType": voltmx.flex.FLOW_VERTICAL,
            "left": "0dp",
            "isModalContainer": false,
            "skin": "sknFlx1",
            "top": "0dp",
            "width": "100%",
            "appName": "RefCommonsMA"
        }, {
            "paddingInPixel": false
        }, {});
        flxSegWithImageAndLabel.setDefaultUnit(voltmx.flex.DP);
        var lblTitle = new voltmx.ui.Label({
            "id": "lblTitle",
            "isVisible": true,
            "left": "10dp",
            "skin": "sknLblDescription",
            "text": "Label",
            "textStyle": {},
            "top": "35dp",
            "width": "95%",
            "zIndex": 2
        }, {
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {
            "renderAsAnchor": false,
            "textCopyable": false
        });
        var imgDisplayPic = new voltmx.ui.Image2({
            "zoomEnabled": false,
            "zoomValue": 5,
            "id": "imgDisplayPic",
            "isVisible": true,
            "left": 10,
            "skin": "slImage",
            "src": "imagedrag.png",
            "top": 5,
            "width": "95%",
            "zIndex": 1,
            "blur": {
                "enabled": false,
                "value": 100
            }
        }, {
            "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {});
        flxSegWithImageAndLabel.add(lblTitle, imgDisplayPic);
        return flxSegWithImageAndLabel;
    }
});
define("RefCommonsMA/flxMapWeatherCallout", [],function() {
    return function(controller) {
        var flxMapWeatherCallout = new voltmx.ui.FlexContainer({
            "autogrowMode": voltmx.flex.AUTOGROW_NONE,
            "clipBounds": false,
            "height": "150dp",
            "id": "flxMapWeatherCallout",
            "isVisible": true,
            "layoutType": voltmx.flex.FLOW_HORIZONTAL,
            "left": "0dp",
            "isModalContainer": false,
            "skin": "sknFlexWithShadowPrimaryGradient1",
            "top": "0dp",
            "width": "80%",
            "appName": "RefCommonsMA"
        }, {
            "paddingInPixel": false
        }, {});
        flxMapWeatherCallout.setDefaultUnit(voltmx.flex.DP);
        var imgWeather = new voltmx.ui.Image2({
            "centerY": "50%",
            "height": "64dp",
            "id": "imgWeather",
            "isVisible": true,
            "left": "10dp",
            "skin": "slImage",
            "src": "weatherreport.png",
            "width": "64dp",
            "zIndex": 1
        }, {
            "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {});
        var flxWeatherDetails = new voltmx.ui.FlexContainer({
            "autogrowMode": voltmx.flex.AUTOGROW_NONE,
            "centerY": "50%",
            "clipBounds": false,
            "height": "100%",
            "id": "flxWeatherDetails",
            "isVisible": true,
            "layoutType": voltmx.flex.FLOW_VERTICAL,
            "left": "10dp",
            "isModalContainer": false,
            "skin": "slFbox",
            "width": "40%",
            "zIndex": 1,
            "appName": "RefCommonsMA"
        }, {
            "paddingInPixel": false
        }, {});
        flxWeatherDetails.setDefaultUnit(voltmx.flex.DP);
        var flxMinTemp = new voltmx.ui.FlexContainer({
            "autogrowMode": voltmx.flex.AUTOGROW_NONE,
            "clipBounds": false,
            "height": "20dp",
            "id": "flxMinTemp",
            "isVisible": true,
            "layoutType": voltmx.flex.FLOW_HORIZONTAL,
            "left": "0dp",
            "isModalContainer": false,
            "skin": "slFbox",
            "top": "13dp",
            "width": "100%",
            "zIndex": 1,
            "appName": "RefCommonsMA"
        }, {
            "paddingInPixel": false
        }, {});
        flxMinTemp.setDefaultUnit(voltmx.flex.DP);
        var lblMinTemp = new voltmx.ui.Label({
            "id": "lblMinTemp",
            "isVisible": true,
            "left": "0dp",
            "skin": "sknLblDescription",
            "text": "Min.Temp",
            "textStyle": {},
            "top": "0dp",
            "width": "100dp",
            "zIndex": 1
        }, {
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {
            "renderAsAnchor": false,
            "textCopyable": false
        });
        var lblMinTempValue = new voltmx.ui.Label({
            "id": "lblMinTempValue",
            "isVisible": true,
            "left": "0dp",
            "skin": "sknLblDescription",
            "text": "30.5",
            "textStyle": {},
            "top": "0dp",
            "width": voltmx.flex.USE_PREFERRED_SIZE,
            "zIndex": 1
        }, {
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {
            "renderAsAnchor": false,
            "textCopyable": false
        });
        flxMinTemp.add(lblMinTemp, lblMinTempValue);
        var flxMaxTemp = new voltmx.ui.FlexContainer({
            "autogrowMode": voltmx.flex.AUTOGROW_NONE,
            "clipBounds": false,
            "height": "20dp",
            "id": "flxMaxTemp",
            "isVisible": true,
            "layoutType": voltmx.flex.FLOW_HORIZONTAL,
            "left": "0dp",
            "isModalContainer": false,
            "skin": "slFbox",
            "top": "5dp",
            "width": "100%",
            "zIndex": 1,
            "appName": "RefCommonsMA"
        }, {
            "paddingInPixel": false
        }, {});
        flxMaxTemp.setDefaultUnit(voltmx.flex.DP);
        var lblMaxTemp = new voltmx.ui.Label({
            "id": "lblMaxTemp",
            "isVisible": true,
            "left": "0dp",
            "skin": "sknLblDescription",
            "text": "Max.Temp",
            "textStyle": {},
            "top": "0dp",
            "width": "100dp",
            "zIndex": 1
        }, {
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {
            "renderAsAnchor": false,
            "textCopyable": false
        });
        var lblMaxTempValue = new voltmx.ui.Label({
            "id": "lblMaxTempValue",
            "isVisible": true,
            "left": "0dp",
            "skin": "sknLblDescription",
            "text": "30.5",
            "textStyle": {},
            "top": "0dp",
            "width": voltmx.flex.USE_PREFERRED_SIZE,
            "zIndex": 1
        }, {
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {
            "renderAsAnchor": false,
            "textCopyable": false
        });
        flxMaxTemp.add(lblMaxTemp, lblMaxTempValue);
        var flxDescription = new voltmx.ui.FlexContainer({
            "autogrowMode": voltmx.flex.AUTOGROW_NONE,
            "clipBounds": false,
            "height": "20dp",
            "id": "flxDescription",
            "isVisible": true,
            "layoutType": voltmx.flex.FLOW_HORIZONTAL,
            "left": "0dp",
            "isModalContainer": false,
            "skin": "slFbox",
            "top": "5dp",
            "width": "100%",
            "zIndex": 1,
            "appName": "RefCommonsMA"
        }, {
            "paddingInPixel": false
        }, {});
        flxDescription.setDefaultUnit(voltmx.flex.DP);
        var lblDescription = new voltmx.ui.Label({
            "id": "lblDescription",
            "isVisible": true,
            "left": "0dp",
            "skin": "sknLblDescription",
            "text": "Description",
            "textStyle": {},
            "top": "0dp",
            "width": "100dp",
            "zIndex": 1
        }, {
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {
            "renderAsAnchor": false,
            "textCopyable": false
        });
        var lblDescriptionValue = new voltmx.ui.Label({
            "id": "lblDescriptionValue",
            "isVisible": true,
            "left": "0dp",
            "skin": "sknLblDescription",
            "text": "Cloudy",
            "textStyle": {},
            "top": "0dp",
            "width": voltmx.flex.USE_PREFERRED_SIZE,
            "zIndex": 1
        }, {
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {
            "renderAsAnchor": false,
            "textCopyable": false
        });
        flxDescription.add(lblDescription, lblDescriptionValue);
        var flxState = new voltmx.ui.FlexContainer({
            "autogrowMode": voltmx.flex.AUTOGROW_NONE,
            "clipBounds": false,
            "height": "20dp",
            "id": "flxState",
            "isVisible": true,
            "layoutType": voltmx.flex.FLOW_HORIZONTAL,
            "left": "0dp",
            "isModalContainer": false,
            "skin": "slFbox",
            "top": "5dp",
            "width": "100%",
            "zIndex": 1,
            "appName": "RefCommonsMA"
        }, {
            "paddingInPixel": false
        }, {});
        flxState.setDefaultUnit(voltmx.flex.DP);
        var lblState = new voltmx.ui.Label({
            "id": "lblState",
            "isVisible": true,
            "left": "0dp",
            "skin": "sknLblDescription",
            "text": "State",
            "textStyle": {},
            "top": "0dp",
            "width": "100dp",
            "zIndex": 1
        }, {
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {
            "renderAsAnchor": false,
            "textCopyable": false
        });
        var lblStateValue = new voltmx.ui.Label({
            "id": "lblStateValue",
            "isVisible": true,
            "left": "0dp",
            "skin": "sknLblDescription",
            "text": "Telangana",
            "textStyle": {},
            "top": "0dp",
            "width": voltmx.flex.USE_PREFERRED_SIZE,
            "zIndex": 1
        }, {
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {
            "renderAsAnchor": false,
            "textCopyable": false
        });
        flxState.add(lblState, lblStateValue);
        var flxCountry = new voltmx.ui.FlexContainer({
            "autogrowMode": voltmx.flex.AUTOGROW_NONE,
            "clipBounds": false,
            "height": "20dp",
            "id": "flxCountry",
            "isVisible": true,
            "layoutType": voltmx.flex.FLOW_HORIZONTAL,
            "left": "0dp",
            "isModalContainer": false,
            "skin": "slFbox",
            "top": "5dp",
            "width": "100%",
            "zIndex": 1,
            "appName": "RefCommonsMA"
        }, {
            "paddingInPixel": false
        }, {});
        flxCountry.setDefaultUnit(voltmx.flex.DP);
        var lblCountry = new voltmx.ui.Label({
            "id": "lblCountry",
            "isVisible": true,
            "left": "0dp",
            "skin": "sknLblDescription",
            "text": "Country",
            "textStyle": {},
            "top": "0dp",
            "width": "100dp",
            "zIndex": 1
        }, {
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {
            "renderAsAnchor": false,
            "textCopyable": false
        });
        var lblCountryValue = new voltmx.ui.Label({
            "id": "lblCountryValue",
            "isVisible": true,
            "left": "0dp",
            "skin": "sknLblDescription",
            "text": "India",
            "textStyle": {},
            "top": "0dp",
            "width": voltmx.flex.USE_PREFERRED_SIZE,
            "zIndex": 1
        }, {
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {
            "renderAsAnchor": false,
            "textCopyable": false
        });
        flxCountry.add(lblCountry, lblCountryValue);
        flxWeatherDetails.add(flxMinTemp, flxMaxTemp, flxDescription, flxState, flxCountry);
        flxMapWeatherCallout.add(imgWeather, flxWeatherDetails);
        return flxMapWeatherCallout;
    }
});
define("RefEComplaintsMA/flxSampleRowTemplate", [],function() {
    return function(controller) {
        var flxSampleRowTemplate = new voltmx.ui.FlexContainer({
            "autogrowMode": voltmx.flex.AUTOGROW_NONE,
            "clipBounds": true,
            "height": "75dp",
            "id": "flxSampleRowTemplate",
            "isVisible": true,
            "layoutType": voltmx.flex.FREE_FORM,
            "isModalContainer": false,
            "skin": "sknSampleRowTemplate",
            "width": "100%",
            "appName": "RefEComplaintsMA"
        }, {
            "paddingInPixel": false
        }, {});
        flxSampleRowTemplate.setDefaultUnit(voltmx.flex.DP);
        var lblHeading = new voltmx.ui.Label({
            "id": "lblHeading",
            "isVisible": true,
            "left": "4%",
            "maxWidth": "50%",
            "skin": "sknLblRowHeading",
            "text": "Heading",
            "textStyle": {},
            "top": "8.00%",
            "width": "45%",
            "zIndex": 1
        }, {
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {
            "renderAsAnchor": false,
            "textCopyable": false
        });
        var lblDescription = new voltmx.ui.Label({
            "bottom": "10%",
            "id": "lblDescription",
            "isVisible": true,
            "left": "4%",
            "maxNumberOfLines": 3,
            "maxWidth": "70%",
            "skin": "sknLblDescription",
            "text": "Sub-Heading",
            "textStyle": {},
            "textTruncatePosition": constants.TEXT_TRUNCATE_NONE,
            "top": "42%",
            "width": "70%",
            "zIndex": 1
        }, {
            "contentAlignment": constants.CONTENT_ALIGN_TOP_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {
            "renderAsAnchor": false,
            "textCopyable": false
        });
        var lblTime = new voltmx.ui.Label({
            "id": "lblTime",
            "isVisible": true,
            "right": "9%",
            "skin": "sknLblTimeStamp",
            "text": "Timestamp",
            "textStyle": {},
            "top": "10%",
            "width": voltmx.flex.USE_PREFERRED_SIZE,
            "zIndex": 1
        }, {
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {
            "renderAsAnchor": false,
            "textCopyable": false
        });
        var lblStrip = new voltmx.ui.Label({
            "height": "100%",
            "id": "lblStrip",
            "isVisible": true,
            "left": "0dp",
            "maxWidth": "1%",
            "skin": "sknLblStrip",
            "textStyle": {},
            "top": "0dp",
            "width": voltmx.flex.USE_PREFERRED_SIZE,
            "zIndex": 1
        }, {
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {
            "renderAsAnchor": false,
            "textCopyable": false
        });
        flxSampleRowTemplate.add(lblHeading, lblDescription, lblTime, lblStrip);
        return flxSampleRowTemplate;
    }
});
define("RefEComplaintsMA/flxSectionHeaderTemplate", [],function() {
    return function(controller) {
        var flxSectionHeaderTemplate = new voltmx.ui.FlexContainer({
            "autogrowMode": voltmx.flex.AUTOGROW_NONE,
            "clipBounds": true,
            "height": "45dp",
            "id": "flxSectionHeaderTemplate",
            "isVisible": true,
            "layoutType": voltmx.flex.FREE_FORM,
            "isModalContainer": false,
            "skin": "sknSampleSectionHeaderTemplate",
            "width": "100%",
            "appName": "RefEComplaintsMA"
        }, {
            "paddingInPixel": false
        }, {});
        flxSectionHeaderTemplate.setDefaultUnit(voltmx.flex.DP);
        var lblHeading = new voltmx.ui.Label({
            "centerY": "50%",
            "id": "lblHeading",
            "isVisible": true,
            "left": "4%",
            "maxWidth": "50%",
            "skin": "sknSectionHeaderLabelSkin",
            "text": "Heading",
            "textStyle": {},
            "width": "75%",
            "zIndex": 1
        }, {
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {
            "renderAsAnchor": false,
            "textCopyable": false
        });
        flxSectionHeaderTemplate.add(lblHeading);
        return flxSectionHeaderTemplate;
    }
});
define("RefERequestsMA/flxSampleRowTemplate", [],function() {
    return function(controller) {
        var flxSampleRowTemplate = new voltmx.ui.FlexContainer({
            "autogrowMode": voltmx.flex.AUTOGROW_NONE,
            "clipBounds": true,
            "height": "75dp",
            "id": "flxSampleRowTemplate",
            "isVisible": true,
            "layoutType": voltmx.flex.FREE_FORM,
            "isModalContainer": false,
            "skin": "sknSampleRowTemplate",
            "width": "100%",
            "appName": "RefERequestsMA"
        }, {
            "paddingInPixel": false
        }, {});
        flxSampleRowTemplate.setDefaultUnit(voltmx.flex.DP);
        var lblHeading = new voltmx.ui.Label({
            "id": "lblHeading",
            "isVisible": true,
            "left": "4%",
            "maxWidth": "50%",
            "skin": "sknLblRowHeading",
            "text": "Heading",
            "textStyle": {},
            "top": "8.00%",
            "width": "45%",
            "zIndex": 1
        }, {
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {
            "renderAsAnchor": false,
            "textCopyable": false
        });
        var lblDescription = new voltmx.ui.Label({
            "bottom": "10%",
            "id": "lblDescription",
            "isVisible": true,
            "left": "4%",
            "maxNumberOfLines": 3,
            "maxWidth": "70%",
            "skin": "sknLblDescription",
            "text": "Sub-Heading",
            "textStyle": {},
            "textTruncatePosition": constants.TEXT_TRUNCATE_NONE,
            "top": "42%",
            "width": "70%",
            "zIndex": 1
        }, {
            "contentAlignment": constants.CONTENT_ALIGN_TOP_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {
            "renderAsAnchor": false,
            "textCopyable": false
        });
        var lblTime = new voltmx.ui.Label({
            "id": "lblTime",
            "isVisible": true,
            "right": "9%",
            "skin": "sknLblTimeStamp",
            "text": "Timestamp",
            "textStyle": {},
            "top": "10%",
            "width": voltmx.flex.USE_PREFERRED_SIZE,
            "zIndex": 1
        }, {
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {
            "renderAsAnchor": false,
            "textCopyable": false
        });
        var lblStrip = new voltmx.ui.Label({
            "height": "100%",
            "id": "lblStrip",
            "isVisible": true,
            "left": "0dp",
            "maxWidth": "1%",
            "skin": "sknLblStrip",
            "textStyle": {},
            "top": "0dp",
            "width": voltmx.flex.USE_PREFERRED_SIZE,
            "zIndex": 1
        }, {
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {
            "renderAsAnchor": false,
            "textCopyable": false
        });
        flxSampleRowTemplate.add(lblHeading, lblDescription, lblTime, lblStrip);
        return flxSampleRowTemplate;
    }
});
define("RefERequestsMA/flxSectionHeaderTemplate", [],function() {
    return function(controller) {
        var flxSectionHeaderTemplate = new voltmx.ui.FlexContainer({
            "autogrowMode": voltmx.flex.AUTOGROW_NONE,
            "clipBounds": true,
            "height": "45dp",
            "id": "flxSectionHeaderTemplate",
            "isVisible": true,
            "layoutType": voltmx.flex.FREE_FORM,
            "isModalContainer": false,
            "skin": "sknSampleSectionHeaderTemplate",
            "width": "100%",
            "appName": "RefERequestsMA"
        }, {
            "paddingInPixel": false
        }, {});
        flxSectionHeaderTemplate.setDefaultUnit(voltmx.flex.DP);
        var lblHeading = new voltmx.ui.Label({
            "centerY": "50%",
            "id": "lblHeading",
            "isVisible": true,
            "left": "4%",
            "maxWidth": "50%",
            "skin": "sknSectionHeaderLabelSkin",
            "text": "Heading",
            "textStyle": {},
            "width": "75%",
            "zIndex": 1
        }, {
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {
            "renderAsAnchor": false,
            "textCopyable": false
        });
        flxSectionHeaderTemplate.add(lblHeading);
        return flxSectionHeaderTemplate;
    }
});
define("RefGovtCitizenSA/flxSampleRowTemplate", [],function() {
    return function(controller) {
        var flxSampleRowTemplate = new voltmx.ui.FlexContainer({
            "autogrowMode": voltmx.flex.AUTOGROW_NONE,
            "clipBounds": true,
            "height": "75dp",
            "id": "flxSampleRowTemplate",
            "isVisible": true,
            "layoutType": voltmx.flex.FREE_FORM,
            "isModalContainer": false,
            "skin": "sknSampleRowTemplate",
            "width": "100%",
            "appName": "RefGovtCitizenSA"
        }, {
            "paddingInPixel": false
        }, {});
        flxSampleRowTemplate.setDefaultUnit(voltmx.flex.DP);
        var lblHeading = new voltmx.ui.Label({
            "id": "lblHeading",
            "isVisible": true,
            "left": "4%",
            "maxWidth": "50%",
            "skin": "sknLblRowHeading",
            "text": "Heading",
            "textStyle": {},
            "top": "8.00%",
            "width": "45%",
            "zIndex": 1
        }, {
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {
            "renderAsAnchor": false,
            "textCopyable": false
        });
        var lblDescription = new voltmx.ui.Label({
            "bottom": "10%",
            "id": "lblDescription",
            "isVisible": true,
            "left": "4%",
            "maxNumberOfLines": 3,
            "maxWidth": "70%",
            "skin": "sknLblDescription",
            "text": "Sub-Heading",
            "textStyle": {},
            "textTruncatePosition": constants.TEXT_TRUNCATE_NONE,
            "top": "42%",
            "width": "70%",
            "zIndex": 1
        }, {
            "contentAlignment": constants.CONTENT_ALIGN_TOP_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {
            "renderAsAnchor": false,
            "textCopyable": false
        });
        var lblTime = new voltmx.ui.Label({
            "id": "lblTime",
            "isVisible": true,
            "right": "9%",
            "skin": "sknLblTimeStamp",
            "text": "Timestamp",
            "textStyle": {},
            "top": "10%",
            "width": voltmx.flex.USE_PREFERRED_SIZE,
            "zIndex": 1
        }, {
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {
            "renderAsAnchor": false,
            "textCopyable": false
        });
        var lblStrip = new voltmx.ui.Label({
            "height": "100%",
            "id": "lblStrip",
            "isVisible": true,
            "left": "0dp",
            "maxWidth": "1%",
            "skin": "sknLblStrip",
            "textStyle": {},
            "top": "0dp",
            "width": voltmx.flex.USE_PREFERRED_SIZE,
            "zIndex": 1
        }, {
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {
            "renderAsAnchor": false,
            "textCopyable": false
        });
        flxSampleRowTemplate.add(lblHeading, lblDescription, lblTime, lblStrip);
        return flxSampleRowTemplate;
    }
});
define("RefGovtCitizenSA/flxSectionHeaderTemplate", [],function() {
    return function(controller) {
        var flxSectionHeaderTemplate = new voltmx.ui.FlexContainer({
            "autogrowMode": voltmx.flex.AUTOGROW_NONE,
            "clipBounds": true,
            "height": "45dp",
            "id": "flxSectionHeaderTemplate",
            "isVisible": true,
            "layoutType": voltmx.flex.FREE_FORM,
            "isModalContainer": false,
            "skin": "sknSampleSectionHeaderTemplate",
            "width": "100%",
            "appName": "RefGovtCitizenSA"
        }, {
            "paddingInPixel": false
        }, {});
        flxSectionHeaderTemplate.setDefaultUnit(voltmx.flex.DP);
        var lblHeading = new voltmx.ui.Label({
            "centerY": "50%",
            "id": "lblHeading",
            "isVisible": true,
            "left": "4%",
            "maxWidth": "50%",
            "skin": "sknSectionHeaderLabelSkin",
            "text": "Heading",
            "textStyle": {},
            "width": "75%",
            "zIndex": 1
        }, {
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {
            "renderAsAnchor": false,
            "textCopyable": false
        });
        flxSectionHeaderTemplate.add(lblHeading);
        return flxSectionHeaderTemplate;
    }
});
define("RefCommonsMA/userflxSampleRowTemplateController", {
    //Type your controller code here 
});
define("RefCommonsMA/flxSampleRowTemplateControllerActions", {
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
});
define("RefCommonsMA/flxSampleRowTemplateController", ["RefCommonsMA/userflxSampleRowTemplateController", "RefCommonsMA/flxSampleRowTemplateControllerActions"], function() {
    var controller = require("RefCommonsMA/userflxSampleRowTemplateController");
    var controllerActions = ["RefCommonsMA/flxSampleRowTemplateControllerActions"];
    return voltmx.visualizer.mixinControllerActions(controller, controllerActions);
});

define("RefCommonsMA/userflxSectionHeaderTemplateController", {
    //Type your controller code here 
});
define("RefCommonsMA/flxSectionHeaderTemplateControllerActions", {
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
});
define("RefCommonsMA/flxSectionHeaderTemplateController", ["RefCommonsMA/userflxSectionHeaderTemplateController", "RefCommonsMA/flxSectionHeaderTemplateControllerActions"], function() {
    var controller = require("RefCommonsMA/userflxSectionHeaderTemplateController");
    var controllerActions = ["RefCommonsMA/flxSectionHeaderTemplateControllerActions"];
    return voltmx.visualizer.mixinControllerActions(controller, controllerActions);
});

define("RefCommonsMA/userflxSegCategoriesController", {
    //Type your controller code here 
});
define("RefCommonsMA/flxSegCategoriesControllerActions", {
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
});
define("RefCommonsMA/flxSegCategoriesController", ["RefCommonsMA/userflxSegCategoriesController", "RefCommonsMA/flxSegCategoriesControllerActions"], function() {
    var controller = require("RefCommonsMA/userflxSegCategoriesController");
    var controllerActions = ["RefCommonsMA/flxSegCategoriesControllerActions"];
    return voltmx.visualizer.mixinControllerActions(controller, controllerActions);
});

define("RefCommonsMA/userflxSegRowRecordController", {
    //Type your controller code here 
});
define("RefCommonsMA/flxSegRowRecordControllerActions", {
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
});
define("RefCommonsMA/flxSegRowRecordController", ["RefCommonsMA/userflxSegRowRecordController", "RefCommonsMA/flxSegRowRecordControllerActions"], function() {
    var controller = require("RefCommonsMA/userflxSegRowRecordController");
    var controllerActions = ["RefCommonsMA/flxSegRowRecordControllerActions"];
    return voltmx.visualizer.mixinControllerActions(controller, controllerActions);
});

define("RefCommonsMA/userflxSegRowWithImageAndLabelController", {
    //Type your controller code here 
});
define("RefCommonsMA/flxSegRowWithImageAndLabelControllerActions", {
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
});
define("RefCommonsMA/flxSegRowWithImageAndLabelController", ["RefCommonsMA/userflxSegRowWithImageAndLabelController", "RefCommonsMA/flxSegRowWithImageAndLabelControllerActions"], function() {
    var controller = require("RefCommonsMA/userflxSegRowWithImageAndLabelController");
    var controllerActions = ["RefCommonsMA/flxSegRowWithImageAndLabelControllerActions"];
    return voltmx.visualizer.mixinControllerActions(controller, controllerActions);
});

define("RefCommonsMA/userflxSegWithImageAndLabelController", {
    //Type your controller code here 
});
define("RefCommonsMA/flxSegWithImageAndLabelControllerActions", {
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
});
define("RefCommonsMA/flxSegWithImageAndLabelController", ["RefCommonsMA/userflxSegWithImageAndLabelController", "RefCommonsMA/flxSegWithImageAndLabelControllerActions"], function() {
    var controller = require("RefCommonsMA/userflxSegWithImageAndLabelController");
    var controllerActions = ["RefCommonsMA/flxSegWithImageAndLabelControllerActions"];
    return voltmx.visualizer.mixinControllerActions(controller, controllerActions);
});

define("RefCommonsMA/userflxMapWeatherCalloutController", {
    //Type your controller code here 
});
define("RefCommonsMA/flxMapWeatherCalloutControllerActions", {
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
});
define("RefCommonsMA/flxMapWeatherCalloutController", ["RefCommonsMA/userflxMapWeatherCalloutController", "RefCommonsMA/flxMapWeatherCalloutControllerActions"], function() {
    var controller = require("RefCommonsMA/userflxMapWeatherCalloutController");
    var controllerActions = ["RefCommonsMA/flxMapWeatherCalloutControllerActions"];
    return voltmx.visualizer.mixinControllerActions(controller, controllerActions);
});

define("RefEComplaintsMA/userflxSampleRowTemplateController", {
    //Type your controller code here 
});
define("RefEComplaintsMA/flxSampleRowTemplateControllerActions", {
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
});
define("RefEComplaintsMA/flxSampleRowTemplateController", ["RefEComplaintsMA/userflxSampleRowTemplateController", "RefEComplaintsMA/flxSampleRowTemplateControllerActions"], function() {
    var controller = require("RefEComplaintsMA/userflxSampleRowTemplateController");
    var controllerActions = ["RefEComplaintsMA/flxSampleRowTemplateControllerActions"];
    return voltmx.visualizer.mixinControllerActions(controller, controllerActions);
});

define("RefEComplaintsMA/userflxSectionHeaderTemplateController", {
    //Type your controller code here 
});
define("RefEComplaintsMA/flxSectionHeaderTemplateControllerActions", {
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
});
define("RefEComplaintsMA/flxSectionHeaderTemplateController", ["RefEComplaintsMA/userflxSectionHeaderTemplateController", "RefEComplaintsMA/flxSectionHeaderTemplateControllerActions"], function() {
    var controller = require("RefEComplaintsMA/userflxSectionHeaderTemplateController");
    var controllerActions = ["RefEComplaintsMA/flxSectionHeaderTemplateControllerActions"];
    return voltmx.visualizer.mixinControllerActions(controller, controllerActions);
});

define("RefERequestsMA/userflxSampleRowTemplateController", {
    //Type your controller code here 
});
define("RefERequestsMA/flxSampleRowTemplateControllerActions", {
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
});
define("RefERequestsMA/flxSampleRowTemplateController", ["RefERequestsMA/userflxSampleRowTemplateController", "RefERequestsMA/flxSampleRowTemplateControllerActions"], function() {
    var controller = require("RefERequestsMA/userflxSampleRowTemplateController");
    var controllerActions = ["RefERequestsMA/flxSampleRowTemplateControllerActions"];
    return voltmx.visualizer.mixinControllerActions(controller, controllerActions);
});

define("RefERequestsMA/userflxSectionHeaderTemplateController", {
    //Type your controller code here 
});
define("RefERequestsMA/flxSectionHeaderTemplateControllerActions", {
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
});
define("RefERequestsMA/flxSectionHeaderTemplateController", ["RefERequestsMA/userflxSectionHeaderTemplateController", "RefERequestsMA/flxSectionHeaderTemplateControllerActions"], function() {
    var controller = require("RefERequestsMA/userflxSectionHeaderTemplateController");
    var controllerActions = ["RefERequestsMA/flxSectionHeaderTemplateControllerActions"];
    return voltmx.visualizer.mixinControllerActions(controller, controllerActions);
});

define("RefGovtCitizenSA/userflxSampleRowTemplateController", {
    //Type your controller code here 
});
define("RefGovtCitizenSA/flxSampleRowTemplateControllerActions", {
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
});
define("RefGovtCitizenSA/flxSampleRowTemplateController", ["RefGovtCitizenSA/userflxSampleRowTemplateController", "RefGovtCitizenSA/flxSampleRowTemplateControllerActions"], function() {
    var controller = require("RefGovtCitizenSA/userflxSampleRowTemplateController");
    var controllerActions = ["RefGovtCitizenSA/flxSampleRowTemplateControllerActions"];
    return voltmx.visualizer.mixinControllerActions(controller, controllerActions);
});

define("RefGovtCitizenSA/userflxSectionHeaderTemplateController", {
    //Type your controller code here 
});
define("RefGovtCitizenSA/flxSectionHeaderTemplateControllerActions", {
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
});
define("RefGovtCitizenSA/flxSectionHeaderTemplateController", ["RefGovtCitizenSA/userflxSectionHeaderTemplateController", "RefGovtCitizenSA/flxSectionHeaderTemplateControllerActions"], function() {
    var controller = require("RefGovtCitizenSA/userflxSectionHeaderTemplateController");
    var controllerActions = ["RefGovtCitizenSA/flxSectionHeaderTemplateControllerActions"];
    return voltmx.visualizer.mixinControllerActions(controller, controllerActions);
});

define("RefCommonsMA/navigation/NavigationModel", { 
    "Application": {},
    "Forms" : {},
    "UIModules" : {}
});
define("RefCommonsMA/navigation/NavigationController", {
    //Add your navigation controller code here.
});

define("RefEComplaintsMA/navigation/NavigationModel", { 
    "Application": {},
    "Forms" : {},
    "UIModules" : {}
});
define("RefEComplaintsMA/navigation/NavigationController", {
    //Add your navigation controller code here.
});

define("RefERequestsMA/navigation/NavigationModel", { 
    "Application": {},
    "Forms" : {},
    "UIModules" : {}
});
define("RefERequestsMA/navigation/NavigationController", {
    //Add your navigation controller code here.
});

define("RefGovtCitizenSA/navigation/NavigationModel", { 
    "Application": {},
    "Forms" : {},
    "UIModules" : {}
});
define("RefGovtCitizenSA/navigation/NavigationController", {
    //Add your navigation controller code here.
});

require(['applicationController','com/hclacademy/categories/categoriesController','com/hclacademy/categories/categories','com/hclacademy/createcomplaintorrequest/createcomplaintorrequestController','com/hclacademy/createcomplaintorrequest/createcomplaintorrequest','com/hclacademy/createcomplaintorrequest/createcomplaintorrequestConfig','com/hclacademy/custombuttonwithimageandtext/custombuttonwithimageandtextController','com/hclacademy/custombuttonwithimageandtext/custombuttonwithimageandtext','com/hclacademy/formheader/formheaderController','com/hclacademy/formheader/formheader','com/hclacademy/hamburgermenu/hamburgermenuController','com/hclacademy/hamburgermenu/hamburgermenu','com/hclacademy/infoalert/infoalertController','com/hclacademy/infoalert/infoalert','com/hclacademy/newsarticles/newsarticlesController','com/hclacademy/newsarticles/newsarticles','com/hclacademy/userinput/userinputController','com/hclacademy/userinput/userinput','RefCommonsMA/flxSampleRowTemplate','RefCommonsMA/flxSectionHeaderTemplate','RefCommonsMA/flxSegCategories','RefCommonsMA/flxSegRowRecord','RefCommonsMA/flxSegRowWithImageAndLabel','RefCommonsMA/flxSegWithImageAndLabel','RefCommonsMA/flxMapWeatherCallout','RefEComplaintsMA/flxSampleRowTemplate','RefEComplaintsMA/flxSectionHeaderTemplate','RefERequestsMA/flxSampleRowTemplate','RefERequestsMA/flxSectionHeaderTemplate','RefGovtCitizenSA/flxSampleRowTemplate','RefGovtCitizenSA/flxSectionHeaderTemplate','RefCommonsMA/flxSampleRowTemplateController','RefCommonsMA/flxSectionHeaderTemplateController','RefCommonsMA/flxSegCategoriesController','RefCommonsMA/flxSegRowRecordController','RefCommonsMA/flxSegRowWithImageAndLabelController','RefCommonsMA/flxSegWithImageAndLabelController','RefCommonsMA/flxMapWeatherCalloutController','RefEComplaintsMA/flxSampleRowTemplateController','RefEComplaintsMA/flxSectionHeaderTemplateController','RefERequestsMA/flxSampleRowTemplateController','RefERequestsMA/flxSectionHeaderTemplateController','RefGovtCitizenSA/flxSampleRowTemplateController','RefGovtCitizenSA/flxSectionHeaderTemplateController','RefCommonsMA/navigation/NavigationModel','RefCommonsMA/navigation/NavigationController','RefEComplaintsMA/navigation/NavigationModel','RefEComplaintsMA/navigation/NavigationController','RefERequestsMA/navigation/NavigationModel','RefERequestsMA/navigation/NavigationController','RefGovtCitizenSA/navigation/NavigationModel','RefGovtCitizenSA/navigation/NavigationController'], function(){});
define("sparequirefileslist", function(){});

