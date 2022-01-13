//a-wbz генерации цвета
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
const refs = {
  body: document.querySelector('body'),
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};
//вешаем слушателя на кнопки
refs.startBtn.addEventListener('click', startHandler);
refs.stopBtn.addEventListener('click', stopHandler);

// задаем время интервалу 
let intervalId = null;
const IntervalDelay = 1000;

//фц-ия изменения цвета фона
function changeColor() {
  let color = getRandomHexColor();
  refs.body.style.backgroundColor = color;
}

// активация смены цвета
function startHandler() {
  refs.startBtn.disabled = true;
  intervalId = setInterval(changeColor, IntervalDelay);
}

// стоп смена цвета 
function stopHandler() {
  clearInterval(intervalId);
  refs.startBtn.disabled = false;
}

