var daysElem = document.getElementById("days");
var hoursElem = document.getElementById("hours");
var minutesElem = document.getElementById("minutes");
var secondsElem = document.getElementById("seconds");



StartCoundDown("Nov 10 2018");

function appendZeroIfLessthan10(value) {
    if(value < 10) {
        return value = "0" + value;
    }
    return value;
}

function StartCoundDown(dateString) {
    var countDownDate = new Date(dateString).getTime();
    setInterval(function () {
        var now = new Date().getTime();
        var distance = countDownDate - now;
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        secondsElem.innerHTML = appendZeroIfLessthan10(seconds);
        minutesElem.innerHTML = appendZeroIfLessthan10(minutes);
        hoursElem.innerHTML = appendZeroIfLessthan10(hours);
        daysElem.innerHTML = appendZeroIfLessthan10(days);
    }, 1000);
}