var searchBtn = document.getElementById('search');
var savedList = document.getElementById('saved-searches')
var searchValueEl = document.getElementById('search-value');
var fiveDayContainer = document.getElementById('fiveDay')
var currentContainer = document.getElementById('currentWeather')

function handleUserinput() {
  var userInput = searchValueEl.value
  searchForCity(userInput)
}

function searchForCity(searchValue) {

  // savedList.append('<button>' + searchValue + '</button>')
  console.log(searchValue)


  var nameUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + searchValue + '&limit=1&appid=23370ae6f515fc79e6570bdda3897515'

  // var cityName = document.getElementById('city-name');
  // console.log(cityName);
  // cityName.textContent= searchValue;

  fetch(nameUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      console.log(data[0].lat);
      console.log(data[0].lon);
      console.log(data[0].name);
      var lat = data[0].lat;
      var lon = data[0].lon;

      fiveDayForecast(lat, lon)
      currentWeather(lat, lon)
    })

}


function currentWeather(lat, lon) {
  var currentUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=23370ae6f515fc79e6570bdda3897515&units=imperial'
  fetch(currentUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data){
    console.log(data);
    console.log(data.main.temp);
    
    var currentDisplay = document.createElement('div')
    var currentTitle = document.createElement('h3')
    var currentTemp = document.createElement('p')
    var currentWind = document.createElement('p')
    var currentHumid = document.createElement('p')
    currentTitle.textContent = 'Current Weather: '
    currentTemp.textContent = 'Temp: ' + data.main.temp + ' \u00B0F'
    currentWind.textContent = 'Wind: ' + data.wind.speed + ' MPH'
    currentHumid.textContent = 'Humidity: ' + data.main.humidity + ' \%'


    currentDisplay.append(currentTemp, currentWind, currentHumid)
    currentContainer.append(currentDisplay)

  })
}

function fiveDayForecast(lat, lon) {
  var forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=23370ae6f515fc79e6570bdda3897515&units=imperial'
  fetch(forecastUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {

      var fiveDayArray = []
      fiveDayArray.push(data.list[6], data.list[14], data.list[22], data.list[30], data.list[38])
      
      for (var i = 0; i < fiveDayArray.length; i++) {
        console.log(fiveDayArray[i]);

        // create card elements
        var card = document.createElement('div')
        var cardBody = document.createElement('div')
        var cardTitle = document.createElement('p')
        var cardTemp = document.createElement('p')
        var cardWind = document.createElement('p')
        var cardHumid = document.createElement('p')
        let epochDate = fiveDayArray[i].dt
        // console.log(epochDate);
        // let date = new Date(epochDate);
        // let dateStr = date.getFullYear()
        // console.log(dateStr);

        // set card classes and content
        card.setAttribute('class', 'card')
        cardBody.setAttribute('class', 'card-body')
        cardTitle.setAttribute('class', 'card-title')
        cardTemp.setAttribute('class', 'card-text')
        cardWind.setAttribute('class', 'card-text')
        cardTitle.textContent = epochDate
        cardTemp.textContent = 'Temp: ' + fiveDayArray[i].main.temp + ' \u00B0F'
        cardWind.textContent = 'Wind: ' + fiveDayArray[i].wind.speed + ' MPH'
        cardHumid.textContent = 'Humidity: ' + fiveDayArray[i].main.humidity + ' \%'

        cardBody.append(cardTitle, cardTemp, cardWind, cardHumid)
        card.append(cardBody)
        fiveDayContainer.append(card)
      }
    })


}


searchBtn.addEventListener('click', handleUserinput)