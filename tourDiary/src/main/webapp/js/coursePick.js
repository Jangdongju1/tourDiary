// DB에서 가져온 JSONData를 기반으로 카카오맵에 마커 표기 및 여행지 데이터를 인포윈도우에 표기한다.

let courseList = document.getElementById("jsonData").value;
let data = JSON.parse(decodeURIComponent(escape(atob(courseList))));  // 지도에 마커와 정보를 표기하기 위해서 DB에 있는 명소정보를 가져와 JSON객체로 변환.
let length = data.length;

console.log(data)


let picknum=[];  // 선택시마다 넘어오는 명소번호를 담은 자바스크립트 객체



let pickdate = [];  // 선택한 날짜를 담는 객체	배열


let infoObj = [];  // 이벤트를 걸기 위해 마커 객체와 인포윈도우 객체를 생성한 객체 배열에  담는다.
let markerObj= [];



let mapContainer = document.getElementById('maps'), // 지도를 표시할 div  
    mapOption = { 
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 11 // 지도의 확대 레벨
    };

let map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다



//마커를 표시할 위치와 title 즉 마커를 표기하고 싶은 위치에 들어갈 정보들을 객체 배열로 담는 부분.
var positions2 = [];   // 배열 객체생성 
for(var i=0; i<length; i++){
	var info ={
			title: data[i].attraction_name ,  // 장소명 
			latlng: new kakao.maps.LatLng(data[i].latitude, data[i].longitude),  //마커 좌표 
			att_num: data[i].attraction_num ,                     // 명소번호
			att_detail:data[i].attraction_detail ,					// 상세설명
			att_site1: data[i].site_1,					// 도	
			att_site2: data[i].site_2,					// 시 군구 
			att_addr: data[i].attraction_addr,					// 주소 
			att_pic: data[i].attraction_pic,						// 사진
			
	};
	positions2[i] = info;
	
};




// 마커 이미지의 이미지 주소입니다
var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 
    
for (var i = 0; i < positions2.length; i ++) {    // for문으로 돌면서 찍는 것 
    
    // 마커 이미지의 이미지 크기 입니다
    var imageSize = new kakao.maps.Size(24, 35); 
    
    // 마커 이미지를 생성합니다    
    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 
    
    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({          // 마커 객체를 생성하고 위치와 제목 이미지 등을 위에 생성한 position2객체에서 불러와서 표기해준다. 
        map: map, // 마커를 표시할 지도
        position: positions2[i].latlng, // 마커를 표시할 위치
        title : positions2[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됨.
        image : markerImage, // 마커 이미지 
        clickable: true
    });
    
    markerObj.push(marker);
    
    const latlng = positions2[i].latlng;
    const att_addr= positions2[i].att_addr;
    const att_num = positions2[i].att_num;
    const att_detail=positions2[i].att_detail;
    const att_site1= positions2[i].att_site1;
    const att_site2= positions2[i].att_site2;
    const att_pic= positions2[i].att_pic;
    

        
    
    //'<div style="padding:5px; width:300px; height:100px;">' + title +'<br>'+ test+'</div>';//데이터를 표기하는 부분예시
    var makeInfowindow = (function(marker, title, att_addr, att_detail, att_pic, att_num, latlng) {    // 인포윈도우를 생성  
        var iwContent =
        	'<div style = "width: 300px; height: 150px; border-radius:10px;">'+
        		'<input type="button" id="plus" style = "width:25px; height:25px; position:absolute; margin-left:220px; margin-top:0px; border:none;'+
        		'background-image:url(image/contentplus.png); background-size:cover; background-position:center center;'+
        		'background-color:white; cursor: pointer;" onclick="plus('+att_num+','+latlng.getLat().toFixed(7)+', '+latlng.getLng().toFixed(7)+')">'+
        		'<div style= "width:150px; height: 25px; position:absolute; margin-left:55px; font-size:14px; border:0.25px solid #EBEBEB;">'+
        	 	title+'</div>'+
        	 	'<div style ="width:210px; height:20px; position:absolute; margin-left: 55px; margin-top: 30px; font-size:10px;">'+
        	 	att_addr+' </div>'+
        		'<div style = "height : 50px; width:50px; font-size:5px; background-image:url(image/'+att_pic+'); background-position: center center; background-size:cover;"></div>'+
        		'<div style = "width:295px; height:92px; position:relative; left:1px; top:3px">'+
        		
        		'<div style ="width:100%; height:50px; overflow:hidden; color:#999; font-size: 12px;">'+att_detail+'</div>'+
        		
        		'<input type ="button" id="detailBtn" value="상세보기" style ="width:150px; height: 35px;'+
        		'position:relative; left:70px; top:3px; color:white; font-weight:bold;'+
        		'background-color:#4B89DC; border:none; cursor:pointer;" onclick ="detail('+att_num+')">'
        		
        		+'</div>'+
        	'</div>';
   
       
        var infowindow = new kakao.maps.InfoWindow({
            content : iwContent,
            removable : true,   // x버튼 활성화
            position : positions2[i].latlng
            
        });
        
        infoObj.push(infowindow);
        
      

        // 클릭 이벤트 등록
        kakao.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map, marker);
        });

        return infowindow;
    })(marker, positions2[i].title, att_addr, att_detail, att_pic, att_num, latlng)  // 즉시실행 함수에 전달되는  매개변수
    

}  // 즉시 실행함수의 기본적인 형태 (functon(인자의 형태){실행문})(실체인자의 값)임 별도의 실행문 없이도 '선언과 동시에' 실행되는 특징을 가지고 있음.





