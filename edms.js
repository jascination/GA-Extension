// Wait for the document to load
$(document).ready(function(){

// Get basic event details
	var url = $('link[rel="canonical"]').attr('href'); // This gets the plain link regardless of UTM
	var metro = url.split('/')[5];
	var instance = 'https://generalassemb.ly/admin/instances/' + url.split('/')[6];
	var title =  $('h1.large').text();
	var date = $('.datetime_details h3.cw_datetime_details').first().text();
	var img =  $('.column.purchase-module .image-wrapper img').attr('src').replace('thumb_','');
	var topText = $('.column:eq(1)>.section-pod:eq(0) p:eq(0)').text();

// Get Partner Name, Link and Description. This only gets the first partner on the page though!

	var partner1Name = $('.partner-info.section-pod .instance-partner:eq(0) .partner-link a').text();
	var partner1Link = $('.partner-info.section-pod .instance-partner:eq(0) .partner-link a').attr('href');
	var partnerInfo = $('.partner-info.section-pod .instance-partner:eq(0) p:eq(2)').text();

	if (partnerInfo.substr(0,partner1Name.length) === partner1Name){
		console.log("Partner name match! Removing from partner info.");
		var partnerInfo = partnerInfo.replace(partner1Name, "");
	}else{console.log("No partner name match!")}

// Generate a UTM with the partner and event details

	var utm = '?km_cwe_instance_id=' + url.split('/')[6] + '&km_metro=' + metro + '&utm_campaign=2015+Q1+Event+%5B' + metro + '%5D+CWE_' + title.replace(/\W/g, '') + '&utm_medium=partner_email&utm_source=' + partner1Name.replace(/\W/g, '');


// Make the start and end time functions

	var getDT = function(choice){
		if (choice === 'start'){
			var x = $('meta[itemprop="startDate"]').first().attr('content').replace('T', ' ');
		} else if (choice === 'end'){
			var x = $('meta[itemprop="endDate"]').first().attr('content').replace('T', ' ');
		}
		var y = x.substring(0,x.indexOf('+'));
		var reggie = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/;
		var dateArray = reggie.exec(y); 
		return new Date(
		    (+dateArray[1]),
		    (+dateArray[2])-1, // Careful, month starts at 0!
		    (+dateArray[3]),
		    (+dateArray[4]),
		    (+dateArray[5]),
		    (+dateArray[6])
		);
	}



// Different AM/PM use-cases
	var start = getDT('start');
	var end = getDT('end');
	
	if ((start.getHours() >= 12 ) && (end.getHours() >= 12)){
		var eventTime = String(start.getHours() - 12) + " - " + String(end.getHours() - 12) + "pm";
		var eventType = 'evening';
		var freeStuff = 'beer, wine and soft drink';
	}else if ((start.getHours() < 12 ) && (end.getHours() >= 12)){
		var eventTime = String(start.getHours()) + "am - " + String(end.getHours() - 12) + "pm"
		var eventType = 'workshop';
		var freeStuff = 'lunch and refreshments';
	}else if ((start.getHours() < 12 ) && (end.getHours() < 12)){
		var eventTime = String(start.getHours()) + " - " + String(end.getHours()) + "am"
		var eventType = 'morning';
		var freeStuff = 'tea, coffee and breakfast';
	}


// If there is a partner on the page, make the EDM file ready to download
	if (partner1Name.length >= 1){

		var textFile = null;
		var makeTextFile = function (text) {
			var data = new Blob([text], {type: 'text/plain'});

			// If we are replacing a previously generated file we need to
			// manually revoke the object URL to avoid memory leaks.
			if (textFile !== null) {
			  window.URL.revokeObjectURL(textFile);
			}

			textFile = window.URL.createObjectURL(data);
			console.log("edm is ready to download!");
			return textFile;
		};
		
		var edm = "<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'><html xmlns='http://www.w3.org/1999/xhtml' xml:lang='en' lang='en'>\n<head>\n<meta http-equiv='Content-Type' content='text/html;'/>\n<title>General Assembly</title>\n</head>\n<body>\n<span style='font-size: 1px; color: #B8B8B8; margin: 0px;' pardot-region='preview'>" + title +"</span>\n<div style='width: 620px; margin: auto;'>\n\t<table border='0' cellpadding='0' cellspacing='0' width='620px'>\n\t<tbody>\n\t<tr>\n\t\t<td style='background: white; padding-top: 44px;'>\n\t\t</td>\n\t</tr>\n\t<tr>\n\t\t<td>\n\t\t\t<table border='0' cellpadding='0' cellspacing='0' width='620px'>\n\t\t\t<tbody>\n\t\t\t<tr>\n\t\t\t\t<td width='30'>\n\t\t\t\t\t&nbsp;\n\t\t\t\t</td>\n\t\t\t\t<td class='' style='background: white; margin-top: 30px; padding-top: 10px; padding-bottom: 10px; border-top: 1px solid black; border-bottom: 1px solid black; font-family: arial, sans-serif; font-size: 13px;' pardot-region='header'>\n\t\t\t\t\t<strong>" + partner1Name + " + General Assembly present...</strong>\n\t\t\t\t</td>\n\t\t\t\t<td width='30'>\n\t\t\t\t\t&nbsp;\n\t\t\t\t</td>\n\t\t\t</tr>\n\t\t\t</tbody>\n\t\t\t</table>\n\t\t</td>\n\t</tr>\n\t<!-- End header -->\n\t<tr>\n\t\t<!-- Start body -->\n\t\t<td class='' style='background: white; padding-bottom: 30px; padding-top: 20px; padding-left: 30px; padding-right: 30px; font-family: georgia, sans-serif; font-size: 16px; font-weight: normal; line-height: 24px; color: black;' pardot-region='content' width='100%'>\n\t\t\t<span style='font-family: georgia, serif; font-size: 67px; line-height: 75px; color: black;'>" + title + "</span><br>\n\t\t\t<a href='" + url + utm + "'><img alt='Friends' height='350' src='" + img + " ' style='-webkit-transform: rotate(0rad); height: 350px; width: 560px; margin: 30px 0;' title='Sign up to Design For Change Hackathon' width='560'></a>\n\t\t\t<p>\n\t\t\t\t" + partner1Name + " + General Assembly have teamed up to bring you the <a href='" + url + utm + "' style='color: #030303; font-family: arial, sans-serif; font-size: 15px; font-weight: bold;'>" + title + "</a> on <span style='color: #030303; font-family: arial, sans-serif; font-size: 15px; font-weight: bold;'>" + date + "</span> from " + eventTime + ". <br>\n\t\t\t\t<br>\n\t\t\t\t " + topText + "\n\t\t\t</p>\n\t\t\t<p>\n\t\t\t\t<strong style='color: #030303; font-family: arial, sans-serif; font-size: 15px;'>Places are very limited and RSVPs are essential</strong>. Best of all: it's totally free, and General Assembly will be providing " + freeStuff + " for all!\n\t\t\t</p>\n\t\t\t<p>\n\t\t\t\t<a href='" + url + utm + "' style='text-decoration: none; color: white; display: inline-block; background: #ff0033; border-bottom: 3px solid #c20027; margin-bottom: 20px; margin-top: 20px; padding-top: 15px; padding-bottom: 12px; width: 560px; text-align: center; font-family: helvetica, arial, sans-serif; font-size: 20px; font-weight: bold;'>FREE Event: Register Here</a>\n\t\t\t</p>\n\t\t\t<p>\n\t\t\t\t<a href='https://generalassemb.ly/" + metro + utm + "' style='color: #030303; font-family: arial, sans-serif; font-size: 15px; font-weight: bold;'>General Assembly</a> is a global tech school teaching the most relevant skills of the 21st century across technology, design, marketing and business.\n\t\t\t</p>\n\t\t\t<p>\n\t\t\t\t<a href='" + partner1Link + "' style='color: #030303; font-family: arial, sans-serif; font-size: 15px; font-weight: bold;'>" + partner1Name + "</a>" + partnerInfo + "\n\t\t\t</p>\n\t\t</td>\n\t\t<!-- End body -->\n\t</tr>\n\t</tbody>\n</div>";

	//Creating Elements

    // !!!!!!!!!! Make an EDM Button

	$(".column.purchase-module").prepend('<div class="actions" style="margin-bottom: 1rem;"><a href="" id="edmMaker" download="EDM - ' +  title.replace(/\W/g, '') + '.html" class="button fluid js-purchase-attend">Make an EDM!</a></div>');
	$('#edmMaker').attr('href', makeTextFile(edm));

	// !!!!!!!!!!
	
	}

	// Create the Instance Page Link
	
	// !!!!!!!!!! Make an Instance button
	$(".column.purchase-module").prepend('<div class="actions" style="margin-bottom: 1rem;"><a href="' + instance + '" class="button fluid js-purchase-attend">Go to Instance Page</a></div>')
	// !!!!!!!!!!

	chrome.storage.local.set({
		url: url,
		metro: metro,
		title: title,
		utm: 'http://generalassemb.ly/education?where=' + metro + utm
	}, function (result) {
		$(".column.purchase-module").prepend('<div class="actions" style="margin-bottom: 1rem;"><a href="http://www.ancient.cool/collect-setup?auto=true" target="_blank" class="button fluid js-purchase-attend">Auto-Collect Checkins</a></div>')
	    
		console.log("Variables stored for Ancient Cool");
	});


});
