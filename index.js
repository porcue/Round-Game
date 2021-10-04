const screens = document.querySelectorAll('.screen');
const startBtn = document.querySelector('.start');
const timeList = document.querySelector('.time-list');
const board = document.querySelector('.board');
const time = document.querySelector('#time');
let colors = ['#FF18D0', '#D718FF', '#7E18FF', '#18EBFF'];
let count = 0;
let timeCount;

startBtn.addEventListener('click', (event) => {
event.preventDefault();
screens[0].classList.add('up');
})

timeList.addEventListener('click', (event) => {
if(event.target.classList.contains('time-btn')){
    screens[1].classList.add('up');
    timeCount = +(event.target.getAttribute('data-time'));
    timeDecrease();
}
})

const circle = document.createElement('div');
circle.classList.add('circle');
board.append(circle);
circle.style.width = '16px';
circle.style.height = '16px';


function getColor(elem) {
    let index = Math.floor(Math.random() * colors.length)
    elem.style.background = colors[index];
    elem.style.boxShadow = `-8px -8px 20px ${colors[index]}, 10px 7px 20px ${colors[index]}`
}

function getRandomPosition(elem, max, min) {
    const {width, height} = board.getBoundingClientRect();
    const size = max - min;
    elem.style.bottom = `${Math.round(Math.random() * (height - size))}px`;
    elem.style.right = `${Math.round(Math.random() * (width - size))}px`;
}


function getRandomCircle(elem, max, min) {
    let size = Math.round(Math.random() * (max - min) + min);
    elem.style.width = `${size}px`;
    elem.style.height = `${size}px`;
    getColor(elem);
    getRandomPosition(elem, max, min);
}

function createResult() {
    const title = document.createElement('h1');
    title.classList.add('primary');
    title.textContent = `Счет: ${count}`;
    board.append(title);
}

function timeDecrease() {
let timer = setInterval(() => {
    timeCount--;
    time.textContent = `00:${timeCount}`;
    if(timeCount < 10){
        time.textContent = `0:0${timeCount}`; 
    }
    if(timeCount == 0){
        clearInterval(timer);
        time.parentNode.classList.add('hide');
        circle.classList.add('hide');
        board.style.boxShadow = '-8px -8px 20px #c1c4c7, 10px 7px 20px #eff0f1'
        createResult();
    }
}, 1000);
}

board.addEventListener('click', (event) => {
    if(event.target.classList.contains('circle')){
        count++
    }
})

circle.addEventListener('click', () => {
    getRandomCircle(circle, 60, 10)
})

