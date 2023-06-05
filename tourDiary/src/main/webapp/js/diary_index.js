$(function(){
	var slide = $("#bottom_frame > ul");   // 하단슬라이드 버튼선택시 선택된 주제의 카드만 출력이되도록.
	$("#region1").click(function(){		
		slide.eq(0).css("opacity","1");
		slide.eq(1).css("opacity","0");
		slide.eq(2).css("opacity","0");
		slide.eq(3).css("opacity","0");
	});
	$("#region2").click(function(){		
		slide.eq(0).css("opacity","0");
		slide.eq(1).css("opacity","1");
		slide.eq(2).css("opacity","0");
		slide.eq(3).css("opacity","0");
	});
	$("#region3").click(function(){		
		slide.eq(0).css("opacity","0");
		slide.eq(1).css("opacity","0");
		slide.eq(2).css("opacity","1");
		slide.eq(3).css("opacity","0");
	});
	$("#region4").click(function(){		
		slide.eq(0).css("opacity","0");
		slide.eq(1).css("opacity","0");
		slide.eq(2).css("opacity","0");
		slide.eq(3).css("opacity","1");
	});

	


	$("input[type=button]").mouseenter(function(){  // 상단 사각형 버튼 호버효과 
		$(this).css("background-color", "black");
	});
	$("input[type=button]").mouseleave(function(){
		$(this).css("background-color", "#333");	
	});


	




	});



$(function(){

	$("#bestDiary > li").each(function(){   // 상단 bestDiary 호버효과 각각에 대해 효과를 발하여야 하므로 each를사용하고
		
		$(this).mouseenter(function(){   
			$(this).find(">div:last-child").stop().animate({marginTop:"-50px"},550); // 여기서 this는 이벤트가 발생한 놈이므로 해당요소의 자식을 찾기위해 find 함수 이용.
		
		});	


		$(this).mouseleave(function(){   
			$(this).find(">div:last-child").stop().animate({marginTop:"0px"},550); // 여기서 this는 이벤트가 발생한 놈이므로 해당요소의 자식을 찾기위해 find 함수 이용.

		});   // 'animate'인 경우에 동적효과의 고질적인 문제인 중복문제는 .stop()메서드 하나로 해결가능함. 


});







	$("#button_left").mousedown(function(){    // 슬라이드 방향버튼(좌우) 호버효과 == 이미지 교체 
		var nowImg = $(this).find("img")
		var nowSrc = nowImg.attr("src");
		var Src = nowSrc.substring(0,nowSrc.lastIndexOf("_"));
		nowImg.attr("src", Src+"_left_click.png");	

	});
	
	$("#button_left").mouseup(function(){
		var nowImg = $(this).find("img")
		var nowSrc = nowImg.attr("src");
		var Src = nowSrc.substring(0,nowSrc.lastIndexOf("_"));
		nowImg.attr("src", Src+".png");	

	});

	$("#button_right").mousedown(function(){
		var nowImg = $(this).find("img")
		var nowSrc = nowImg.attr("src");
		var Src = nowSrc.substring(0,nowSrc.lastIndexOf("_"));
		nowImg.attr("src", Src+"_right_click.png");	

	});
	
	$("#button_right").mouseup(function(){
		var nowImg = $(this).find("img")
		var nowSrc = nowImg.attr("src");
		var Src = nowSrc.substring(0,nowSrc.lastIndexOf("_"));
		nowImg.attr("src", Src+".png");	

	});

	

	
	var slides = $("#slide_list");
	var first_li = $("#slide_list >li").first();
	var first_width = first_li.outerWidth(true);
	var first_clone =first_li.clone(true);
	var prot =0;// 광클 금지 (0== 허용, 1== 금지)  타임아웃을 이용하여  광클릭시 계속 실행되는 것을 막음.


	$("#button_right").click(function(){	// 슬라이드 버튼 클릭시 슬라이드 이동 ( 왼쪽 , 오른쪽 )
		if (prot === 1) return false;
    		prot = 1;
		

		slides.animate(                     // 무한 슬라이드 효과 원리는 슬라이드의 1) 프레임에서 보여줄 크기를 정하고 overflow hidden
		{left: "-=" + first_width + "px"},400,    // 2) Ul자체를 오른쪽 또는 왼쪽으로 이동 3) 첫<li>요소를 맨뒤로 계속 보냄.
		function()
		{
			slides.append($("#slide_list > li:first-child")).css({left:0});
			}
		
		);

		 setTimeout(function(){prot = 0;}, 500);

	
	});
		


		$("#button_left").click(function(){    
			if (prot === 1) return false;
    		prot = 1;
			
			slides.prepend($("#slide_list > li:last-child")).css({left: -first_width});
			slides.animate({
			left: "+=" + first_width + "px"
		});
			setTimeout(function(){prot = 0;}, 500);
	
	});



		function interval(){  // 자동슬라이드 구현 
			slides.animate(
		 	{left: "-=" + first_width + "px"},400, 
		 	function(){slides.append($("#slide_list > li:first-child")).css({left:0});});
		}

		

		var auto_slide = setInterval(interval, 5000);

		$("#slide_list").mouseenter(function(){   // 마우스 enter시 자동슬라이드 멈춤
			auto_slide =clearInterval(auto_slide);

		});
		$("#slide_list").mouseleave(function(){
			auto_slide = setInterval(interval,5000);

		});



		});

