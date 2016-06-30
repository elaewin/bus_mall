'use strict';

var imagesArray = [];
var ongoingArray = [];
var namesArray = [];
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
var instructions = document.getElementById('instructions');
var resultsButton = document.getElementById('results_button');
var resultsChart = document.getElementById('chart_container');
var marketingButton = document.getElementById('marketing_button');
var radarChart = document.getElementById('radar_chart');

var imageFilePaths = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];

Chart.defaults.global.defaultFontFamily = 'Roboto, sans-serif';
Chart.defaults.global.title.display = true;

var checkLocalStorage = function() {
  if(localStorage.storedClickCounter < 4) {
    clickCounter = JSON.parse(localStorage.storedClickCounter);
  } else {
    clickCounter = 0;
  }
  if(localStorage.storedOngoingArray) {
    ongoingArray = JSON.parse(localStorage.storedOngoingArray);
  }
};

// Constructor for image objects.
function ProductImage(imgFilePath) {
  this.imgFilePath = imgFilePath;
  this.clicks = 0;
  this.views = 0;
}

// Builds arrays for current and ongoing data collection. Creates namesArray.
function buildImageObjects(array) {
  for(var i = 0; i < array.length; i++) {
    imagesArray[i] = (new ProductImage(array[i]));
    var itemName = imagesArray[i].imgFilePath.split('.')[0];
    namesArray[i] = itemName;
  }
  if(!localStorage.storedOngoingArray) {
    for(var i = 0; i < array.length; i++) {
      ongoingArray[i] = (new ProductImage(array[i]));
      var itemName = ongoingArray[i].imgFilePath.split('.')[0];
    }
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
    ongoingArray[newInt].views++;
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

var makeIsNaNZero = function(arrayItem) {
  if(isNaN(arrayItem)) {
    arrayItem = 0;
  }
};

var generateStatsArrays = function() {
  for(var i = 0; i < imagesArray.length; i++) {
    makeIsNaNZero(imagesArray[i].clicks);
    clicksArray[i] = imagesArray[i].clicks;
    makeIsNaNZero(imagesArray[i].views);
    viewsArray[i] = imagesArray[i].views;
    var percentage = (clicksArray[i] / viewsArray[i]).toFixed(2) * 100;
    makeIsNaNZero(percentage);
    percentsArray[i] = percentage;
  }
  for(var j = 0; j < ongoingArray.length; j++) {
    totalClicksArray[j] = ongoingArray[j].clicks;
    totalViewsArray[j] = ongoingArray[j].views;
    overallPercentArray[j] = (totalClicksArray[j] / totalViewsArray[j]).toFixed(2) * 100;
  }
};

var handleSurveyStart = function(event) {
  startButton.style.display = 'none';
  ulEl.style.display = 'block';
};

var handleClick = function(event) {
  var clicked = event.target.src;
  if(clickCounter < 4) {
    for(var i = 0; i < imagesArray.length; i++) {
      if(clicked.split('img/')[1] === imagesArray[i].imgFilePath) {
        imagesArray[i].clicks++;
        ongoingArray[i].clicks++;
        clickCounter += 1;
        localStorage.storedImagesArray = JSON.stringify(imagesArray);
        localStorage.storedOngoingArray = JSON.stringify(ongoingArray);
        localStorage.storedClickCounter = JSON.stringify(clickCounter);
        getImages();
      }
    }
  } else {
    generateStatsArrays();
    display_images.removeEventListener('click', handleClick);
    resultsButton.style.display = 'block';
  }
};

var handleDisplayResults = function(event) {
  makeCurrentClicksChart();
  makeCurrentPercentChart();
  makeOngoingClicksChart();
  makeOngoingPercentChart();
  ulEl.style.display = 'none';
  instructions.style.display = 'none';
  resultsButton.style.display = 'none';
  resultsChart.style.display = 'block';
  // marketingButton.style.display = 'block';
};

var handleMarketingResults = function(event) {
  makeRadarChart();
  resultsChart.style.display = 'none';
  radarChart.style.display = 'block';
  marketingButton.style.display = 'none';
  resultsButton.style.display = 'block';
};

var makeCurrentClicksChart = function() {
  var ctx = document.getElementById('current_click_chart').getContext('2d');
  var statResultsChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: namesArray,
      datasets: [
        {
          label: 'Total Clicks',
          backgroundColor: 'rgba(40, 182, 195, 0.7)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(253, 188, 58, 0.4)',
          data: clicksArray,
        },
        {
          label: 'Total Item Views',
          backgroundColor: 'rgba(47,90,148, 0.7)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(224, 89, 41, 0.4)',
          data: viewsArray,
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Your Survey Results - Total Times Viewed and Number of Times Clicked',
        fontFamily: 'Roboto',
        fontColor: '#2f5a94'
      }
    }
  });
};

