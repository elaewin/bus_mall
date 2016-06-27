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
function productImage(imgName, imgFilePath, numberOfClicks, timesShown) {
  this.imgName = imgName;
  this.imgFilePath = imgFilePath;
  this.numberOfClicks = numberOfClicks;
  this.timesShown = timesShown;

  imagesArray.push(this);
}

// var buildElement = function() {
//   add an item to the DOM
// }
//
// var randomNumber = function() {
//   select a random number between 1 and 20
//   (get from MDN Math.random() page!)
// }
//
// var getImages = function (
//   for(a given number of items - i) {
//     select an image# via randomNumber
//     if(image# in prevChoicesArray)
//       {select another number}
//       else {
//         put that number in the choicesArray[i]
//         update the DOM with the new image
//       }
//     once the if loop is done choosing new pictures, loop through prevChoicesArray and replace the numbers with the numbers in choicesArray.
//   }
//
// var displayResults = function() {
//   for(each item in imagesArray) {
//     calculate the percentage of time that the item was clicked if shown
//     write # of clicks to DOM
//     write percentage of clicks to DOM
//   }
// }
//
// var calcClickPercent = function() {
//   this is the number of times clicked divided by the number of times shown
// }
//
// // HANDLER FUNCTION: THIS WILL HAVE TO BE AN ANON FUNCTION
// var handleClick = function() {
//   this will contain the other functions that will run on click.
//   var clickCounter = 0 // counts # of times user has clicked
//   if(clickCounter < 25) {
//     getImages();
//     clickCounter++;
//   }
//   if(clickCounter === 25) {
//     turn off handleClick;
//     displayResults();
//   }
// }

// Create all image objects

var bag = new productImage('suitcase', 'img/bag.jpg', 0, 0);
var banana = new productImage('banana cutter', 'img/banana.jpg', 0, 0);
var bathroom = new productImage('ipad stand', 'img/bathroom.jpg', 0, 0);
var boots = new productImage('rain boots', 'img/boots.jpg', 0, 0);
var breakfast = new productImage('all-in-one breakfast', 'img/breakfast.jpg', 0, 0);
var bubblegum = new productImage('meatball bubblegum', 'img/bubblegum.jpg', 0, 0);
var chair = new productImage('chair', 'img/chair.jpg', 0, 0);
var cthulhu = new productImage('cthulhu action set', 'img/cthulhu.jpg', 0, 0);
var dog-duck = new productImage('dog duck bill', 'img/dog-duck.jpg', 0, 0);
var dragon = new productImage('dragon meat', 'img/dragon.jpg', 0, 0);
var pen = new productImage('pen utensils', 'img/pen.jpg', 0, 0);
var pet-sweep = new productImage('pet sweeper', 'img/pet-sweep.jpg', 0, 0);
var scissors = new productImage('pizza scissors', 'img/scissors.jpg', 0, 0);
var shark = new productImage('shark sleeping bag', 'img/shark.jpg', 0, 0);
var sweep = new productImage('baby sweeper', 'img/sweep.png', 0, 0);
var tauntaun = new productImage('tauntaun sleeping bag', 'img/tauntaun.jpg', 0, 0);
var unicorn = new productImage('unicorn meat', 'img/unicorn.jpg', 0, 0);
var usb = new productImage('USB tentacle', 'img/usb.png', 0, 0);
var water_can = new productImage('watering can', 'img/water-can.jpg', 0, 0);
var wine_glass = new productImage('wine glass', 'img/wine-glass.jpg', 0, 0);

// Event Handler


// Call functions here:
