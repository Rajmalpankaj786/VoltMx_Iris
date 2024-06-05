define("RefERequestsMA/frmERequestsFetch", function() {
    return function(controller) {
        function addWidgetsfrmERequestsFetch() {
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
                        "text": "Requests"
                    }
                }
            }, {
                "paddingInPixel": false,
                "overrides": {}
            }, {
                "overrides": {}
            });
            formheader.imgBack.onTouchEnd = controller.AS_Image_a485d184e23d41c7a18df6ecbd3db96f;
            formheader.imgMenu.onTouchEnd = controller.AS_Image_e61503b5b0964d9f9c10128c527a8f86;
            var segPreviousRequests = new voltmx.ui.SegmentedUI2({
                "autogrowMode": voltmx.flex.AUTOGROW_NONE,
                "centerX": "50%",
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
                "id": "segPreviousRequests",
                "isVisible": true,
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
                "appName": "RefERequestsMA"
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
            hamburgermenu.segMenu.onRowClick = controller.AS_Segment_f9089078f0be4c7f914411969afee867;
            this.add(formheader, segPreviousRequests, hamburgermenu);
        };
        return [{
            "addWidgets": addWidgetsfrmERequestsFetch,
            "enabledForIdleTimeout": false,
            "id": "frmERequestsFetch",
            "layoutType": voltmx.flex.FREE_FORM,
            "needAppMenu": false,
            "postShow": controller.AS_Form_h669fea56895494c9b76e115c5c8b046,
            "skin": "sknFrm1",
            "appName": "RefERequestsMA",
            "info": {
                "kuid": "ab688e7f3d64437aaf58aeda499928d0"
            }
        }, {
            "displayOrientation": constants.FORM_DISPLAY_ORIENTATION_PORTRAIT,
            "layoutType": voltmx.flex.FREE_FORM,
            "paddingInPixel": false
        }, {
            "retainScrollPosition": false
        }]
    }
});