Release Version : Kony_sdk 8.4 

Description : This file consist of the manifest tags required for Iris to append in the manifest file of the application for SSO to work for andorid platform.
 			  There are two types of tags included :
 			  1) manifest tags : Tags consisting of the permission level which specifies a system permission that the user must grant in order for the app to operate correctly.
 								 It is set to signature level which is A permission that the system grants only if the requesting application is signed with the same certificate 
 								 as the application that declared the permission. If the certificates match, the system automatically grants the permission without notifying the 
 								 user or asking for the user's explicit approval. 
 			  2) application tags : Tags consisting of the intent-filters which specifies the types of intents to which an activity, service, or broadcast receiver can respond 
 									to by declaring the capabilities of a component.
 									The following tags are:
 									-> "com.kony.ssobroadcast" : this tag is for recieving/sending the actual broadcast which contains the DeviceID and ssoTokenKey.
 									-> "com.kony.ssoappinstalled" : this tag is for dummy intial broadcast in replace of android.intent.action.PACKAGE_ADDED which 
 																	andorid system has stopped as part of removing implicit intent-filters.
 																	The tag does the same functionality as what the implicit tag used to do.

Note: Developer supplied ssoOrganizationID makes it a unique tag (android name). This tag allows us to enable signature level protection for sharing SSO tokens.
