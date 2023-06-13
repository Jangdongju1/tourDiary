<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" trimDirectiveWhitespaces="true"%>
<% request.setCharacterEncoding("utf-8"); %>

<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>STAY WHALE</title>

	<link rel="stylesheet" type="text/css" href="css/TotalContents.css"><!--※css파일 맞는걸로 수정 -->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
	<script src="js/TotalContents.js"></script><!--※js파일 맞는걸로 수정 -->
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap" rel="stylesheet">
</head>

<body>
	<form>
		<section id="section1">
			<div id="searchWrap">
			<div id="logoWarp">
				<div id="logo"></div>
				<div id="name">StayWhale</div>
			</div>
				<div id="searchBarWrap">
					<input id="searchBar" type="text" placeholder="검색">
					<div id="searchBtn">
						<div></div>
					</div>
				</div>
				<div id="searchOp">
					<ul>
						<li data-target = "total">전체</li>
						<li data-target = "seoul">서울경기</li>
						<li data-target = "gangwon">강원</li>
						<li data-target = "chungcheong">충청</li>
						<li data-target = "gyeonsang">경상</li>
						<li data-target ="jeolla">전라</li>
						<li data-target ="jeju">제주</li>
						<li>여행일수</li>
					</ul>
				</div>
			</div>
		</section>
		
		
		<section id="section2">	
			<div id="diaryCont">
			
			<%@ page import="java.util.List" %>
			<%@ page import="model.DiaryWriter"%>
				<%
					List<DiaryWriter> data = (List<DiaryWriter>)request.getAttribute("initData");
					final String UPLOADPATH =  request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath();
				
		 	 		for(int i=0; i<data.size(); i++){  // 초기 16개의 데이터 
						out.println("<ul onclick =location.href='getDiaryData?post_Num="+data.get(i).getPost_Num()+"'>");
						out.println("<li>");
							out.println("<div style ='background-image: url("+UPLOADPATH+"/upload/picture/"+data.get(i).getRepPic()+")'></div>");
							out.println("<div>");
								out.println("<div class ='circle' style ='background-image: url("+UPLOADPATH+"/upload/picture/"+data.get(i).getUserPic()+")'></div>");
								out.println("<div class = 'diaryText'>");
									out.println("<ul>");
										out.println("<li>"+data.get(i).getUser_Id()+"</li>");
										out.println("<li>"+data.get(i).getPost_Title()+"</li>");
										out.println("<li>"+data.get(i).getPost_Body()+"</li>");
									out.println("</ul>");
								out.println("</div>");
							out.println("</div>");
						out.println("</li>");
					out.println("</ul>");
						
					}  
					 
				%>
					
			</div>
			
		
		</section>

	</form>
<div id="nextEle"></div>






</body>
</html>