define(function() {

  return {
   /*
   * This function is responsible for navigation 
   * from hamburger menu
   */
    hamburgerMenuCallback : function () {
      var selectedMenuOption = this.view.segMenu.selectedRowItems[0].lblMenuOption;
      var navigationConfig = {"appName": "GovtCitizenSA","friendlyName": "frmDashboard"};
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