$(function () {
	//해시태그 처리부분.
	var data = document.getElementById("encodedData").value;
	var jsonData = JSON.parse(decodeURIComponent(escape(atob(data)))); // 유저가선택한 명소들에 대한 데이터
	
	
    var tag = {};  //빈 객체
    var counter = 0;
    var hashData  = []; //hashTag가져갈 객체배열  / jackson사용을 위해서 key값을 dto의 이름과 맞게 수정해주어야 한다. 
   
    var insertData1 = []; //attNum을 가저갈 객체 배열
    var insertData2 = [];//각각의 임력한 메모를 가져갈 객체배열;
	
    
    
    for(var i = 0 ; i<jsonData.length ; i++){
		var info ={
				attraction_num : jsonData[i].attNum  // 일단 명소 번호를 미리 챙기고 
		}
		
		insertData1.push(info);
	}
    
    var attnumObj = document.getElementById("attraction_Num");
    var attnumJsonData = JSON.stringify(insertData1);
    attnumObj.value = attnumJsonData;
    
   
	

    //  입력한 값을 태그로 생성한다.
    function addTag (value) {// Element로 추가되는 값을 매개변수로 받음
        tag[counter] = value;   // 속성 : value로 배열로 저장을 한다. 
        
        counter ++;
        
        
       
      
        var info = {  // 매개변수로 받는 입력값을  객채 배열로 저장함.
        			hashTag : value
        	}
        	
        	hashData.push(info);
        
        var jsonhashData = JSON.stringify(hashData);  // 객체배열의 값을 문자화 하고
        console.log(jsonhashData);
        var hashObj = $("#hashTag");  
        
        hashObj.val(jsonhashData);  // hidden의 값으로 지정해줌.
                

    }
    
    $("#tag").on("keypress", function (e) {
        var self = $(this);  //                     입력바

        //엔터나 스페이스바 눌렀을때 
        if (e.key === "Enter" || e.keyCode == 32) {

            var tagValue = self.val(); // 값 가져오기   // 입력값을 가져와서 

            if (tagValue !== "") {// 입력값이 있을 경우
            	

                // 같은 태그가 있는지 검사한다. 있다면 해당값이 array 로 return 된다.
                var result = Object.values(tag).filter(function (word) {
                	// Object.values()  객체안의 값을 배열로 가져오는 메소드 
                	// fliter() 메소드는 함수가 반환하는 true인 항목들로 이루어진 새로운 배열을 반환함.
                    return word === tagValue;// 동등한 것이 있는지 검사를하고 (조건)
                })
            
                // 해시태그가 중복이 안되었을시 리스트로 추가(Element).
                if (result.length == 0) { 
                    $("#tag-list").append("<li class='tag-item'>"+"#"+tagValue+"<span class='del-btn' data-idx ='"+counter+"'>x</span></li>");
                    // 사용자정의 속성으로 접두어 data- 를사용하고 idx라는 인덱스를 부여함.
                  
                    addTag(tagValue);  // add Tag함수를 실행하여 배열로 저장함. 매개변수
                    self.val("");
                } else {
                    alert("태그값이 중복됩니다.");// 중복시 멘트 
                }
            }
            e.preventDefault(); // SpaceBar 시 빈공간이 생기지 않도록 방지
        }
    });

    // 삭제 버튼 
    // 인덱스 검사 후 삭제
    
    
    $(document).on("click", ".del-btn", function (e) {
        var index = $(this).attr("data-idx");
        $(this).parent().remove();
        console.log(tag[index]);
        console.log(hashData[0].hashTag)
        for(let i=0 ; i< hashData.length;i++){
        	if(tag[index] === hashData[i].hashTag){
        		hashData.splice(i,1);
        	}
        }
        delete tag[index];
        
        
        
    });

    $("#hashtagWrap > div:nth-child(2)").click(function(){ // 해시태그 컨테이너 클릭시 입력창으로 포거스 이동
        $("#tag").focus();
    });
    
    
    
    
    //---지도에서 선택한 각각의 요소에 메모처리 -----------------------------
    
    $(".style1 > div:nth-child(4) > input[type=button]").each(function() {  // 선택한 경로카드에서 각각의 메모 버튼을 클릭햇을때 
    	$(this).click(function() {                     // 부모의 부모요소의 높이값이 늘어남.
    		var parent =$(this).parent();
    		parent.parent().css("height", "400px");
		});
		
	});
    
    
    
    $(".style1 > input[type=button]:nth-child(8)").each(function() {
		$(this).click(function() {
			$(this).parent().css("height", "145px");
		});
	});
    
    
    
   
    
    $(".style1 > input[type=button]:nth-child(7)").each(function() {
		$(this).click(function() {
			memoCont = $(this).siblings(".style1 > div:nth-child(6)").children("textarea").val();
			target = $(this).siblings(".style1 > div:nth-child(5)");
			target.html(memoCont);
			
			
			$(this).parent().css("height", "145px");
			
		});
	});
    
    
    // 상단 사진등록 버튼
    
    $("#userPicReg").mouseenter(function() {
    	$(this).css("background-color", "white");
    	$(this).css("color", "black");
	});
    
    $("#userPicReg").mouseleave(function() {
    	$(this).css("background-color", "");
    	$(this).css("color", "white");
	});
    
    $("#userPicReg").click(function() {  // 유저 사진용 모달팝업.
    	let modalBack = $("<div>").addClass("modal-backdrop");
    	let picModalFra = $("<div>").addClass("picModal");
    	let conFra = $("<div>").addClass("conFra");
    	let picModalTitle = $("<div>").addClass("modalTitle").html("사진업로드");
    	let picModalBody = $("<div>").addClass("picModalBody");
    	let picModalBottom = $("<div>").addClass("picModalBottom");
    	let picModalPicture = $("<div>").addClass("picModalPicture");
    	let picModalInput = $("<input>").attr({"type":"file" ,"name" : "userPic"}).addClass("picModalInput");
    	let picModalConfirm = $("<input>").attr("type","button").val("업로드").addClass("picModalConfirm");
    	let picModalCancel = $("<div>").addClass("picModalCancel");
    	let picModalCut = $("<input>").attr("type","button").addClass("picModalCut").val("다시올리기");
    	
    	
    	picModalBottom.append(picModalConfirm, picModalCut);
    	picModalBody.append(picModalPicture, picModalInput);
    	conFra.append(picModalCancel,picModalTitle, picModalBody, picModalBottom);
    	picModalFra.append(conFra);
    	$("#writeData").append(modalBack, picModalFra);
    
    });
    
    $(document).on("click", ".picModalCancel", function() {   // 동적으로 생성되 객체에 대한 이벤트 처린
 
    	$(".modal-backdrop").remove();
    	$(".picModal").hide();
		
	});
    
    
    let userPic; // 유저사진 url
    
    $(document).on("change",".picModalInput", function(e) {  // 유저의 사진을 업로드 하는경우 미리보기 처리 부분.
    	const fra = $(".picModalPicture");
    	
    	const pic  = e.target.files[0];
    	const input1 = document.getElementById("files1");
    	const input2 = document.getElementById("files2");
    	
    	
		const reader = new FileReader();
		reader.readAsDataURL(pic);
		reader.onload = function(){
			const img = new Image();
			img.src = reader.result;
			
			fra.css("background-image", "url("+img.getAttribute("src")+")");
			userPic = img.getAttribute("src");
			img.classList.add("preview-img");
			
	
		}
	});
    
    $(document).on("click",".picModalConfirm", function(){  // 업로드 클릭시 유저 사진 창에 사진표기부분.
    	$(".modal-backdrop").hide();
    	$(".picModal").hide();
    	$("#userPic").css("background-image", "url("+userPic+")");
    
    });
    
    
    
    let picCounter = 0;// 모달별 그림의 수를 지정하기 위한 인덱스 
    
    
  
    $(".style1 > div:nth-child(9)").each(function () {
		$(this).click(function() {
			picCounter = 0;
			
			let index = $(this).parent().children(":first-child").children().html();
			let modals  = $(".spotPicModalFra");  // 여기에 인덱스를 걸었다 
			let modalopen = false;
			
			
			if(modals.length > 0){   // 중복모달 처리 
				for(let i=0 ; i< modals.length ; i++){
					let chechIdx = modals.eq(i).data("index");
				
					
					if(chechIdx == (index-1)){
						modals.eq(i).css("display", "block");
						$(".modal-backdrop").show();
						modalopen = true;
						return;
					}
				}
				
			}
			
			if(modalopen != true){  // 위에서 중복모달이 있는지 검사한 후 해당 인댁스의 모달이 열려있지 않는 경우에만 모달이 생성되도록한다. 

				let attName = $(this).parent().children(":eq(2)").children().html();
				let modalBack = $("<div>").addClass("modal-backdrop");  // 선택한 명소의 모달의 요소를 동적으로 생성
				let spotModalClose = $("<div>").addClass("spotModalClose");
				let spotPicModalFra = $("<div>").data("index", (index-1)).addClass("spotPicModalFra");  // data 접두어를 활용해서 Fra에 index를 부여한다.
				let spotPicContentFra = $("<div>").addClass("spotPicContentFra");
				let picModalTitle = $("<div>").addClass("modalTitle").html("\""+attName+"\""+"의 사진");
				let spotPicContent = $("<div>").addClass("spotPicContent");
				let spotPicBtn = $("<div>").addClass("spotPicBtn");
				let uploadBtn = $("<input>").attr("type", "button").val("업로드").addClass("picModalConfirm2");
				let addBtn = $("<input>").attr("type","button").val("추가	").addClass("picModalAdd");
				let totalQuantity = $("<p>").html("업로드 가능한 사진의 수 : 6 / 0").addClass("quantity");
					
					
					
				picModalTitle.append(addBtn,totalQuantity);
				spotPicBtn.append(uploadBtn);
				spotPicContentFra.append(picModalTitle,spotPicContent,spotPicBtn);
				spotPicModalFra.append(spotPicContentFra,spotModalClose);
				$("#writeData").append(modalBack, spotPicModalFra);
					
				
			}
			
	    	
				
		});
	});
   
    
    $(document).on("click", ".picModalAdd", function() {
		let parent = $(this).closest(".spotPicModalFra");
		let index = parent.data("index");
		let contentFra = parent.find(".spotPicContent");
		let quantity = contentFra.children().length;
		if(quantity < 6){
			let inputBtn = $("<input>").attr({"type":"file", "id" : (index)+"-"+picCounter,"name":(index)+"-"+picCounter}).addClass("spotPicContentInput");
			let inputlable = $("<label>").attr("for",(index)+"-"+picCounter).addClass("inputLabel");
			let imgCut = $("<div>").addClass("imgCut");
			let div = $("<div>");
			
			div.append(inputBtn, inputlable, imgCut);
			
			contentFra.append(div);
			picCounter++;
			
		}else{
			alert("사진은 6장까지만 업로드 가능합니다.");
		}
	
	});
    
    
    $(document).on("change",".spotPicContentInput", function(e) {
     	let index = $(this).closest(".spotPicModalFra").data("index");  // 모달창의 인덱스 
    	let fra = $(this).closest(".spotPicContent")// 이미지 미리보기가 추가될 프레임.
    	let self = this; // this를 다른 변수에 할당
    	
    
     
        const pic  = e.target.files[0];
    	const reader = new FileReader();
    		
    	reader.readAsDataURL(pic);
    		
    	reader.onload = function(){
    		let quantity = fra.children().length;
    		const img = new Image();
    		let url = reader.result;
    		$(self).parent().css("background-image", "url("+url+")").data("fileName", pic.name);//data접두어로 파일이름을 속성값으로.
    		$(self).next().css("display", "none");
    		fra.parent().find(".quantity").html("업로드 가능한 사진의 수 : 6 / "+quantity);
    		
    		}
     		
     
			
		
	});
    
    $(document).on("click", ".spotModalClose", function() {  //명소별 사진 모달창 닫기
    	$(".modal-backdrop").hide();
    	$(".spotPicModalFra").css("display", "none");
    	
	});
    
    
  

    
    $(document).on("mouseenter", ".spotPicContent > div", function() {
		$(this).find(".imgCut").css("display", "block");
	});
	
	 $(document).on("mouseleave", ".spotPicContent > div", function() {
		$(this).find(".imgCut").css("display", "none");
	});
	 
	 $(document).on("click", ".imgCut", function() {
		$(this).parent().remove();
	});
	
    
    $(document).on("click",".picModalConfirm2", function() {
        let index = $(this).closest(".spotPicModalFra").data("index");  // 가장 가까운 부모요소를 찾은  closest() 매개변수는 '선택자' 1) class, 2) id, 3)tagname 4) [attribute=value]
        let parent = $(this).closest(".spotPicModalFra");
        let quantity = parent.find(".spotPicContent").children().length;
        let spotFra = $(".style1");
        if(quantity >0){
        	$(".modal-backdrop").remove();
        	$(".spotPicModalFra").css("display", "none");
        	spotFra.eq(index).find("div:nth-child(9)").css("display","none");
        	spotFra.eq(index).find(".picConfirm").css("display","flex");	
        }else{
        	alert("업로드한 그림이 없습니다.");
        }
        
        
	});
    
    $(document).on("click",".picConfirm", function() {
    	let index = $(this).parent().children(":first-child").children().html()-1;
        let modalFra = $(".spotPicModalFra");
        let modalBack = $("<div>").addClass("modal-backdrop").css("diplay","block");
        $("form").append(modalBack);
     
      for(let i=0 ; i< modalFra.length ; i++){
        	if(index == modalFra.eq(i).data("index")){
        		modalFra.eq(i).css("display", "flex");
        	}
        }
	});
    
   
    $("#repPicButton").click(function() {
    	let inputImg = $(".spotPicModalFra").find("input[type=file]");
    	let list = [];
   
    	for(let i=0 ; i< inputImg.length ; i++){
    		if(inputImg.eq(i).prop('files')[0] != undefined){  // 사진이 올라가지 않은 input을 제거하고.  url과 이름을 배열에 답는다.
    			let info = {
    					name : inputImg.eq(i).attr("name"), 
    					url : inputImg.eq(i).parent().css("background-image")
    				
    			}
    			list.push(info);
    		
    		}
    	}
    	
    	let modalBack = $("<div>").addClass("modal-backdrop").css("display", "block");
    	let modalFra = $("<div>").addClass("repmodal").css("display", "block");
    	let contentFra = $("<div>").addClass("repPicCont");
    	let title = $("<div>").addClass("repPicTitle").html("대표사진선택");
    	let subMention = "* 대표사진은 1장만 선택가능하며, Diary게시판 메인에 표시됩니다.<br> " +
    			"* 각 여행경로에 등록한 사진 중에서 선택하실 수 있습니다. "
    	let subTitle = $("<div>").addClass("repPicSubTitle").html(subMention);
    	let repBody = $("<div>").addClass("repBody");
    	let repBottom = $("<div>").addClass("repBottom")	
    	let confirmBtn = $("<input>").attr("type","button").val("선택하기").addClass("repConfirmBtn");
    	let cancelBtn= $("<input>").attr("type", "button").val("취소").addClass("repCancelBtn");
    	
    	
    	
    	for(let i =0 ; i< list.length ; i++){  // 업로드한 사진을 가져와서 전체로 보여주도록 한다. 
    		repBody.append($("<div>").addClass("selectPicList").css("background-image",list[i].url).attr('data-name', list[i].name));
    	}
    	repBottom.append(confirmBtn, cancelBtn);
    	contentFra.append(title, subTitle, repBody, repBottom);
    	modalFra.append(contentFra);
    	$("form").append(modalBack, modalFra);
		
	});
    
    
    $(document).on("click",".repCancelBtn", function() {
    	$(this).closest(".repmodal").remove();
    	$(".modal-backdrop").remove();
	});
    
    
    
    $(document).on("click", ".repBody > div", function() {  // 올린 사진이 없는경우에  엘리먼트는 존재하지 않는  것이므로 그에 대한 처리가 필요하다. 
		$(this).css({
					"border" : "5px solid" ,
					"border-color": "#FFFF00"
				});
		$(".repBody > div").not(this).css("border", "none");
		
		
		let picture = $(this).data("name");
		let url = $(this).css("background-image");
		
		selectPic(picture,url); 
	});
    
    function selectPic(picture, url) {
    	$(document).on("click",".repConfirmBtn",function(){

    		$(this).closest(".repmodal").remove(); // 모달을 업애주고 
        	$(".modal-backdrop").remove();
    		
        	$("#repPicButton").val("다시선택하기");
    		$("#repPic").css("background-image", url);
    		$("#repPicObj").val(picture);
    		
    	});
		
	}
    
    
    $("#writeReg").click(function() {// submit부분.
    	var memoObj = document.querySelectorAll(".style1 > div:nth-child(5)");
    	for (var i = 0 ; i<memoObj.length ; i++){
    		info = {
    				memo : memoObj[i].innerHTML
    		}
    		insertData2.push(info);
    	}// 작성을 눌렀을때 메모 데이터를  객체배열에 추가한다. 
    	 //insertData[i].memo = memoObj[i].innerHTML 이런 식으로 써도 새로운 값의 추가가 가능함.
    	
    	var insertDataObj = document.getElementById("memo");
    	var jsoninserData = JSON.stringify(insertData2);  // 
    	insertDataObj.value = jsoninserData ; //메모데이터
    	// 대표사진에 대한 처리 
    	
    	let repPicCheck = $("#repPicObj").val();
    	
    	if(repPicCheck == ""){  // 유저가 사진선택을 하지 않았을 경우 
    		
    		let spotModal  = $(".spotPicModalFra")  // length 가 0인경우 모달창을 한번도 open 하지 않은 경우
        	let totalPic = 0;   // 그림의 총 갯수를 구하고  
        	let picObjName = {};  //유저가 총 선택한 사진에 대한 input file의 name값을 배열로 저장.
        	let objIndex = 0;  // 배열의 인덱스를 위한 값.
      
        	if(spotModal.length > 0){  // 모달창을 단 한번이라도 오픈을 했다면.
        		for(let i = 0 ; i< spotModal.length; i ++){   // 사용자가 업로드한 사진이 있는지 그 갯수를 구한다. 
        			
        			for(let j = 0 ; j< spotModal.eq(i).find("input[type=file]").length ; j++ ){	
        				
        				let uploadPic =  spotModal.eq(i).find("input[type=file]").eq(j);
        				
        				if( uploadPic.prop("files")[0] != undefined){
        					totalPic++;	  // 업로드된 사진의 갯수를 구하고 
        					picObjName[objIndex] = uploadPic.attr("name");
        					objIndex ++;	// 속성이 같은경우에 덧빵 씌워지므로 하나씩 속성이름을 올리면서 저장해준다. 
        			
        				}
        			}
        		}	
        		
        	
        		if(totalPic > 0){  // 업로드한 사진이 하나라도 있는경우 
        			console.log("대표그림 미선택시 설정되는 그림의 name :"+picObjName[0]);
        			$("#repPicObj").val(picObjName[0]);
        			console.log($("#repPicObj").val());
        		}
        	}else{
        		 //  이때는 아무모달도 오픈 안한상태  즉 업로드한 사진이 없는상태로 기본사진을 넣어주면됨.
        	}
    		
    	}
    
    
    	//console.log("최종적으로 선택한 그림의 name : "+ $("#repPicObj").val());
    	
    	
       $("#writeData").submit();
		
	});
    
    
    
  
  
});








