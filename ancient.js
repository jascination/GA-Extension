
console.log("YEAH?");

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
	

$(document).ready(function(){
	setTimeout(function(){
		if(getUrlParameter('auto') === "true"){
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
					        console.log($('#q1'));
					        console.log("obj is: ", obj);		        
						   	$('#q1').val(obj.title);
						   	$('#q2').val('Welcome to ' + obj.title);
						   	$('#q3').val('Presented by General Assembly');
						   	$('#q6').val(obj.utm);
						   	$('#q7').val(obj.metro);
					   	});
				   	});
			   	});
		   	});
		}
	}, 2000);
	
});