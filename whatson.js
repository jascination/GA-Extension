

$(document).ready(function(){
	console.log("We're in Auto Land");
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
        
   	});
});