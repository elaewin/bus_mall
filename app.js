'use strict';

var namesArray = [];
var imagesArray = [];
var choicesArray = [];
var prevChoicesArray = [21, 21, 21];
var clickCounter = 0;

// Variables for showing chart data;
var clicksArray = [];
var viewsArray = [];
var percentsArray = [];
var totalClicksArray = [];
var totalViewsArray = [];
var overallPercentArray = [];

var startButton = document.getElementById('start_button');
var ulEl = document.getElementById('display_images');
var resultsButton = document.getElementById('results');
var resultsChart = document.getElementById('chart');

var imageFilePaths = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];

var checkLocalStorage = function() {
  if(localStorage.storedClickCounter < 24) {
    clickCounter = JSON.parse(localStorage.storedClickCounter);
  } else {
    clickCounter = 0;
  }
  if(localStorage.storedImagesArray) {
    imagesArray = JSON.parse(localStorage.storedImagesArray);
  }
};

// Constructor for image objects.
function ProductImage(imgFilePath) {
  this.imgFilePath = imgFilePath;
  this.clicks = 0;
  this.views = 0;
}

// Builds array of ProductImages and creates namesArray
function buildImageObjects(array) {
  for(var i = 0; i < array.length; i++) {
    imagesArray[i] = (new ProductImage(array[i]));
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

// Checks for an item in an array.
var checkContent = function(index, array) {
  var result = false;
  for(var i = 0; i < array.length; i++) {
    if(index === array[i])
      result = true;
  }
  return result;
};

// Generates 3 random images and updates the DOM
var getImages = function() {
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

var displayImages = function() {
  ulEl.innerHTML = '';
  for(var i = 0; i < choicesArray.length; i++) {
    var imgNumber = choicesArray[i];
    var source = 'img/' + imagesArray[imgNumber].imgFilePath;
    var liEl = document.createElement('li');
    buildElement('img', '', liEl, 'src', source);
    ulEl.appendChild(liEl);
  }
};

var calcStats = function(image) {
  var views = image.views;
  var clicks = image.clicks;
  localStorage.storedImagesArray = JSON.stringify(imagesArray);
  var percentage = clicks / views;
  if(isNaN(percentage)) {
    percentage = 0;
  }
  return [clicks, views, percentage];
};

var generateStats = function() {
  for(var i = 0; i < imagesArray.length; i++) {
    var imageStats = calcStats(imagesArray[i]);
    var itemClicks = imageStats[0];
    clicksArray[i] = itemClicks;
    if(isNaN(totalClicksArray[i])) {
      totalClicksArray[i] = 0;
    }
    totalClicksArray[i] += itemClicks;
    var itemViews = imageStats[1];
    viewsArray[i] = itemViews;
    if(isNaN(totalViewsArray[i])) {
      totalViewsArray[i] = 0;
    }
    totalViewsArray[i] += itemViews;
    var percentage = (imageStats[2].toFixed(2) * 100);
    percentsArray[i] = percentage;
    overallPercentArray[i] = (totalClicksArray[i] / totalViewsArray[i]).toFixed(2) * 100;
  }
};

var handleSurveyStart = function(event) {
  startButton.style.display = 'none';
  ulEl.style.display = 'block';
};

var handleClick = function(event) {
  var clicked = event.target.src;
  if(clickCounter < 24) {
    for(var i = 0; i < imagesArray.length; i++) {
      if(clicked.split('img/')[1] === imagesArray[i].imgFilePath) {
        imagesArray[i].clicks++;
        generateStats();
        clickCounter += 1;
        localStorage.storedClickCounter = JSON.stringify(clickCounter);
        getImages();
      }
    }
  } else {
    display_images.removeEventListener('click', handleClick);
    resultsButton.style.display = 'block';
  }
};

var handleDisplayResults = function(event) {
  makeChart();
  ulEl.style.display = 'none';
  resultsChart.style.display = 'block';
};

var makeChart = function() {
  var ctx = document.getElementById('chart').getContext('2d');
  var statResultsChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: namesArray,
      datasets: [
        {
          label: 'Total Number of Clicks',
          backgroundColor: 'rgba(40, 182, 195, 0.7)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(253, 188, 58, 1)',
          data: totalClicksArray,
        },
        {
          label: '% Clicks Per Times Viewed',
          backgroundColor: 'rgba(57,184, 118, 0.7)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(253, 188, 58, 1)',
          data: overallPercentArray,
        },
        {
          label: 'Total Views',
          backgroundColor: 'rgba(47,90,148, 0.7)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(253, 188, 58, 1)',
          data: totalViewsArray,
        }
      ]
    }
  });
  console.log(statResultsChart);
};

// Event Handlers
start_button.addEventListener('click', handleSurveyStart);
display_images.addEventListener('click', handleClick);
results.addEventListener('click', handleDisplayResults);

// Call functions here:
checkLocalStorage();
buildImageObjects(imageFilePaths);
getImages();