function plus(att_num, lat, lng){// 지도에서 선택한 여행지를 리스트에 추가하는 부분. 명소번호를 매개변수로 받음
	var title; 
	var pic;
	for (var i =0 ; i<length ; i++){
		if(data[i].attraction_num == att_num){ 
			title = data[i].attraction_name;
			pic = data[i].attraction_pic;  
		
		}
	}
	
	picknum.push({    // 선언한 전역 객체배열에 담는 부분.  .push() 메서드는 객체배열에 해당객체를 추가해준다.
		attraction_num : att_num
	});


	
	var list = document.getElementById("selectionbar");  // 추가버튼 클릭시 엘리먼트를 추가하는 부분.
	var temp = document.createElement("div");
	var temp2 = document.createElement("div");
	var temp3 = document.createElement("div");
	var temp4 = document.createElement("div");
	var temp5, temp6;
	var childList = list.childNodes; // 자식노드를 배열로 (노드리스트로 반환)
	var childCount = list.childNodes.length; // 배열의 길이

	
	
	list.append(temp);
	temp.append(temp2);  // 사진
	temp.append(temp3);  // 명소이름
	temp.append(temp4);
	
	
	
	
	if(childCount > 1){  //  선택한 두 명소사이의 연결점 표현을 위한 요소 생성 
		temp5 = document.createElement("div");
		temp6 = document.createElement("div");
		temp.append(temp5);
		temp.append(temp6);
		
		temp6.innerHTML = "둘사이 거리 및 소요시간";  // 조건부 생성요소에 대한 값지정.
	}
	
	// 자식요소 로 추가된 놈들에 대한 값지정.
	temp2.style.backgroundImage = "url('image/"+pic+"')";  // 동적으로 추가된 엘리먼트에 데이터를 넣는 부분.
	temp3.innerHTML = title;
	temp4.addEventListener('click', function() {  //3번째 자식노드에 마우스 이벤트를 걸고 클릭시 제거하는 부분 // 요소가 생성이 되면서 '각각' 이벤트를 걸어버림/
		temp.remove();//동적으로 생성된 엘리먼트에 대한 이벤트 설정. 리스트 삭제 
		
		if(childList.length > 1){// 추가되는 리스트 컨데이너의 자식요소의 배열의 길이 가 1이상일때(제일 첫요소 제외)   첫요소란 1) 제일처음 생성된 요소 및  2)두번째 요소였다가 첫번째 요소가 삭제되어 첫번째 요소가 된 것을 말함.
			if(childList[1].childNodes.length>3){//만일 제일첫요소의 자식요소가 4개 이상이면.
				childList[1].removeChild(childList[1].childNodes[4]);//5번째 자식요소 삭제
				childList[1].removeChild(childList[1].childNodes[3]);// 4번째도 삭제 .
			}
		}
		
		for(var i =0 ; i<picknum.length ;i++){  // 삭제버튼을 클릭햇을때 HTML엘리먼트 삭제와 동시에 서버로 가져갈 객체배열 목록에서 삭제처리한다.
			if(picknum[i].attraction_num == att_num){     //
				picknum.splice(i,1);
				break;   // 중복메뉴가 있을때 모두 지워지는 것을 방지하기 위한 break;
			
			}
		}
	});
	
	
	for(let i =0 ; i < infoObj.length; i++){  // plus 버튼 클릭시 해당 인포윈도우를 닫을 수 있도록 직접 좌표값을 비교해서 구현함.
		let objLat = infoObj[i].getPosition().getLat().toFixed(7);
		let objLng = infoObj[i].getPosition().getLng().toFixed(7);
		console.log(objLat, objLng);
		if(objLat == lat){
			if(objLng==lng){
				infoObj[i].close();
			}
		}
			
		
		
	}
	
	
	
}

