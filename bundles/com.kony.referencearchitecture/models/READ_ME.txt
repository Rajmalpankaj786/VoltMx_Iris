// Steps for initiating the Project

1. Perform "npm install" to load node module dependencies as in package.json.
2. "MDAModelGenerator.js" is the interface.
3. Function to be invoked is "konyModelGenerator" and below are the parameters it takes :

     * appConfig (onPrem) {
     *               "token : " ",
     *               "identityUrl" : " ",
     *               "consoleUrl" : " ",
     *               "appName" : "" ",
     *               "appVersion" : " ",
     *               "environmentName" : " "
     *               }.
     * appConfig (cloud):{
     *               "token" : " ",
     *               "accountId" : " ",
     *               "appName" : "" ",
     *               "appVersion" : " ",
     *               "environmentName" : " ",
     *               "cloudType" : "", //--cloud-type qa- or dev- or sit2-  to be passed in the same format
     *               "consoleUrl" : " " 
     *               }.
     *
     * optionsAndParams contains  :{
     *                       "targetDirectoryForModels" : "targetDirectoryForModels", //path of directory to create models in
     *                       "isCloud" : false,
     *                       "generateLegacyModels" : false
     *                       "mfcliPath" : "../mfcli.jar"
	 *				 		 "javaCmd" : "java.exe",
	 *				 		 "clipropfilePath" : "konyfabriccli.properties"	 
     *                       }

All these parameters are mandatory to generate model files.

Code Snippet :

konyModelGenerator({
    "token": "tokensampleeyAidHlwIjogImp3dCIsICJhbGciOiAiUudIrQlkkYXGGo4Z",
    "identityUrl": "https://my.mf.net:8443",
    "consoleUrl": "https://my.mf.net:8443",
    "appName": "models",
    "appVersion": "1.0",
    "environmentName": "Dev",
	"consoleUrl" : "https://manage.dev-temenos-cloud.com/"	
	},
	{"isCloud": false, "targetDirectoryForModels": "targetDirectoryForModels", "mfcliPath" : "mfcliPath", "javaCmd" : 		    "java.exe"},
	function (object) {
    console.log(object)
}, function (error) {
    console.log(error)
});