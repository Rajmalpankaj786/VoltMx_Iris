<%@ page isErrorPage="true" %>
<%@ page import="com.kony.common.web.WEBConstants, com.konylabs.middleware.common.CSRIssueLogger, java.util.Date, java.io.PrintWriter, java.io.StringWriter,com.konylabs.middleware.common.MWConstants,com.konylabs.middleware.common.BaseSessionManager" %> 
<%
 String xhtmlerrorURL = "xhtml/error.jsp";
 String iphoneerrorURL = "iphone/error.jsp";
 String wmlerrorURL = "wml/error.jsp";
 String errorURL = xhtmlerrorURL;
 
 boolean isIphoneClient = false;
 boolean isErrorSourceASecurePage = false;
 Integer securePort = BaseSessionManager.getHttpsPortNumber();
 if(request.getLocalPort() == securePort)
 {
 	isErrorSourceASecurePage = true;
 }
 
 String preferredML = "";
   Object errorML = null; 
     if((errorML = session.getAttribute(WEBConstants.PREFERRED_ML)) != null)
     {
        preferredML = (String) errorML;
        if (preferredML.contains(WEBConstants.IPHONE_MARKUP))
        {
            errorURL = iphoneerrorURL;
            isIphoneClient = true;
        }
        if (preferredML.contains(WEBConstants.WML_MARKUP))
            errorURL = wmlerrorURL;
       
     }
     else
     {
         if (request.getHeader("user-agent") != null)
         {
             String uagent = request.getHeader("user-agent");
             if (uagent.indexOf("iPhone") != -1 && uagent.indexOf("Safari") != -1)
             {
             	isIphoneClient = true;
                errorURL = iphoneerrorURL;
             }
             else
                errorURL = xhtmlerrorURL;
         }
     }
     
	if (request.getParameter("secerror") != null)
	{
		errorURL = xhtmlerrorURL +"?secerror=true";
		response.sendRedirect(errorURL);
		return;
	}
    
     String trace = "StackTraceNotAvailable";
     if(exception != null)
     {
	     StringWriter sw = new StringWriter();
	     PrintWriter pw  = new PrintWriter(sw);
	     exception.printStackTrace(pw);
	     trace = sw.toString();
     }
     String cacheId = (String) request.getAttribute(MWConstants.CACHE_ID);
     
     if(cacheId == null)
        cacheId = "CacheIDNotAvailable";
        
     String csrID = CSRIssueLogger.generateCSRID(request);
     
     CSRIssueLogger.logCSRIssue(csrID, "9999", cacheId, new Date(), trace);
     
     //Prajakt: For xhtml we will use the response.redirect but for iPhone we will send a manual redirect
     
     if(isIphoneClient)
     {
     	   String url = null;
     	   if(isErrorSourceASecurePage)
     	   {
     	   	url = "https://" + request.getServerName() + ":" + Integer.parseInt(com.kony.web.controller.KonyBaseServlet.HTTPS_PORT) + request.getContextPath() + "/"+iphoneerrorURL;
     	   }
     	   else
     	   {
	        url = "http://" + request.getServerName() + ":" + Integer.parseInt(com.kony.web.controller.KonyBaseServlet.HTTP_PORT) + request.getContextPath() + "/"+iphoneerrorURL;
	    
     	   }
     	   out.write ("<konysecurecall url=\"" + url + "[---]\"/>");
     }
     else
     {
     
	   if(isErrorSourceASecurePage)
	   {
		errorURL = "https://" + request.getServerName() + ":" + Integer.parseInt(com.kony.web.controller.KonyBaseServlet.HTTPS_PORT) + request.getContextPath() + "/"+errorURL;
	   }
	   else
	   {
		errorURL = "http://" + request.getServerName() + ":" + Integer.parseInt(com.kony.web.controller.KonyBaseServlet.HTTP_PORT) + request.getContextPath() + "/"+errorURL;

	   }
           response.sendRedirect(errorURL);
     }
 %>