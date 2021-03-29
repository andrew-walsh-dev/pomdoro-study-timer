
let timerRunning = false;
let totalSecondsSession = 25 * 60;
let totalSecondsBreak = 5 * 60;
let breakTime = false;
let sound = document.getElementById("beep");

function fancyTimeFormat(duration)
{   
  // Hours, minutes and seconds
    var mins = Math.floor((duration % 3600) / 60);
    var secs = Math.floor(duration % 60);
  
    if (duration == 60 * 60) {
      mins = 60;
    }  
    if (mins >= 0 && mins < 10) {
      mins = "0" + mins;
    }
    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}

function incrementLength(id) {
  if (Number(document.getElementById(id).innerHTML.split(" ")[0]) >= 60) {
    return null;
  }
  if (id == "session-length") {
    totalSecondsSession += 60;
  }
  if (id == "break-length") {
    totalSecondsBreak += 60;
  }
  let currentVal = document.getElementById(id).innerHTML;
  document.getElementById(id).innerHTML = Number(currentVal.split(" ")[0]) + 1;
  document.getElementById(id).innerHTML += " minutes"
  displayTime('session');
}

function decrementLength(id) {
  if (Number(document.getElementById(id).innerHTML.split(" ")[0]) <= 1) {
    return null;
  }
  if (id == "session-length") {
    totalSecondsSession -= 60;
  }
  if (id == "break-length") {
    totalSecondsBreak -= 60;
  }
  let currentVal = document.getElementById(id).innerHTML;
  document.getElementById(id).innerHTML = Number(currentVal.split(" ")[0]) - 1;
  document.getElementById(id).innerHTML += " minutes"
  displayTime('session');
}

function displayTime(type) {
  if (type == "session") {
    document.getElementById("time-left").textContent = fancyTimeFormat(totalSecondsSession);
  }
  else {
    document.getElementById("time-left").innerHTML = fancyTimeFormat(totalSecondsBreak)
  }
}

function reset() {
  document.getElementById("break-length").innerHTML = "5 minutes";
  document.getElementById("session-length").innerHTML = "25 minutes";
  totalSecondsSession = 60 * 25;
  totalSecondsBreak = 60 * 5;
  timerRunning = false;
  displayTime('session');
  document.getElementById("timer-label").innerHTML = "Time Remaining:";
  breakTime = false;
  
  sound.pause();
  sound.currentTime = 0;
}

function toggleTimer() {
  timerRunning = !timerRunning;
}

$(function() {
  displayTime('session');
});


document.getElementById("beep").volume = 0.1;

window.setInterval(countdown, 1000);
function countdown() { 
    if (timerRunning) {
     document.querySelector("#break-increment").disabled = true;
     document.querySelector("#break-decrement").disabled = true;
     document.querySelector("#session-increment").disabled = true;
     document.querySelector("#session-decrement").disabled = true;
    }
    else {
     document.querySelector("#break-increment").disabled = false;
     document.querySelector("#break-decrement").disabled = false;
     document.querySelector("#session-increment").disabled = false;
     document.querySelector("#session-decrement").disabled = false;
    }

    if (timerRunning && totalSecondsSession >= 0) {
       totalSecondsSession -= 1;
       displayTime('session');
    }
    if (document.getElementById("time-left").innerHTML == "-1:0-1") {
      sound.play();
      breakTime = true;
      document.getElementById("timer-label").innerHTML = "Time Remaining (Break):";
      while (document.getElementById("time-left").innerHTML != '' + fancyTimeFormat(totalSecondsBreak)) {
        console.log(displayTime('break'));
      }
    }
    if (breakTime && timerRunning && totalSecondsBreak > -1) {
      totalSecondsBreak -= 1;
      displayTime('break');
    }
    if (document.getElementById("time-left").innerHTML == "-1:0-1") {
      sound.play()
    totalSecondsSession = Number(document.getElementById("session-length").innerHTML.split(" ")[0]) * 60;
    totalSecondsBreak = Number(document.getElementById("break-length").innerHTML.split(" ")[0]) * 60;
      breakTime = false;
      document.getElementById("timer-label").innerHTML = "Time Remaining:"
      displayTime('session');
    }
}