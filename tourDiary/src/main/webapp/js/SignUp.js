$(function(){
    // 회원가입 1단계 2단계 왔다갔다~~
$("#next_step").click(function(){
		var errorLabel = $("#id_error, #pass_error,#name_error,#nickname_error");
		var arr = new Array();

		for (var i = 0 ; i<errorLabel.length;i++){
			arr[i] = errorLabel.eq(i).html();
		} 

		if(arr[0]==""&&arr[1]==""&&arr[2]==""&&arr[3]==""){     // 모든 에러라밸에 멘트가 없을시 ( 모든 유효성검사 만족시) 다음화면으로 전환.
			
			
			
			$("#signup1").css("opacity","0");    //가입 1단계 숨김
			$("#next_step").css("opacity","0");
			$("#next_step").css("z-index","890");
				
			$("#confirm").css("opacity","1");   // 회원가입 버튼 show
			$("#confirm").css("z-index","999");
				
			$("#signup2").css("opacity","1");  //가입 2단계  show
			$("#signup2").css("z-index","999");

			$("#back").css("opacity","1");  // 뒤로가기 show

		}
	});

     // 뒤로가기  >> 회원가입 1단계 출력
	$("#back").click(function(){
		
		$("#signup2").css("opacity","0");  //가입 2단계  hide
		$("#signup2").css("z-index","890");

		$("#back").css("opacity","0");  // 뒤로가기 hide


		$("#signup1").css("opacity","1");    //가입 1단계 show
		$("#next_step").css("opacity","1");  // 다음 버튼 show
		$("#next_step").css("z-index","999");  // 다음 버튼 show
			
		$("#confirm").css("opacity","0");   // 회원가입 버튼 hide
		$("#confirm").css("z-index","890");



	});

});



function idCheck(){   // 아이디의 패턴을 파악하는 조건식
	var idPattern = /^[a-z0-9]{5,20}$/i;
	var idInput = $("#id");
	var id_Error = $("#id_error");
	var inputBox = $("#id");

	if(idPattern.test(idInput.val()) == false){

		id_Error.html ("5~20자 영문 소문자, 숫자를 사용할 수 있습니다.");	
		inputBox.addClass("error-border");

	}else{
		id_Error.html ("");	
		inputBox.removeClass("error-border");

		
	}
		
	
	 
}




$(function(){
	$("#id").change(function(){     // ajax 중복검사 메소드
		var userId = $("#id").val();
		$.ajax({
			url : "dbprocess/id_Check.jsp",
			type : "POST",
			datatype : "html",
			data : {"id" : userId},
			success : function(data){
				if(data == 1){
					$("#id_error").html("아이디가 중복되었습니다.");
					$("#id").addClass("error-border");
				}
								  		
			}
		});
	});
	
	$("#nickname").change(function(){     // 닉네임 중복검사.
		var userNick = $("#nickname").val();
		$.ajax({
			url : "dbprocess/nick_Check.jsp",
			type : "POST",
			datatype : "html",
			data : {"nick" : userNick},
			success : function(data){
				if(data == 1){
					$("#nickname_error").html("닉네임이 중복되었습니다.");
					$("#nickname").addClass("error-border");
				}
					
								  		
			}
		});
	});
	
	
	
});




function pwCheck(){
	var pwPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?]).{8,16}$/;
	var pass = $(".input_style2");
	var pwError = $("#pass_error");
	var inputBox = $("#pass, #pass_con");

	if(pwPattern.test(pass.eq(0).val())==false ){
		pwError.html("8~16자 영문 대,소문자, 숫자, 특수문자를 사용하세요.");
		inputBox.eq(0).addClass("error-value");
		inputBox.eq(1).addClass("error-value");
		pass.addClass("error-border");


	}else if(!(pass.eq(0).val() == pass.eq(1).val())){	
		pwError.html("비밀번호가 일치하지 않습니다.");
		inputBox.eq(0).addClass("error-value");
		inputBox.eq(1).addClass("error-value");
	    pass.addClass("error-border");
	}else {
		pwError.html("");
		inputBox.eq(0).removeClass("error-value");
		inputBox.eq(1).removeClass("error-value");
		pass.removeClass("error-border");
	}

}