function detail(att_num) {   // 역시 명소번호를 매개변수로 받아서  detail bar 요소에 넣어준다. 추후 상세정보를 더 넣을 예정.
	var pic;
	var title;
	var detail;
	var titleObj = document.getElementById("detailTitle");
	var picObj = document.getElementById("attraction_Pic");
	var detailObj = document.getElementById("detailCont");
	var addObj = document.getElementById("addCont");
	
	for(var i =0; i<length ;i++ ){
		if(data[i].attraction_num == att_num){
			pic = data[i].attraction_pic;
			title = data[i].attraction_name;
			detail = data[i].attraction_detail;	
		}
		
	}	
	picObj.style.backgroundImage = "url('image/"+pic+"')";
	titleObj.innerHTML = title;
	detailObj.innerHTML = detail;
	
	 addObj.setAttribute('onclick', "plus("+att_num+")")// 동시에 추가버튼에 매개변수로 받은  att_num을 가지고 함수를 할당해준다.
			
	
}

function del() {
	$("#selectionbar > div").remove();
	picknum.length = 0;
	
}


$(document).ready(function() {  // detailbar 숨기기.
	$("#datailBar").css("width","0px");
	$(document).on("click","#detailBtn",function() {// detailBtn은 문서가 준비되었을 때에는 존재하지 않으므로 document ready가 적용될 수 없음.
		$("#datailBar").animate({width:"400px"})
	});
	
	$("#closeDetail").click(function(){
		$("#datailBar").animate({width:"0px"})
		
	});
	
});




function create() {		
	data = "["+JSON.stringify(picknum)+","+ JSON.stringify(pickdate)+"]";
	var hidden =  document.getElementById("att_num");
	var myForm = document.getElementById("myForm");
	hidden.value = data;         // input type= hidden에  값을 설정하고 다른 jsp페이지로 가지고 간다. 
	
	
	myForm.submit();
	
	
	
}




