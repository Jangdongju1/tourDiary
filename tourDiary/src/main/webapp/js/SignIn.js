function login() {
	let id = document.getElementById("id");
	let pw = document.getElementById("pw");
	
	if(id.vlaue =="" || pw.value ==""){
		alert("회원정보를 모두 입력해주세요");
	}else{
		let info = {
				userId : id.value , 
				password : pw.value
		}
		$.ajax({
			url: "loginProcess",
			method: "POST",
			data: JSON.stringify(info),
			dataType: "json",
			contentType:"application/json",
			success: function(response) {
				let status = response.status;
				if(status == 0){
					alert("비밀번호가 틀렸습니다.");
					id.value = "";
					pw.value = "";
				}else if(status == 2){
					alert("아이디가 없습니다.");
					id.value = "";
					pw.value = "";
				}else{
					alert("로그인성공");
					location.href ="DiaryIndex.jsp?userId="+id.value;
				}
				
			},	
			error: function(xhr, status, error) {
				console.error(error);  
			}
			
		});
	}
	

	
}