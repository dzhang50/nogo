// Save this script as `options.js`

// Saves options to localStorage.

var websites = [];

// Restores select box state to saved value from localStorage.
function restore_options() {
	console.log("restore");
	chrome.storage.sync.get("websites", function(vals) {
		var tmp = vals['websites'];
		if(tmp == null) {
			return;
		}
		array = JSON.parse(tmp);
		websites = array;
		fill_array2();
	});
}

function fill_array() {
	console.log("fill_array");
	restore_options();
}

function fill_array2() {
	if(websites[0] == null) {
		$("#blocksites").html("<br>No sites currently blocked.<br><br>");
	}
	else {
		
		var str = "<br><b>Sites currently blocked:</b><br><br>";
		console.log("websites b4 read: "+websites);
		for(var i = 0; i < websites.length; i++) {
			console.log("Reading from sync: "+websites[i]);
			str = str + websites[i] +"<br>";
		};
		str = str + "<br>";
		$("#blocksites").html(str);
	}
}


 $(document).ready(function(){
	fill_array();

	$('#submit').click( function(e) {
		e.preventDefault();
		var select = $("input:first").val();
		console.log(select);
		websites.push(select);
		
		// Trying out chrome storage
		chrome.storage.sync.set({'websites': JSON.stringify(websites)}, function() {
			// Notify that we saved.
			//message('Settings saved');
		});
		fill_array();
	});
});