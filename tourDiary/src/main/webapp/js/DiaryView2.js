$(function () {// UI 관련 JS코드 
	const spotPics = decodeURIComponent(document.getElementById("spotPics").value);// 선택한 사진의 요수
	const spotPicsArr = JSON.parse(spotPics);   // 선택한 명소에 대한 사진 업로드 데이터  명소번호 : 사진배열 /로 구분
	
	
    
	const totalPics = [];  //파싱한 배열에서 사진의 값만 따로 추출해서 배열화 함. 
	let counter = 0;
	for(let i = 0 ; i <spotPicsArr.length; i++ ){  // counter라는요소를 만들어서 배열에 추가해준다. 
		totalPics[counter] = spotPicsArr[i].spotPics.split("/");  // 여러장의 사진 데이터를 /를 이용해서 배열화.
		counter++;
	}
	

	let filterdArr = totalPics.filter(function(counter) {  // 조건에 맞는 배열을 반환하는 filter함수  / ""을 제거한 배열을 반환하도록 한다. 
		return counter != "";
	}).map(function(counter) { // 요소들을 돌면서 ""공백으로 들어온 데이터들을 지워준다.
		return counter.filter(function(element) {
			return element !="";
		});
		
	});
	
	console.log(filterdArr);

	
	for(let i=0 ; i<filterdArr.length; i++){   // 배열에 담긴 사진의 수만큼 엘리먼트를 생성하고 사진을 뿌려준다. 
		for(let j=0 ; j<filterdArr[i].length; j++){
			let picUrl = "http://localhost:8081/diaryFunction/upload/picture/"+ filterdArr[i][j].replace(/\+/g, "%20");
			$("#photoWrap").append($("<div>").css("background-image", "url("+picUrl+")"));
		}
		
	}
	
	
	let filterdArr2 = totalPics.map(function(counter) {  // 배열의 순서는 유지하고 (size가0인 배열의 번호를 유지하고 )각배열의 요소의 ""값만을 제거
		return counter.filter(function(element) {
			return element !="";
		});
	});
	
	let elementArr = $(".style1");  // 선택한 명소의 길이 .

	for(let i=0 ; i< filterdArr2.length ;i++){
		if(filterdArr2[i].length != 0){
			elementArr.eq(i).append($("<div>").addClass("picConfirmBtn").css("background-image", "url(image/spotPicConfirm.png)"));
		}
	}
	
	
	$(document).on("click", ".picConfirmBtn", function() {
		let index = $(this).closest(".style1").children().eq(0).children().html();
		let spot = $(this).closest(".style1").children().eq(2).children().html();
		
	

		let modalBack = $("<div>").addClass("modal-backdrop").css("display", "block");
		let modalFra = $("<div>").addClass("modal").css("display", "block").attr("data-index", (index-1));
		let contentFra = $("<div>").addClass("contentFra");
		let title = $("<div>").addClass("modalTitle");
		let body = $("<div>").addClass("modalBody");
		let bottom = $("<div>").addClass("modalBottom");		
		let titleCont = $("<p>").addClass("titleCont").html("\""+spot+"\""+"의 사진");
		let confirmBtn = $("<input>").attr("type","button").addClass("confirmBtn").val("확인")
		
		title.append(titleCont);
		bottom.append(confirmBtn);
		contentFra.append(title, body,bottom);
		modalFra.append(contentFra);
		$("body").append(modalBack,modalFra);
		
		
				// 모달의 data- index == 배열의 인덱스 
		console.log(filterdArr2);
		
		if(filterdArr2[(index-1)].length != 0){
			for(let i = 0; i < filterdArr2[(index-1)].length ; i++){
				let url =  "http://localhost:8081/diaryFunction/upload/picture/"+filterdArr2[(index-1)][i].replace(/\+/g, "%20")
				let spotPic = $("<div>").addClass("spotPicture").css("background-image", "url("+url+")")
				$("[data-index=" + (index-1) + "]").children().find(".modalBody").append(spotPic);
					
			}
				
		}
		
	});
	
	
	$(document).on("click", ".confirmBtn", function() {   // 무한 생성
		let index = $(this).closest(".modal").data("index")
		$("[data-index = "+index+"]").remove();
		$(".modal-backdrop").remove();
		
	});
	
	
	

	$(".style1 > div:nth-child(4)").each(function() {  // 더보기에 마우스 enter시 및줄 
		$(this).mouseenter(function() {
			$(this).children().css("text-decoration", "underline");
		});
		
		$(this).mouseleave(function() {
			$(this).children().css("text-decoration","");
		});
		
	});
	
    
    $(".style1 > div:nth-child(4)").on('click','input[type=button]',function() {  // 동적으로 생성되는 엘리먼트에 대한 이벤트 등록
    	var parent =$(this).parent();
    	
    	if($(this).attr("value")==="더보기"){
    		parent.parent().css("height", "400px");  // 더보기 클릭시 컨테이너의 길이를 400px까지 늘림.
    		parent.next().css("height", "300px");
    		
        	$(this).attr("value", "접기");	
    	}else if($(this).attr("value")==="접기"){
    		parent.parent().css("height", "145px");
    		parent.next().css("height", "15px");
    		$(this).attr("value", "더보기");
    	}
    	
    	
		
	});
	// 문서의 준비시점에서는 자식요소인 버튼이 존재하지 않을 수 잇기 때문에 부모를 선택자로 on함수를 사용하여 2번재 인자로 자식요소를 주고 이벤트를 등록한다. 
    // 그러면 이벤트 헨들러는 부모요소 내에서  동적으로 생성된 버튼들을 찾아서 이벤트를 처리할 수 있다. 이를 이벤트의 위임 이라고한다.
    
    
    $(".style1 > input[type=button]:nth-child(7)").each(function() {
		$(this).click(function() {
			$(this).parent().css("height", "145px");
			
		});
	});
    
    
    $(".style1 > textarea:nth-child(5)").each(function() {
		var parent =$(this).prev();
		var newButton = $("<input type = button>");
		
    	if($(this).html() != ""){
    		parent.append(newButton);
    		newButton.attr("value", "더보기");
    		
			
		}
	});
    
   

    
    
});

