$(function() {
	
	var currentTarget = "total";  // 전체보기 defalut 값. 
	
	
	
		// 무한스크롤 페이징.
	var pages = 1;  // 증가할 페이지
	var temp = 1;// 배수에 곱해질 수 
	const maxCont = 16;
	
	//getData(currentTarget); // 기본상태 

	//var child = document.getElementById("diaryCont").children.length;  // 문서 준비완료시 자식요소 
		
	var intersectionObserver = new IntersectionObserver(function(entries) {// 여기서 entries는 관찰대상 엘리먼트임
		if(entries[0].intersectionRatio <= 0){// intersectionRatio 는 0 or 1의 값을 가지며 0은 관찰대상이 뷰포트에 들어오지 않은상태를 의미함.
			return;   // 뷰포트에 들어오지 않는경우 함수를 실행안함.
		}else{
			console.log("실행")
			getData(currentTarget);
				
				
			
		}
			
	}); 

	intersectionObserver.observe(document.getElementById("nextEle"));  //observe매서드를 이용해서 관찰대상을 등록할 수 있음.

		


	function getData(currentTarget) {//  지역별 검색 지역을 매개변수로 받아서 요청을 보냄.
		
		var param = {
				max : maxCont,
				page : pages,
				area : currentTarget
		}
		
		var	params = JSON.stringify(param);

	
		$.ajax({
			  url: 'area/'+currentTarget,
			  method: 'POST',
			  dataType: "json",
			  contentType:"application/json",
			  data: params,
			  success: function(data) {  // data는 정보
				  console.log(data);
				  createElement(data)
				  let elements = document.getElementById("diaryCont").children.length;
				  
				  
				  if((elements+data.length) > 16*temp){
					  var section2 = $("#section2")
					  var currentHeight = section2.height();
					  section2.css("height", `${currentHeight + 1600}px`);   // 관찰대상이 뷰포트에 들어오면 섹션의 사이즈가 늘어나면서
					  temp++;
					  console.log("화면늘리기");	
					  }		   
	
			  },
			  error: function(xhr, status, error) {
			    console.log('Error occurred!');
			    console.log(error);
			  }
			});
		
		pages++;
		
	}
	
	
	function createElement(data) {// 엘리먼트를 추가하고 데이터를뿌려주는 메소드;
		
		console.log(data);
		
		var diaryCont = document.getElementById("diaryCont");
		
		for(var j=0; j<data.length; j++){  
	
			let ul = document.createElement("ul");
			let li = document.createElement("li");
			let div1 = document.createElement("div");
			let div2 = document.createElement("div");
			let div3 = document.createElement("div");
			let div4 = document.createElement("div");
			let ul2 = document.createElement("ul");
			let userPicUrl = "http://localhost:8081/diaryFunction/upload/picture/"+encodeURIComponent(data[j].user_Pic);  // 공백을 %20으로 바꿔줌.
			let repPicUrl = "http://localhost:8081/diaryFunction/upload/picture/"+data[j].rep_Pic;
			console.log(userPicUrl);
			ul.append(li);
			li.append(div1,div2);
			div1.style.backgroundImage ="url("+repPicUrl+")"; // 배경사진
			div2.append(div3,div4);  // div2에  div2개 추가 
			div3.classList.add("circle");
			div3.style.backgroundImage = "url("+userPicUrl+")";
			div4.classList.add("diaryText");
			div4.append(ul2);
			for (var i=0 ; i<3; i++){
				
				ul2.append(document.createElement("li"));
			}
			
			ul2.children[0].innerHTML = data[j].user_Id;
			ul2.children[1].innerHTML = data[j].post_Title;
			ul2.children[2].innerHTML = data[j].post_Body;
			
			diaryCont.append(ul);
			
			
			//for 루프 내부에서 생성한 이벤트 핸들러 함수가 발생할 때는 이미 for 루프가 종료되었기 때문에, 해당 이벤트 핸들러 함수 내부에서 참조하는 j 변수는 이미 최종값으로 설정된다.
			//이 경우에는 클로저(closure)를 사용하여 해결할 수 있다. 
			//클로저를 사용하면 각각의 이벤트 핸들러 함수가 자신만의 고유한 렉시컬 환경을 유지하며, 따라서 for 루프 안에서 생성된 각각의 이벤트 핸들러 함수가 독립적으로 데이터에 접근할 수 있게 된다.
			// 형식은 즉시함수 호출형식이다.
			 (function(post_Num) {
				    ul.addEventListener("click", function() {
				      location.href = "content.diary?post_Num="+post_Num;
				    });
				  })(data[j].post_Num);
		
		}
		
	}
	
	
	
	
	
	let searchLevel = 0;  // 검색레벨 0: 지역별 버튼을 늘렀을 경우 , 1:검색바에 검색명을 입력했을 경우.
	const searchBtn = document.getElementById("searchBtn");  // 검색바에 의한 검색 구현.
	
	searchBtn.addEventListener("click", function() {
		temp = 1;
		pages = 1;
		let info = {
				search : document.getElementById("searchBar").value,
				area : currentTarget,
				max : maxCont,
				page : pages
		}
		
		searchLevel =1;
		console.log(searchLevel);
		$.ajax({
			  url: 'ContSearch.diary',
			  method: 'POST',
			  dataType: "json",
			  data: JSON.stringify(info),
			  success: function(data) {  // data는 정보
				  $("#diaryCont").empty();// 모든 자식요소를 지우고 
				  $("#section2").css("height", "1600px");//높이를 초기화하고 
				  createElement(data)
				  let elements = document.getElementById("diaryCont").children.length;// 틀안의 엘리먼트듸 갯수
				  
				  if((elements+data.length) > 16*temp){
					  console.log(elements+data.length);
					  var section2 = $("#section2")
					  var currentHeight = section2.height();
					  section2.css("height", `${currentHeight + 1600}px`);   // 관찰대상이 뷰포트에 들어오면 섹션의 사이즈가 늘어나면서
					  temp++;
					  console.log("화면늘리기");	
					  }		   
	
			  },
			  error: function(xhr, status, error) {
			    console.log('Error occurred!');
			    console.log(error);
			  }
			});
		
		
		let dataObj = document.getElementById("searchData");
		let form = document.getElementById("searchForm");
	
	
	
		
		
	});
	
	
	
	
	
	
	// 지역별 검색 및 버튼 클릭시 UI조정
	
	$("#searchOp > ul >li:first-child ~").addClass("btnNomal");  // 상단 버튼 클릭시 컬러조정.
	$("#searchOp > ul >li:first-child").addClass("btnClick");
	$("#searchOp > ul > li").each(function() {
		$(this).click(function() {
			$(this).removeClass("btnNomal");
			$(this).addClass("btnClick");
			$(this).siblings("li").removeClass("btnClick");  // 자신을 제외한 이웃을 선택하는 선택자
			$(this).siblings("li").addClass("btnNomal");
			currentTarget = $(this).data("target");//data라는 접두어를사용해서 그 값을 가져옴.	
			
			$("#diaryCont").empty();// 모든 자식요소를 지우고 
			$("#section2").css("height", "1600px");//높이를 초기화하고 
			temp =1;  // 곱해질 변수 초기화
			pages =1; // 페이지도 초기화
			searchLevel = 0;// 검색레벨 초기화
			console.log(currentTarget);
			if(currentTarget == 'jeju' && searchLevel ==0){
				console.log("제주도 검색실행");
				
				
				getData(currentTarget);// ajax실행
			
			}else if(currentTarget =="se"){
				
				
			}else if(currentTarget == 'ka'){
				
			}else if(currentTarget == 'ch'){
				
			}else if(currentTarget == 'ky'){
				
				
			}else if(currentTarget == 'ju'&& searchLevel==0){
				console.log("ju");
				getData(currentTarget);// ajax실행
				
			}
			
		});
		
	});
	
	$("#searchOp > ul >li:first-child").click(function() {
		location.reload();  // 전체 클릭시 페이지 리로드 반복코드를 줄이기 위함임.
	});
	
	

	$("#diaryCont").on("mouseenter", "ul > li", function() {
		  $(this).find(">div:last-child").stop().animate({marginTop:"-50px"}, 550);
		});

		$("#diaryCont").on("mouseleave", "ul > li", function() {
		  $(this).find(">div:last-child").stop().animate({marginTop:"0px"}, 550);
		});
		
	
});








