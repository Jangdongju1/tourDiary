<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" trimDirectiveWhitespaces="true"%>
<% request.setCharacterEncoding("UTF-8");%>

<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>STAY WHALE</title>

	<link rel="stylesheet" type="text/css" href="css/DiaryWrite.css"><!--※css파일 맞는걸로 수정 -->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
	<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=9d7a938519112aaafea5f53dedcea24c"></script>
	<script src="js/DiaryWrite2.js"></script><!--※js파일 맞는걸로 수정 -->
</head>
<body style="background-color: #eff0f1;">
	<%
		request.setCharacterEncoding("utf-8");
		String id = (String)session.getAttribute("id");
	%>
	<%
		if(id == null) {
	%>
		<jsp:include page="Header_Login_Fail.jsp" >
			<jsp:param name="id" value="<%= id%>"/>
		</jsp:include>
	<%
	} else {
	%>
		<jsp:include page="Header_Login_Success.jsp"/>
	<%
	}
	%>
<div class="section_wrap"></div>
<%@ page import="model.DiaryWriter" %>
<%@ page import="model.Attraction"%>
<%@ page import="java.util.List" %>
<%@ page import="model.CombinedLists" %>
<%@ page import="java.util.Base64"%>


<%	
	CombinedLists lists = (CombinedLists)request.getAttribute("lists");
	List<Attraction> data =lists.getList1();
	List<DiaryWriter> date = lists.getList2();
	
	String startDate = "";   // 일자정보
	String endDate = "";
	int totalDate = 0;
	
	int attNum = 0;          // 선택한 명소정보
	String attName = "";
	String attPic = "";
	
	
	if(date.size() == 0){
		startDate = null;
		endDate = null;
		totalDate = 1;
		
	}else{   // 데이터의 갯수는 1개 즉  LIST의 길이는 항상 1
		startDate = date.get(0).getStart_date();
		endDate = date.get(0).getEnd_date();
		totalDate = date.get(0).getTotal_date();
		}
	

	//--------------좌표데이터 JSON 파싱 -------------------------------------------------
	StringBuilder spotData = new StringBuilder("[");  
	
	for(int i= 0; i < data.size(); i++){
		spotData.append("{");
		spotData.append("\"attNum\":"+ data.get(i).getAttraction_num()+",");
		spotData.append("\"attName\":\""+data.get(i).getAttraction_name()+"\",");
		spotData.append("\"latitude\":"+ data.get(i).getLatitude()+",");
		spotData.append("\"longitude\":"+ data.get(i).getLongitude());
		spotData.append("},");
	}
	spotData.deleteCharAt(spotData.length()-1);  // 길이의-1 위치에 콤마를 제거하라.
	spotData.append("]");
	
	String json = spotData.toString();
	String encodedData = Base64.getEncoder().encodeToString(json.getBytes());

	


	
%>


