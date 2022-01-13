import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

addLeadingZero();

//код индуса
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

// элементы разметки 
const refs = {
  dateInput: document.querySelector('#datetime-picker'),
  startBtnEl: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

// кнопка старт неактивная 
refs.startBtnEl.disabled = true;

// это из библиотеки, объект календаря
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const counterDate = selectedDates[0];
    const currentDate = this.config.defaultDate.getTime();
    if (currentDate > counterDate) {
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    }
    refs.startBtnEl.disabled = false;
  },
};

const datePickr = flatpickr(refs.dateInput, options);
refs.startBtnEl.addEventListener('click', () => {
  timer.end();
});

const timer = {
  isActive: false,
  end() {
    if (this.isActive) {
      return;
    }

    this.isActive = true;

    const intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = datePickr.selectedDates[0] - currentTime;
      const time = convertMs(deltaTime);
      updateClockFace(time);
      if (deltaTime < 1000) {
        clearInterval(intervalId);
      }
    }, 1000);
  },
};

function updateClockFace({ days, hours, minutes, seconds }) {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.minutes.textContent = `${minutes}`;
  refs.seconds.textContent = `${seconds}`;
}



 function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}