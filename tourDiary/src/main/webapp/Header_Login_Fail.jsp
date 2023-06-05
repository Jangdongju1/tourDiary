<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" trimDirectiveWhitespaces="true"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
	<script type="text/javascript" src="js/header.js"></script>
	<link rel="stylesheet" type="text/css" href="css/header.css">
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com"> <!--  crossorigin  -->
	<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300&display=swap" rel="stylesheet">
	<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
</head>
<body>
	<header>
	
		<div id="logo_Wrap">
	
		
			<a href="Main_Index.jsp"><div class="logo logoup" id="logo"></div></a>
			<div id="logo_Menu">
				<nav>
					<ul id="Logo_MenuCont">
						<li><a href="#" onclick="return false">내주변</a></li>
						<li><a href="Login.jsp">로그인</a></li>
						<li><div id="search_icon">
						<div class="search-wrapper">
						    <div class="input-holder">
						        <input type="text" class="search-input" placeholder="Type to search" />
						        <button class="search-icon" onclick="searchToggle(this, event);"><span></span></button>
						    </div>
						</div>
						</div></li>
					</ul>
					
					
						
						
						
						
					<div id="topMenu">
						<div id="hambukBtn">
							<span id="hambuk" class="material-symbols-outlined">menu </span>
							<div>전체</div>
						</div>
						
						<ul id="topMenuCont">
							<li><a href="#" onclick="return false">숙소</a></li>
							
							<li><a href="HotSight_Index.jsp">명소</a>
							
							
							</li>
							<li><a href="Jeonsi_Index.jsp">전시·행사</a>
								
							</li>
							<li><a href="Market_Index.jsp">마켓</a>
							</li>
							<li><a href="Withtour.jsp">함께하는 Tour </a></li>
							
							<li><a href="Diary_Index.jsp">커뮤니티</a>
								
							
							</li>
							
						</ul>
					</div>			
					
				</nav>
			</div>
		</div>
		<div id="menuWrap">
		<div id="subMenu">
				
				<ul>
					<li><a href="Hotel_Resort_Index.jsp">호텔ㆍ리조트</a></li>
					<li><a href="Pension_Index.jsp">펜션</a></li>
					<li><a href="HomeStay_Index.jsp">홈스테이</a></li>
					<li><a href="Camp_Glam_Index.jsp">캠핑ㆍ글램핑</a></li>
					<li>기타</li>
				</ul>
				
				<ul>
					<li>서울</li>
					<li>강원</li>
					<li>부산</li>
					<li>전라</li>
					<li>제주</li>
				</ul>
				
				<ul>
					<li>전시</li>
					<li>뮤지컬 ㆍ콘서트ㆍ연극</li>
					<li>테마파크</li>
					<li>레저</li>
					<li>관광</li>
				</ul>
				
				<ul>
					<li>TourDiary</li>
					<li><a href="Bulletin_Board_Inquiry.jsp">1:1게시판</a></li>
					<li><a href="Bulletin_Board_Review.jsp">리뷰</a></li>
					<li><a href="FreeBtb.jsp">자유게시판</a></li>
					<li></li>
				</ul>
			
			</div>
		
	</div>
	
	
	
	
	
	<div id="menuWrap2">
		<div id="menuCont2">
			<div id="menuTotal">
			
				<div id="accomT">
					<div><strong>숙소</strong></div>
					<div>
						<ul>
							<li><a href="Hotel_Resort_Index.jsp">호텔ㆍ리조트</a></li>
							<li><a href="Pension_Index.jsp">펜션</a></li>
							<li><a href="HomeStay_Index.jsp">홈스테이</a></li>
							<li><a href="Camp_Glam_Index.jsp">캠핑ㆍ글램핑</a></li>
							<li>기타</li>
						</ul>
					</div>
				</div>
					
					
					
				<div id="attracT">
					<div><Strong>명소</Strong></div>
					<div>
						<ul>
							<li>서울</li>
							<li>강원</li>
							<li>부산</li>
							<li>전라</li>
							<li>제주</li>
						</ul>
					</div>
				</div>
					
					
					<div id="miceT">
						<div><Strong>전시·행사</Strong></div>
						<div>
							<ul >
								<li>전시</li>
								<li>뮤지컬 ·콘서트·연극</li>
								<li>테마파크</li>
								<li>레저</li>
								<li>관람</li>
							</ul>
						</div>
					</div>
					
					
						
					<div id="marketT">
						<div><Strong>Market</Strong></div>
						<div>
							<ul>
								<li><a href="#">신상품</a></li>
								<li><a href="#">추천상품</a></li>
								<li><a href="#">구매후기</a></li>
								<li><a href="#">카테고리 목록</a></li>
							</ul>
						</div>
					</div>
					
					
					<div id="withTour">
						<div><Strong>함께하는TOUR</Strong></div>
						<div>
							<ul>
								<li><a href="#">함께하는TOUR</a></li>
							</ul>
						</div>
					</div>
					
					
					<div id="commuT">
						<div><Strong>커뮤니티</Strong></div>
						<div>
							<ul>
								<li>TourDiary</li>
								<li><a href="Bulletin_Board_Inquiry.jsp">1:1게시판</a></li>
								<li><a href="Bulletin_Board_Review.jsp">리뷰</a></li>
								<li><a href="FreeBtb.jsp">자유게시판</a></li>
							</ul>
							
						</div>
						
					
					
					
					</div>
					
					
						<div id="etc">
							<div><strong>기타</strong></div>
							<div>
								<ul>
									<li><a href="Bulletin_Board_Notice.jsp">공지사항</a></li>
									<li><a href="Bulletin_Board_QnA.jsp">자주 묻는 질문</a></li>
									<li><a href="Bulletin_Board_Policy.jsp">약관 및 정책</a></li>
									
								</ul>
							</div>
						</div>
						
							
						<div id="close"></div>
						
						
						
						
					</div>
		
				</div>
				
			</div>
	</header>
	
</body>
</html>