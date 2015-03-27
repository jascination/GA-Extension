
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
	console.log("We're in Auto Land");
	var arr = [];

	// Retrieve Each
    chrome.storage.local.get('whatsOn', function (result) {

        arr = result.whatsOn;


        var i = 0;

        var doc = $('html').height();
        var curr = arr[i];
        var day = curr.day;

        var classes = '';

        if(curr.day != "Today"){
            classes += "<p>" + curr.day + ":</p>";
        }

        for(var x = 0; x<curr.classes.length; x++){
            classes += "<p>" + curr.classes[x].title + "<br><br>\
                          " + curr.classes[x].time + "</p>"
        }

        $('#quote').append(classes);
    
        if(getUrlParameter('auto') === 'true'){
            setTimeout(function() {  
                chrome.runtime.sendMessage({action: "screenshot", name: "ontoday"});
                setTimeout(function(){
                    window.location.href = 'http://ancient.cool/static/html-template/quotes.html?auto=true';
                }, 500);
            }, 1500); 
        }
   	});
});