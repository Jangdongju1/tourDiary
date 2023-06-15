<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title></title>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
	<script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
	<script type="text/javascript" src="js/SignUp.js"></script>
	<link rel="stylesheet" type="text/css" href="css/SignUp.css">
</head>
<body>
	<section>
		<div class="total_frame">
			<div id="intro">
				<div><label><b>StayWhale 회원가입<b></label></div>
			</div>
			<div id="icon"><img src="image/logo2.png"></div>

			<form onsubmit="return onsub()" method="post" action="dbprocess/sign_Up_Jsp.jsp" >

		<table id="signup1">
			<tr>
				<td>
					<div class="outBox">
						<div class="inputBox">
					<input type="text" id="id" name="id" placeholder="사용자아이디" size="20" maxlength="20" onchange="idCheck()">
					<label for="id">사용자 아이디</label>
			
				</div>
				</div>
					<label id="id_error"></label>
					<label id="id_error2"></label>
				</td>
			</tr>
			<tr>
				<td>

					<div class="outBox2">
						<div class="inputBox">
					<input type="password" id="pass" name="pass" placeholder="비밀번호" size="16" maxlength="16" class="input_style2" onchange="pwCheck()">
					<label for="pass">비밀번호</label>
				</div>
				</div>
				<div class="outBox2">
					<div class="inputBox">
					<input type="password" id="pass_con" name="pass" placeholder="확인" size="16" maxlength="16" class="input_style2" onchange="pwCheck()" >
					<label for="pass_con">확인</label>
					</div>
				</div>
					<label id="pass_error"></label>
					<span id="pass_text"><input type="checkbox" id="passText" name="pass_text" value="Y" onclick="checkBox()"> 비밀번호 표시</span>


				</td>
			</tr>
			<tr>
				<td>
					<div class="outBox">
						<div class="inputBox">
					<input type="text" id="name" name="name" placeholder="사용자이름" size="30" maxlength="30" class="input_style1" onchange="nameCheck()" >
					<label for="name">사용자이름</label>
				</div>
				</div>
					<label id="name_error"></label>
				</td>
			</tr>
			<tr>
				<td>
					<div class="outBox">
						<div class="inputBox">
					<input type="text" id="nickname" name="nick_name" placeholder="닉네임" size="30" maxlength="30" class="input_style1" onchange="nicknameCheck()">
					<label for="nickname">닉네임</label>
				</div>
				</div>
					<label id="nickname_error"></label>
				</td>
			</tr>
		</table>
		<input type="button" id="next_step" name="next_step" value="다음" onclick="nextStep()">
		

		<table id="signup2">
			<tr>
				<td>
					<div class="outBox3">
						<div class="inputBox">
					<input type="text" id="year" name="year" placeholder="출생년도" size="4" maxlength="4" style="width: 153px;" onchange="birthCheck()" onchange="lengthCheck(this, 4)">
					<label for="year">출생년도</label>
				</div>
				</div>
					<select value = "월" id="month" name="month" class="select_style"></select>
					<select value = "일" id="day" name="day" class="select_style" onchange="birthCheck()"></select>
					<label id="birth_error"></label>
				</td>
			</tr>
			
			<tr>
				<td>
					<select id="gender" name="gender" class="select_style" onblur="genderCheck()">
						<option selected disabled hidden>-성별선택-</option>
						<option>남</option>
						<option>여</option>
					</select>

					<div class="outBox3">
						<div class="inputBox">
					<input type="tel" id="hp_1" name="hp_1" placeholder="휴대폰번호" size="13" maxlength="13" style="width: 200px;" onchange="hpCheck()">
					<label for="hp1_1">휴대폰번호</label>
				</div>
			</div>	<input type="button" id="hpCheckBtn" value="인증요청">
					<label id="gender_error"></label><label id="hp_error1"></label>
					<input type="text" id="hpCheckInput" placeholder="인증번호입력.">
					<input type="button" id="hpCheckBtn2" value="확인">
					
				</td>
			</tr>
			<tr>
		
			<td style="height: 70px;">
				<div class="outBox3">
					<div class="inputBox">
					<input type="tel" id="hp_2" name="hp_2" placeholder="비상연락처(선택사항)" style="width: 403px;" onblur="hp2Check()">
					<label for="hp_2">비상연락처(선택사항)</label>
					</div>
				</div>
					<label id="hp_error2"></label>
				
				</td>
			</tr>
			<tr>
				<td>
					<div class="outBox4">
						<div class="inputBox">
					<input type="text" id="email_first" name="email_first" placeholder="이메일" style="width: 150px;">@ 	
					<label for="email_first">이메일</label>
					</div>
				</div>
				<input type="text" id="emailVal" name="emailVal" placeholder="이메일" style="width: 120px;" readonly="readonly">
				<select id="email_second" name="email_second">
					<option selected disabled hidden>-이메일 선택-</option>
					<option value="daum.net">daum.net</option>
					<option value="google.com">google.com</option>
					<option value="naver.com">naver.com</option>
					<option value="1">직접입력</option>
				</select>
				<label id="email_error"></label>
				<label id="email_error2"></label>
				</td>
			</tr>
			<tr>
				<td>
					<input type="text"  id="post_num" name="post_num" placeholder="우편번호" style="max-width: 280px;">
					<input type="button" name="addr_search" id="addr_search" value="주소검색" onclick="sample6_execDaumPostcode()">
					
				</td>
			</tr>

			<tr>
				<td>
					<div class="outBox4">
						<div class="inputBox">
					<input type="text" name="addr_first" id="addr_first" placeholder="주소" style="width: 403px;" >
					</div>
				</div>
				<label id="addr_error"></label>
				</td>
			</tr>
			
			<tr>
				<td>
					<div class="outBox4">
						<div class="inputBox" >
					<input type="text" id="addr_detail" name="addr_detail" placeholder="상세주소" style="width: 403px;">
					<label for="addr_detail">상세주소</label>
					</div>
				</div>
				<label id="addrdetail_error"></label>
				</td>
			</tr>
			<input type="submit" id="confirm" name="confirm" value="회원가입" onclick="signupCheck()" >
			<input type="button" id="back" name="back" value="뒤로가기">
		</table>
	</form>
	</div>
	</section>
	