var makeCurrentPercentChart = function() {
  var ctx = document.getElementById('current_percent_chart').getContext('2d');
  var statResultsChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: namesArray,
      datasets: [
        {
          label: 'Percentage of Clicks',
          backgroundColor: 'rgba(57,184, 118, 0.7)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(253, 188, 58, 0.4)',
          data: percentsArray,
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Your Survey Results - Percentage of Times an Item was Clicked',
        fontFamily: 'Roboto',
        fontColor: '#2f5a94'
      },
      tooltips: {
        mode: 'label',
        callbacks: {
          label: function(tooltipItems, data) {
            return tooltipItems.yLabel + '%';
          }
        }
      }
    }
  });
};

var makeOngoingClicksChart = function() {
  var ctx = document.getElementById('ongoing_click_chart').getContext('2d');
  var statResultsChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: namesArray,
      datasets: [
        {
          label: 'Total Clicks',
          backgroundColor: 'rgba(26, 119, 127, 0.7)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(253, 188, 58, 0.4)',
          data: totalClicksArray,
        },
        {
          label: 'Total Item Views',
          backgroundColor: 'rgba(37, 71, 116, 0.7)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(179, 66, 25, 0.4)',
          data: totalViewsArray,
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Overall Survey Results - Total Times Viewed and Number of Times Clicked',
        fontFamily: 'Roboto',
        fontColor: '#2f5a94'
      }
    }
  });
};

var makeOngoingPercentChart = function() {
  var ctx = document.getElementById('ongoing_percent_chart').getContext('2d');
  var statResultsChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: namesArray,
      datasets: [
        {
          label: 'Percentage of Clicks',
          backgroundColor: 'rgba(36, 117, 75, 0.7)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(253, 188, 58, 0.4)',
          data: overallPercentArray,
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Overall Survey Results - Percentage of Times an Item was Clicked',
        fontFamily: 'Roboto',
        fontColor: '#2f5a94'
      },
      tooltips: {
        mode: 'label',
        callbacks: {
          label: function(tooltipItems, data) {
            return tooltipItems.yLabel + '%';
          }
        }
      }
    }
  });
};

var makeRadarChart = function () {
  var ctx = document.getElementById('radar_chart').getContext('2d');
  var marketingRadarChart = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: namesArray,
      datasets: [
        {
          label: 'Total Clicks',
          backgroundColor: 'rgba(26, 119, 127, 0.2)',
          pointBackgroundColor: 'rgba(26, 119, 127, 1)',
          pointBorderColor: 'rgba(149, 226, 233, 0.8)',
          pointHoverBackgroundColor: 'rgba(149, 226, 233, 0.8)',
          pointHoverBorderColor: 'rgba(26, 119, 127, 1)',
          data: totalClicksArray
        },
        {
          label: 'Total Views',
          backgroundColor: 'rgba(37, 71, 116, 0.2)',
          pointBackgroundColor: 'rgba(37, 71, 116, 1)',
          pointBorderColor: 'rgba(158, 187, 224, 0.8)',
          pointHoverBackgroundColor: 'rgba(158, 187, 224, 0.8)',
          pointHoverBorderColor: 'rgba(37, 71, 116, 1)',
          data: totalViewsArray
        }
      ]
    },
    options: options
  });
};

// Event Handlers
start_button.addEventListener('click', handleSurveyStart);
display_images.addEventListener('click', handleClick);
results_button.addEventListener('click', handleDisplayResults);
// marketing_button.addEventListener('click', handleMarketingResults);

// Call functions here:
checkLocalStorage();
buildImageObjects(imageFilePaths);
getImages();
