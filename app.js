// NOTES FROM LAB ON TUESDAY
// MAKE ALL IMAGES 300X300 IN PS TONIGHT
// DON'T TRY TO GENERATE IMAGES ON THE FLY--SET SPECIFIC LOCATIONS AND USE THEM THAT WAY.

'use strict';

var imageFilePaths = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];

var imagesArray = [];
var choicesArray = [];
var prevChoicesArray = [21, 21, 21];
var clickCounter = 0;

var namesArray = [];
var totalClicksArray = [];
var percentsArray = [];
var totalViewsArray = [];

var ulEl = document.getElementById('display_images');
var resultsButton = document.getElementById('results');
var resultsChart = document.getElementById('chart');

// Constructor for image objects.
function productImage(imgFilePath) {
  this.imgFilePath = imgFilePath;
  this.clicks = 0;
  this.views = 0;

  imagesArray.push(this);
}

// Builds array of productImages and creates namesArray
function buildImageObjects(array) {
  for(var i = 0; i < array.length; i++) {
    imagesArray[i] = (new productImage(array[i]));
    var itemName = imagesArray[i].imgFilePath.split('.')[0];
    namesArray[i] = itemName;
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
    }
    choicesArray[choicesCounter] = newInt;
    imagesArray[newInt].views++;
    choicesCounter++;
  }
  displayImages();
  for(var i = 0; i < choicesArray.length; i++) {
    prevChoicesArray[i] = choicesArray[i];
  }
};

function displayImages() {
  ulEl.innerHTML = '';
  for(var i = 0; i < choicesArray.length; i++) {
    var imgNumber = choicesArray[i];
    var source = 'img/' + imagesArray[imgNumber].imgFilePath;
    var liEl = document.createElement('li');
    buildElement('img', '', liEl, 'src', source);
    ulEl.appendChild(liEl);
  }
}

var checkRefs = function() {
  for(var i = 0; i < imagesArray.length; i++) {
    // console.log('image reps', imagesArray[i].views);
  }
};

var calcClickStats = function(image) {
  var views = image.views;
  var clicks = image.clicks;
  var percentage = clicks / views;
  if(typeof(percentage) === NaN) {
    percentage = 0;
  }
  return [percentage, views, clicks];
};

var generateStats = function() {
  for(var i = 0; i < imagesArray.length; i++) {
    var imageStats = calcClickStats(imagesArray[i]);
    var percentage = imageStats[0].toFixed(2);
    percentsArray[i] = percentage;
    var itemViews = imageStats[1];
    totalViewsArray[i] = itemViews;
    var itemClicks = imageStats[2];
    totalClicksArray[i] = itemClicks;
  }
};

var handleClick = function(event) {
  var clicked = event.target.src;
  if(clickCounter < 24) {
    for(var i = 0; i < imagesArray.length; i++) {
      if(clicked.split('img/')[1] === imagesArray[i].imgFilePath) {
        imagesArray[i].clicks++;
        clickCounter += 1;
        getImages();
      }
    }
  } else {
    display_images.removeEventListener('click', handleClick);
    resultsButton.style.display = 'inline-block';
  }
};

var handleDisplayResults = function(event) {
  generateStats();
  makeChart();
  resultsChart.style.display = 'block';
  console.log('display the chart!');
};

var makeChart = function() {
  var ctx = document.getElementById('chart').getContext('2d');
  var resultsChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: namesArray,
      datasets: [
        {
          label: 'Total Number of Clicks',
          backgroundColor: 'rgba(40, 182, 195, 0.7)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(253, 188, 58, 1)',
          hoverBorderColor: 'rgba(253, 188, 58, 1)',
          data: totalClicksArray,
        },
        {
          label: '% Clicks Per Times Viewed',
          backgroundColor: 'rgba(57,184, 118, 0.7)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(253, 188, 58, 1)',
          hoverBorderColor: 'rgba(253, 188, 58, 1)',
          data: percentsArray,
        },
        {
          label: 'Total Views',
          backgroundColor: 'rgba(47,90,148, 0.7)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(253, 188, 58, 1)',
          hoverBorderColor: 'rgba(253, 188, 58, 1)',
          data: totalViewsArray,
        }
      ]
    }
  });
};

// Event Handlers
display_images.addEventListener('click', handleClick);
results.addEventListener('click', handleDisplayResults);


// Call functions here:
buildImageObjects(imageFilePaths);
getImages();
