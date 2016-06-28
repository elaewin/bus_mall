// NOTES FROM LAB ON TUESDAY
// MAKE ALL IMAGES 300X300 IN PS TONIGHT
// DON'T TRY TO GENERATE IMAGES ON THE FLY--SET SPECIFIC LOCATIONS AND USE THEM THAT WAY.

'use strict';

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
function productImage(imgName, imgVerboseName, imgFilePath) {
  this.imgName = imgName;
  this.imgVerboseName = imgVerboseName;
  this.imgFilePath = imgFilePath;
  this.clicks = 0;
  this.views = 0;

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
// var checkContent = function(new, array) {
//   var result = false;
//   for(var i = 0; i < array.length; i++) {
//     if(new === array[i])
//       result = true;
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
    buildElement('img', '', liEl, 'src', imagesArray[newInt].imgFilePath, imagesArray[newInt].imgName);
    ulEl.appendChild(liEl);
    choicesCounter++;
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

var calcClickPercent = function(image) {
  var views = image.timesShown;
  var clicks = image.numberOfClicks;
  var percentage = clicks / views;
  return [percentage, views, clicks];
};

var displayResults = function() {
  for(var i = 0; i < imagesArray.length; i++) {
    console.log(imagesArray[i].imgVerboseName);
    var imageStats = calcClickPercent(imagesArray[i]);
    var percentage = imageStats[0];
    console.log('percentage', percentage);
    var views = imageStats[1];
    console.log('shown to user', views);
    var clicks = imageStats[2];
    console.log('clicks', clicks);
    // write # of clicks to DOM
    // write percentage of clicks to DOM
  }
};

var handleClick = function(event) {
  var clicked = event.target.id;
  // console.log('event target', event.target.id);
  if(clickCounter < 5) {
    for(var i = 0; i < imagesArray.length; i++) {
      if(clicked === imagesArray[i].imgName) {
        imagesArray[i].numberOfClicks++;
        // console.log('clicks', imagesArray[i].numberOfClicks);
        clickCounter++;
        // console.log('counter', clickCounter);
        getImages();
      }
    }
  } else {
    display_images.removeEventListener('click', handleClick);
    console.log('no more clicks!');
    displayResults();
  }
};


// MAKE A LOOP THAT CREATES ALL OF THESE ON THE FLY. (INVOLVES REMOVING THE VERBOSE NAME (MAYBE MAKE AN ARRAY TO ADD THIS IN LATER ON?), AND FIGURE OUT HOW TO HANDLE THE FILE PATH.)
// Create all productImage objects
var bag = new productImage('bag', 'suitcase', 'img/bag.jpg');
var banana = new productImage('banana', 'banana cutter', 'img/banana.jpg');
var bathroom = new productImage('bathroom', 'ipad stand', 'img/bathroom.jpg');
var boots = new productImage('boots', 'rain boots', 'img/boots.jpg');
var breakfast = new productImage('breakfast', 'all-in-one breakfast', 'img/breakfast.jpg');
var bubblegum = new productImage('bubblegum', 'meatball bubblegum', 'img/bubblegum.jpg');
var chair = new productImage('chair', 'chair', 'img/chair.jpg');
var cthulhu = new productImage('cthulhu', 'cthulhu action set', 'img/cthulhu.jpg');
var dog_duck = new productImage('dog_duck', 'dog duck bill muzzle', 'img/dog-duck.jpg');
var dragon = new productImage('dragon', 'dragon meat', 'img/dragon.jpg');
var pen = new productImage('pen', 'pen utensils', 'img/pen.jpg');
var pet_sweep = new productImage('pet_sweep', 'pet sweeper', 'img/pet-sweep.jpg');
var scissors = new productImage('pizza', 'pizza scissors', 'img/scissors.jpg');
var shark = new productImage('shark', 'shark sleeping bag', 'img/shark.jpg');
var sweep = new productImage('sweep', 'baby sweeper', 'img/sweep.png');
var tauntaun = new productImage('tauntaun', 'tauntaun sleeping bag', 'img/tauntaun.jpg');
var unicorn = new productImage('unicorn', 'unicorn meat', 'img/unicorn.jpg');
var usb = new productImage('usb', 'USB tentacle', 'img/usb.png');
var water_can = new productImage('water_can', 'watering can', 'img/water-can.jpg');
var wine_glass = new productImage('wine_glass', 'wine glass', 'img/wine-glass.jpg');

// Event Handler
display_images.addEventListener('click', handleClick);

// Call functions here:
getImages();
