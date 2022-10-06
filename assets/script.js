var todayDate = moment().format('L');
$('#currentDay').text(todayDate);

var dayOne = moment().add(1, 'days');
$('#dayOne').text(dayOne.format('L'));

var dayTwo = moment().add(2, 'days');
$('#dayTwo').text(dayTwo.format('L'));



// var days = [1,2,3,4,5]

// for (let i = 0; i < days.length; i++){
//     var dates = moment().add(days[i], 'days')
//     console.log(dates)
//     // $('#dayOne').text(days[i].format('L'));

// }