function checkBox(){    // 비밀번호 보기   주의할 점은 타입이 변경되는 것이기 때문에 select 할때 절때로 타입으로 해서는 아니된다. !!(오류가 발생한다.)
	var passText = $("#passText").prop("checked");
	var passInput =document.getElementsByName("pass");
	if(passText  == true){
		for(var i = 0 ; i<passInput.length ; i++){
			passInput[i].setAttribute("type", "text" );
		}
	}else{
		for(var j = 0 ; j<passInput.length ; j++){
			passInput[j].setAttribute("type", "password" );
		}
	}
}


function nameCheck(){
	var errorLabel = $("#name_error");
	var userName = $("#name");
	var Pattern = /^[\uAC00-\uD7A3]{2,5}$/;
	
	console.log(userName.val());
	
	if(Pattern.test(userName.val()) == false){
		userName.addClass("error-border");
		errorLabel.html("이름은 한글 2자~5자 사이로 입력할 수 있습니다.");	
	}else if(Pattern.test(userName.val()) == true){
		userName.removeClass("error-border");
		errorLabel.html("");	
	}
	
}

function nicknameCheck (){
	var userNick= $("#nickname").val();
	var Pattern = /^[a-zA-Z0-9가-힣]{4,20}$/;
	
	if(Pattern.test(userNick)==false){
		$("#nickname").addClass("error-border")
		$("#nickname_error").html("닉네임은 4~20자 영문, 숫자, 문자열만 허용됩니다");
	}else{
		$("#nickname").removeClass("error-border")
		$("#nickname_error").html("");
	}
		
	
	
}


function nextStep(){
	var errorLabel = $("#id_error, #pass_error,#name_error,#nickname_error");
	var checkInput = $("#signup1 input[type=text], #pass");
	

	var arr = new Array();
	for(var i =0 ; i<checkInput.length ; i++){
		arr[i] =  checkInput.eq(i).attr("placeholder");

	}


	for(var i =0 ; i< checkInput.length ; i++){	
		if(checkInput[i].value == ""){
			errorLabel.eq(i).html(arr[i]+"를 입력해 주세요.");
			checkInput.eq(i).addClass("error-border");
		}
	}
}

$('document').ready(function() {
      var area0 = ["월","1","2","3","4","5","6","7","8","9","10","11","12"];
      var area1 = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"];
      var area2 = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29"];
      var area3 = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"];
      var area4 = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30"];
      var area5 = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"];
      var area6 = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30"];
      var area7 = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"];
      var area8 = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"];
      var area9 = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30"];
      var area10 = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"];
      var area11 = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30"];
      var area12 = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"];

     // 시/도 선택 박스 초기화
     $("select[name^=month]").each(function() {
      $selsido = $(this);
      $.each(eval(area0), function() {
       $selsido.append("<option value='"+this+"'>"+this+"</option>");
      });
      $selsido.next().append("<option value=''>일</option>");
     });

     // 시/도 선택시 구/군 설정
     $("select[name^=month]").change(function() {
      var area = "area"+$("option",$(this)).index($("option:selected",$(this))); // 선택지역의 구군 Array
      var $gugun = $(this).next(); // 선택영역 군구 객체
      $("option",$gugun).remove(); // 구군 초기화

      if(area == "area0")
       $gugun.append("<option value=''>일</option>");
      else {
       $.each(eval(area), function() {
        $gugun.append("<option value='"+this+"'>"+this+"</option>");
        });
        }
       });
    });


function birthCheck(){
	var year = $("#year");
	var errorLabel =$("#birth_error");
	var month = $("#month > option:selected").val();
	var day  = $("#day > option:selected").val();
	var Pattern=/^[0-9]{4}$/;

	if(Pattern.test(year.val())== false){
		errorLabel.html("생년월일이 올바르지 않습니다");
		year.addClass("error-border");
		year.addClass("error-value");
	}else if(month =="-월-"){
		errorLabel.html("월 또는 일을 선택해주세요.");

	}else if (day =="-일-"){
		errorLabel.html("월 또는 일을 선택해주세요.");
	}else{
		errorLabel.html("");
		year.removeClass("error-border");
		year.removeClass("error-value");
		$("#month").css("border", "1px solid #E0E0E0");
		$("#day").css("border", "1px solid #E0E0E0");
	}
	
	var errorLable = $("#signup2 tr td>label");
}

function lengthCheck(input, max) {
	/*if(input.value.length > max) {
	    input.value = input.value.substr(0, max);
	  }*/
	
	
}