<input type="hidden" id="encodedData" value="<%= encodedData%>">
<form id="writeData" action="regDiary" method="Post" enctype="multipart/form-data" accept-charset="UTF-8">
	<%request.setCharacterEncoding("UTF-8");%>
	<input type="hidden" id="hashTag" name="hashTag" value="">
	<input type="hidden" id= "memo" name="memo">
	<input type="hidden" id= "attraction_Num" name="attractionNum">
	<input type="hidden" id= "depart_Date" name="departDate" value="<%= startDate%>">
	<input type="hidden" id= "end_Date" name="endDate" value="<%= endDate%>">
	<input type="hidden" id= "total_Date" name="totalDate" value="<%= totalDate%>">
	<input type="hidden" name="id" value="<%= id%>>">
	<input type="hidden" name="repPic" id="repPicObj">
	

	<div id="topPic">
		<div id="topContWrap">
			<div>
				<div id="userPic"></div>
				<div id="userPicReg">사진등록</div>
				<div id="userIdWrap"><p>userId</p></div>
				<input type="text" id="contentTitle" name="contentTitle" placeholder="제목을 입력하세요">	
				<div id="dateRange"><p><%= startDate%></p>&nbsp;&nbsp;~&nbsp;&nbsp;<p><%= endDate%></p></div>
				<div id="totalDays"><%= totalDate-1%>박 <%= totalDate%>일</div>
				<select id="area" name="area">
					<option selected="selected" hidden="hidden" disabled="disabled">-지역선택-</option>
					<option value="se">서울경기</option>
					<option value="ka">강원도</option>
					<option value="ch">충청도</option>
					<option value="ky">경상도</option>
					<option value="ju">전라도</option>
					<option value="je">제주도</option>
				</select>
			</div>
		</div>
	</div>
	
	<section id="section1">
		<div id="path">
			<%
				if(data.size()>1){  // list의 size순서대로 번호를 붙여 출력할 것.
					for(int i=0; i<data.size(); i++){
						attName = data.get(i).getAttraction_name();   // 
						attPic = data.get(i).getAttraction_pic();
						
						
						if(i<data.size()-1){
							out.println("<div class ='style1'>");
							out.println("<div><div>"+(i+1)+"</div></div>");
							out.println("<div style='background-image:url(image/"+attPic+");'></div>");
							out.println("<div><p>"+attName+"</p></div>");
							out.println("<div><input type = 'button' value ='메모'></div>");
							out.println("<div></div>");
							out.println("<div><textarea placeholder ='내용을 입력하세요.'></textarea></div>");
							out.println("<input type = 'button' value = '저장'>");
							out.println("<input type = 'button' value = '취소'>");
							out.println("<div></div>");
							out.println("<div class = 'picConfirm'>업로드됨</div>");
							
							
							out.println("</div>");
							out.println("<div class = 'style2'>");
							out.println("<div></div>");
							out.println("<div></div>");
							out.println("</div>");	
						}else{
							out.println("<div class ='style1'>");
							out.println("<div><div>"+(i+1)+"</div></div>");
							out.println("<div style='background-image:url(image/"+attPic+");'></div>");
							out.println("<div><p>"+attName+"</p></div>");
							out.println("<div><input type = 'button' value ='메모'></div>");
							out.println("<div></div>");
							out.println("<div><textarea placeholder ='내용을 입력하세요.'></textarea></div>");
							out.println("<input type = 'button' value = '저장'>");
							out.println("<input type = 'button' value = '취소'>");
							out.println("<div></div>");
							out.println("<div class = 'picConfirm'>업로드됨</div>");
							
							out.println("</div>");
							}
						}
					   
					  
					   
					
				}else if(data.size()==1){
					attName = data.get(0).getAttraction_name();
					attPic = data.get(0).getAttraction_pic();
					
					out.println("<div class ='style1'>");
					out.println("<div><div>"+1+"</div></div>");
					out.println("<div  style='background-image:url(image/"+attPic+");'></div>");
					out.println("<div><p>"+attName+"</p></div>");
					out.println("<div><input type = 'button' value ='메모'></div>");
					out.println("<div></div>");
					out.println("<div><textarea placeholder ='내용을 입력하세요.'></textarea></div>");
					out.println("<input type = 'button' value = '저장'>");
					out.println("<input type = 'button' value = '취소'>");
					out.println("<div></div>");
					out.println("<div class = 'picConfirm'>업로드됨</div>");
					
					out.println("</div>");
									
				}else{
					out.println("없읍니다.");
				}
				
				%>
		
			
			
			
		
		</div>
		<div id="maps">
			<div id="map"> 
				<script type="text/javascript" src="js/DiaryWrite.js"></script>
				
			</div>
			<div id="pathserial">
				<div><p>선택한 경로</p></div>
			
				
				<div>
				
					
					<% 
						for(int i =0 ; i<data.size();i++){
							attName = data.get(i).getAttraction_name();
							
							out.println("<div>");
							
								out.println("<div>");
								
									out.println("<div>"+(i+1)+"</div>");
								
								out.println("</div>");
								
								out.println("<div><p>"+attName+"</p></div>");
							
							out.println("</div>");
							
						}
					
					%>
				
				
				
				</div>
				
				
				
			</div>
		</div>
		
	</section>
	
	<section id="section2">
		<div id="WtiteWrap1">
			 <div id="writeTitle">
			 	<p>당신의 여행은 어땠나요?</p>
			 </div>
			 <textarea id="writeContent" name="writeContent" rows="50" cols="50" placeholder="내용을 입력하세요."></textarea>
		</div>
		<div id="WtiteWrap2">
			<div id="repPicWrap">
				<div id="repPic"></div>
				<div id="contnbutton">
					<div><p>대표사진을 선택해 보세요.</p></div>
					<div><p>대표사진은 제목과 함께 게시물로 표기됩니다.<br/>
						소중하고 아름다운 추억이 담긴 순간을  타인과<br/>공유해보세요.
					</p>
					</div>
					<div><input id="repPicButton" type="button" value="대표사진 선택"></div>
				</div>
			</div>
			<div id="hashtagWrap">
				<div><p>해시태그를 등록해 보세요.</p></div>
				<div>
					<ul id="tag-list"></ul>
	                <input type="text" id="tag" size="7" placeholder="해시테그 입력."/>
					
				</div>
		
			
			</div>
		</div>
		<div id="buttonWrap">
		<input id="writeReg" class="buttonStyle1" type="button" value="작성하기">
			<input id="writeCancel" class="buttonStyle1" type="button" value="취소">
			
		</div>
	</section>
	
	





</form>





<jsp:include page="footer.jsp"/>
</body>
</html>