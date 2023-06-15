function check() {
	var id = document.getElementById("id").value;
	var pw = document.getElementById("pw").value;

	if(id == "" || pw == "") {
		alert("아이디와 비밀번호 모두 입력해주세요");
		return false;
	}
}

$(function() {

});