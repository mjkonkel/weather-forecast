var todayDate = moment().format('L');
$('#currentDay').text(todayDate);

var dayOne = moment().add(1, 'days');
$('#dayOne').text(dayOne.format('L'));
var dayTwo = moment().add(2, 'days');
$('#dayTwo').text(dayTwo.format('L'));
var dayThree = moment().add(3, 'days');
$('#dayThree').text(dayThree.format('L'));
var dayFour = moment().add(4, 'days');
$('#dayFour').text(dayFour.format('L'));
var dayFive = moment().add(5, 'days');
$('#dayFive').text(dayFive.format('L'));


// take input from search bar and add it to the saved list
var searchBtn = $('#search');
var savedList = $('#saved-searches')

function searchForCity(event) {
  event.preventDefault();
  var searchValue = $('#search-value').val();
  savedList.append('<button>' + searchValue + '</button>')
  console.log(searchValue)


  var nameUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + searchValue + '&limit=1&appid=23370ae6f515fc79e6570bdda3897515'

  var cityName = $('#city-name');
  console.log(cityName);
  cityName.textContent= searchValue;

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
      var weatherUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat='+lat+'&lon='+lon+'&appid=23370ae6f515fc79e6570bdda3897515'
      fetch(weatherUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
          console.log(data);
          // console.log([0].main.temp);
      })
      
    })

}










searchBtn.on('click', searchForCity)