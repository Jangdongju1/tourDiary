	var now = new Date();// 현재 날짜 및 시간
	var year = now.getFullYear();
	var month = now.getMonth()+1;  // 0부터 시작한단다.
	var day = now.getDate();
$(function() {
	$('#picker').daterangepicker({
	    "locale": {
	        "format": "YYYY/MM/DD",
	        "separator": " ~ ",
	        "applyLabel": "확인",
	        "cancelLabel": "취소",
	        "fromLabel": "From",
	        "toLabel": "To",
	        "customRangeLabel": "Custom",
	        "weekLabel": "주",
	        "daysOfWeek": [
	            "일",
	            "월",
	            "화",
	            "수",
	            "목",
	            "금",
	            "토"
	        ],
	        "monthNames": [
	            "1월",
	            "2월",
	            "3월",
	            "4월",
	            "5월",
	            "6월",
	            "7월",
	            "8월",
	            "9월",
	            "10월",
	            "11월",
	            "12월"
	        ],
	        "firstDay": 1
	    },
	    "linkedCalendars": false,
	    "autoUpdateInput": false,
	    "showCustomRangeLabel": false,
	    "startDate": year+month+day,
	    "endDate": year+month+day
	}, function(start, end, label) {
	  console.log('New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')');
	  $("#datePickerCont li:nth-child(2) p:first-child").html(start.format('YYYY-MM-DD'));  // 선택한 날짜 표기
	  $("#datePickerCont li:nth-child(2) p:last-child").html(end.format('YYYY-MM-DD'));  // 선택한 날짜 표기
	  
	  const startDate = start._d.getTime();
	  const endDate  = end._d.getTime();
	  const deffer = startDate - endDate;
	  const days  = Math.abs(deffer /(1000 * 60 * 60 * 24));
	  
	  
	  $("#datePickerCont li:nth-child(3) p").html(Math.round(days));
	});

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
});
