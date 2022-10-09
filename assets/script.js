
// take input from search bar and add it to the saved list
var searchBtn = document.getElementById('search');
var savedList = document.getElementById('saved-searches')
var searchValueEl = document.getElementById('search-value');
var fiveDayContainer = document.getElementById('fiveDay')

function handleUserinput() {
  var userInput = searchValueEl.value
  searchForCity(userInput)
}

function searchForCity(searchValue) {

  // savedList.append('<button>' + searchValue + '</button>')
  console.log(searchValue)


  var nameUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + searchValue + '&limit=1&appid=23370ae6f515fc79e6570bdda3897515'

  var cityName = $('#city-name');
  console.log(cityName);
  // cityName.textContent= searchValue;

  fetch(nameUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      console.log(data[0].lat);
      console.log(data[0].lon);
      var lat = data[0].lat;
      var lon = data[0].lon;

      fiveDayForecast(lat, lon)

    })

}


function fiveDayForecast(lat, lon) {
  var weatherUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=23370ae6f515fc79e6570bdda3897515&units=imperial'
  fetch(weatherUrl)
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

        card.setAttribute('class', 'card'),
        cardBody.setAttribute('class', 'card-body')
        cardTitle.setAttribute('class', 'card-title')
        cardTemp.setAttribute('class', 'card-text')
        cardWind.setAttribute('class', 'card-text')
        cardTitle.textContent = 'day'
        cardTemp.textContent = 'Temp: '
        cardWind.textContent = 'Wind: '
        cardHumid.textContent = 'Humidity: '

        cardBody.append(cardTitle, cardTemp, cardWind, cardHumid)
        card.append(cardBody)
        fiveDayContainer.append(card)
      }
    })


}


searchBtn.addEventListener('click', handleUserinput)