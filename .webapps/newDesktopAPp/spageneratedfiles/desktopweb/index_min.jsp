

<%@ page contentType="text/html; charset=UTF-8" import="java.net.URLEncoder,java.util.*,com.kony.web.WEBConstants,com.kony.web.util.WAPConfigUtility,com.kony.web.KonyAppConfig" %>
    <%
    response.setDateHeader("Expires", (new Date(0)).getTime());
    response.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, post-check=0, pre-check=0, max-age=0");
    response.setHeader("Pragma", "no-cache");
    %>


<%
    KonyAppConfig appConfig = (KonyAppConfig) application.getAttribute(WEBConstants.KONY_APP_CONFIG);
    String propertiesJSON = "";
    String headersJSON = "";
    String paramsJSON = "";
    if(appConfig!=null ){
    propertiesJSON = (String) application.getAttribute(appConfig.getAppID() + WEBConstants.THINCLIENT_PROPERTIES + "_JSON");

    headersJSON = (String) request.getAttribute("headersJSON");
    paramsJSON = (String) request.getAttribute("paramsJSON");
    }
  %>



<!DOCTYPE html>
<html >
    <head>
        
        <% String userAgent = request.getHeader("user-agent");
        if(userAgent != null && userAgent.toLowerCase().contains("trident")){%>
            <meta http-equiv="X-UA-Compatble" content="IE=edge">
        <%}%>
        
                
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>
        

        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
        
        
        
        
        
        

        

         
   

 
   
 
   
        
<script type="text/javascript"> 
if (document.getElementById && document.createElement) {
    document.write("<style>html {display: none;}</style><script>if( self == top ){document.documentElement.style.display = 'block';} else {top.location = self.location;}</sc"+"ript>");
}
else {
    if (top != self) {
        top.location = self.location;
    }
}
</script>


        
         
   
 
   

        <style type = "text/css">
            * {
    box-sizing: border-box !important;
    user-select: none;
    cursor: inherit;
    margin: 0px;
    padding: 0px;
    border: none;
}

html,
body,
div.kvp {
    overflow-x: hidden !important;
    overflow-y: hidden !important;
    overflow: hidden !important;
    height: 100% !important;
    width: 100% !important;
    padding: 0px !important;
    margin: 0px !important;
    min-width: 100% !important;
    max-width: 100%;
    min-height: 100% !important;
    max-height: 100% !important;
}

[hidden] {
    display: none !important;
}

input,
textarea {
    user-select: auto;
}

textarea {
    resize: none;
    font-size: inherit;
    font-family: inherit;
}

div[kr="app_blocker"], div#app_splash {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    max-width: 100%;
    max-height: 100%;
    overflow-x: hidden;
    overflow-y: hidden;
}



div[kr="app_forms"] {
    position: absolute;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
    overflow-x: hidden;
    overflow-y: hidden;
}

div[kr="app_dialogs"] {
    position: absolute;
    left: 0px;
    top: 0px;
}

div[kr="app_scrap"] {
    position: absolute;
    left: -999999999px;
    top: -999999999px;
    width: 1px;
    height: 1px;
    max-width: 1px;
    max-height: 1px;
    opacity: 0;
    border: 0;
    margin-left: -1px;
    margin-top: -1px;
    clip: rect(1px, 1px, 1px, 1px);
    clip-path: inset(50%);
    -webkit-clip-path: inset(50%);
}

            
            .splash {
                
                background : #ffffff;
                
            }
            

        </style>

         

        
        
        <script type="text/javascript" src = "desktopweb/lib/voltmxinit.js" defer></script>
        
    </head>
    <body style = "width: 100%; margin: 0px; padding: 0px;"  aria-busy="true" aria-live="polite" aria-relevant="additions" aria-atomic="false">
        
    <input type="hidden" name="_reqHeaders" value='<%=headersJSON != null ? headersJSON : "" %>'>

    <input type="hidden" name="_reqParams" value='<%=paramsJSON != null ? paramsJSON : ""%>'>

    <input type="hidden" name="_voltmxAppProperties" value='<%=propertiesJSON != null ? propertiesJSON : ""%>'>



    <% Object sessionObj = request.getSession(false); %>
    <%
        if(sessionObj == null || session.getAttribute("desktopweb") == null) {
    %>
        <div id="isnewsession" style="display:none">true</div>
    <%
        session = request.getSession();
        session.setAttribute("desktopweb","desktopweb");
        }else{
    %>
        <div id="isnewsession" style="display:none">false</div>
    <%
        }
    %>


                <div id="app_splash" class = "splash">
            
            <script type="text/javascript">
            
                setTimeout(function() {
                    initappcache();
                }, 0);


                function initappcache () {
                    if(document.documentElement.getAttribute("manifest") && !! window.applicationCache) {
                        var a = ["checking", "downloading", "progress", "cached", "noupdate", "updateready", "obsolete", "error"];
                        for (var d = 0; d < a.length; d++) {
                                window.applicationCache.addEventListener(a[d],appcacheeventhndlr, false)
                        }
                    } else {
                            //voltmx.appinit.loadlibrarysync();
                    }
                }

                function appcacheeventhndlr(event) {
                    if(!event)
                        event = window.event;
                    switch (event.type) {
                        case "checking":
                            console.log("Checking for Manifest Version");
                            break;

                        case "downloading":
                            console.log("Downloading of Manifest Resources");
                            break;

                        case "progress":
                            break;

                        case "cached":
                            console.log("Manifest Resources loading done");
                            break;

                        case "noupdate":
                            console.log("No Change in Manifest File");
                            break;

                        case "updateready":
                            console.log("New manifest resources downloaded,swap the cache");
                            try{
                                window.applicationCache.swapCache();
                                window.location.reload();
                            }catch (e) {
                                console.log("invalid state: swapping the cache");
                            }
                            break;

                        case "obsolete":
                            console.log("Cache Manifest file not found. So deleting app cache");
                            break;

                        case "error":
                            console.log("Error while loading app cache");
                            break;
                        default:
                            console.log("Appcache Event not supported");
                    }
                }
            
            </script>
            <noscript>
                <div id="JavaScriptDisabledErrorMsg"> To use this site, first enable your browser's JavaScript support and then refresh this page. </div>
            </noscript>

        </div>

    </body>
</html>