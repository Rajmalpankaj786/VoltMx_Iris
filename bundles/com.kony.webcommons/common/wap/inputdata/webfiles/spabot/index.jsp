<%
StringBuilder fileName = new StringBuilder();
fileName.append("/spabot/");
String preua = request.getHeader("user-agent");

if (preua.indexOf("bot") != -1 && (preua.indexOf("iphone") != -1 || preua.indexOf("Mobile") != -1)){
	fileName.append("mobile");
}else{
	fileName.append("desktop");
}

String name = request.getQueryString();

if(name != null){
	name = name.replaceAll("&", "_");
	name = name.replaceAll("=", "_");
	name = name.replaceAll(" ", "_");

	fileName.append("_"+name); 
}

fileName.append(".html");
%>  
 <jsp:include page="<%=fileName.toString()%>" ></jsp:include>
 