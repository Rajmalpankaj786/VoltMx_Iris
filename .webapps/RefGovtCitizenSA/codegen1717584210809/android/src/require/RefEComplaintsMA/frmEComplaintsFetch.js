define("RefEComplaintsMA/frmEComplaintsFetch", function() {
    return function(controller) {
        function addWidgetsfrmEComplaintsFetch() {
            this.setDefaultUnit(voltmx.flex.DP);
            var formheader = new com.hclacademy.formheader({
                "autogrowMode": voltmx.flex.AUTOGROW_NONE,
                "height": "10%",
                "id": "formheader",
                "isVisible": true,
                "layoutType": voltmx.flex.FREE_FORM,
                "left": "0dp",
                "masterType": constants.MASTER_TYPE_DEFAULT,
                "isModalContainer": false,
                "skin": "slFbox",
                "top": "0dp",
                "width": "100%",
                "zIndex": 1,
                "appName": "RefCommonsMA",
                "overrides": {
                    "flxProfilePhoto": {
                        "isVisible": false
                    },
                    "imgBack": {
                        "right": 5
                    },
                    "lblCompanyName": {
                        "text": "Complaints"
                    }
                }
            }, {
                "paddingInPixel": false,
                "overrides": {}
            }, {
                "overrides": {}
            });
            formheader.imgBack.onTouchEnd = controller.AS_Image_fd5cf2814d904502ad174e48d7d8c66f;
            formheader.imgMenu.onTouchEnd = controller.AS_Image_d8684756152740ac812611f2625b76e4;
            var segPreviousComplaints = new voltmx.ui.SegmentedUI2({
                "autogrowMode": voltmx.flex.AUTOGROW_NONE,
                "data": [{
                    "lblAddress": "Address",
                    "lblAddressValue": "Mayurinagar, Miyapur, Hyderabad",
                    "lblAssignedTo": "Assigned to",
                    "lblAssignedToValue": "GHMC-Electrical",
                    "lblCategory": "Category Name",
                    "lblCategoryValue": "Electrical",
                    "lblCreateDateTime": "Created Date and Time",
                    "lblCreateDateTimeValue": "2023-02-10 09:49:37.085",
                    "lblCreatedBy": "Status",
                    "lblCreatedByValue": "Open",
                    "lblDescription": "Description",
                    "lblDescriptionValue": "Street lights not working",
                    "lblID": "ID",
                    "lblIDValue": "1",
                    "lblStatus": "Status",
                    "lblStatusValue": "Open"
                }, {
                    "lblAddress": "Address",
                    "lblAddressValue": "Mayurinagar, Miyapur, Hyderabad",
                    "lblAssignedTo": "Assigned to",
                    "lblAssignedToValue": "GHMC-Electrical",
                    "lblCategory": "Category Name",
                    "lblCategoryValue": "Electrical",
                    "lblCreateDateTime": "Created Date and Time",
                    "lblCreateDateTimeValue": "2023-02-10 09:49:37.085",
                    "lblCreatedBy": "Status",
                    "lblCreatedByValue": "Open",
                    "lblDescription": "Description",
                    "lblDescriptionValue": "Street lights not working",
                    "lblID": "ID",
                    "lblIDValue": "1",
                    "lblStatus": "Status",
                    "lblStatusValue": "Open"
                }, {
                    "lblAddress": "Address",
                    "lblAddressValue": "Mayurinagar, Miyapur, Hyderabad",
                    "lblAssignedTo": "Assigned to",
                    "lblAssignedToValue": "GHMC-Electrical",
                    "lblCategory": "Category Name",
                    "lblCategoryValue": "Electrical",
                    "lblCreateDateTime": "Created Date and Time",
                    "lblCreateDateTimeValue": "2023-02-10 09:49:37.085",
                    "lblCreatedBy": "Status",
                    "lblCreatedByValue": "Open",
                    "lblDescription": "Description",
                    "lblDescriptionValue": "Street lights not working",
                    "lblID": "ID",
                    "lblIDValue": "1",
                    "lblStatus": "Status",
                    "lblStatusValue": "Open"
                }, {
                    "lblAddress": "Address",
                    "lblAddressValue": "Mayurinagar, Miyapur, Hyderabad",
                    "lblAssignedTo": "Assigned to",
                    "lblAssignedToValue": "GHMC-Electrical",
                    "lblCategory": "Category Name",
                    "lblCategoryValue": "Electrical",
                    "lblCreateDateTime": "Created Date and Time",
                    "lblCreateDateTimeValue": "2023-02-10 09:49:37.085",
                    "lblCreatedBy": "Status",
                    "lblCreatedByValue": "Open",
                    "lblDescription": "Description",
                    "lblDescriptionValue": "Street lights not working",
                    "lblID": "ID",
                    "lblIDValue": "1",
                    "lblStatus": "Status",
                    "lblStatusValue": "Open"
                }, {
                    "lblAddress": "Address",
                    "lblAddressValue": "Mayurinagar, Miyapur, Hyderabad",
                    "lblAssignedTo": "Assigned to",
                    "lblAssignedToValue": "GHMC-Electrical",
                    "lblCategory": "Category Name",
                    "lblCategoryValue": "Electrical",
                    "lblCreateDateTime": "Created Date and Time",
                    "lblCreateDateTimeValue": "2023-02-10 09:49:37.085",
                    "lblCreatedBy": "Status",
                    "lblCreatedByValue": "Open",
                    "lblDescription": "Description",
                    "lblDescriptionValue": "Street lights not working",
                    "lblID": "ID",
                    "lblIDValue": "1",
                    "lblStatus": "Status",
                    "lblStatusValue": "Open"
                }, {
                    "lblAddress": "Address",
                    "lblAddressValue": "Mayurinagar, Miyapur, Hyderabad",
                    "lblAssignedTo": "Assigned to",
                    "lblAssignedToValue": "GHMC-Electrical",
                    "lblCategory": "Category Name",
                    "lblCategoryValue": "Electrical",
                    "lblCreateDateTime": "Created Date and Time",
                    "lblCreateDateTimeValue": "2023-02-10 09:49:37.085",
                    "lblCreatedBy": "Status",
                    "lblCreatedByValue": "Open",
                    "lblDescription": "Description",
                    "lblDescriptionValue": "Street lights not working",
                    "lblID": "ID",
                    "lblIDValue": "1",
                    "lblStatus": "Status",
                    "lblStatusValue": "Open"
                }, {
                    "lblAddress": "Address",
                    "lblAddressValue": "Mayurinagar, Miyapur, Hyderabad",
                    "lblAssignedTo": "Assigned to",
                    "lblAssignedToValue": "GHMC-Electrical",
                    "lblCategory": "Category Name",
                    "lblCategoryValue": "Electrical",
                    "lblCreateDateTime": "Created Date and Time",
                    "lblCreateDateTimeValue": "2023-02-10 09:49:37.085",
                    "lblCreatedBy": "Status",
                    "lblCreatedByValue": "Open",
                    "lblDescription": "Description",
                    "lblDescriptionValue": "Street lights not working",
                    "lblID": "ID",
                    "lblIDValue": "1",
                    "lblStatus": "Status",
                    "lblStatusValue": "Open"
                }, {
                    "lblAddress": "Address",
                    "lblAddressValue": "Mayurinagar, Miyapur, Hyderabad",
                    "lblAssignedTo": "Assigned to",
                    "lblAssignedToValue": "GHMC-Electrical",
                    "lblCategory": "Category Name",
                    "lblCategoryValue": "Electrical",
                    "lblCreateDateTime": "Created Date and Time",
                    "lblCreateDateTimeValue": "2023-02-10 09:49:37.085",
                    "lblCreatedBy": "Status",
                    "lblCreatedByValue": "Open",
                    "lblDescription": "Description",
                    "lblDescriptionValue": "Street lights not working",
                    "lblID": "ID",
                    "lblIDValue": "1",
                    "lblStatus": "Status",
                    "lblStatusValue": "Open"
                }, {
                    "lblAddress": "Address",
                    "lblAddressValue": "Mayurinagar, Miyapur, Hyderabad",
                    "lblAssignedTo": "Assigned to",
                    "lblAssignedToValue": "GHMC-Electrical",
                    "lblCategory": "Category Name",
                    "lblCategoryValue": "Electrical",
                    "lblCreateDateTime": "Created Date and Time",
                    "lblCreateDateTimeValue": "2023-02-10 09:49:37.085",
                    "lblCreatedBy": "Status",
                    "lblCreatedByValue": "Open",
                    "lblDescription": "Description",
                    "lblDescriptionValue": "Street lights not working",
                    "lblID": "ID",
                    "lblIDValue": "1",
                    "lblStatus": "Status",
                    "lblStatusValue": "Open"
                }, {
                    "lblAddress": "Address",
                    "lblAddressValue": "Mayurinagar, Miyapur, Hyderabad",
                    "lblAssignedTo": "Assigned to",
                    "lblAssignedToValue": "GHMC-Electrical",
                    "lblCategory": "Category Name",
                    "lblCategoryValue": "Electrical",
                    "lblCreateDateTime": "Created Date and Time",
                    "lblCreateDateTimeValue": "2023-02-10 09:49:37.085",
                    "lblCreatedBy": "Status",
                    "lblCreatedByValue": "Open",
                    "lblDescription": "Description",
                    "lblDescriptionValue": "Street lights not working",
                    "lblID": "ID",
                    "lblIDValue": "1",
                    "lblStatus": "Status",
                    "lblStatusValue": "Open"
                }],
                "groupCells": false,
                "height": "90%",
                "id": "segPreviousComplaints",
                "isVisible": true,
                "left": 0,
                "needPageIndicator": true,
                "pageOffDotImage": "pageoffdot.png",
                "pageOnDotImage": "pageondot.png",
                "retainSelection": false,
                "rowFocusSkin": "seg2Focus",
                "rowSkin": "sknSegTransparent",
                "rowTemplate": kony.mvc.resolveNameFromContext({
                    "appName": "RefCommonsMA",
                    "friendlyName": "flxSegRowRecord"
                }),
                "scrollingEvents": {},
                "sectionHeaderSkin": "sliPhoneSegmentHeader",
                "selectionBehavior": constants.SEGUI_DEFAULT_BEHAVIOR,
                "separatorColor": "aaaaaa00",
                "separatorRequired": true,
                "separatorThickness": 1,
                "showScrollbars": false,
                "top": "10%",
                "viewType": constants.SEGUI_VIEW_TYPE_TABLEVIEW,
                "widgetDataMap": {
                    "flxAddress": "flxAddress",
                    "flxAssignedTo": "flxAssignedTo",
                    "flxCategory": "flxCategory",
                    "flxCreatedBy": "flxCreatedBy",
                    "flxCreatedDateTime": "flxCreatedDateTime",
                    "flxDescription": "flxDescription",
                    "flxID": "flxID",
                    "flxSegRowRecord": "flxSegRowRecord",
                    "flxStatus": "flxStatus",
                    "lblAddress": "lblAddress",
                    "lblAddressValue": "lblAddressValue",
                    "lblAssignedTo": "lblAssignedTo",
                    "lblAssignedToValue": "lblAssignedToValue",
                    "lblCategory": "lblCategory",
                    "lblCategoryValue": "lblCategoryValue",
                    "lblCreateDateTime": "lblCreateDateTime",
                    "lblCreateDateTimeValue": "lblCreateDateTimeValue",
                    "lblCreatedBy": "lblCreatedBy",
                    "lblCreatedByValue": "lblCreatedByValue",
                    "lblDescription": "lblDescription",
                    "lblDescriptionValue": "lblDescriptionValue",
                    "lblID": "lblID",
                    "lblIDValue": "lblIDValue",
                    "lblStatus": "lblStatus",
                    "lblStatusValue": "lblStatusValue"
                },
                "width": "100%",
                "zIndex": 1,
                "appName": "RefEComplaintsMA"
            }, {
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {});
            var hamburgermenu = new com.hclacademy.hamburgermenu({
                "autogrowMode": voltmx.flex.AUTOGROW_NONE,
                "height": "100%",
                "id": "hamburgermenu",
                "isVisible": true,
                "layoutType": voltmx.flex.FREE_FORM,
                "left": "-90%",
                "masterType": constants.MASTER_TYPE_DEFAULT,
                "isModalContainer": false,
                "top": "0dp",
                "width": "80%",
                "zIndex": 1,
                "appName": "RefCommonsMA",
                "overrides": {}
            }, {
                "paddingInPixel": false,
                "overrides": {}
            }, {
                "overrides": {}
            });
            hamburgermenu.segMenu.onRowClick = controller.AS_Segment_f5e6363b195c4c438b29b154d981333a;
            this.add(formheader, segPreviousComplaints, hamburgermenu);
        };
        return [{
            "addWidgets": addWidgetsfrmEComplaintsFetch,
            "enabledForIdleTimeout": false,
            "id": "frmEComplaintsFetch",
            "layoutType": voltmx.flex.FREE_FORM,
            "needAppMenu": false,
            "postShow": controller.AS_Form_g18e135d74bd404b82a73d7fc136d534,
            "skin": "sknFrm1",
            "appName": "RefEComplaintsMA",
            "info": {
                "kuid": "aa29ac2e27804ffc8569cc83b4c9a43d"
            }
        }, {
            "displayOrientation": constants.FORM_DISPLAY_ORIENTATION_PORTRAIT,
            "layoutType": voltmx.flex.FREE_FORM,
            "paddingInPixel": false
        }, {
            "footerOverlap": false,
            "headerOverlap": false,
            "menuPosition": constants.FORM_MENU_POSITION_AFTER_APPMENU,
            "retainScrollPosition": false,
            "titleBar": true,
            "titleBarSkin": "slTitleBar",
            "windowSoftInputMode": constants.FORM_ADJUST_RESIZE
        }]
    }
});