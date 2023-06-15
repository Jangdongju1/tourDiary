<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" trimDirectiveWhitespaces="true"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Stay Whale | Login</title>
	<link rel="stylesheet" type="text/css" href="css/SignIn.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
	<script type="text/javascript" src="js/SignIn.js"></script>
</head>
<%
	String returnUrl = request.getHeader("referer"); // 초기에 이 페이지를 요청한 페이지의 URL을 가져옵니다.
	session.setAttribute("returnUrl", returnUrl); // 세션에 저장 후 로그인 처리 후 요청했던 URL로 다시 이동
%>
<body>
	<section>
		<div id="logo_wrap">
			<a href="Main_Index.jsp"><img src="image\logo.png"></a>
		</div>
		<div id="form_wrap">
			<form name="user_info" action="dbprocess/login_process.jsp" onsubmit="return check()" method="post">
				<h1>Login</h1>
				<label style="color: slateblue;">StayWhale에 오신걸 환영합니다.</label>
				<input type="text" id="id" name="user_id" class="textfield" placeholder="UserID">
				<input type="password" id="pw" name="user_pass" class="textfield" placeholder="Password">
				<div id="login_stay">
					<input type="checkbox" id="login_check" class="cbox">
					<label style="cursor: pointer;" for="login_check">로그인 상태 유지</label><br>
				</div>
				<button type="submit" id="lbtn" class="custom-btn btn-5">로그인</button>
				<a href="Sign_Up.jsp"><p class="sign_up">회원가입</p></a>
				<a href=""><p class="id_search">아이디 찾기</p></a>
				<a href=""><p class="pass_search">비밀번호 찾기</p></a>
			</form>
		</div>
	</section>
<jsp:include page="footer.jsp"/>
</body>
</html>