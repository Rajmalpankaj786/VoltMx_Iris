
  <%@ page import="com.kony.web.WEBConstants,com.kony.web.KonyAppConfig,java.util.*" %>
    <%
    response.setDateHeader("Expires", (new Date(0)).getTime());
    response.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, post-check=0, pre-check=0, max-age=0");
    response.setHeader("Pragma", "no-cache");
    %>
  <%
	KonyAppConfig appConfig = (KonyAppConfig) application.getAttribute(WEBConstants.KONY_APP_CONFIG);
	String propertiesJSON = (String) application.getAttribute(appConfig.getAppID() + WEBConstants.THINCLIENT_PROPERTIES + "_JSON");
	String headersJSON = (String) request.getAttribute("headersJSON");
	String paramsJSON = (String) request.getAttribute("paramsJSON");
  %>


<!DOCTYPE HTML>
<html >
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>
        
        
        
        
        
        
        
        
        
        
        
         
   

 
   
 
   
        
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

        
            <script type= "text/javascript">
             
                    IndexJL = 0;
             
            </script>
        
        
         
   
 
   

        
		<script type="text/javascript">
		    
                </script>
                <style>
                    
                    @-webkit-keyframes FadeIn { 0% { opacity:0; } 100% { opacity:1; } }
                    

                   .splashscreen
                   {
                        position: fixed !important;
                        position: absolute;
                        top: 0px;
                        right: 0px;
                        left: 0px;
                        bottom: 0px;
                        
                        background-color: #ffffff;
                        
                    }
                    .splashscreen2
                    {
                        text-align: center;
                        height:100%;
                    }
                    .splashscreen-image
                    {
                        
                        width:100%;
                        height:100%;
                    }
           </style>
            
        
        

		

       
       

        
         <meta name="apple-mobile-web-app-capable" content="yes"/>
         <script>
		var category = '';
		if(window.matchMedia){
		if(window.matchMedia('(min-device-width:321px) and (max-device-width:375px)').matches)
				category = '375';
		else if(window.matchMedia('(min-device-width:376px) and (max-device-width:414px)').matches)
				category = '414';
		else if(window.matchMedia('(min-device-width:415px)').matches)  
				category = '414';             
		}
		var filename = "spaiphone/voltmxspaiphone" +category + ".css?ver=1.0.0";
		var link = document.createElement("link");
		link.setAttribute("rel", "stylesheet");
		link.setAttribute("type", "text/css");
		link.setAttribute("href", filename);
		document.getElementsByTagName("head")[0].appendChild(link);
		if(!category){
			var link = document.createElement("link");
			link.setAttribute("rel", "stylesheet");
			link.setAttribute("type", "text/css");
			var retfilename =  "spaiphone/voltmxspaiphoneretina.css?ver=1.0.0";
			link.setAttribute("href", retfilename);
			document.getElementsByTagName("head")[0].appendChild(link);
		}
                
                    ;
                
	</script>

        

        
        
        

        
       
    </head>

    <body>
		<DIV id="splashDiv">
        
             <input type="hidden" name="_voltmxAppProperties" value='<%=propertiesJSON%>' >
             <input type="hidden" name="_reqHeaders" value='<%=headersJSON%>' >
             <input type="hidden" name="_reqParams" value='<%=paramsJSON%>'>
             <% Object sessionObj = request.getSession(false); %>
             <%
                if(sessionObj == null || session.getAttribute("spa") == null){
                        %>
                        <div id="isnewsession" style="display:none">true</div>
                        <%
                        session = request.getSession();
                        session.setAttribute("spa","spa");
                }else{
                        %>
                        <div id="isnewsession" style="display:none">false</div>
                        <%
                }
             %>
        

        
		



		<noscript style="position:absolute;background:white;">$noscriptmessage</noscript>



                <style>
			#__JSDisabledErrorMsg{display:none;}
		</style>
		<noscript>
			<style>
				#__JSDisabledErrorMsg{display:block;}
				#splashScreen_main{display:none;}
			</style>
		</noscript>
		<div id="__JSDisabledErrorMsg" style="position:absolute;background:white;">$noscriptmessage</div>

        <script type="text/javascript" >
                

                
                
                
                    IndexJL = 0;
    		
    		var spaMarkup = "spaiphone/"; spaMarkup = spaMarkup.substring(0,spaMarkup.length-1);
                
                    
                    initappcache ();
                    function initappcache ()
                    {
                        isWindowsPhone= (/Windows Phone/gi).test(navigator.userAgent);
                        isWindowsTouch =(/Windows/gi).test(navigator.userAgent) && (/Touch/gi).test(navigator.userAgent);
                        isWindowsTablet = (/Windows NT/gi).test(navigator.userAgent) && (/Touch/gi).test(navigator.userAgent);

                        if (document.documentElement.getAttribute("manifest") && !! window.applicationCache) {
                                var a = ["checking", "downloading", "progress", "cached", "noupdate", "updateready", "obsolete", "error"];
                                for (var d = 0; d < a.length; d++) {
                                        window.applicationCache.addEventListener(a[d],appcacheeventhndlr, false)
                                }
                        } else {
                                //voltmx.appinit.loadlibrarysync();

                        }
                        loadVoltmxframework();

                    }

                    function appcacheeventhndlr(event)
                    {
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
                                       // loadVoltmxframework();
                                        break;

                                case "noupdate":
                                        console.log("No Change in Manifest File");
                                        //loadVoltmxframework();
                                        break;

                                case "updateready":
                                        console.log("New manifest resources downloaded,swap the cache");
                                        try{
                                            window.applicationCache.swapCache();
                                            //loadVoltmxframework();
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
                                       // loadVoltmxframework();
                                        break;

                                default:
                                        console.log("Appcache Event not supported");
                        }
                    }

                    function initializeframework()
                    {
                        voltmx.appinit.prepareHttpHeaders();
                        voltmx.appinit.setPlatformName();
                        voltmx.appinit.mergeDownloadLists();
                        $KG["version"] = "1.0.0";
                        $KG["staticContentPath"] =  "";
                        $KG["skipproxy"] = true;
                        voltmx.appinit.verifyhref(true);
                    }

                    function loadVoltmxframework()
                    {
                        appStartTime = new Date().getTime();
                        addScript("jslib/voltmxframework.js");
                    }

                    function loadappjs()
                    {
                        addScript("appjs/app.js");
                    }
                    function addScript (src)
                    {
                        var head =  document.getElementsByTagName('head')[0];
                        var	script = document.createElement('script');
                        //	if(voltmx.appinit.isIE7 || voltmx.appinit.isIE8 || voltmx.appinit.isIE9 || (voltmx.appinit.isWindowsPhone && !voltmx.appinit.isIE10))
                        //	script.src = $KG["platformver"] + src +"?ver="+ $KG["version"];
                        //else
                        //script.src = $KG["platformver"] + srcs[i];// +"?ver="+ $KG["version"];

                        script.src = "spaiphone/" + src;

                        script.type = "text/javascript";
                       if(src ==="appjs/app.js" ){
                            if(!script.addEventListener) {
                                script.onreadystatechange = function(){
                                        (this.readyState == 'complete' || this.readyState == 'loaded') && initializeframework();
                                };
                            }
                            else {
                                script.onload = initializeframework;
                            }
                        }
                        else{
                            if(!script.addEventListener) {
                                script.onreadystatechange = function(){
                                        (this.readyState == 'complete' || this.readyState == 'loaded') && loadappjs();
                                };
                            }
                            else {
                                script.onload = loadappjs;
                            }
                        }

                        head.appendChild(script);
                    }

                

        </script>
		</DIV>
    </body>
</html>
