// variables 
var teamNames, chosenTeams;  

var teamEntered = ""

//arrays
teamNames = ["new england patriots", "buffalo bills", "miami dolphins", "new york jets", "pittsburgh steelers", "baltimore ravens", "cincinatti bengals", "cleveland browns", "jacksonville jaguars", "tennessee titans", "houston texans", "indianapolis colts", "kansas city chiefs", "los angeles chargers", "oakland raiders", "denver broncos", "philadelphia eagles", "dallas cowboys", "washington redskins", "new york giants", "minnesota vikings", "detroit lions", "green bay packers", "chicago bears", "carolina panthers", "new orleans saints", "atlanta falcons", "tampa bay buccaneers", "los angeles rams", "seattle seahawks", "arizona cardinals", "san francisco 49ers"];
chosenTeams = [];


//Listen for when a user clicks on the submit button
$(document).on("click", "#add-team", function(event) {
// Preventing the buttons default behavior when clicked (which is submitting a form)
event.preventDefault();
// This line grabs the input from the textbox
var teamEntered = $("#team-input").val().trim();
})





$(document).on("click", "#add-team", function(event){
	event.preventDefault();
	//store the value from the input field
	teamEntered = $("#team-input").val().trim().toLowerCase()
	//check to see if that entry has been entered already 
	if (teamNames.indexOf(teamEntered) > -1) {
		$("#gifs-appear-here").empty();
		//send an ajax request
		sendAjax(teamEntered);
		chosenTeams.push(teamEntered);
		teamNames.splice(teamNames.indexOf(teamEntered), 1);
	} else if (chosenTeams.indexOf(teamEntered) > -1) {
		alert("Please enter a different team");
	} else {
		alert("Please enter an NFL team");
	}
	renderButtons();
})


//Functions
//function to send ajax request  
	function sendAjax(teamEntered) {
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        teamEntered + "&api_key=zx0pvKMDOUupu4VEfq4qyAhI4vPzzyPs&limit=10";

        $.ajax({
          url: queryURL,
          method: "GET"
        })
        .done(function(response) {
          var results = response.data;
          console.log(results)

          renderGifs(results);

    	})
    }	



//function to render divs 
	function renderGifs(results){
		for (var i = 0; i < results.length; i++) {
			var newDiv = $("<div class='item'>");

			var rating = results[i].rating;

			var newP = $("<p>").text("Rating: " + rating);

			var teamImage = $("<img>");

			teamImage.attr("class", "gif")
			teamImage.attr("src", results[i].images.fixed_height.url);
			teamImage.attr("data-animate", results[i].images.fixed_height.url);
			teamImage.attr("data-still", results[i].images.fixed_height_still.url)
			teamImage.attr("data-state", "animate")

			newDiv.prepend(newP);
			newDiv.prepend(teamImage);

			$("#gifs-appear-here").prepend(newDiv);
		}
	}

	  // Function for displaying movie data
      function renderButtons() {
        // Deleting the movies prior to adding new movies
        // (this is necessary otherwise we will have repeat buttons)
        $("#teams-view").empty();
        // Looping through the array of movies
        for (var i = 0; i < chosenTeams.length; i++) {
          // Then dynamicaly generating buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
          var newButton = $("<button>");
          // Adding a class of movie to our button
          newButton.addClass("team");
          // Adding a data-attribute
          newButton.attr("data-name", chosenTeams[i]);
          // Providing the initial button text
          newButton.text(chosenTeams[i]);
          // Adding the button to the HTML
          $("#teams-view").append(newButton);
        }
      }


      //function to display divs on button push
      $(document).on("click", ".team", function(){
      	var teamEntered = $(this).attr("data-name");
      	sendAjax(teamEntered);
      	renderGifs(results);
      });

      //function to change state   
      // function pauseGifs(){
      // 	var state = $(this).attr("data-state");
      // if (state === "still") {
      //   $(this).attr("src", $(this).attr("data-animate"));
      //   $(this).attr("data-state", "animate");
      // } else {
      //   $(this).attr("src", $(this).attr("data-still"));
      //   $(this).attr("data-state", "still");
      // }

     $(document).on("click", ".gif", function(){
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      var state = $(this).attr("data-state");
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });
      
