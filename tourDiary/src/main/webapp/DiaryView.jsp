<%@page import="org.apache.jasper.tagplugins.jstl.core.Import"%>
<%@page import="java.awt.Image"%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" trimDirectiveWhitespaces="true"%>
<% request.setCharacterEncoding("UTF-8");%>

<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>STAY WHALE</title>

	<link rel="stylesheet" type="text/css" href="css/DiaryView.css"><!--※css파일 맞는걸로 수정 -->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
	<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=9d7a938519112aaafea5f53dedcea24c"></script>
	<script src="js/DiaryView2.js"></script>
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap" rel="stylesheet">
	
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
<%@ page import="model.AttractionSelection" %>
<%@ page import="java.net.URLEncoder" %>

<jsp:useBean class="model.DiaryWriter" id="writer"/>
<jsp:useBean class="model.Attraction" id="att"/>
<%
	List<DiaryWriter> textDataList = (List<DiaryWriter>)request.getAttribute("textData");
	List<AttractionSelection> uploadDataList = (List<AttractionSelection>)request.getAttribute("uploadData");
	List<Attraction> attractionDataList = (List<Attraction>)request.getAttribute("attractionData");	
	DiaryWriter textData =  textDataList.get(0);
	final String UPLOADPATH =  request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath();
	
	
	
	int attlength = attractionDataList.size();  // 선택한 명소리스트의 길이 
	
	//diary 기본정보
	int post_Num = textData.getPost_Num();     // 게시번호 
	
	String user_Id = textData.getUser_Id(); 
	String post_Date = textData.getPost_Date();
	String title = textData.getPost_Title();
	String body = textData.getPost_Body();

	String userPic = "";
	try{
		userPic = URLEncoder.encode(textData.getUserPic(), "UTF-8").replace("+","%20");
	}catch(NullPointerException e){
		userPic = "";
	}
	
	
	
	
	int readcount = textData.getReadCount();  // 조회수
	int post_Like = textData.getPost_Like(); // 좋아요.
	
	
	String hashTag = textData.getHashTag();
	String start_Date = textData.getStart_date();
	String end_Date = textData.getEnd_date();
	int total_Date = textData.getTotal_date();
	
	
	// 좌표데이터 JSON화
	StringBuilder coordinates = new StringBuilder("[");// [{"latitude" : value, "logitude" : value}]
	for (int i=0 ; i< attlength ; i++){
		coordinates.append("{\"title\":\""+attractionDataList.get(i).getAttraction_name()+"\",");
		coordinates.append("\"latitude\":"+attractionDataList.get(i).getLatitude()+",");
		coordinates.append("\"longitude\":"+attractionDataList.get(i).getLongitude() +"},");
	}
	coordinates.setLength(coordinates.length() -1); // 맨 마지막 따옴표 제거하고 
	coordinates.append("]");
	
	// JSON형태를 hidden의 value 값으로 그냥 보내면 "때문에 잘린다. 따라서 인코딩이 필요함. URLEncoder클래스를 이용한다.
	// 주의 할 것은 인코딩 후  디코딩하여 출력햇을때 공백이 +로 출력된다는 점을 주의하여야 하며 공백을 최대한 없애야함.
	String spotEncode = URLEncoder.encode(coordinates.toString(),"UTF-8");  // 좌표데이터 인코딩
	
	
	String hashEncode = "";
	// 해시태그 JSON 변경.
	try{
		String hash[] = hashTag.split("/");  //  split ==특정 구분점을 기준으로 문자열을 자름
		StringBuilder hashJson  = new StringBuilder("[");//[{"hashTag" : "value" }]
		for(int i =0 ; i< hash.length; i++){
			hashJson.append("{\"hashTag\":\""+hash[i]+"\"},");
		}
		hashJson.setLength(hashJson.length()-1);
		hashJson.append("]");
		
		hashEncode = URLEncoder.encode(hashJson.toString(),"UTF-8");
	}catch(NullPointerException e){
		hashEncode = "";
	}

		
	

	
	
	int [] uploadAttNum = new int[uploadDataList.size()];
	String [] uploadPic = new String[uploadDataList.size()];
	
	
	for(int i = 0; i< uploadDataList.size(); i++){
		uploadAttNum[i] = uploadDataList.get(i).getAttraction_Num();
		if(uploadDataList.get(i).getSpotPic() !=null){
			uploadPic[i] = uploadDataList.get(i).getSpotPic();  // null값에 대한 처리 .
		}else{
			uploadPic[i] = "";
		}
		
	}
	
	StringBuilder uploadData = new StringBuilder("[");
	for(int i=0 ; i< uploadDataList.size(); i++){
		uploadData.append("{");
		uploadData.append("\"attNum\":"+uploadAttNum[i]+",");
		uploadData.append("\"spotPics\":\""+uploadPic[i]+"\"");
		uploadData.append("},");
	}
	uploadData.setLength(uploadData.length()-1);// 역시나 맨 뒷글자 자르기 
	uploadData.append("]");
	
	
	String spotPicsEncode = URLEncoder.encode(uploadData.toString(), "UTf-8"); // JSON데이터를 hidden으로 넘길때 깨지지 않도록 하는 부분.

	
