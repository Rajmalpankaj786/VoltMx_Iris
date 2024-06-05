<?xml version="1.0"?>
<!DOCTYPE html PUBLIC "-//WAPFORUM//DTD XHTML Mobile 1.0//EN" "http://www.wapforum.org/DTD/xhtml-mobile10.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
 <title>Error Page</title>
 <style type="text/css">@import "xhtml.css";</style>
</head>
<body id="errorx" class="">
<%
 if (request.getParameter("secerror") != null) {%>
<h1> You've reached this page because you are not using a secure connection. </h1>
<% } else { %>
 Unknown Error Occurred <br/> Contact System Admin 
<% } %>
</body>
</html>