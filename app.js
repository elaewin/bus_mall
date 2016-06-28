// NOTES FROM LAB ON TUESDAY
// MAKE ALL IMAGES 300X300 IN PS TONIGHT
// DON'T TRY TO GENERATE IMAGES ON THE FLY--SET SPECIFIC LOCATIONS AND USE THEM THAT WAY.

'use strict';

var imageFilePaths = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];

var imagesArray = [];
var choicesArray = [];
var prevChoicesArray = [21, 21, 21];
var clickCounter = 0;

var totalClicksArray = [];
var percentagesArray = [];

var ulEl = document.getElementById('display_images');

// Constructor for image objects.
function productImage(imgFilePath) {
  this.imgFilePath = 'img/' + imgFilePath;
  this.clicks = 0;
  this.views = 0;

  imagesArray.push(this);
}

// Builds array of productImages
function buildImageObjects(array) {
  for(var i = 0; i < array.length; i++) {
    imagesArray[i] = (new productImage(array[i]));
  }
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
var checkContent = function(index, array) {
  var result = false;
  for(var i = 0; i < array.length; i++) {
    if(index === array[i])
      result = true;
  }
  return result;
};

function getImages() {
  ulEl.innerHTML = '';
  var choicesCounter = 0;
  while(choicesCounter < 3) {
    var newInt = getRandomInt(0, 20);
    while(checkContent(newInt, prevChoicesArray) || checkContent(newInt, choicesArray)) {
      newInt = getRandomInt(0, 20);
      console.log(newInt);
    }
    choicesArray[choicesCounter] = newInt;
    imagesArray[newInt].views++;
    choicesCounter++;
  }
  displayImages();
  console.log('prevChoicesArray', prevChoicesArray);
  console.log('choicesArray', choicesArray);
  for(var i = 0; i < choicesArray.length; i++) {
    prevChoicesArray[i] = choicesArray[i];
  }
};

function displayImages() {
  ulEl.innerHTML = '';
  for(var i = 0; i < choicesArray.length; i++) {
    var imgNumber = choicesArray[i];
    var liEl = document.createElement('li');
    buildElement('img', '', liEl, 'src', imagesArray[imgNumber].imgFilePath);
    ulEl.appendChild(liEl);
  }
}

var checkRefs = function() {
  for(var i = 0; i < imagesArray.length; i++) {
    // console.log('image reps', imagesArray[i].views);
  }
};

var calcClickPercent = function(image) {
  var views = image.views;
  var clicks = image.clicks;
  var percentage = clicks / views;
  return [percentage, views, clicks];
};

var displayStats = function() {
  for(var i = 0; i < imagesArray.length; i++) {
    var imageStats = calcClickPercent(imagesArray[i]);
    var percentage = imageStats[0].toFixed(2);
    console.log('percentage', percentage);
    var itemViews = imageStats[1];
    console.log('views', itemViews);
    var itemClicks = imageStats[2];
    console.log('clicks', itemClicks);
    // write # of clicks to DOM
    // write percentage of clicks to DOM
  }
};

var handleClick = function(event) {
  var clicked = event.target.src;
  if(clickCounter < 25) {
    for(var i = 0; i < imagesArray.length; i++) {
      if('img/' + clicked.split('img/')[1] === imagesArray[i].imgFilePath) {
        imagesArray[i].clicks++;
        console.log('clicks', imagesArray[i].clicks);
        clickCounter++;
        console.log('counter', clickCounter);
        getImages();
      }
    }
  } else {
    display_images.removeEventListener('click', handleClick);
    // console.log('no more clicks!');
    displayStats();
  }
};

// Event Handler
display_images.addEventListener('click', handleClick);

// Call functions here:

buildImageObjects(imageFilePaths);
console.dir(imagesArray);
getImages();