function reviseCont(post_Num){
	
/*	console.log(post_Num);
	let body = document.getElementById("writeContent");
	let button = document.getElementById("revise");
	let title  = document.getElementById("contentTitle");
	let memoBtn = document.querySelectorAll(".style1 > div:nth-child(4) > input[type=button]");
	
	console.log(memoBtn);
	for(let i=0; i <memoBtn.length;i++){
		memoBtn[i].value = "수정하기";
	}
	
	$(".style1 > div:nth-child(4) > input[type=button]").click(function() {
		var parent =$(this).parent();
		if($(this).attr("value")==="수정하기"){
			$(this).attr("value", "수정완료");
			console.log($(this).attr("value"));
			parent.parent().css("height", "400px");  // 더보기 클릭시 컨테이너의 길이를 400px까지 늘림.
	    	parent.next().css("height", "300px");
	    	parent.next().css("border", "0.25px solid");
	    	parent.next().css("pointer-events","auto");
			
			
		}else if($(this).attr("value")==="수정완료"){
			$(this).attr("value", "수정하기");
			parent.parent().css("height", "145px");  
	    	parent.next().css("height", "15px");
	    	parent.next().css("border", "none");
	    	parent.next().css("pointer-events","none;");	
		
		}
		
	});
	
	button.value="취소하기";
	
	body.removeAttribute("readonly");
	body.style.pointerEvents= "";
	body.style.border = "2px solid black";
	body.focus();
	
	title.removeAttribute("readonly");
	title.style.pointerEvents="";
	
	
	
	if(button.value ==="취소하기"){
		button.addEventListener("click", function() {// 취소하기 일때 
			location.href ="content.diary?post_Num="+post_Num;  // 다시 돌아가고 
		});
	}*/
} 

function deleteCont(post_Num) {
	location.href = "deleteProcess.jsp?post_Num="+post_Num;
	
}


function openModal() {
	document.getElementById("modalBackdrop").style.display = "block";
	document.getElementById("modal").style.display = "block";
	
}

function closeModal() {
	document.getElementById("modalBackdrop").style.display = "none";
	document.getElementById("modal").style.display = "none";
	
}






