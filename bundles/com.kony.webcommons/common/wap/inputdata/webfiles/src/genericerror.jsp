<%@ page isErrorPage="true" %>
<%@ page import="com.kony.web.WEBConstants, com.konylabs.middleware.common.CSRIssueLogger, java.util.Date, java.io.PrintWriter, java.io.StringWriter,com.konylabs.middleware.common.MWConstants,com.konylabs.middleware.common.BaseSessionManager, com.kony.web.KonyAppConfig" %>
<%-- June 15, 2011: Divvela Sumanth: Update error page to point xhtml/error.jsp by default and if there is preferredml then pick from that folder.
	Also updated for advanced cat if request is from ajax then only create secureurl else just forword.
  --%>
<%
            KonyAppConfig konyAppConfig = (KonyAppConfig) application.getAttribute(WEBConstants.KONY_APP_CONFIG);
            String errorURL = "xhtml/error.jsp";
            boolean isErrorSourceASecurePage = false;

            String currentScheme = request.getScheme();
            if (currentScheme.toLowerCase().equals("https")) {
                isErrorSourceASecurePage = true;
            }

                        String preferredML = "";
            Object errorML = null;
            if ((errorML = session.getAttribute(WEBConstants.PREFERRED_ML)) != null) {
                preferredML = (String) errorML;
                errorURL = preferredML + "/error.jsp";
            }

            if (request.getParameter("secerror") != null) {
                errorURL = errorURL + "?secerror=true";
                response.sendRedirect(errorURL);
                return;
            }

            if (request.getParameter("ajax") != null) {
                String url = null;
                if (isErrorSourceASecurePage) {
                    url = "https://" + request.getServerName() + ":" + Integer.parseInt(konyAppConfig.getHttpsPort()) + request.getContextPath() + "/" + errorURL;
                } else {
                    url = "http://" + request.getServerName() + ":" + Integer.parseInt(konyAppConfig.getHttpPort()) + request.getContextPath() + "/" + errorURL;

                }
                out.write("<konysecurecall url=\"" + url + "[---]\" />");
            } else {
               RequestDispatcher dispatcher  = request.getRequestDispatcher("/" + errorURL);
               dispatcher.forward(request, response);
            }
%>
