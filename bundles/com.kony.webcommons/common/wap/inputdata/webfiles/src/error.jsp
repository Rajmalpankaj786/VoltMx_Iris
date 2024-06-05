<%@ page language="java" contentType="text/vnd.wap.wml" %>
<?xml version="1.0"?>
<!DOCTYPE wml PUBLIC "-//WAPFORUM//DTD WML 1.1//EN"
    "http://www.wapforum.org/DTD/wml_1.1.xml">
    <wml>
        <card title="Error">
<p> 
            <%
 if (request.getParameter("secerror") != null)
 {%>
    You've reached this page because you are not using a secure connection. <%} else { %>
    This device is currently not supported
<%} %>
</p>
        </card>
    </wml>