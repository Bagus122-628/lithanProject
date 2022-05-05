<%@ page import="java.nio.*,java.nio.file.*,java.io.*" %>
<%!
public String readFile(String path, java.nio.charset.Charset encoding) 
  throws IOException 
{
  byte[] encoded = Files.readAllBytes(Paths.get(path));
  return new String(encoded, encoding);
}
%>
<%
if(request.getParameter("page")!=null)
{
  String page1=request.getParameter("page");
  String jsppath=request.getRealPath(request.getServletPath());
  String pagepath=jsppath.replace("load_page.jsp","") + "pages\\" + page1 + ".html";
  out.print(readFile(pagepath,java.nio.charset.Charset.defaultCharset()));
}
%>