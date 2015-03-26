// Wait for the document to load
$(document).ready(function(){


	var arr = []; 
	$('#catalog-results a').each(function(){
		var ref = $(this).attr('href'); 
		arr.push(ref.split('/')[4]);
	}); 
	for (var i = 0; i<arr.length; i++){
		if(arr[i]){
			$('.date-topic-container').eq(i).append('<div class="actions"><a style="margin-bottom: 1rem; padding:1rem;" href="https://generalassemb.ly/admin/instances/' + arr[i] + '" class="button fluid js-purchase-attend">Go to Instance Page</a></div>');
		}
	}


	var arr2 = [];

	$('.catalog-items>div>div').each(function(index){
		if($(this).hasClass('date-divider')){
		 arr2.push({day: $(this).text().trim(), classes: []})
		}else{
		  var t = $('.catalog-items>div>div:eq(' + index + ') .item-title').text().trim();
		  var d = $('.catalog-items>div>div:eq(' + index + ') .date-details:eq(1)').text().trim();
		  
		  arr2[arr2.length -1].classes.push({title: t, time: d})
		}
	});


	chrome.storage.local.set({
		whatsOn: arr2
	}, function (result) {
		$('.content-area-grey').attr('style', 'position:relative;');
		$('.content-area-grey').prepend('<div class="clearfix yo" style="position: absolute;top: 30px;right: 50px;"></div>');
		$('.yo').prepend('<div class="actions" style="position:relative; z-index:100;  display: block; width: 300px;"><button style="font-size:1em; margin-bottom: 1rem; padding:1rem;" onclick="window.open(\'http://ancient.cool/static/html-template/\', \'newwindow\', \'width=1280, height=720\'); return false;" class="button fluid js-purchase-attend">Make "Whats On" For TV</button></div>')
	    $('.yo').prepend('<div class="actions" style="position:relative; z-index:100;  display: block; width: 300px;"><button style="font-size:1em; margin-bottom: 1rem; padding:1rem;" onclick="window.open(\'http://ancient.cool/static/html-template/ontoday.html\', \'newwindow\', \'width=1280, height=720\'); return false;" class="button fluid js-purchase-attend">Make "On Today" For TV</button></div>')
	    $('.yo').prepend('<div class="actions" style="position:relative; z-index:100;  display: block; width: 300px;"><button style="font-size:1em; margin-bottom: 1rem; padding:1rem;" onclick="window.open(\'http://ancient.cool/static/html-template/quotes.html\', \'newwindow\', \'width=1280, height=720\'); return false;" class="button fluid js-purchase-attend">Make "Quote of the Day" For TV</button></div>')
	    
		console.log("Events stored for What's On Template");
	});


});



