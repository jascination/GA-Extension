
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

        // Say "Today" or "Tomorrow" or whatever
            classes += "<p class='din'>" + curr.day + ":</p>";


        for(var x = 0; x<curr.classes.length; x++){
            classes += "<p class='today-title'>" + curr.classes[x].title + "</p>\
                        <p class='today-time'>" + curr.classes[x].time + "</p>"
        }

        $('#quote').append(classes);

        while($(".whole").height() > 1240){
          var size = parseInt($('.second-title.news').css('font-size').split('px')[0]);
              size -= 2;
              $('.second-title.news').css('font-size', size);
        }
    
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