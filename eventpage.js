// Wait for the document to load
$(document).ready(function(){
	var arr = []; $('#catalog-results a').each(function(){
		var ref = $(this).attr('href'); arr.push(ref.split('/')[4]);
	}); 
	for (var i = 0; i<arr.length; i++){
		if(arr[i]){
			$('.date-topic-container').eq(i).append('<div class="actions"><a style="margin-bottom: 1rem; padding:1rem;" href="https://generalassemb.ly/admin/instances/' + arr[i] + '" class="button fluid js-purchase-attend">Go to Instance Page</a></div>');
		}
	}
});


// Add in functionality to create "What's on at GA" slide for TVs

var arr = [];

$('.catalog-items>div>div').each(function(index){
if($(this).hasClass('date-divider')){
 arr.push({day: $(this).text().trim(), classes: []})
}else{
  var t = $('.catalog-items>div>div:eq(' + index + ') .item-title').text().trim();
  var d = $('.catalog-items>div>div:eq(' + index + ') .date-details:eq(1)').text().trim();
  
  arr[arr.length -1].classes.push({title: t, time: d})
}
})