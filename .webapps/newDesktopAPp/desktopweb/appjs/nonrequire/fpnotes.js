var iterationStartTime,platformName=voltmx.os.deviceInfo().name.toLowerCase(),isWindows=!1;if("windows"==platformName||"windowsphone"==platformName){isWindows=!0}var __getAuthHeader__=function(a,b){var c=new KOAuth(null,null,notesDBURLs.consumerKey,notesDBURLs.consumerSecret,KOAuth._constants.VERSION_1_0,"",KOAuth._constants.SIGNATURE_SHA1),d=voltmx.ds.read("acc_token"),e=null,f=null;if(null!=d&&d!=void 0){e=d[0].oauth_access_token;f=d[0].oauth_access_token_secret}else return;var g={},h=c._prepareParameters(e,f,a,b,null),i=c._buildAuthorizationHeaders(h);g[KOAuth._constants.HTTP_AUTHORIZATION_HEADER]=i;for(var j in c._headers){if(c._headers.hasOwnProperty(j))g[j]=c._headers[j]}voltmx.print("@@@@@@HEADER PARAMS: "+JSON.stringify(g));return g},__updateNotesToRemoteDB__=function(a,b){var c=__getDSObjIdForAnnotation__(a),d={};if(voltmx.store.getItem(c))d=voltmx.store.getItem(c);var e,f=0,g=0;a.callbackFP=b;a.annotationMapSize=Object.keys(d).length;for(e in d){(function(b){iterationStartTime=new Date;f++;g=f;processAnnotation(b,a,g)})(d[e])}if(0==Object.keys(d).length){b({status:200})}},__cloneObject__=function(a){if(null==a||"object"!=typeof a)return a;var b=a.constructor();for(var c in a){if(a.hasOwnProperty(c))b[c]=a[c]}return b},processAnnotation=function(a,b,c){try{b.dsObjID=__getDSObjIdForAnnotation__(b);function onCompleteAnnotationSync(d){voltmx.print(a.widgetId+" : Syncing annotation was completed!");var e=b.dsObjID;voltmx.print("SYNCED OR NOT FLAG IS : "+d);if(d){a.synced_on=iterationStartTime.getTime()}if(voltmx.store.getItem(e)&&0<Object.keys(voltmx.store.getItem(e)).length){var f=voltmx.store.getItem(e);if(null!=a)f[a.widgetId]=a}voltmx.store.setItem(e,f);if(c==b.annotationMapSize||0==b.annotationMapSize){voltmx.print("DONE UPDATING COMMENTS TO DB");b.callbackFP({status:200})}}a.id=a.widgetId;a.channel=b.channel;processNote(a,b,function(c,d){voltmx.print("In callback for notes1");if(d){voltmx.print("In callback for notes2");a.noteGuid=d;processComments(a,b,onCompleteAnnotationSync)}else{onCompleteAnnotationSync(!1)}})}catch(a){voltmx.print("Error occurred during syncing annotation. Error: "+a+"!")}},processNote=function(a,b,c){if(a.noteGuid){delete a.noteGuid}var d=__cloneObject__(a);d.formId=d.widgetId=d.id,d.createdOn=new Date().getTime();d.modifiedOn=d.createdOn;var e=getNoteParam(d);voltmx.print("NOTE PARAM BEING SENT"+JSON.stringify(e));var f=notesDBURLs.prototypeBase+notesDBURLs.prototypeApi+"/accounts/"+b.acc_guid+"/project/"+b.proj_guid+"/notes";function callbackForSaveNoteService(a,b){if(400==a){if(null==b||b==void 0){return}voltmx.print("MetaInfo resulttable FOR NOTES "+JSON.stringify(b));if("errmsg"in b){voltmx.print("Unable to reach host.");c(b.errmsg,null)}else if("status"in b){voltmx.print("status : "+JSON.stringify(a));if(200==b.status.code){if("result"in b){var d={};if(isWindows){d=b.httpResponse.headers.Location}else{d=b.httpresponse.headers.Location}var e=d.split("/"),f=e[e.length-1];c(null,f)}}}}}var g=__getAuthHeader__("POST",f);checkPlatformsForInvokeService(f,{method:"post",timeout:100},g,JSON.stringify(e),callbackForSaveNoteService,null)},findNewOrUpdatedComments=function(a,b){var c={},d;for(d in a){var e=a[d],f;for(f in e){var g=e[f];voltmx.print("validateComment(commentObj) : "+validateComment(g));voltmx.print("annotation.synced_on"+b.synced_on);voltmx.print("new Date(commentObj.lastModifiedTime) :"+new Date(g.lastModifiedTime));voltmx.print("new Date(annotation.synced_on) :"+new Date(b.synced_on));if(validateComment(g)&&(!b.synced_on||new Date(g.lastModifiedTime)>new Date(b.synced_on))){c[f]=g}}}voltmx.print("updates: "+JSON.stringify(c));return c},processComments=function(a,b,c){voltmx.print(b.dsObjID+">>"+a.widgetId,"Processing comments");var d=a.comments,e=findNewOrUpdatedComments(d,a),f=Object.keys(e);if(0==f.length){voltmx.print(b.dsObjID+">>"+a.widgetId,"No new comments found.");c(!0)}else{var g=f.length,h=[];function commentProccessHandler(a,b){g--;if(a){voltmx.print("PUSHING FAILED COMMENT"+a);h.push(a)}if(0==g){var d;if(0<h.length){d=!1}else{d=!0}c(d)}}f.forEach(function(c){var d=e[c];saveNewComment(a,b,d,commentProccessHandler)})}},saveNewComment=function(a,b,c,d){try{voltmx.print(b.dsObjID+">>"+a.widgetId,"Saving new comment.");var c=getCommentParam(c);voltmx.print("NOTE GUID FOR COMMENT"+a.noteGuid);var e=notesDBURLs.prototypeBase+notesDBURLs.prototypeApi+"/accounts/"+b.acc_guid+"/project/"+b.proj_guid+"/notes/"+a.noteGuid+"/comment";function callbackForSaveCommentService(a,b){if(400==a){if(null==b||b==void 0){return}voltmx.print("MetaInfo resulttable FOR COMMENTS "+JSON.stringify(b));if("errmsg"in b){voltmx.print("Unable to reach host.");voltmx.print("FAILED TO PUSH THE COMMENT : "+c.comment);d(c.guid)}else if("status"in b){if(200==b.status.code){if("result"in b){voltmx.print("PUSHED THE COMMENT SUCCESSFULLY : "+c.comment);d(null)}}}}}var f=__getAuthHeader__("POST",e);checkPlatformsForInvokeService(e,{method:"post",timeout:100},f,JSON.stringify(c),callbackForSaveCommentService,null)}catch(a){d(c.guid)}},validateComment=function(a){return a.commentId&&a.createdOn&&a.createdById&&a.createdBy&&a.createdByEmail&&a.lastModifiedTime&&a.comment&&"Anonymous"!=a.createdBy},__fetchNotesFromRemoteDB__=function(a,b){var c=a.annotation_id,d,e=[],f=a.proj_guid+"_lastPullTime";if(voltmx.store.getItem(f)&&0<voltmx.store.getItem(f).length){d=voltmx.store.getItem(f)[0].updated_since||1}function updateAnnotation(a,b){b=formatComment(b);var c=b.widgetId;if(!a.comments[c]){a.comments[c]={}}var d=a.comments[c],e=b.commentId;d[e]=b;a.synced_on=new Date().getTime();a.comments[c]=d;return a}voltmx.print("FETCHING PROJECT PARAMS"+JSON.stringify(a));var g;if(d){g=notesDBURLs.prototypeBase+notesDBURLs.prototypeApi+"/accounts/"+a.acc_guid+"/project/"+a.proj_guid+"/channel/"+a.channel+"/comments/"+d}else{g=notesDBURLs.prototypeBase+notesDBURLs.prototypeApi+"/accounts/"+a.acc_guid+"/project/"+a.proj_guid+"/channel/"+a.channel+"/comments/"}function callbackForFetchNotesService(g,h){var j=__cloneObject__(a),k=__getDSObjIdForAnnotation__(j),l={};if(voltmx.store.getItem(k))l=voltmx.store.getItem(k);if(400==g){if(null==h||h==void 0){return}voltmx.print("MetaInfo resulttable "+JSON.stringify(h));if("errmsg"in h){voltmx.print("Unable to reach host.");b({status:500,error:"Could not reach the host"})}else if("status"in h){if(200==h.status.code){if("result"in h){var m=h.result,n;for(n in m){var o=m[n];voltmx.print("New COMMENT "+JSON.stringify(o));j.annotation_id=o.widget_id;j.channel=o.channel;e.push(new Date(o.db_sync_time).getTime());if(null!=l[j.annotation_id]&&l[j.annotation_id]!=void 0){var p=l[j.annotation_id];p=updateAnnotation(p,o);if(null!=p)l[j.annotation_id]=p}else{var p=updateAnnotation({widgetId:j.annotation_id,active:1,comments:{}},o);if(null!=p)l[j.annotation_id]=p}}}}}}voltmx.store.setItem(k,l);if(0<e.length){d=Math.max.apply(Math,e);voltmx.print("updated_since TIME STAMP"+d)}voltmx.store.setItem(f,[{updated_since:d}]);a.annotation_id=c;if(null!==fpas.readAnnotationFromDataStore(a)){var p=fpas.readAnnotationFromDataStore(a);b({status:200,data:p})}else{b({status:500,error:"Could not read annotation from Data store"})}}voltmx.print("FETCHING COMMENTS");var h=__getAuthHeader__("GET",g);if(isWindows){var i=new Date(1970,1,1);h["if-modified-since"]=i.toUTCString()}voltmx.net.invokeServiceAsync(g,{httpconfig:{method:"get",timeout:100},httpheaders:h},callbackForFetchNotesService,null)},fpnotes={updateNotesToRemoteDB:__updateNotesToRemoteDB__,fetchNotesFromRemoteDB:__fetchNotesFromRemoteDB__},checkPlatformsForInvokeService=function(a,b,c,d,e,f){if(isWindows){voltmx.print("Calling Windows network service");voltmx.print("body : "+JSON.stringify(d));voltmx.print("headers : "+JSON.stringify(c));voltmx.net.invokeServiceAsync2(a,{httpconfig:b,httpheaders:c,json:d},e,f)}else{voltmx.print("Calling Non-windows network service");voltmx.net.invokeServiceAsync(a,{httpconfig:b,httpheaders:c,json:d},e,f)}};