%>
<input type="hidden" id="spot" value="<%= spotEncode%>">
<input type="hidden" id="hash" value="<%= hashEncode%>">
<input type="hidden" id="spotPics" value="<%= spotPicsEncode%>">
<input type="hidden" id="path" value="<%= UPLOADPATH%>">

<form  action="getInitContent" method="GET">
	
	
	<div id="topPic">
		<div id="topContWrap">
			<div>
				<div id="userPic" style="background-image:url(<%= UPLOADPATH%>/upload/picture/<%= userPic%>);"></div>
				
				<div id="userIdWrap"><p><%= user_Id%></p></div>
				<div id="hashtag">
					<ul>
					
					</ul>
				</div>
				<input type="text" id="contentTitle" name="contentTitle" readonly="readonly" style="pointer-events: none;" value="<%= title%>">	
				<div id="dateRange"><p><%= start_Date%></p>&nbsp;&nbsp;~&nbsp;&nbsp;<p><%= end_Date%></p></div>
				<div id="totalDays"><%= total_Date-1%>박 <%= total_Date%>일</div>
			</div>
		</div>
	</div>
	
	<section id="section1">
		<div id="path">
			<%
			
				if(attlength > 1){  //  명소리스트가 0개 즉 선택이 있는경우에에만 출력.
					for(int i=0; i < attlength; i++){   // 개수 -1까지 
						
						if( i < (attlength -1) ){// 길이 -1번째 까지는 이렇게 출력하고 
							out.println("<div class ='style1'>");
							out.println("<div><div>"+(i+1)+"</div></div>");
							out.println("<div style='background-image:url(image/"+attractionDataList.get(i).getAttraction_pic()+");'></div>");
							out.println("<div><p>"+attractionDataList.get(i).getAttraction_name()+"</p></div>");
							out.println("<div></div>");  // 아마도 더보기 버튼
							out.println("<textarea>"+uploadDataList.get(i).getMemo()+"</textarea>");
							
							out.println("</div>");
							out.println("<div class = 'style2'>");
							out.println("<div></div>");
							out.println("<div></div>");
							out.println("</div>");	
						}else{  // 마지막번호는 이렇게 출력
							out.println("<div class ='style1'>");
							out.println("<div><div>"+(i+1)+"</div></div>");
							out.println("<div style='background-image:url(image/"+attractionDataList.get(i).getAttraction_pic()+");'></div>");
							out.println("<div><p>"+attractionDataList.get(i).getAttraction_name()+"</p></div>");
							out.println("<div></div>");
							out.println("<textarea>"+uploadDataList.get(i).getMemo()+"</textarea>");
					
					
							
							out.println("</div>");
							}
						}
					   
					  
					   
					
				}else if(attlength == 1){  // 선택한 리스트가 1개일 경우 출력.
					
					out.println("<div class ='style1'>");
					out.println("<div><div>1</div></div>");
					out.println("<div style='background-image:url(image/"+attractionDataList.get(0).getAttraction_pic()+");'></div>");
					out.println("<div><p>"+attractionDataList.get(0).getAttraction_name()+"</p></div>");
					out.println("<div></div>");
					out.println("<textarea>"+uploadDataList.get(0).getMemo()+"</textarea>");
					out.println("</div>");
									
				}else{   // 리스트가 없는경우 / 사실상 이런 경우는 없다. 
					out.println("없읍니다.");
				}
				
				%>
		
			
			
			
		
		</div>
		<div id="maps">
			<div id="map"> 
				<script type="text/javascript" src="js/DiaryView.js"></script>
			</div>
			<div id="pathserial">
				<div><p>선택한 경로</p></div>
			
				
				<div>
				
					
					<% 
						for(int i =0 ; i<attlength;i++){
							
							
							out.println("<div>");
							
								out.println("<div>");
								
									out.println("<div>"+(i+1)+"</div>");
								
								out.println("</div>");
								
								out.println("<div><p>"+attractionDataList.get(i).getAttraction_name()+"</p></div>");
							
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
			 	<p> Tour Dirary</p>
			 </div>
			 <textarea id="writeContent" name="writeContent" rows="50" cols="50" readonly="readonly" style=" pointer-events: none;"><%= body%></textarea>
		</div>
		<div id="WtiteWrap2">
			<div id="picTitle">
				<p>Photo</p>
			</div>
			
			<div id="photo">
			
				<div id="photoWrap">
					
		
					</div>
			</div>
		
			
		
		</div>
		<div id="buttonWrap">
		
		<%	// 세션 유무에 따라서 수정버튼은 보이게 혹은 보이지 않게 해야함.
		
			out.println("<input id='revise' class = 'buttonStyle1' type = 'button' value ='수정하기'style = 'left:65px;' onclick='reviseCont("+post_Num+")'>");
			out.println("<input id='revise' class = 'buttonStyle1' type = 'button' value ='삭제하기'style = 'left:150px;' onclick='deleteCont("+post_Num+")'>");
		
		
		%>
		<input type="submit" class="buttonStyle1" id="totalCont" value="목록으로 ">
			
		</div>
	</section>
	
	
</form>





<jsp:include page="footer.jsp"/>
</body>
</html>