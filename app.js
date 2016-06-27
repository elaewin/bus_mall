// 1. Show 3 random images to user
// 2. User clicks on one image of the three
// 3. Three new images are displayed, without repeating
// 4. Repeat 1-3 25 times.
// 5. After 25 repeats, display results.
//
// Global Variables:

// Array of images generated from constructor function
var imagesArray = []

// Holds the current iteration of choices by number
var choicesArray = []

// Holds the choices for the previous iteration, 20 is imagesArray.length + 1
var prevChoicesArray = [21, 21, 21]

// Functions Needed:
constructor for images {
  image name
  image file path
  number of times shown
  number of times clicked
}

var buildElement = function() {
  add an item to the DOM
}

var randomNumber = function() {
  select a random number between 1 and 20
  (get from MDN Math.random() page!)
}

var getImages = function (
  for(a given number of items - i) {
    select an image# via randomNumber
    if(image# in prevChoicesArray)
      {select another number}
      else {
        put that number in the choicesArray[i]
        update the DOM with the new image
      }
    once the if loop is done choosing new pictures, loop through prevChoicesArray and replace the numbers with the numbers in choicesArray.
  }

var displayResults = function() {
  for(each item in imagesArray) {
    calculate the percentage of time that the item was clicked if shown
    write # of clicks to DOM
    write percentage of clicks to DOM
  }
}

var calcClickPercent = function() {
  this is the number of times clicked divided by the number of times shown
}

// HANDLER FUNCTION: THIS WILL HAVE TO BE AN ANON FUNCTION
var handleClick = function() {
  this will contain the other functions that will run on click.
  var clickCounter = 0 // counts # of times user has clicked
  if(clickCounter < 25) {
    getImages();
    clickCounter++;
  }
  if(clickCounter === 25) {
    turn off handleClick;
    displayResults();
  }
}

// Create all image objects


// Event Handler


// Call functions here:
