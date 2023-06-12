// 데이터 관련 JS
const spotVal  = decodeURIComponent(document.getElementById("spot").value);// 인코딩된 JSON 데이터를 받기 위해서는 JS에서 디코딩 작업이 필요함.
const hashVal = decodeURIComponent(document.getElementById("hash").value);




const spotJson = JSON.parse(spotVal);
const hashJson = JSON.parse(hashVal);








var positions = [];   // 지도에 마커를 표기하기 위한 좌표데이터와 각 지역의 이름을 담은 객체배열
for(var i=0; i<spotJson.length; i++){
	var info = {
			title :spotJson[i].title,
			spot : new kakao.maps.LatLng(spotJson[i].latitude, spotJson[i].longitude)
			}
	positions.push(info);
}


//Polyline객체 및 좌표계 rest api에 재공할 좌표객체배열 주의할 것은 카카오 객체배열임..
//map함수는 배열의  각요소를 순회하면서 콜백함수를 실행한다.
//콜백함수는 배열의 요소중에서 spot요소만을 리턴하는 것으로한다. 따라서 spotArray는 spot만이 모인 객체 배열임.
var spotArray = positions.map(function(info) {  
	return info.spot;
});



// 카카오 맵 관련 

var mapContainer = document.getElementById('map'), // 지도를 표시할 div  
    mapOption = { 
        center: new kakao.maps.LatLng(spotJson[0].latitude, spotJson[0].longitude), // 지도의 중심좌표
        level: 12 // 지도의 확대 레벨
    };

var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다



    
for (var i = 0; i < positions.length; i ++) {
	
	var imageSrc = "image/marker_"+(i+1)+".png";
    
    // 마커 이미지의 이미지 크기 입니다
    var imageSize = new kakao.maps.Size(15, 15); 
    
    // 마커 이미지를 생성합니다    
    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, {
    	offset: new kakao.maps.Point(10,10)  // 이미지영역에서 이미지의 위치를 조정.
    }); 
    
    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: positions[i].spot, // 마커를 표시할 위치
        title : positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image : markerImage // 마커 이미지 
    });
}


	var polyline = new kakao.maps.Polyline({
	    map: map,
	    path: spotArray,
	    strokeWeight: 2,
	    strokeColor: '#c4302b',
	    strokeOpacity: 0.8,
	    strokeStyle: 'solid'
	});



// 해시태그 표기부분.
const hashEle = document.querySelector("#hashtag > ul");
for(var i=0 ; i<hashJson.length ; i++){
	var newLi = document.createElement("li");
	newLi.innerHTML ="#"+hashJson[i].hashTag;
	hashEle.append(newLi);
}

// 객체배열이 카카오 객체배열이므로 카카오에서 제공하는 함수로 객체에서 x y 좌표를 끄집어 내야함. 

var promises = [];// 프로미스의 결과를 담을 배열.
for(var i=0 ; i < spotArray.length-1 ; i++){
	if(spotArray.length > 1){// 지점이 2개 이상일 때에만 실행되도록.
		const url= `https://dapi.kakao.com/v2/local/geo/transcoord.json?x=${spotArray[i].getLng()}&y=${spotArray[i].getLat()}&output_coord=WTM`;//시작지점
		const url2= `https://dapi.kakao.com/v2/local/geo/transcoord.json?x=${spotArray[i+1].getLng()}&y=${spotArray[i+1].getLat()}&output_coord=WTM`;//끝지점
		const ak = 'cc32aef6d1fe1606cacd4db8d542e12e'; 
		const promise = new Promise((resolve,reject) =>{   // 순차적으로 실행시키기 위한 promise객체 
			// 첫번째 fetch 프로미스 시작    >> fetch 함수는  promise객체 를 반환함
			fetch(url,{ // 첫번째 매개변수로 url을  두번재째 매개변수로 headers라는 객체를 받음.
				headers: {
					Host:"dapi.kakao.com",
					Authorization : `KakaoAK ${ak}`  // 변수 사용을 위해 백틱으로 감싸주고 
				}
			})
			// then 함수는 2개의 콜백함수를 인자로 받는다 첫번재함수는 성공시 두번재함수는 실패시 실행된다.
			.then(response => response.json()) // Promise객체는 .json()이라는 매소드를 지원함.
			.then(data=>{
				const startX = data.documents[0].x;  // 어차피 하나씩 차례로 돌릴 것이기 때문에 데이터의 길이는 항상 1
				const startY = data.documents[0].y; 
				
				
				
				fetch(url2, {
					headers : {
						Host: "dapi.kakao.com",
						Authorization : `KakaoAK ${ak}`
					}
				})
				.then(response => response.json())
				.then(data => {
					endX = data.documents[0].x;
					endY = data.documents[0].y;
					
					
					 const distance = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
			         const roundedDistance = parseFloat((distance/1000).toFixed(2));   // 거리계산 및 소수점 2째 자리에서 반올림.
			         
			         resolve(roundedDistance);// 성공시 함수 실행 이때 거리를 매개변수로 전달함.
					
				})
				.catch((error) => console.log("두번째 fetch", error))
				
			})
			.catch((error) => console.log("첫번째 fetch", error))
			
		});  // 전체 프로미스의 끝 
		
		promises.push(promise);
			
	}
	Promise.all(promises)
	.then(results =>{
		console.log(results.length);
		var distanceObj = document.querySelectorAll(".style2 > div:nth-child(2)");
		if(results.length > 0){
			for(var i =0 ; i< results.length ; i++){
				distanceObj[i].innerHTML = "약 "+results[i]+"Km"
			}
		}
		
		
	});
	
}




