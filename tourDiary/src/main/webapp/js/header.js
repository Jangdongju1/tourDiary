$(function() {
	
	$("#menuWrap").hide();
	$("#topMenuCont > li ul").hide();
	$("#menuWrap2").hide();
	
	
	$("#topMenuCont > li, #menuWrap").each(function() {
		$(this).stop().mouseenter(function() {
			$("#menuWrap").stop().slideDown(500);
			$("#topMenuCont > li ul").stop().slideDown(500);
			
		});
		
	});
	
	$("#topMenuCont, #menuWrap").mouseleave(function() {
		$("#menuWrap").stop().slideUp(500);
		$("#topMenuCont > li ul").stop().slideUp(500);
	});
	
	
	
	
	$("#hambukBtn").click(function() {
		
		$("#menuWrap2").stop().slideToggle(300);
	});
	
	$("#close").click(function() {
		$("#menuWrap2").slideUp(300);
	})
	

	
	
	
	$("#userMenuWrap2").hide();
	
	$("#userMenuWrap").click(function() {
		$("#userMenuWrap2").toggle();
		
	});
	
	$("#userMenuWrap2").mouseleave(function() {
		$("#userMenuWrap2").hide();
		
	});
		
	
	
	
	$("#menuWrap  li").each(function() {
		$(this).mouseenter(function() {
			$(this).css("text-decoration", "underline");
			$(this).css("text-underline-position", "under");
			
		});
		
		$(this).mouseleave(function() {
			$(this).css("text-decoration", "");
			
		});
		
	});
	
	$("#menuTotal li").each(function() {
		$(this).mouseenter(function() {
			$(this).css("text-decoration", "underline");
			$(this).css("text-underline-position", "under");
		});
		
		$(this).mouseleave(function() {
			$(this).css("text-decoration", "");
			
		});
		
	});
	
	
	
	
	$("#moreView").hide();
    $(function(){
		$("#Logo_MenuCont>li:nth-child(2)").mouseenter(function(){
			console.log("콘솔닷로그");
			$("#moreView").stop().fadeIn();
		});
		
		$("#moreView").mouseleave(function(){
			$("#moreView").stop().fadeOut();
		});
	});
	
	
	
});

function searchToggle(obj, evt){
    var container = $(obj).closest('.search-wrapper');
        if(!container.hasClass('active')){
        	
            container.addClass('active');
            evt.preventDefault();
        }
        else if(container.hasClass('active') && $(obj).closest('.input-holder').length == 0){
            container.removeClass('active');
            // clear input
            container.find('.search-input').val('');
        }
        else if(container.hasClass('active') && $(obj).closest('.input-holder').length != 0){
            container.removeClass('active');
        }
}
    
	$(document).ready(function(){
	$(window).scroll(function(){
    var scroll = $(window).scrollTop();
    if (scroll > 0) {
      $(".navbar").css("background" , "#333");
    }
    else{
      $(".navbar").css("background" , "transparent");   
    }

    $(".logodown").each(function(){
      var imagePos = $(this).offset().top;
      var topOfWindow = $(window).scrollTop();
      if (imagePos < topOfWindow+650) {
        $(this).addClass("slideUp");
      }
    });
  });
});