$(function() {// 데이트 피커 확인버튼 클릭시 이벤트 정의.
	var test = $(".applyBtn.btn.btn-sm.btn-primary");
	$(document).on("click",".applyBtn.btn.btn-sm.btn-primary",function() {// detailBtn은 문서가 준비되었을 때에는 존재하지 않으므로 document ready가 적용될 수 없음.
		var sdate = $("#datePickerCont li:nth-child(2) p:first-child").html();
		var edate = $("#datePickerCont li:nth-child(2) p:last-child").html();
		var total = $("#datePickerCont li:nth-child(3) p").html();

		pickdate.length = 0;  // 날짜데이터는 1개만 가져가야 므로 배열에 데이터가 쌓이는 것을 방지하기 위한 초기화.
		pickdate.push({
			start_date : sdate,
			end_date : edate, 
			total_date : total
	});
		
		
	});
});

// 검색기능 구현에 필요한 1) 검색버튼 , 2) 검색바 객체 정의
let searchBtn = document.getElementById("searchBtn");
let searchInput =  document.getElementById("searchBar");

function spotSearch() {  // 지도의 검색기능 Ajax를이용한 구현.
	let searchKeyword = searchInput.value;
	if(searchKeyword == ""){
		alert("지역명을 입력해 주세요.");
	}else{
		let info = {
				keyword : searchKeyword
		}
		
		$.ajax({
			  url: 'MapSearch.diary',
			  method: 'POST',
			  dataType: "json",
			  data: JSON.stringify(info),
			  success: function(data) {  // data는 정보
				  if(data.length == 0){
					  alert("검색결과가 없습니다.");
					  
				  }else{  // 엘리먼트 생성 및 데이터 부여 
					  createEle(data);
					  let latlng = new kakao.maps.LatLng(data[0].latitude, data[0].longitude);
					  map.setCenter(latlng);  // 성공햇을때 제일 첫 요소의 좌표값으로 지도가 이동함.
				  }

			  },
			  error: function(xhr, status, error) {
			    console.log('Error occurred!');
			    console.log(error);
			  }
			});
	}
	
}




searchBtn.addEventListener("click",function(){  // 검색버튼 클릭시 
	spotSearch();
});

searchInput.addEventListener("keyup", function(e) {  // 검색바에 검색명을 입력하고 엔터시
	if(e.keyCode == 13){  
		spotSearch();
	}
	
});



