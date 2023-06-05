<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" trimDirectiveWhitespaces="true"%>
<%
	request.setCharacterEncoding("utf-8");
%>

<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>STAY WHALE</title>
	<script type="text/javascript" src="https://cdn.jsdelivr.net/jquery/latest/jquery.min.js"></script>
	<script type="text/javascript" src="https://cdn.jsdelivr.net/momentjs/latest/moment.min.js"></script>
	<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.min.js"defer></script>
	<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.css" />
	<script type="text/javascript" src="js/datepicker.js"></script>
	<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=9d7a938519112aaafea5f53dedcea24c&libraries=services,clusterer,drawing"></script>
	<link rel="stylesheet" type="text/css" href="css/coursePick.css">
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@900&display=swap" rel="stylesheet">

</head>
<body>
	<%
		request.setCharacterEncoding("utf-8");
			String id = (String)session.getAttribute("id");
	%>
	<%
		if(id == null) {
	%>
		<jsp:include page="Header_Login_Fail.jsp" >
			<jsp:param name="id" value="<%=id%>"/>
		</jsp:include>
	<%
		} else {
	%>
		<jsp:include page="Header_Login_Success.jsp"/>
	<%
		}
	%>
	<%@ page import="model.Attraction" %>
	<%@ page import="java.util.List" %>
	<%@ page import="java.util.Base64" %>
	<jsp:useBean class="model.Attraction" id="data"/>
	
	<%
		String json =(String) request.getAttribute("courseData");
		String encodedData = Base64.getEncoder().encodeToString(json.getBytes());	
		System.out.println(encodedData);
				
		%>
		<input id="jsonData" type="hidden" value="<%= encodedData%>">
		<textarea id="data" style="display: none;" ><%= json%></textarea><!-- hidden으로 보내려했는데 " 때문에 잘린다..... -->
		<form id="myForm" action="pickdata.jsp" method="post">
			<input id="att_num" name="att_num" type="hidden" value="">
		</form>
	
		<section>
			<div id="selectionWrap">
				<div id="datePicker">
					
					<div id="datePickerCont">
						<ul>
							<li>일정을 선택하세요</li>
							<li>
								<p></p>&nbsp;~&nbsp;
								<p></p>
							</li>
							<li><p style="display: inline-block;"></p>&nbsp;days</li>
						</ul>
						<div id="picker"></div>
					</div>
					
					<div id="btnWrap">
						<input class="btn" type="button" value="다이어리 작성" onclick="create()">
						<input class="btn" type="button" value="모두지우기" onclick="del()">
						
					</div>
					
				</div>
				<div id="selectionbar">
			
				</div>
			</div>


		<div id="datailBar">
			<input class="btn" type="button" id="closeDetail" value="닫기">
			<div id="attraction_Pic"></div>
			<div id="detailTitle"></div>
			<div id="detailCont">
		
				
			</div>
			<input id="addCont" class="btn" type="button" value="목록에추가">
			
		</div>
			
		<div id="maps">
			<div id="searchDataWrap">
				<div id="searchArea">
					<input type="text" id="searchBar" placeholder="지역명으로 검색">
					<div id="searchBtn">
						<div></div>
					</div>
				</div>
				<div id="searchData">
				</div>
			</div>
			<script type="text/javascript" src="js/coursePick.js"></script>
			
			
			</div>
	
			
		</section>

	














<jsp:include page="footer.jsp"/>
</body>
</html>