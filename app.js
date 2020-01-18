// Init
let song = new Audio("./study music.mp3");
const buzzer = new Audio("./alarm-clock-01.mp3");
const timeSelect = document.querySelectorAll(".time-select");
const timeDisplay = document.querySelector("#time-display");
const pauseMusicButton = document.querySelector("#pause-music");
let stopMusicID = 0;
var duration = 25;
let counter; // Set Interval Counter Variable outside the Loop

// Set loop
song.loop = true;

// Time Select
timeSelect.forEach(option => {
  option.addEventListener("click", function() {
    clearInterval(counter); // Clear Interval (Set speed to 0)
    stopMusicID = 0;
    if (option.getAttribute("id") == "pomodoro") {
      buzzer.pause();
      buzzer.currentTime = 0;
      song.play();
    } else {
      song.pause();
      buzzer.pause();
      buzzer.currentTime = 0;
    }
    // Get Data
    duration = this.getAttribute("data-time");
    timeDisplay.textContent = `${duration / 60}:0${duration % 60}`;

    // Count Down
    counter = setInterval(countDown, 1000); // Set Interval (Set speed to 1 sec)
    function countDown() {
      if (duration == 0) return;
      duration -= 1;
      if (duration === 0) {
        song.pause();
        buzzer.play();
        clearInterval(counter);
      }
      let minutes = Math.floor(duration / 60);
      let seconds = Math.floor(duration % 60);
      if (seconds > 9) timeDisplay.textContent = `${minutes}:${seconds}`;
      else timeDisplay.textContent = `${minutes}:0${seconds}`;
    }
  });
});

pauseMusicButton.addEventListener("click", function() {
  if (stopMusicID === 1) {
    stopMusicID = 0;
  } else if (stopMusicID === 2) {
    song.play();
    stopMusicID = 0;
  } else if (!song.paused) {
    song.pause();
    stopMusicID = 2;
  }
});