function createEle(data){
	
	let searchFra= document.getElementById("searchData");
	while (searchFra.firstChild) {
		  searchFra.removeChild(searchFra.firstChild);
		};
	
	for(let i=0 ; i<data.length ; i++){
		let listFra = document.createElement("div");
		
		let pic = document.createElement("div");
		pic.style.backgroundImage = "url(image/"+data[i].attractionPic+")";
		
		let title = document.createElement("div");
		title.innerHTML =data[i].attractionName;
		
		let addr = document.createElement("div");
		addr.innerHTML = data[i].attractionAddr;
		
		let btn = document.createElement("div");
		btn.style.backgroundImage = "url(image/contentplus.png)";
		
		let site = document.createElement("div");
		site.innerHTML = data[i].site_1 +" / "+data[i].site_2; 
		
		listFra.append(pic,title,addr,btn,site);
		searchFra.append(listFra);	
		
		(function(attractionNum, attractionPic, attractionName,latitude, longitude){  // +버튼클릭시 이벤트리스너 
			btn.addEventListener("click",function(){
				
				
				let title; 
				let pic;
				
				for (var i =0 ; i<data.length ; i++){   // 조회해서 나온 데이터를 기준으로 
					if(data[i].attractionNum == attractionNum){ 
						title = attractionName;
						pic = attractionPic;  
					
					}
				}
				
				picknum.push({    // 선언한 전역 객체배열에 담는 부분.  .push() 메서드는 객체배열에 해당객체를 추가해준다.
					attraction_num : attractionNum
				});
				
				


				
				var list = document.getElementById("selectionbar");  // 추가버튼 클릭시 엘리먼트를 추가하는 부분.
				var temp = document.createElement("div");
				var temp2 = document.createElement("div");
				var temp3 = document.createElement("div");
				var temp4 = document.createElement("div");
				var temp5, temp6;
				var childList = list.childNodes; // 자식노드를 배열로 (노드리스트로 반환)
				var childCount = list.childNodes.length; // 배열의 길이

				
				
				list.append(temp);
				temp.append(temp2);  // 사진
				temp.append(temp3);  // 명소이름
				temp.append(temp4);
				
				
				
				
				if(childCount > 1){  //  선택한 두 명소사이의 연결점 표현을 위한 요소 생성 
					temp5 = document.createElement("div");
					temp6 = document.createElement("div");
					temp.append(temp5);
					temp.append(temp6);
					
					temp6.innerHTML = "둘사이 거리 및 소요시간";  // 조건부 생성요소에 대한 값지정.
				}
				
				// 자식요소 로 추가된 놈들에 대한 값지정.
				temp2.style.backgroundImage = "url('image/"+attractionPic+"')";  // 동적으로 추가된 엘리먼트에 데이터를 넣는 부분.
				temp3.innerHTML = attractionName;
				temp4.addEventListener('click', function() {  //3번째 자식노드에 마우스 이벤트를 걸고 클릭시 제거하는 부분 // 요소가 생성이 되면서 '각각' 이벤트를 걸어버림/
					temp.remove();//동적으로 생성된 엘리먼트에 대한 이벤트 설정. 리스트 삭제 
					
					if(childList.length > 1){// 추가되는 리스트 컨데이너의 자식요소의 배열의 길이 가 1이상일때(제일 첫요소 제외)   첫요소란 1) 제일처음 생성된 요소 및  2)두번째 요소였다가 첫번째 요소가 삭제되어 첫번째 요소가 된 것을 말함.
						if(childList[1].childNodes.length>3){//만일 제일첫요소의 자식요소가 4개 이상이면.
							childList[1].removeChild(childList[1].childNodes[4]);//5번째 자식요소 삭제
							childList[1].removeChild(childList[1].childNodes[3]);// 4번째도 삭제 .
						}
					}
					
					for(var i =0 ; i<picknum.length ;i++){  // 삭제버튼을 클릭햇을때 HTML엘리먼트 삭제와 동시에 서버로 가져갈 객체배열 목록에서 삭제처리한다.
						if(picknum[i].attraction_num == attractionNum){     //
							picknum.splice(i,1);
							break;   // 중복메뉴가 있을때 모두 지워지는 것을 방지하기 위한 break;
						
						}
					}
					
				});
				
				
			});
			
			
			
			listFra.addEventListener("mouseenter", function() {
				event.stopPropagation();
				
				for(let i = 0; i<infoObj.length ; i++){
					// 소수점이 제멋대로 찍혀서 toFixed를 이용해서 7째자리까지 정확히 표현하도록 한다.
					let x = infoObj[i].getPosition().getLat().toFixed(7);
					let y = infoObj[i].getPosition().getLng().toFixed(7);
					
			
					if(latitude == x && longitude ==y){
						infoObj[i].open(map, marker[i]);
						 map.panTo(new kakao.maps.LatLng(latitude, longitude));
						
					}
					
				}
				
			});
			
			
			
			listFra.addEventListener("mouseleave", function() {
				event.stopPropagation();
				
				for(let i = 0; i<infoObj.length ; i++){
					// 소수점이 제멋대로 찍혀서 toFixed를 이용해서 7째자리까지 정확히 표현하도록 한다.
					let x = infoObj[i].getPosition().getLat().toFixed(7);
					let y = infoObj[i].getPosition().getLng().toFixed(7);
					
			
					if(latitude == x && longitude ==y){
						infoObj[i].close();
						
					}
					
				}
				
			});
			
		})(data[i].attractionNum, data[i].attractionPic, data[i].attractionName, data[i].latitude, data[i].longitude); // IIFE 즉시실행함수(Immediately Invoked Function Expression )의 표현을 빌린 클로져
		
		
			
	
		}
	
	
}






















