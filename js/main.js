$(function() {

	//When the page is loaded. The dropdown#country need to be filled
	  $.ajax({
	  url: "http://localhost:8080/service/findAllCountries",
	  success: function( result ) {
	  	$.each(result, function(key, country){
			//Each country returned will be appended to the dropdown#country element.
			$("#country").append("<option value='"+country.id+"'>"+country.name+"</option>");
		});
	  },
	  error: function(jqXHR, textStatus, errorThrown){
	  	console.error("An error occurred while the service 'findAllCountries' was invoked");
	  }
	});

  //When a contry is selected the dropdown#state need to be filled
  $("#country").on("change", function(){
  	var countrySelected = $(this).val();
  	if(countrySelected < 1){
  		$("#city").html("");
  		$("#state").html("");
  	}else{
  		$.ajax({
		  url: "http://localhost:8080/service/findAllStates",
		  type: 'POST',
		  headers: {'Content-Type':'application/json'},
		  data: countrySelected,
		  success: function( result ) {
		  	$("#state").html("");
		  	$("#city").html("");
		  	$("#state").append("<option value=''>Selecciona un valor</option>");
		  	$.each(result, function(key, state){
				//Each state returned will be appended to the dropdown#state element.
				$("#state").append("<option value='"+state.id+"'>"+state.name+"</option>");
			});
		  },
	  	  error: function(jqXHR, textStatus, errorThrown){
	  		console.error("An error occurred while the service 'findAllStates' was invoked");
	  	  }
		});
  	}
  });

  //When a state is selected the dropdown#city need to be filled
  $("#state").on("change", function(){
  	var stateSelected = $(this).val();
  	if(stateSelected < 1){
  		$("#city").html("");
  	}else{
  		$.ajax({
		  url: "http://localhost:8080/service/findAllCities",
		  type: 'POST',
		  headers: {'Content-Type':'application/json'},
		  data: stateSelected,
		  success: function( result ) {
		  	$("#city").html("");
		  	$("#city").append("<option value=''>Selecciona un valor</option>");
		  	$.each(result, function(key, city){
				//Each city returned will be appended to the dropdown#city element.
				$("#city").append("<option value='"+city.id+"'>"+city.name+"</option>");
			});
		  },
	  	  error: function(jqXHR, textStatus, errorThrown){
	  		console.error("An error occurred while the service 'findAllCities' was invoked");
	  	  }
		});
  	}
  });

  //When the bottom#sendForm is clicked, the form#mForm is submitted
  $("#mForm").on("submit", function(){
  		var name = $("#name").val();
  		var age = $("#age").val();
  		var city = $("#city").val();
  		var data2Save = {"name" : name,
  						 "age": age,
  						  "cityId": city
  						}
  		console.log(data2Save);
  		data2Save = JSON.stringify(data2Save);
  		$.ajax({
		  url: "http://localhost:8080/service/saveUser",
		  type: 'POST',
		  headers: {'Content-Type':'application/json'},
		  data: data2Save,
		  success: function( result ) {
		  	console.log(result);
		  	//If the service returns a success then a new message is printed
		  	$("#container").html('<div class="success"><i class="fa fa-check"> '+result.result+'</i></div>');
		  },
	  	  error: function(jqXHR, textStatus, errorThrown){
	  		console.error("An error occurred while the service 'saveUser' was invoked");
	  	  }
		});
  	return false;
  });
});



