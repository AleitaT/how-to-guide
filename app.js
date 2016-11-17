function bindButton() {
	document.getElementById('citySubmit').addEventListener('click', function(event) {
		event.preventDefault();
		console.log(citySubmit);
		search();
	});
}

bindButton();

$(function() {
	$('#citySubmit').keypress(function(event){ 
		var keyCode = event.which;   
		if (keyCode == 13) {
			event.preventDefault();
			search();
		}
	});
});


function search() {
	originalURL = "//flip3.engr.oregonstate.edu:38866";
	$(".results-template").fadeOut(1000);
		$(".results-template .col-lg-8").html("");
		$(".results-template .col-lg-8").text("");
		
		var searchInput = document.getElementById('localityInput').value;
		var cityToSubmit = "?locality=" + searchInput;
		var newURL = originalURL + cityToSubmit;
		console.log(newURL);
		var req = new XMLHttpRequest();
		req.open("get", newURL, true);
		req.addEventListener('load', function() {
			if(req.status < 400) {
				var response = JSON.parse(req.responseText);
				var numberOfResults = response.totalResults;
				console.log(numberOfResults);
				showResults(response);		

			$("#search-result").text("Search results for: " + searchInput);
			console.log("city is:", localityInput);
			console.log("city is:", localityInput);

				
			} else {
				console.log("Error in network request: " + req.statusText);
			}
		});
		req.send(null);
}


function showResults(results) {
	$.each(results.data, function(index, item) {
		try{
			var template = "";
			
				var name = item.brewery.name;
				var website = item.brewery.website;
				var phone = "";
				var address = item.streetAddress;
				if(item.phone != undefined) {
					phone = item.phone;
				
				
				template += '<div class="results-template"><dl>' +
							'<dt class="name">Cidery name: </br>'+ name +'</dt>' +
							'<dd>Website: </br>' + website + '</dd>' +
							'<dd>Phone Number: </br>' + phone + '</dd>' +

							'<dd>Address: </br>' + address + '</dd>' +
							'</dl></div>';
			}			
			
			$(".results-template").removeClass("hidden").fadeIn(500);
			$(".results-template .col-lg-8").append(template);
			} catch(error) {
				console.log(error);
			};
	});
}
