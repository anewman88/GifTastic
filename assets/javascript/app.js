$(document).ready(function() {    
var DebugON = true;
//**************************************************************************
//* Global Variables
var GifLimit = 10;
    
var Button = [
    "sandwich",
    "cheese",
    "hamburger",
    "milk",
    "steak",
    "chips",
    "ketchup",
    "lemon",
    "orange",
    "banana",
    "peach",
    "watermelon"
];
    
//***************************************************************************
// Dynamically create the food buttons
for (var i = 0; i < Button.length; i++) {

   // create pointer to a <button> object
   var newBtn = $("<button>");
            
   // Give each "newBtn" the following classes: "food-button" "food" "food-button-color".
   newBtn.addClass("food-button food food-button-color");

   // Give each "newBtn" a data-attribute called "data-food".
   newBtn.attr("data-food", Button[i]);

   // Give each "newBtn" a text equal to "Button[i]".
   newBtn.text(Button[i]);

   // Append each "newBtn" to the "#buttons" div (provided).
   $("#buttons").append(newBtn);
}  // for
    
//***************************************************************************
// Event handler for user inputting and clicking submit button
$("#submit-foodBTN").on("click", function(event) {
    
    // Preventing the button from trying to submit the form
    event.preventDefault();

    // Storing the food name
    var inputFood = $("#food-input").val().trim();

    // Check if the inputFood is already in the list
    var Location = Button.indexOf(inputFood);
    if (Location === -1) {
        // append the inputFood to the array
        Button.push(inputFood);

        // Dynamically add the new button to the list
        // create pointer to a <button> object
        var newBtn = $("<button>");
            
        // Give the "newBtn" the following classes: "food-button" "food" "food-button-color".
        newBtn.addClass("food-button food food-button-color");
            
        // Give the "newBtn" a data-attribute called "data-food".
        newBtn.attr("data-food", inputFood);
            
        // Give the "newBtn" a text equal to the input food.
        newBtn.text(inputFood);
            
        // Append the "newBtn" to the "#buttons" div.
        $("#buttons").append(newBtn);
    }
    else {  // the button is already in the list
        alert (inputFood + " is already in the list!");
    }
               
    // Clear the input box
    document.getElementById("food-form").reset();
    
});  // event handler function for on Food submit button
    
//***************************************************************************
// Event handler for user clicking a food button
//***************************************************************************
$(document).on("click", "button", function() {
    
    var food = $(this).attr("data-food");
    if (DebugON) console.log ("In button press: " + food);

    SearchFoodGif (food);

});  // event handler function for button press
    
//***************************************************************************
// Event handler for user clicking a food image  
//***************************************************************************
$(document.body).on("click", "img", function() {
    
    if (DebugON) console.log ("In image press event handler");
    
    // Swap the source url with the alternate src url
    var temp_src = $(this).attr("src");
    $(this).attr("src", $(this).attr("src_swap"));
    $(this).attr("src_swap", temp_src);

    if (DebugON) console.log ("In image press temp: " + temp_src);
    if (DebugON) console.log ("In image press src: " + $(this).attr("src"));
    if (DebugON) console.log ("In image press: swap " + $(this).attr("src_swap"));
    
});  // event handler function for image press
    
//***************************************************************************
// function SearchFoodGif - create ajax call to search for the input food
// and display the response
//***************************************************************************
function SearchFoodGif (food) {
    
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    food + "&api_key=P5rvhOxmjcIWEurUoa8B1SKm294ph7SQ&limit=" + GifLimit;

    if (DebugON) console.log ("In SearchFoodGif(): " + food);

    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(response) {
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
    
            // create pointer to <div>
            var gifDiv = $("<div>");

            // get the rating from the response data
            var rating = results[i].rating.toUpperCase();

            // create a pointer of type <img> of food gif
            var foodImage = $("<img>");

            // shows the rating on hover
            foodImage.attr('title', "Rating: " + rating);  
            
            // assign the image object a class of food-img
            foodImage.addClass("food-img");

            // assign an id attribute
            foodImage.attr("id", "foodID");

            // assign the attribute src of the still picture for the gif
            foodImage.attr("src", results[i].images.fixed_height_still.url);

            // assign the attribute src of the gif animated image
            foodImage.attr("src_swap", results[i].images.fixed_height.url);

            // combine the rating para and food image to gif <div> pointer
            
            gifDiv.append(foodImage);
        
            // prepend the gif <div> pointer to the screen
            $("#gifs-appear-here").prepend(gifDiv);
        }
    });  // ajax call
    
}  // function SearchFoodGif()
    
});  // $(document).ready(function() 
    
    
    
    