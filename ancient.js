
function getUrlParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
}  

if(getUrlParameter('auto')){
	console.log("We're in Auto Land");
	var obj = {};

	// Retrieve Each
    chrome.storage.local.get('url', function (result) {
        obj.url = result.url;
        chrome.storage.local.get('metro', function (result) {
	        obj.metro = result.metro;
	        chrome.storage.local.get('title', function (result) {
		        obj.title = result.title;
		        chrome.storage.local.get('utm', function (result) {
			        obj.utm = result.utm;
			        console.log(obj);			        
				   	$('#q1').val(obj.title);
				   	angular.element($('#q1')).triggerHandler('input');

				   	$('#q2').val('Welcome to ' + obj.title);
				   	angular.element($('#q2')).triggerHandler('input');
				   	
				   	$('#q3').val('Presented by General Assembly');
				   	angular.element($('#q3')).triggerHandler('input');
				   	
				   	$('#q6').val(obj.utm);
				   	angular.element($('#q6')).triggerHandler('input');
				   	
				   	$('#q7').val(obj.metro);
				   	angular.element($('#q7')).triggerHandler('input');
			   	});
		   	});
	   	});
   	});
}