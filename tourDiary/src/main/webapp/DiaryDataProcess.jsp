<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
	int post_Num = (int)request.getAttribute("post_Num");  // 리턴타입이 object이므로  형변환 필수
	
	System.out.println("받은 요청:"+post_Num);
	
	response.sendRedirect("getDiaryData?post_Num="+post_Num);
	
%>