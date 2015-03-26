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
	var arr = [];

	// Retrieve Each
    chrome.storage.local.get('whatsOn', function (result) {

        arr = result.whatsOn;

        for (var i = 0; i<5; i++){
            var doc = $('html').height();
            var curr = arr[i];
            console.log("curr.day", curr.day);
            if (curr.day ==="Today" || curr.day === "Tomorrow"){
                var day = curr.day;
                var date = '';
            }else{
                var tempDay = curr.day.split(',')[0];
                if(tempDay === "Mon"){var day = "Monday"}
                if(tempDay === "Tue"){var day = "Tuesday"}
                if(tempDay === "Wed"){var day = "Wednesday"}
                if(tempDay === "Thu"){var day = "Thursday"}
                if(tempDay === "Fri"){var day = "Friday"}
                if(tempDay === "Sat"){var day = "Saturday"}
                if(tempDay === "Sun"){var day = "Sunday"}
                var date = curr.day.split(',')[1];
            }

            var classes = '';

            for(var x = 0; x<curr.classes.length; x++){
                classes += "<tr class='content news'>\
                              <td>" + curr.classes[x].time + "</td>\
                              <td>" + curr.classes[x].title + "</td>\
                            </tr>"
            }

            $('#big-table table').append('<tr class="date din"><td>' + day + '</td><td>' + date + '</td></tr>' + classes + '<tr class="empty news"><td></td><td></td></tr>');
        }

        // Make sure height is 1240px 

        while($('.whole').height() > 1280){
           $('.white-top-bottom tr:last-child').remove()
        }
        while($('.white-top-bottom tr:last-child').hasClass('date') || $('.white-top-bottom tr:last-child').hasClass('empty')){
           $('.white-top-bottom tr:last-child').remove()
        }

        // Fill out the empty rows

        $('tr.empty td').css('padding', '0');
        var curr = $('tr.empty:eq(0)').height();
        var empties = $('tr.empty').length;

        var extra = 1240 - $('.whole').height();

        $('tr.empty').each(function(){
          $(this).attr('height', curr + (extra / empties))
        })

        if(getUrlParameter('auto') === 'true'){
            setTimeout(function() {  
                chrome.runtime.sendMessage({action: "screenshot", name: "whatson"});
                setTimeout(function(){
                    window.location.href = 'http://ancient.cool/static/html-template/ontoday.html?auto=true';
                }, 500);
            }, 1500);            
            
        }
        
   	});
});