var didScroll; 
var delta = 5; // 이벤트가 발생했을때 이전과 현재 스크롤의 위치 차이를 비교하기 위한 변수
var lastScrolled = 0; // 초기위치 +  스크롤이 이동할때마다 위치를 기록함.
var navbarHeight = $("header").outerHeight()+50; // outerHeight == 내부높이 +padding + border이다. 
$(window).scroll(function(event){
    didScroll = true;     // 마우스 스크롤이 들어왔을때 임의의 변수를 true;로 초기화.
});

setInterval(function(){
	if(didScroll){   //스크롤이 들어오면 true이므로, if 이하문장 실행.
		hasScrolled();  // 스크롤이 들어오면 실행. 
		didScroll = false;      
	}

},1000)



function hasScrolled(){
	var st  = $(this).scrollTop();  // $(this).scrollTop()는 현재 이벤트가 발생한 요소의 스크롤바가 수직으로 얼마나 떨어져 있는지를 나타냄.(이동 후 수치)



	if(Math.abs(lastScrolled - st) <= delta){ 	// 이전위치와 현재위치의 차이를 비교하고   delta(5)보다 작을때에는 이벤트가 발생하지 않도록.
		return; 	 	//return 구문을 사용하는 이유는, if문 내의 조건식이 false인 경우에는 이후의 코드를 실행하지 않아도 되기 때문이다 따라서, return 구문을 사용하여 함수를 종료함으로써 코드 실행 효율을 높일 수 있다.
	}

	if(st > lastScrolled && st > navbarHeight ){
		$("#active_bar").css({opacity:1, transition:"opacity 0.2s ease-in-out"});
		$("#active_bar" ).css("z-index", "995");
		$("#menu_bar2").css("z-index", "999");
		setTimeout(function(){
			$("#active_bar").css({opacity:0, transition:"opacity 0.2s ease-in-out"});
			$("#menu_bar2").css("z-index", "910");
			$("#active_bar").css("z-index", "910");
		},5000);

		
	}else{   // 스크롤업 ( st < lastScrolled)

		if(st+$(window).height() < $(document).height()){
			$("#active_bar").css({opacity:1, transition:"opacity 0.2s ease-in-out"});
			$("#active_bar").css("z-index", "995");
			$("#menu_bar2").css("z-index", "999");

			setTimeout(function(){
				$("#active_bar").css({opacity:0, transition:"opacity 0.2s ease-in-out"});
				$("#menu_bar2").css("z-index", "910");
				$("#active_bar").css("z-index", "910");
			},5000);
		}
	}

	lastScrolled = st; 
}

$(function(){
		$("li[data-num='1']").click(function(){
			/*location.href="Bulletin_Board_Notice.jsp";*/
		});
		$("li[data-num='2']").click(function(){
			location.href="FreeBtb.jsp";
		});
		$("li[data-num='3']").click(function(){
			location.href="Bulletin_Board_Review.jsp";
		});
		$("li[data-num='4']").click(function(){
			location.href="Bulletin_Board_Inquiry.jsp";
		});
		
	});



