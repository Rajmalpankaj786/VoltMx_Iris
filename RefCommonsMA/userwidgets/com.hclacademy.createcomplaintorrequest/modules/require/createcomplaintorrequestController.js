define(function() {

  return {

    /**
     * This object represents a new complaint 
     **/
    complaintOrRequestObject : {
      "CategoryID":"",
      "Name":"",
      "Phone":"",
      "Location":"",
      "Description":"",
      "Photo":"",
      "Status":"",
      "CreatedBy":"",
      "AssignedTo":""
    },

    /**
     * This funtion is preShow event handler of the component.
     * This function is executed everytime this component is rendered 
     * on any form and this function does UI related activities
     **/
    preShowHandler : function () {
      voltmx.print ("Entering into com.hclacademy.createcomplaintorrequest : preShowHandler");
      
      //#ifdef iphone
		this.view.camCapturePhoto.setVisibility(true);
      //#endif
      //#ifdef android
		this.view.camCapturePhoto.setVisibility(true);
      //#endif
      this.view.lblCapturePhoto.setVisibility(true);
      this.view.imgPhoto.setVisibility(false);
      this.view.inputName.tbxInput.text = "";
      this.view.inputDescription.tbxInput.text = "";
      this.view.inputLocation.tbxInput.text = "";
      this.view.inputPhone.tbxInput.text = "";
      this.view.infoalert.setVisibility(false);

      voltmx.print ("Exiting out of com.hclacademy.createcomplaintorrequest : preShowHandler");
    },

    /**
  	 * This funtion is responsible to create a new complaint or a request
  	 **/
    submit : function () {
      voltmx.print ("Entering into com.hclacademy.createcomplaintorrequest : submit");

      this.complaintOrRequestObject.Name = this.view.inputName.tbxInput.text;
      this.complaintOrRequestObject.Description = this.view.inputDescription.tbxInput.text;
      this.complaintOrRequestObject.Location = this.view.inputLocation.tbxInput.text;
      this.complaintOrRequestObject.Phone = this.view.inputPhone.tbxInput.text;
      //#ifdef iphone
      this.complaintOrRequestObject.Photo = this.view.camCapturePhoto.base64;
      //#endif
      //#ifdef android
      this.complaintOrRequestObject.Photo = this.view.camCapturePhoto.base64;
      //#endif

      voltmx.print ("complaintOrRequestObject: " + JSON.stringify(this.complaintOrRequestObject));

      var objSvc = null;
      var dataObject = null;
      if ("Request" === this.createComplaintOrRequest) {
        objSvc = voltmx.sdk.getCurrentInstance().getObjectService("ERequests", {"access":"online"});
		dataObject = new voltmx.sdk.dto.DataObject("Request");
      } else if ("Complaint" === this.createComplaintOrRequest) {
		objSvc = voltmx.sdk.getCurrentInstance().getObjectService("EComplaints", {"access":"online"});
		dataObject = new voltmx.sdk.dto.DataObject("Complaint");
      }
      dataObject.addField("CategoryID",this.complaintOrRequestObject.CategoryID);
      dataObject.addField("Name",this.complaintOrRequestObject.Name);
      dataObject.addField("Description",this.complaintOrRequestObject.Description);
      dataObject.addField("Location",this.complaintOrRequestObject.Location);
      dataObject.addField("Phone",this.complaintOrRequestObject.Phone);
      dataObject.addField("Photo",this.complaintOrRequestObject.Photo);
      dataObject.addField("Status",this.complaintOrRequestObject.Status);
      dataObject.addField("CreatedBy",gblLoggedInUserID);
      dataObject.addField("AssignedTo","");
      var options = {"dataObject":dataObject};
      if ("Request" === this.createComplaintOrRequest) {
		voltmx.application.showLoadingScreen(null, "Creating new request ...", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, null);
      } else {
		voltmx.application.showLoadingScreen(null, "Creating new complaint ...", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, null);
      }
      objSvc.create(options,
                    this.submitSuccessCallback.bind(this),
                    this.submitErrorCallback.bind(this)
                   );


      voltmx.print ("Exiting out of com.hclacademy.createcomplaintorrequest : submit");
    },

    /**
	 * This funtion is responsible to handle the success response 
	 * while creating a new complaint or a request
	 **/
    submitSuccessCallback : function (response) {
      voltmx.print ("Entering into com.hclacademy.createcomplaintorrequest : submitSuccessCallback");
      
      if ("Request" === this.createComplaintOrRequest) {
		voltmx.print ("New request created: " + JSON.stringify(response));
		this.view.infoalert.lblAlertTitle.text = "Request Submitted";
		this.view.infoalert.lblAlertMessage.text = "Thank you for submitting this request. Your request number is " + response.RequestID + ".";
      } else {
		voltmx.print ("New complaint created: " + JSON.stringify(response));
		this.view.infoalert.lblAlertTitle.text = "Complaint Submitted";
		this.view.infoalert.lblAlertMessage.text = "Thank you for submitting this complaint. Your complaint number is " + response.ComplaintID + ".";
      }
      this.view.infoalert.setVisibility(true);
      voltmx.application.dismissLoadingScreen(); 

      voltmx.print ("Exiting out of com.hclacademy.createcomplaintorrequest : submitSuccessCallback");
    },

    /**
	 * This funtion is responsible to handle the error response 
	 * while creating the new complaint 
	 **/
    submitErrorCallback : function (error) {
      voltmx.print ("Entering into com.hclacademy.createcomplaintorrequest : submitErrorCallback");
      if ("Request" === this.createComplaintOrRequest) {
		voltmx.print ("Failed to create the new request: " + JSON.stringify(error));
		this.view.infoalert.lblAlertTitle.text = "Failed to create request";
		this.view.infoalert.lblAlertMessage.text = "Unable to submit request. Please submit the request again.";
      } else {
		voltmx.print ("Failed to create the new complaint: " + JSON.stringify(error));
		this.view.infoalert.lblAlertTitle.text = "Failed to create complaint";
		this.view.infoalert.lblAlertMessage.text = "Unable to submit complaint. Please submit the complaint again.";
      }
      this.view.infoalert.setVisibility(true);
      voltmx.application.dismissLoadingScreen(); 

      voltmx.print ("Exiting out of com.hclacademy.createcomplaintorrequest : submitErrorCallback");
    },

    /**
	 * This funtion is responsible to capture and show the photo of the complaint
	 **/
    capturePhoto : function () {
      voltmx.print ("Entering into com.hclacademy.createcomplaintorrequest : capturePhoto");

      //#ifdef iphone
		this.view.imgPhoto.rawBytes = this.view.camCapturePhoto.rawBytes;
		this.view.camCapturePhoto.setVisibility(false);
		this.view.Photo = this.view.camCapturePhoto.base64;
      //#endif
      //#ifdef android
		this.view.imgPhoto.rawBytes = this.view.camCapturePhoto.rawBytes;
		this.view.camCapturePhoto.setVisibility(false);
		this.view.Photo = this.view.camCapturePhoto.base64;
      //#endif
      this.view.lblCapturePhoto.setVisibility(false);
      this.view.imgPhoto.setVisibility(true);

      voltmx.print ("Exiting out of com.hclacademy.createcomplaintorrequest : capturePhoto");
    }

  };
});