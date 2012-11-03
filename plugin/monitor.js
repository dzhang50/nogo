var websites = new Array();

window.onload = function() {
	chrome.storage.sync.get("websites", function(vals) {
		var tmp = vals['websites'];
		if(tmp == null) {
			return;
		}
		array = JSON.parse(tmp);
		websites = array;
		onload2();
	});
}

function onload2() {
	for(var i = 0; i < websites.length; i++) {
		var patt = new RegExp(websites[i]);
		var myArray = patt.exec(window.location);
		// If match, ask to pay
		if(myArray != null) {
			window.location = "http://bing.com";
		}
	}
}