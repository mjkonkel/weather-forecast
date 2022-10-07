var todayDate = moment().format('L');
$('#currentDay').text(todayDate);

var dayOne = moment().add(1, 'days');
$('#dayOne').text(dayOne.format('L'));

var dayTwo = moment().add(2, 'days');
$('#dayTwo').text(dayTwo.format('L'));


var requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=52.52&lon=13.40&appid=23370ae6f515fc79e6570bdda3897515'

fetch(requestUrl)
.then(function (response) {
  return response.json();
})
.then(function (data) {
    console.log(data);
})




   

      