function genderCheck(){
	var gender = $("#gender > option:selected").val();
	var errorLabel = $("#gender_error");
	if(gender =="-성별선택-"){
		errorLabel.html("성별을 선택해주세요.");
		$("#gender").css("border", "2px solid red")
	}else{
		errorLabel.html("");
		$("#gender").css("border", "1px solid #E0E0E0")
	}
}


/*function inputEvent(e) {
    if (e.key.match(/[^0-9]/g)) {
      e.target.value = e.target.value.replace(/[^0-9]/g, '');
    }
  }

  var numericField = document.getElementById('year');
  numericField.addEventListener('input', inputEvent);*/









function sample6_execDaumPostcode() {
        new daum.Postcode({
            oncomplete: function(data) {
                // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

                // 각 주소의 노출 규칙에 따라 주소를 조합한다.
                // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                var addr = ''; // 주소 변수
                var extraAddr = ''; // 참고항목 변수

                //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
                if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                    addr = data.roadAddress;
                } else { // 사용자가 지번 주소를 선택했을 경우(J)
                    addr = data.jibunAddress;
                }

                // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
               /* if(data.userSelectedType === 'R'){
                    // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                    // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                    if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                        extraAddr += data.bname;
                    }
                    // 건물명이 있고, 공동주택일 경우 추가한다.
                    if(data.buildingName !== '' && data.apartment === 'Y'){
                        extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                    }
                    // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                    if(extraAddr !== ''){
                        extraAddr = ' (' + extraAddr + ')';
                    }
                    // 조합된 참고항목을 해당 필드에 넣는다.
                
                
                } else {
                    document.getElementById("").value = '';
                }*/

                // 우편번호와 주소 정보를 해당 필드에 넣는다.
                document.getElementById("post_num").value = data.zonecode;
                document.getElementById("addr_first").value = addr;
                // 커서를 상세주소 필드로 이동한다.
                document.getElementById("addr_detail").focus();
            }
        }).open();
    }

function hpCheck(){
	var hpPattern = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/;
	var hp1 = $("#hp_1");
	var errorLabel1 =$("#hp_error1");
	var hpValue = hp1.val().replace(/-/g,'');  

	if (hpPattern.test(hpValue)==false){
		errorLabel1.html("휴대폰 번호가 올바른 형식이 아닙니다.");
		hp1.addClass("error-border");
		hp1.addClass("error-value");
	}else{
		errorLabel1.html("");
		hp1.removeClass("error-border");
		hp1.removeClass("error-value")
	}

}

function hp2Check(){
	var hp2 = $("#hp_2");
	var hpPattern =/^(01[0-9]{1}|02|0[3-9]{1}[0-9]{1})-?[0-9]{3,4}-?[0-9]{4}$/;
	var errorLabel =$("#hp_error2");
	var hp2Val = hp2.val().replace(/-/g,"");

	if(hp2Val==""){
		hp2.removeClass("error-border");
		hp2.removeClass("error-value");
		errorLabel.html("");
	}else if(hpPattern.test(hp2Val)==false){
		errorLabel.html("비상연락처의 형식이 올바르지 않습니다.");
		hp2.addClass("error-border");
		hp2.addClass("error-value");

	}else if(hpPattern.test(hp2Val)==true){
		errorLabel.html("");	
		hp2.removeClass("error-border");
		hp2.removeClass("error-value");

	}

}


function signupCheck(){                                  
	var gender = $("#gender > option:selected").val();
	var month = $("#month > option:selected").val();
	var day = $("#day > option:selected").val();
	var email = $("#email_second > option:selected").val();
	var errorLabel = $("#gender_error");
	var errorLabel2 = $("#hp_error1");
	var hp1 = $("#hp_1");
	var etc = $("#year, #hp_1, #email_first, #addr_first, #addr_detail");                  // 생년,hp1, 이메일(앞), 주소, 상세주소. 
	var errorLabeletc= $("#birth_error, #hp_error1, #email_error, #addr_error , #addrdetail_error");
	var arr = new Array();

	if(gender =="-성별선택-"){
		errorLabel.html("성별을 선택해주세요.");
		$("#gender").css("border", "2px solid red");
	}
	if(month =="-월-"){
		$("#month").css("border", "2px solid red");
	}
	
	if(day == "-일-"){
		$("#day").css("border", "2px solid red");
	}
	if(email == "-이메일 선택-"){
		$("#email_second").css("border", "2px solid red");
		$("#email_error2").html("이메일 형식을 선택해주세요.");

	}


	for(var i = 0 ; i<etc.length ; i++){
		arr[i] = etc.eq(i).attr("placeholder");
	}

	for( var j = 0 ; j< etc.length;j++){
		if (etc.eq(j).val() == ""){
		errorLabeletc.eq(j).html(arr[j]+"를 입력해주세요.");
		etc.eq(j).addClass("error-border");
		}	
	}

}


