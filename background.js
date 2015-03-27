var shotname = 'dunno';

var screenshot = {
	content : document.createElement("canvas"),
	data : '',

	init : function() {
		this.initEvents();
	},
	
	saveScreenshot : function() {
		var image = new Image();
		image.onload = function() {
			var canvas = screenshot.content;
			canvas.width = image.width;
			canvas.height = image.height;
			var context = canvas.getContext("2d");
			context.drawImage(image, 0, 0);

			// save the image
			var link = document.createElement('a');
			link.download = shotname + ".jpg";
			link.href = screenshot.content.toDataURL('image/jpeg', 0.6);
			link.click();
			screenshot.data = '';
		};
		image.src = screenshot.data; 
	},
	
	initEvents : function() {
		// send an alert message to webpage

		chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
			console.log("Got a message!", message);

			if(message.action === "screenshot"){

				shotname = message.name;

				chrome.tabs.captureVisibleTab(null, {
					format : "jpeg",
					quality : 100
				}, function(data) {
					screenshot.data = data;
					screenshot.saveScreenshot();
				});
			}
		});
	}
};

screenshot.init();
