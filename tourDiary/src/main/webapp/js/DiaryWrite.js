
var data = document.getElementById("encodedData").value;
var jsonData = JSON.parse(decodeURIComponent(escape(atob(data))));




var mapContainer = document.getElementById('map'), // 지도를 표시할 div  
    mapOption = { 
        center: new kakao.maps.LatLng(jsonData[0].latitude, jsonData[0].longitude), // 지도의 중심좌표
        level: 11 // 지도의 확대 레벨
    };

var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
 
// 마커를 표시할 위치와 title 객체 배열입니다 
var positions = [];    // 비어있는 배열을 선언하고 

for(var i =0 ; i<jsonData.length; i++){  //객체를 변수로 선언할 때는 쉼표 없이도 객체를 선언할 수 있다. 
	var info = {     // 객채를 차례로 생성해서 
			title : jsonData[i].attName,
			latlng : new kakao.maps.LatLng(jsonData[i].latitude, jsonData[i].longitude)
	};
	
	positions[i] = info;   // 배열에 차례로 담는다.
}




var imageSrc ;
     
for (var i = 0; i < positions.length; i ++) {
	imageSrc = "image/marker_"+(i+1)+".png";
    
    // 마커 이미지의 이미지 크기 
    var imageSize = new kakao.maps.Size(15, 15); 
    
    // 마커 이미지를 생성   
    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, {
    	offset: new kakao.maps.Point(10,10)  // 이미지영역에서 이미지의 위치를 조정.
    }); 
    
    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: positions[i].latlng, // 마커를 표시할 위치
        title : positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image : markerImage // 마커 이미지 
    });
}


var spot = [];

for(var i =0 ; i<jsonData.length; i++){
	var info  = new kakao.maps.LatLng(jsonData[i].latitude, jsonData[i].longitude);	// 카카오에서 제공하는 객체로 좌표정보가 담긴 객체를 생성해서 배열에 저장한다. 
	
	spot.push(info);   // 좌표로 이루어진 객체의 배열을 생성
}


var polyline = new kakao.maps.Polyline({  // 지도에 선을 긋는 객체를 생성한다.  매개변수는 객체로 지도와 경로(좌표값) 그리고 다양한 속성들로 구성된다.
    map: map,
    path: spot,
    strokeWeight: 2,   // 선의 굵기
    strokeColor: '#c4302b',  // 선의 색
    strokeOpacity: 0.8,   // 투명도
    strokeStyle: 'solid' // 선의 종류
});





const length =polyline.getPath().length;// 경로의 길이
//-----------------------------------------좌표계 테스트 ----------------------------------


//----------WGS84 좌표배열---------
const coord = []; 

for(var i = 0 ; i<length ; i++){  // 경로의 길이 만큼 돌면서 xy좌표값을 객체 배열화한다.
	var latInfo = {
			x : polyline.getPath()[i].getLng(),
			y : polyline.getPath()[i].getLat()
	}
	coord.push(latInfo);
}



//---- KTM좌표 변환(restapi호출)--------------------------------------------------------------------------------------
//${} 템플릿 리터럴 문법으로 문자열내 변수사용이 가능하게 해준다. 하지만 이를 위해서는 작은따움표(')가 아닌 백틱(backtick) `로 감싸야한다.



if (coord.length > 1) {
  let promises = []; // 빈 배열 생성
  for (let i = 0; i < coord.length -1; i++) {
	  
	
    const url = `https://dapi.kakao.com/v2/local/geo/transcoord.json?x=${coord[i].x}&y=${coord[i].y}&output_coord=WTM`;
    const url2 = `https://dapi.kakao.com/v2/local/geo/transcoord.json?x=${coord[i + 1].x}&y=${coord[i + 1].y}&output_coord=WTM`;
    const apiK = 'cc32aef6d1fe1606cacd4db8d542e12e'; 
    const promise = new Promise((resolve, reject) => { // 프로미스 생성
      // 첫번째 fetch 프로미스 시작
      
    	fetch(url, {
        headers: {
          Host: 'dapi.kakao.com',
          Authorization: `KakaoAK ${apiK}`
        }
      })
      .then(response => response.json())
      .then(data => {
    	 console.log(data);
        const startX = data.documents[0].x;
        const startY = data.documents[0].y;
        
        
        // 두번째 fetch 프로미스 시작
        fetch(url2, {
          headers: {
            Host: 'dapi.kakao.com',
            Authorization: `KakaoAK ${apiK}`
          }
        })
        .then(response => response.json())
        .then(data => {
          const endX = data.documents[0].x;
          const endY = data.documents[0].y;
          
          
          
          // 연산 후 출력하는 프로미스 시작
          
          const distance = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
          const roundedDistance = parseFloat((distance/1000).toFixed(2));
          
          
          resolve(roundedDistance); // 프로미스 완료 resolve 객체에  값을 저장함.
        })
        .catch(error => reject(error)); // 프로미스 실패
      })
      .catch(error => reject(error)); // 프로미스 실패
    });
    
    promises.push(promise); // 생성한 프로미스 배열에 추가
  }
  
  Promise.all(promises) // 생성한 프로미스 배열을 Promise.all()에 전달
  .then(results => {
  
    var distanceObj = document.querySelectorAll(".style2 > div:nth-child(2)");
    console.log(distanceObj.length);
    if(results.length > 0) {
	    for(var i = 0 ; i<results.length; i++){
	    	distanceObj[i].innerHTML = "약 "+results[i]+"Km"
	    }
    }
  })
  .catch(error => console.log(error));
}






