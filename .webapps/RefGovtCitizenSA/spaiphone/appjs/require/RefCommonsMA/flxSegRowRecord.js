define("RefCommonsMA/flxSegRowRecord", function() {
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
})