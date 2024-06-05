define({
    appInit: function(params) {
        skinsInit();
        if (voltmx.store.getItem("LOGS_FOR_CHILDAPP") === true) {
            redirectKonyPrintFP();
            subscribeLogListenerFP();
        }
        voltmx.application.setApplicationBehaviors({
            "enableLoggerFramework": true,
            "disabledFrameworkLogTypes": [voltmx.logger.logLevel.DEBUG.value]
        });
        voltmx.application.setCheckBoxSelectionImageAlignment(constants.CHECKBOX_SELECTION_IMAGE_ALIGNMENT_RIGHT);
        voltmx.application.setDefaultTextboxPadding(false);
        voltmx.application.setRespectImageSizeForImageWidgetAlignment(true);
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
    postAppInitCallBack: function(eventObj) {
        apppostappinitFuncPreview();
    },
    appmenuseq: function() {
        new voltmx.mvc.Navigation({
            "friendlyName": "frmLogin",
            "appName": "RefGovtCitizenSA"
        }).navigate();
    }
});