function onsub(){
	var errorLabel = $("#signup2 tr td>label");
	var arr = new Array();
	for (var i = 0 ; i< errorLabel.length; i++){
		arr[i] = errorLabel.eq(i).html();
	}

	

	for(var j = 0 ; j < arr.length; j++){    // for문으로 돌면서 에러 라벨의 공백이 아닌게 하나라도 있으면 false.
		if(arr[j] != ""){
			return false;
		}
	}
	return true;  // 그게 아니면 true;


}



$(function(){   // 이메일을 적는 부분과 어떤 메일인지 선택한 부분에 대한 공백 유효성 검사.
	$("#email_first").change(function(){
		if($(this).val()!=""){
			$("#email_error").html("");
			$(this).removeClass("error-border");
		}
	});
	$("#email_second").change(function(){
		var emailVal = $("#email_second > option:selected").val();
		if(emailVal == "-이메일 선택-"){
			$(this).css("border", "2px solid red");
		}else{
			$(this).css("border", "1px solid #E0E0E0")
			$("#email_error2").html("");
		}
	});

	$("#email_second").change(function(){   // 이메일 선택부분( select의 value값 이용)
		var emailVal = $("#email_second > option:selected").val();

		if(emailVal ==1){
			$("#emailVal").attr("readonly", false);
			$("#emailVal").val("");
		}else{
			$("#emailVal").attr("readonly", true);
			$("#emailVal").val(emailVal);
		}
	});


	



	$("#addr_first").blur(function(){ //주소 상세주소 공백체크 
		if($(this).val()!=""){
			$("#addr_error").html("");
			$(this).removeClass("error-border");
		}
	});
	$("#addr_detail").change(function(){
		if($(this).val()!=""){
			$("#addrdetail_error").html("");
			$(this).removeClass("error-border");
		}
	});
});


$(function(){
	$(".outBox .inputBox input[type=text]").blur(function(){
		if($(this).val() != '')
		{
			$(this).addClass("has-value");
		}
		else
		{
			$(this).removeClass("has-value");
		}
	});
});
$(function(){	
	$(".outBox2 .inputBox .input_style2").blur(function(){
		if($(this).val() != '')
		{
			$(this).addClass("has-value");
		}
		else
		{
			$(this).removeClass("has-value");
		}
	});
});

$(function(){
	$("input[type=tel]").blur(function(){
		if($(this).val() !=""){
			$(this).addClass("has-value");
		}else{
			$(this).removeClass("has-value");
		}
	});
});

$(function(){
	$(".outBox3 .inputBox input[type=text]").blur(function(){
		if($(this).val() !=""){
			$(this).addClass("has-value");
		}else{
			$(this).removeClass("has-value");
		}
	});
});



$(function(){
	$(".outBox4 .inputBox input[type=text]").blur(function(){
		if($(this).val() != '')
		{
			$(this).addClass("has-value");
		}
		else
		{
			$(this).removeClass("has-value");
		}
	});
});






$(function(){
    var number;
    
    $('#hpCheckBtn').click(function() {
		if (!$('#hp_1').hasClass("error-value")) {
    	var phone = $('#hp_1').val().trim();
        $.ajax({
            url : "dbprocess/Sms_Number_Check.jsp",
            data : {"phone" : phone},
            type : "POST",
            success : function(data){
                number = data.trim();
            }
        });
        alert("인증번호를 전송하였습니다.");  
  	}
        else
        {
			alert("휴대폰 번호를 다시 확인해주세요.");
		}           
    });
    
    $('#hpCheckBtn2').click(function(){ 
        var inputnumber = $('#hpCheckInput').val().trim();
        
        if(inputnumber == number)
        {
            alert("인증에 성공하였습니다.");
            $("#hpCheckInput").prop("disabled", true);
            $("#hp_1").prop("disabled", true);
            $("#hpCheckBtn").prop("disabled", true);
            $("#hpCheckBtn2").prop("disabled", true);
        }
        else
        {
            alert("인증번호를 다시 확인해주세요.");
        }
        
    });
});



