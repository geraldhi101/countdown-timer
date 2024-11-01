let countdown;
const dateDisplay = document.querySelector('.display__date');
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function displayToday() {
  const date = new Date();
  const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu"];
  const today = `Hari ini: ${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth(months)]} ${date.getFullYear()}`;
  dateDisplay.textContent = today;
}

function timer(seconds) {
  // clear any existing timers
  clearInterval(countdown);

  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    // check if we should stop it!
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    // display it
    displayTimeLeft(secondsLeft);
  }, 1000);
}


function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const hour = Math.floor(minutes / 60);
  const remainderMinutes = minutes % 60;
  const minutesDisplay = `${minutes < 10 ? '0' : ''}${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
  const hourDisplay = `${hour < 10 ? '0' : ''}${hour}:${remainderMinutes < 10 ? '0' : ''}${remainderMinutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`
  display = minutes >= 60 ? document.title = hourDisplay : document.title = minutesDisplay;
  timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  // const twelveHour = hour > 12 ? hour - 12 : hour;
  const minutes = end.getMinutes();
  //const today = `${displayToday().days[date.getDay()]}, ${displayToday().date.getDate()} ${displayToday().months[date.getMonth(months)]} ${displayToday().date.getFullYear()}`;
  endTime.textContent = `Selesai pukul ${hour < 10 ? '0' : ''}${hour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

displayToday();
buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const mins = this.minutes.value;
  console.log(mins);
  timer(mins * 60);
  this.reset();
});
