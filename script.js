let nits = document.querySelector('#nits');
nits.style.position = "absolute";
nits.style.bottom = '140px';
nits.style.left = '150px';
nits.style.width = '60px';
nits.style.height = '85px';
nits.style.backgroundImage = "url('nits.png')";

let ut = document.querySelector('#ut');
ut.style.position = 'absolute';
ut.style.height = '29%';
ut.style.widtht = '100%';
ut.style.top = '70%';

const palya = document.querySelector('#palya');
palya.style.position = 'absolute';
palya.style.width = "100%";
palya.style.height = '91.5%';
palya.style.backgroundImage = "url('hatter.jpg')";

let position = 0;
let x = 0;
let y = 0;
let speed = 15;
let windowHeight = 255;
let isGameOver = false;
let score = 0;

let active = document.querySelector('.active');
active.style.textDecoration = "none";

let navbar = document.querySelector('.navbar');
navbar.style.listStyleType = "none";
navbar.style.overflow = "hidden";
navbar.style.fontSize = "20px";
navbar.style.backgroundColor = "ghostwhite";
navbar.style.height = "46px";
navbar.style.width = "450px";

document.getElementById('game-screen').style.display = 'none';
startscreen = document.getElementById('start-screen');
startscreen.style.display = 'block';

document.getElementById('start-button').addEventListener('click', () => {
  document.getElementById('game-screen').style.display = 'block';
  startscreen.style.display = 'none';

showSignImage();
showSaladImage();
});
startscreen.height = '825px';
startscreen.width = '100%';
gomb = document.getElementById('start-button');
gomb.style.left = '780px';
gomb.style.position = 'absolute';

document.addEventListener('keydown', (e) =>{
  if (e.keyCode === 38){
    if(y > 0){
      y -= speed;
      nits.style.top = y + "px";
    }
  }

  else if (e.keyCode === 40){
    if(y+165 < windowHeight){
      y += speed;
      nits.style.top = y + "px";
    }
  }
});
// Saláta
function getRandomTime(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function showSaladImage() {
  const saladImage = document.createElement('img');
  const imageContainer = document.getElementById('imageContainer');

  const imagePath = ['salad.png'];
  const randomImagePath = imagePath[Math.floor(Math.random() * imagePath.length)];

  saladImage.src = randomImagePath;
  saladImage.style.display = 'block';
  saladImage.style.position = 'absolute';
  saladImage.style.left = 1580 + 'px';
  var twonumber = [10,20,30,40,50,100,110,120];
  var onenumber = twonumber[Math.floor(Math.random() * twonumber.length)];
  saladImage.style.top = onenumber + 'px';

  const moveInterval = setInterval(() => {
    const nitsR = nits.getBoundingClientRect();
    const saladR = saladImage.getBoundingClientRect();
    const signR = signImage.getBoundingClientRect();
    if(saladR.left < signR.right &&
      saladR.top < signR.bottom &&
      saladR.bottom > signR.top){
      clearInterval(moveInterval);
      saladImage.style.display = 'none';
      }

    if (
      saladR.left < nitsR.right &&
      saladR.top < nitsR.bottom &&
      saladR.bottom > nitsR.top
    ) {
      clearInterval(moveInterval);
      saladImage.style.display = 'none';
      score += 1;
      result = document.getElementById('score');
      result.innerText = ('Pontszám: ')+score;
      result.style.float = 'right';
      result.style.fontSize = "22px";
      result2 = document.getElementById('result');
      result2.style.width = '120px';
    } else {
      saladImage.style.left = (parseFloat(saladImage.style.left) - 10) + 'px';
    }
  }, 50);

  setTimeout(() => {
    showSaladImage();
  }, getRandomTime(2000, 3500));

  imageContainer.appendChild(saladImage);
}
// Tábla
function getRandomTime2(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function showSignImage() {
  const signImage = document.createElement('img');
  const imageContainer2 = document.getElementById('imageContainer2');

  const imagePath = ['table.png'];
  const randomImagePath = imagePath[Math.floor(Math.random() * imagePath.length)];

  signImage.src = randomImagePath;
  signImage.style.display = 'block';
  signImage.style.position = 'absolute';
  signImage.style.left = 1474 + 'px';
  var twonumber = [-8, 95];
  var onenumber = twonumber[Math.floor(Math.random() * twonumber.length)];
  signImage.style.top = onenumber + 'px';

  const moveInterval = setInterval(() => {
    const nitsRect = nits.getBoundingClientRect();
    const signRect = signImage.getBoundingClientRect();

    if (
      signRect.left < nitsRect.right &&
      signRect.top < nitsRect.bottom &&
      signRect.bottom > nitsRect.top
    ) {
      clearInterval(moveInterval);
      signImage.style.display = 'none';
      endGame();
    } else if (signRect.right < 0) {
      clearInterval(moveInterval);
      signImage.style.display = 'none';
    } else {
      signImage.style.left = (parseFloat(signImage.style.left) - 10) + 'px';
    }
  }, 50);

  setTimeout(() => {
    showSignImage();
  }, getRandomTime(2700, 5500));

  imageContainer2.appendChild(signImage);
}  

function endGame() {
  isGameOver = true;
  showGameOverScreen();
  document.getElementById('imageContainer').innerHTML = '';
  document.getElementById('imageContainer2').innerHTML = '';

  document.getElementById('game-screen').style.display = 'none';
  document.getElementById('start-screen').style.display = 'block';
}

function showGameOverScreen() {
palya.innerHTML = '';

const gameOverScreen = document.createElement('div');
gameOverScreen.style.textAlign = 'center';
gameOverScreen.style.marginTop = '100px';
const gameOverText = document.createElement('h1');
const scoreText = document.createElement('p');
gameOverText.innerHTML = 'Játék vége!';
scoreText.innerHTML = 'Pontszám: '+score;
scoreText.style.fontSize = '25px';
gameOverScreen.appendChild(gameOverText);
gameOverScreen.appendChild(scoreText);
const restartButton = document.createElement('button');
restartButton.style.borderRadius = "10%";
restartButton.style.backgroundColor = 'red';
restartButton.style.fontSize = '20px';
restartButton.innerText = 'Újrakezdés';
restartButton.addEventListener('click', () => {
  restartGame();
});
gameOverScreen.appendChild(restartButton);
palya.appendChild(gameOverScreen);
}

function restartGame() {
window.location.reload()
}