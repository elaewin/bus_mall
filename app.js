'use strict';

// 1. Show 3 random images to user
// 2. User clicks on one image of the three
// 3. Three new images are displayed, without repeating
// 4. Repeat 1-3 25 times.
// 5. After 25 repeats, display results.
//
// Global Variables:

// Array of images generated from constructor function
var imagesArray = [];

// Holds the current iteration of choices by number
var choicesArray = [];

// Holds the choices for the previous iteration, 20 is imagesArray.length + 1
var prevChoicesArray = [21, 21, 21];

// counts # of times user has clicked
var clickCounter = 0;

// Where images will be added.
var ulEl = document.getElementById('display_images');

// Constructor for image objects.
function productImage(imgName, imgFilePath, numberOfClicks, timesShown) {
  this.imgName = imgName;
  this.imgFilePath = imgFilePath;
  this.numberOfClicks = numberOfClicks;
  this.timesShown = timesShown;

  // console.dir(this);
  imagesArray.push(this);
}

// Builds an element and adds it to another element, attribute optional
function buildElement(kind, content, where, attName, attValue, id) {
  var x = document.createElement(kind);
  x.textContent = content;
  if(id) {
    x.id = id;
  }
  if(attName && attValue) {
    x.setAttribute(attName, attValue);
  }
  where.appendChild(x);
}

// Returns a random integer between min (included) and max (excluded)
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// // Attempting to make a function to check for an item in an array.
// var checkContent = function(item, arrayToCheck, booleanValueIfPresent) {
//   var result = !booleanValueIfPresent;
//   for(var i = 0; i < arrayToCheck.length; i++) {
//     if(item === arrayToCheck[i])
//       result = booleanValueIfPresent;
//   }
//   return result;
// };

function getImages() {
  ulEl.innerHTML = '';
  var choicesCounter = 0;
  console.log('previous choices', prevChoicesArray);
  while(choicesCounter < 3) {
    var isRepeatNumber = true;
    while(isRepeatNumber === true) {
      isRepeatNumber = false;
      var newInt = getRandomInt(0, 20);
      // console.log('newInt', newInt);
      for(var j = 0; j < prevChoicesArray.length; j++) { // Make a function?
        if(newInt === prevChoicesArray[j]) {
          isRepeatNumber = true;
        }
      }
      for(var k = 0; k < choicesArray.length; k++) { // Make a function!
        if(newInt === choicesArray[k]) {
          isRepeatNumber = true;
        }
      }
    }
    var liEl = document.createElement('li');
    choicesArray[choicesCounter] = newInt;
    imagesArray[newInt].timesShown++;
    buildElement('img', '', liEl, 'src', imagesArray[newInt].imgFilePath, newInt);
    ulEl.appendChild(liEl);
    choicesCounter++;
    // console.log('counter', choicesCounter);
  }
  for(var i = 0; i < choicesArray.length; i++) {
    prevChoicesArray[i] = choicesArray[i];
  }
  console.log('current choices', choicesArray);
};

var checkRefs = function() {
  for(var i = 0; i < imagesArray.length; i++) {
    console.log('image reps', imagesArray[i].timesShown);
  }
};

// var displayResults = function() {
//   for(var i = 0; i < imagesArray.length; i++) {
//     var image = imagesArray[i];
//     var percent = calClickPercent();
//     console.log('shown to user', image.timesShown);
//     console.log('clicks', image.numberOfClicks);
//     console.log('percentage', percent);
//     // write # of clicks to DOM
//     // write percentage of clicks to DOM
//   }
// };
//
// var calcClickPercent = function() {
//   for(var i = 0; i < imagesArray.length; i++) {
//     var currentImage = imagesArray[i];
//     var views = currentImage.timesShown;
//     var clicks = currentImage.numberOfClicks;
//     var percentage = clicks / views;
//     return percentage;
//   }
// };
//
var handleClick = function(event) {
  imagesArray[event.target.id].numberOfClicks++;
  if(clickCounter < 25) {
    getImages();
    clickCounter++;
  }
  else {
    display_images.removeEventHandler('click', clickCounter);
    displayResults();
  }
};

// Create all productImage objects
var bag = new productImage('suitcase', 'img/bag.jpg', 0, 0);
var banana = new productImage('banana cutter', 'img/banana.jpg', 0, 0);
var bathroom = new productImage('ipad stand', 'img/bathroom.jpg', 0, 0);
var boots = new productImage('rain boots', 'img/boots.jpg', 0, 0);
var breakfast = new productImage('all-in-one breakfast', 'img/breakfast.jpg', 0, 0);
var bubblegum = new productImage('meatball bubblegum', 'img/bubblegum.jpg', 0, 0);
var chair = new productImage('chair', 'img/chair.jpg', 0, 0);
var cthulhu = new productImage('cthulhu action set', 'img/cthulhu.jpg', 0, 0);
var dog_duck = new productImage('dog duck bill', 'img/dog-duck.jpg', 0, 0);
var dragon = new productImage('dragon meat', 'img/dragon.jpg', 0, 0);
var pen = new productImage('pen utensils', 'img/pen.jpg', 0, 0);
var pet_sweep = new productImage('pet sweeper', 'img/pet-sweep.jpg', 0, 0);
var scissors = new productImage('pizza scissors', 'img/scissors.jpg', 0, 0);
var shark = new productImage('shark sleeping bag', 'img/shark.jpg', 0, 0);
var sweep = new productImage('baby sweeper', 'img/sweep.png', 0, 0);
var tauntaun = new productImage('tauntaun sleeping bag', 'img/tauntaun.jpg', 0, 0);
var unicorn = new productImage('unicorn meat', 'img/unicorn.jpg', 0, 0);
var usb = new productImage('USB tentacle', 'img/usb.png', 0, 0);
var water_can = new productImage('watering can', 'img/water-can.jpg', 0, 0);
var wine_glass = new productImage('wine glass', 'img/wine-glass.jpg', 0, 0);

// Event Handler
// display_images.addEventListener('click', handleClick);

// Call functions here:
getImages();
