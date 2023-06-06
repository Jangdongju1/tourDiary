<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" trimDirectiveWhitespaces="true"%>
<% request.setCharacterEncoding("utf-8"); %>

<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title></title>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
	<script type="text/javascript" src="js/diary_index.js"></script>
	<link rel="stylesheet" type="text/css" href="css/diary_index.css">
	<link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Amatic+SC">
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com"> <!-- crossorigin -->
	<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100&display=swap" rel="stylesheet">
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com"><!-- crossorigin -->
	<link href="https://fonts.googleapis.com/css2?family=Cardo&display=swap" rel="stylesheet">
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

	<div id="concepImgFra">
	<div id="conceptImg">
		<img src="image/conceptImg.png">
		<!-- <strong id="commTitle">Stay Whale</strong>
		<strong id="commTitle2">Community</strong> -->
	</div>
</div>
		<div id="top_nav">
			<div id="top_navFra">
				<ul class="tab-bar">
					<li data-num="1" class="tab wave dark">여행Diary</li>
					<li data-num="2" class="tab wave dark">자유게시판</li>
					<li data-num="3" class="tab wave dark">리뷰</li>
					<li data-num="4" class="tab wave dark">1:1 문의</li>
					<!-- <li data-num="5" class="tab wave dark">약관 및 정책</li> -->
				</ul>

		</div>
	</div>
	<div id="topConetentFra">
		<div id="topContent">
			<div id="top_image">
				<img src="image/topConImg.jpg">


			</div>
			<div id="top_text2">

				<div id="innerTitle">
					상상속의 여행을 현실로. 
					</div>
				
				<div id="topInnertext">
					
					<strong style="position: absolute; top: 10px; left: 40px; font-size: 30px;">나만의 여행 Diary를 만들어 보세요.</strong>

					<div id="innerBody">
						<ul>
							<li># 생각했던 여행을 미리 체험해보세요.</li>
							<li># 지난 추억을 글로 작성하고 타인과 공유하세요.</li>
							<li># 여행했던 경로를 지도에서 선택 후 사진 업로드!</li>
							<li># 베스트 게시글을 보고 여행을 계획해 보세요.</li>

						</ul>

					</div>
	
				</div>
				<input type="button" name="tour_plan" id="tour_plan" value="Diary작성하러가기" onclick="location.href='getcourses'">

		</div>

			</div>
		</div>
	<section style="margin-top: 70px;">
		<form>

			<div id="bestDiaryFra">
					<div id="title_wrap">
				<strong>베스트 Diary <span id="icon3"><img src="image/best.png"></span></strong>
				<ul id="bestDiary">
					<li>
						<div style="background-image: url(image/jeju.jpg);"></div>
						<div>
							<div class="circle" style="background-image: url(image/jejuper.jpg);"></div>
							<div class="diaryText">
								<ul>
									<li>jejulady</li>
									<li>제주도 한달살기's </li>
									<li>세비야는 작은 도시지만 걸어서 돌아보기엔 다리가 아프고 트램이나 지하철은 애매하다. 좁고 미로같은 골목으로 유명한 세비야에서 자동차는 금물! 자전거 도로가 따로 있는데다 자전거 대여도 해주니 세비야에선 최고의 교통편이다.</li>
								</ul>
							</div>

						</div>
					</li>
					


					<li>
						<div style="background-image: url(image/london.png);"></div>
						<div>
							<div class="circle" style="background-image: url(image/londonlady.jpg);"></div>
							<div class="diaryText">
								<ul>
									<li>londonlady</li>
									<li>Welcom to London </li>
									<li>한가로운 오후 런던시내를 돌아다니며 수많은 사람들과 대화를 나누었다. </li>
								</ul>
							</div>
						</div>
					</li>
					<li>
						<div style="background-image: url(image/paris.png);"></div>
						<div>
							<div class="circle" style="background-image: url(image/parislady.png);"></div>
							<div class="diaryText">
								<ul>
									<li>jdj881204</li>
									<li>Welcom to Paris </li>
									<li>프랑스 파리에 있는 에펠탑을 보면서 .. 아주 장관임을 느꼇다.. 나도 가보고싶다 </li>
								</ul>
							</div>
						</div>
			

					</li>
					<li>
						<div style="background-image: url(image/venice.png);"></div>
						<div>
							<div class="circle" style="background-image: url(image/venicelady.png);"></div>
							<div class="diaryText">
								<ul>
									<li>fantasticBaby</li>
									<li>물의도시 베네치아 </li>
									<li>물의나라 미즈노 고큐 베네찌아 베네치아를 걷는 이 기분은 말로 표현할 수 없다. 아 물비린내</li>
								</ul>
							</div>
						</div>
					</li>
					<li>
						<div style="background-image: url(image/hogwarts.jpg);"></div>
						<div>
							<div class="circle" style="background-image: url(image/hogwartslady.png);"></div>
							<div class="diaryText">
								<ul>
									<li>jdj881204</li>
									<li>모두 9와3/4승강장으로! </li>
									<li>호그와트로 가기전에 님브스 2000도 사고 지팡이도 사고 헤그위드라는 부엉이도 get했다.</li>
								</ul>
							</div>
						</div>
					</li>
					<li>
						<div style="background-image: url(image/swiss.png);"></div>
						<div>
							<div class="circle" style="background-image: url(image/swisslady.png);"></div>
							<div class="diaryText">
								<ul>
									<li>swisslady</li>
									<li>아름다운 스위스 호수산장 </li>
									<li>아름다운 스위스 호수산장 요들레이요들레이요들레이요들레이요들레이 이히~</li>
								</ul>
							</div>
						</div>
					</li>
					<li>
						<div style="background-image: url(image/grand.png);"></div>
						<div>
							<div class="circle" style="background-image: url(image/grandman.png)"></div>
							<div class="diaryText">
								<ul>
									<li>genome</li>
									<li>Also...she is gaenyeon...</li>
									<li>ho ... my... god... i don't know what i do.......... </li>
								</ul>
							</div>
						</div>
					</li>
					<li>
						<div style="background-image: url(image/berlin.png);"></div>
						<div>
							<div class="circle" style="background-image: url(image/jejuper.jpg);"></div>
							<div class="diaryText">
								<ul>
									<li>prayer</li>
									<li>자유로운 독일여행 </li>
									<li>제일먼저 간 곳은 베를린 성당이었다. 나의 여행은 이렇게 거룩하고 신성하고 경건하게 시작되었다.</li>
								</ul>
							</div>
						</div>
					</li>

				</ul>
				
		</div>
				
			</div>


			<div id="title_wrap1">
				<strong>베스트 리뷰</strong>
				<span id="icon"><img src="image/best.png"></span>
		</div>
		<div id="slide_container">
		<div id="slide1">
			<ul id="slide_list">
				<li>
					<div>
						<img src="image/p1.png">
					</div>
					<div>
						<ul>
							<li>제목 :엄마야 누나야 강변살자.</li>
							<li>출발일 : 2023.10.10 (3박)</li>
							<li>내용 :푸른언덕에 배낭을매고 황금빛 태양 축제를 여는</li>
							<li>userID</li>
							<li><strong># 바람, # 모래사장, #신난다, # 즐거운 하루 , # 신나는 하루</strong></li>
						</ul>

					</div>
		
				</li>
				<li>
					<div>
						<img src="image/p2.png">
					</div>
					<div>
						<ul>
							<li>어어엄마야누우우우나야 강변살자</li>
							<li>출발일 : 2023.10.10 (3박)</li>
							<li>내용 :푸른언덕에 배낭을매고 황금빛 태양 축제를 여는</li>
							<li>userID</li>
							<li><strong># 바람, # 모래사장, #신난다, # 즐거운 하루 , # 신나는 하루</strong></li>
						</ul>
					</div>
					
				</li>
				<li>
					<div>
						<img src="image/p3.png">
					</div>
					<div>
						<ul>
							<li>제목 :엄마야 누나야 강변살자.</li>
							<li>출발일 : 2023.10.10 (3박)</li>
							<li>내용 :푸른언덕에 배낭을매고 황금빛 태양 축제를 여는</li>
							<li>userID</li>
							<li><strong># 바람, # 모래사장, #신난다, # 즐거운 하루 , # 신나는 하루</strong></li>
						</ul>
					</div>
					
				</li>
				<li>
					<div>
						<img src="image/p4.png">
					</div>
					<div>
						<ul>
							<li>제목 :엄마야 누나야 강변살자.</li>
							<li>출발일 : 2023.10.10 (3박)</li>
							<li>내용 :푸른언덕에 배낭을매고 황금빛 태양 축제를 여는 치킨</li>
							<li>userID</li>
							<li><strong># 바람, # 모래사장, #신난다, # 즐거운 하루 , # 신나는 하루</strong></li>
						</ul>
					</div>
				</li>
				<li>
					<div>
						<img src="image/p1.png">
					</div>
					<div>
						<ul>
							<li>제목 :엄마야 누나야 강변살자.</li>
							<li>출발일 : 2023.10.10 (3박)</li>
							<li>내용 :푸른언덕에 배낭을매고 황금빛 태양 축제를 여는 창의씨</li>
							<li>userID</li>
							<li><strong># 바람, # 모래사장, #신난다, # 즐거운 하루 , # 신나는 하루</strong></li>
						</ul>

					</div>
		
				</li>
				<li>
					<div>
						<img src="image/p1.png">
					</div>
					<div>
						<ul>
							<li>제목 :엄마야 누나야 강변살자.</li>
							<li>출발일 : 2023.10.10 (3박)</li>
							<li>내용 :푸른언덕에 배낭을매고 황금빛 태양 축제를 여는 광의씨</li>
							<li>userID</li>
							<li><strong># 바람, # 모래사장, #신난다, # 즐거운 하루 , # 신나는 하루</strong></li>
						</ul>

					</div>
		
				</li>
				<li>
					<div>
						<img src="image/p1.png">
					</div>
					<div>
						<ul>
							<li>제목 :엄마야 누나야 강변살자.</li>
							<li>출발일 : 2023.10.10 (3박)</li>
							<li>내용 :푸른언덕에 배낭을매고 황금빛 태양 축제를 여는 준열씨</li>
							<li>userID</li>
							<li><strong># 바람, # 모래사장, #신난다, # 즐거운 하루 , # 신나는 하루</strong></li>
						</ul>

					</div>
		
				</li>
				<li>
					<div>
						<img src="image/p4.png">
					</div>
					<div>
						<ul>
							<li>제목 :엄마야 누나야 강변살자.</li>
							<li>출발일 : 2023.10.10 (3박)</li>
							<li>내용 :푸른언덕에 배낭을매고 황금빛 태양 축제를 여는 현우씨</li>
							<li>userID</li>
							<li><strong># 바람, # 모래사장, #신난다, # 즐거운 하루 , # 신나는 하루</strong></li>
						</ul>
					</div>
				</li>
			</ul>
			
		</div>
		
		</div>
			<button type="button" name="button_left" id="button_left"><img src="image/button_left.png"></button>
			<button type="button" name="button_right" id="button_right"><img src="image/button_right.png"></button>

		<div id="title_wrap2">
			<strong>지역별 Best<img src="image/best2.png" id="icon2"></strong>
		</div>

		

		<div id="bottom_frame">
			<strong>함께하는 <br>내나라 여행.</strong>
			<div id="bottom_main_img">
				<img src="image/bottom_img.jpg">
			</div>
	
			<ul class="ul_style" id="slide_list1">
					<li>
						<div><img src="image/p4.png"></div>
						<div>
							<ul>
							<li>제목 :엄마야 누나야 가아앙변.</li>
							<li>출발일 : 2023.10.10 (3박)</li>
							<li>동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라만세 무궁과 삼철니 화려가머어ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ</li>
							<li>userID</li>
							<li><strong># 바람, # 모래사장, #신난다, # 즐거운 하루 , # 신나는 하루</strong></li>

						</ul>
							
						</div>
					</li>
					<li>
						<div><img src="image/p5.png"></div>
						<div>
							<ul>
							<li>제목 :살어리 살어리 낫다.</li>
							<li>출발일 : 2023.10.10 (3박)</li>
							<li>내용 :청산에 살어리가 낫는데 십리도 못가서 발병난다 여는</li>
							<li>userID</li>
							<li><strong># 신난다, # 두두두두두, #빵야방야, # 즐거운 하루 , # 신나는 하루</strong></li>
						</ul>
						</div>
					</li>
					<li>
						<div><img src="image/p6.png"></div>
						<div>
							<ul>
							<li>제목 : 나를 버리고 가시는 길은 십리도 못가서</li>
							<li>출발일 : 2023.10.10 (4박)</li>
							<li>내용 :아아 님은 갔습니다. 님은 갓지만 나는 님을 </li>
							<li>userID</li>
							<li><strong># 독립운동, # 닛본바시, # 오오토리바시, # 즐거운 하루 , # 신나는 하루</strong></li>
						</ul>
						</div>
					</li>
			</ul>
			<ul class="ul_style" id="slide_list2">
					<li>
						<div><img src="image/p7.png"></div>
						<div>
							<ul>
							<li>제목 : 울산베어와 함께 울산투어</li>
							<li>출발일 : 2023.10.10 (4박)</li>
							<li>내용 : 하늘을 우러러 한점 부끄럼이 없기를 잎새에 이는 바람에도 나는 괴로와 했다. </li>
							<li>userID</li>
							<li><strong># 동해물과, # 백두산이, # 마르고 닳도록, # 즐거운 하루 , # 신나는 하루</strong></li>
						</ul>
						</div>
					</li>
					<li>
						<div><img src="image/p8.png"></div>
						<div>
							<ul>
							<li>제목 : 울산베어와 함께 울산투어</li>
							<li>출발일 : 2023.10.10 (4박)</li>
							<li>내용 : 하늘을 우러러 한점 부끄럼이 없기를 잎새에 이는 바람에도 나는 괴로와 했다. </li>
							<li>userID</li>
							<li><strong># 동해물과, # 백두산이, # 마르고 닳도록, # 즐거운 하루 , # 신나는 하루</strong></li>
						</ul>
					</div>
					</li>
					<li>
						<div><img src="image/p9.png"></div>
						<div>
							<ul>
							<li>제목 : 울산베어와 함께 울산투어</li>
							<li>출발일 : 2023.10.10 (4박)</li>
							<li>내용 : 하늘을 우러러 한점 부끄럼이 없기를 잎새에 이는 바람에도 나는 괴로와 했다. </li>
							<li>userID</li>
							<li><strong># 동해물과, # 백두산이, # 마르고 닳도록, # 즐거운 하루 , # 신나는 하루</strong></li>
						</ul>
						</div>
					</li>
			</ul>
			<ul class="ul_style" id="slide_list3">
					<li>
						<div><img src="image/p10.png"></div>
						<div>
							<ul>
							<li>제목 : 루비와 함께하는 해적왕을 위한 여행</li>
							<li>출발일 : 2023.10.10 (4박)</li>
							<li>내용 : 내 어린시절 우연히 들었던 믿지 못할 한마디. 이 세상을 다준다는 매혹적인 이야기. </li>
							<li>userID</li>
							<li><strong># 해적왕, # 나는된다, # 나는야해적왕 , # 즐거운 하루 , # 신나는 하루</strong></li>
						</ul>
						</div>
					</li>
					<li>
						<div><img src="image/p11.png"></div>
						<div>
							<ul>
							<li>제목 : 루비와 함께하는 해적왕을 위한 여행</li>
							<li>출발일 : 2023.10.10 (4박)</li>
							<li>내용 : 내 어린시절 우연히 들었던 믿지 못할 한마디. 이 세상을 다준다는 매혹적인 이야기. </li>
							<li>userID</li>
							<li><strong># 해적왕, # 나는된다, # 나는야해적왕 , # 즐거운 하루 , # 신나는 하루</strong></li>
						</ul>
						</div>
					</li>
					<li>
						<div><img src="image/p12.png"></div>
						<div>
							<ul>
							<li>제목 : 루비와 함께하는 해적왕을 위한 여행</li>
							<li>출발일 : 2023.10.10 (4박)</li>
							<li>내용 : 내 어린시절 우연히 들었던 믿지 못할 한마디. 이 세상을 다준다는 매혹적인 이야기. </li>
							<li>userID</li>
							<li><strong># 해적왕, # 나는된다, # 나는야해적왕 , # 즐거운 하루 , # 신나는 하루</strong></li>
						</ul>
						</div>
					</li>
			</ul>
			<ul class="ul_style" id="slide_list4">
					<li>
						<div><img src="image/p1.png"></div>
						<div>
							<ul>
							<li>제목 : 키부츠지 무잔 사냥 여행.</li>
							<li>출발일 : 2023.10.10 (4박)</li>
							<li>내용 : 무엇이 재미있더냐? 무엇이 즐겁더냐 사람의 목숨을 무엇이라 생각하는 것이냐. </li>
							<li>userID</li>
							<li><strong># 요리이치, # 무잔, # 코쿠시보 , # 아카자 , # 신나는 하루</strong></li>
						</ul>
						</div>
					</li>
					<li>
						<div><img src="image/p2.png"></div>
						<div>
							<ul>
							<li>제목 : 키부츠지 무잔 사냥 여행.</li>
							<li>출발일 : 2023.10.10 (4박)</li>
							<li>내용 : 무엇이 재미있더냐? 무엇이 즐겁더냐 사람의 목숨을 무엇이라 생각하는 것이냐. </li>
							<li>userID</li>
							<li><strong># 요리이치, # 무잔, # 코쿠시보 , # 아카자 , # 신나는 하루</strong></li>
						</ul>
						</div>
					</li>
					<li>
						<div><img src="image/p3.png"></div>
						<div>
							<ul>
							<li>제목 : 키부츠지 무잔 사냥 여행.</li>
							<li>출발일 : 2023.10.10 (4박)</li>
							<li>내용 : 무엇이 재미있더냐? 무엇이 즐겁더냐 사람의 목숨을 무엇이라 생각하는 것이냐. </li>
							<li>userID</li>
							<li><strong># 요리이치, # 무잔, # 코쿠시보 , # 아카자 , # 신나는 하루</strong></li>
						</ul>
						</div>
					</li>
			</ul>
			<div id="button_list">
			<ul>
				<li><button class="btn" id="region1" type="button" ><span>경상권</span></button></li>
				<li><button class="btn" id="region2" type="button" ><span>전라권</span></button></li>
				<li><button class="btn" id="region3" type="button" ><span>제주도</span></button></li>
				<li><button class="btn" id="region4" type="button" ><span>기타</span></button></li>


			</ul>
			</div>
				
		</div>
		
	</form>
	</section>


	<jsp:include page="footer.jsp"/>

</body>
</html>