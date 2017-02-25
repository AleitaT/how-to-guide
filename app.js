function bindButton() {
	document.getElementById('citySubmit').addEventListener('click', function(event) {
		event.preventDefault();
		console.log(citySubmit);
		findCideries();
	});
}
bindButton();
$(function() {
	$('#citySubmit').keypress(function(event){ 
		var keyCode = event.which;   
		if (keyCode == 13) {
			event.preventDefault();
			findCideries();
		}
	});
});
function findCideries() {
	origin = "http://35.161.194.111:3000/";	
	$(".results-template").fadeOut(1000);
		$(".results-template .col-lg-8").html("");
		$(".results-template .col-lg-8").text("");
		var searchInput = document.getElementById('localityInput').value;
		var uri = origin + "?locality=" + searchInput;
		console.log(uri);
		var req = new XMLHttpRequest();
		req.open("GET", uri, true);
		//reg.send(null);
		req.addEventListener('load', function() {
			if(req.status < 400) {
				console.log(req);
				console.log(origin);
				console.log(uri);
				//console.log(body)
				var response = JSON.parse(req.responseText);
				var numberOfResults = response.totalResults;
				console.log(numberOfResults);
				displayCideries(response);		
			$("#search-result").text("Search results for: " + searchInput);
//			console.log("city is:", localityInput);
//			console.log("city is:", localityInput);
			} 
			else 
			{
				console.log("Error in network request: " + req.statusText);
			}
		});
		req.send(null);
}



function displayCideries(results) {
	$.each(results.data, function(index, item) {
		try{
			var template = "";
				//parameters to display 
				var name = item.brewery.name; // all have brewery name
				var website = ""; // most have website. 
				var phone = ""; // some don't have phones listed yet
				var address = ""; // some have no details listed! 
				if(item.phone != undefined) {
					phone = item.phone;}
				if(item.website != undefined) {
					website = item.brewery.website;}
				if(item.streetAddress != undefined) {
					address = item.streetAddress;}
					template += '<div class="results-template"><dl>' +
							'<dt class="name"></br>'+ name +'</dt>' +
							'<dd><b>Website:</b> </br>' + website + '</dd>' +
							'<dd><b>Phone:</b> </br>' + phone + '</dd>' +

							'<dd><b>Address:</b> </br>' + address + '</dd>' +
							'</dl></div>';
			//}					
			$(".results-template").removeClass("hidden").fadeIn(500);
			$(".results-template .col-lg-8").append(template);
			} catch(error) {
				console.log(error);
			};
	});
}
