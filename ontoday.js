

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

        for(var x = 0; x<curr.classes.length; x++){
            classes += "<p>" + curr.classes[x].title + "<br><br>\
                          " + curr.classes[x].time + "</p>"
        }

        $('#quote').append(classes);
    
        
   	});
});