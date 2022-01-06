canvas = document.getElementById("canvas");
const intro = document.getElementById("intro");
let ctx = null;
const startButton = document.getElementById("start");
const canvasCursor = document.getElementById("no-cursor");
const restartBtn = document.querySelector(".btnTwo");
const pauseBtn = document.querySelector(".btnOne");
startButton.addEventListener("click", function () {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth * 0.8;
  canvas.height = window.innerHeight * 0.8;
  intro.style.display = "none";
  canvas.style.display = "block";
  restartBtn.style.display = "inline";
  pauseBtn.style.display = "inline";

  setTimeout(() => {
    animate();
  }, 1000);

  canvasCursor.style.cursor = "none";
  mainthemeSound();
  InitialStars();
  gameStatus = true;
});

let frames = 0;
let astroidsArr = [];
let beamArr = [];
let starsArr = [];

const image = new Image(30, 30);
image.src = "images/spaceShip.png";
const beamImage = new Image();
beamImage.src = "images/bullet2.png";
const asteroid = new Image();
asteroid.src = "images/asteroid1.png";
const mainSound = new Audio();
mainSound.src = "./sounds/space.mp3";
const gameOverSound = new Audio();
gameOverSound.src = "./sounds/gameover.mp3";
const winSoundEffect = new Audio();
winSoundEffect.src = "./sounds/winner.mp3";
winSoundEffect.loop = true;

let lives = 5;
let collision = false;
const explosionSound = null;

let stopId = null;
let minInterval = 30;
let maxInterval = 50;
let score = 0;

let gameStatus = null;

// function resets the game

restartBtn.addEventListener("click", function (e) {
  winSoundEffect.pause();
  console.log("restart");
  stopAnimation();
  clearArea();
  lives = 3;
  startAnimation();
  mainSound.play();
  astroidsArr = [];
  beamArr = [];
  score = 0;
  minInterval = 30;
  maxInterval = 50;
  gameStatus = true;
  pauseBtn.innerHTML = "Pause";
});

// function enables the game to be paused

pauseBtn.addEventListener("click", function (e) {
  if (gameStatus) {
    if (pauseBtn.innerHTML === "Pause") {
      pauseBtn.innerHTML = "Start";
      stopAnimation();
      console.log("Pause");
      mainSound.pause();
    } else if (pauseBtn.innerHTML === "Start") {
      pauseBtn.innerHTML = "Pause";
      startAnimation();
      console.log("Start");
      mainSound.play();
    }
  }
});

// game over function

function WinGame() {
  ctx.font = "100px Arial";
  ctx.fillStyle = "white";
  ctx.textStyle = "center";
  ctx.fillText("Well done", window.innerWidth / 3.9, window.innerHeight / 2.5);
  ctx.fillText("You Win!", window.innerWidth / 3.7, window.innerHeight / 2);
  mainSound.pause();
  winSoundEffect.play();

  gameStatus = false;
  window.addEventListener("resize", function () {
    ctx.font = "100px Arial";
    ctx.fillStyle = "white";
    ctx.textStyle = "center";
    ctx.fillText(
      "Well done Commander!",
      window.innerWidth / 4,
      window.innerHeight / 2.5
    );
    ctx.fillText("You Win!", window.innerWidth / 3.7, window.innerHeight / 2);
  });
}

// game over function

function gameOver() {
  ctx.font = "100px Arial";
  ctx.fillStyle = "white";
  ctx.textStyle = "center";
  ctx.fillText("Game Over", window.innerWidth / 4, window.innerHeight / 2.5);
  ctx.fillText("You Lose!", window.innerWidth / 3.7, window.innerHeight / 2);
  mainSound.pause();

  setTimeout(() => {
    gameOverSound.play();
  }, 1000);

  gameStatus = false;
  window.addEventListener("resize", function () {
    ctx.font = "100px Arial";
    ctx.fillStyle = "white";
    ctx.textStyle = "center";
    ctx.fillText("Game Over", window.innerWidth / 4, window.innerHeight / 2.5);
    ctx.fillText("You Lose!",window.innerWidth / 3.7,window.innerHeight / 2);
  });
}

// function draws the score and number of lives on the canvas

function scoreLives() {
  ctx.font = "30px Arial";
  ctx.fillStyle = "white";
  ctx.textStyle = "center";
  ctx.fillText("Score: " + score, 50, 50);

  ctx.font = "30px Arial";
  ctx.fillStyle = "white";
  ctx.textStyle = "center";
  ctx.fillText("Lives: " + lives, 400, 50);

  ctx.beginPath();
  ctx.strokeStyle = "white";
  ctx.lineWidth = 3;
  ctx.rect(25, 15, 600, 50);
  ctx.stroke();
}

// increase difficulty

function increasedifficulty() {
  if (frames % 600 === 0) {
    if (minInterval === 0) {
      minInterval = 0;
      maxInterval = 20;
    } else {
      minInterval -= 3;
      maxInterval -= 3;
    }
  }
}

// start animation

function startAnimation() {
  stopId = requestAnimationFrame(animate);
}

// stop animation

function stopAnimation() {
  cancelAnimationFrame(stopId);
}

// main sound

function mainthemeSound() {
  mainSound.play();
  mainSound.loop = true;
  mainSound.volume = 0.3;
}

// shooting sound

function ShootingSound() {
  const shootingSound = new Audio();
  shootingSound.src = "./sounds/Fire.mp3";
  shootingSound.play();
  shootingSound.volume = 0.5;
}

// explosion sound

function explosion() {
  const explosionSound = new Audio();
  explosionSound.src = "./sounds/explosion.mp3";
  explosionSound.play();
}

// function sets back the collision back to false

function detectCollisions() {
  astroidsArr.forEach((element, index, arr) => {
    if (element.collision === true) {
      astroidsArr.splice(index, 1);
    }
  });
}

// function counts lives

function countingLives() {
  if (collision === true) {
    lives -= 1;
    collision = false;
  }
}

// function stops the game when no lives are left

function noLivesLeft() {
  if (lives === 0) {
    stopAnimation();
    setTimeout(() => {
      clearArea();
    }, 1000);
    setTimeout(() => {
      gameOver();
    }, 1500);
  }
}

// function executes when player wins

function winner() {
  if (score > 1000) {
    stopAnimation();
    setTimeout(() => {
      clearArea();
    }, 1000);
    setTimeout(() => {
      WinGame();
    }, 1500);
  }
}

// function to draw the image on the canvas

function imageLoad() {
  ctx.drawImage(image, mouseX - 35, mouseY - 35, 70, 70);
}

// function loads beams from spaceship

function beamloader() {
  beamArr.forEach((element) => {
    ctx.drawImage(beamImage, element.x - 65, element.y - 45);
  });
}

// eventlistener resizes the canvas based on the size of the window

window.addEventListener("resize", function () {
  if (canvas) {
    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight * 0.8;

    starsArr = [];
    InitialStars();
  }
});

// function corrects the mouse coordinates on the canvas substracting the x and y space between the window and the canvas

function getMousePos(canvas, evt) {
  if (canvas) {
    let rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top,
    };
  }
}

// funtion generates random numbers between two intervals

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// generate asteroids function

function generateAsteroids() {
  let radius = randomIntFromInterval(20, 35);
  let x = canvas.width - radius;
  let y = randomIntFromInterval(radius, canvas.height - radius);
  let velocityX = randomIntFromInterval(1, 6);
  let velocityY = randomIntFromInterval(-2, 2);
  astroidsArr.push(new Astroids(x, y, radius, velocityX, velocityY));
}

// function uses the stars class to generate star and pushes it into an array

function setStars(start) {
  const radius = randomIntFromInterval(1, 3);
  const x = start
    ? randomIntFromInterval(radius, canvas.width - radius)
    : canvas.width - radius;
  const y = randomIntFromInterval(radius, canvas.height - radius);
  const velocityX = randomIntFromInterval(0, 3);
  const velocityY = randomIntFromInterval(0, 1);

  starsArr.push(new Stars(x, y, radius, velocityX, velocityY));
}

// function create the initial stars on the canvas

function InitialStars() {
  for (let index = 0; index < 100; index++) {
    setStars(true);
  }
}

// generate stars function

function generateStars() {
  setStars(false);
}

// function to clear the canvas which is called within the animate function

function clearArea() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function setMouseCanvas(axis, size) {
  // (getMousePos(canvas, event).x) > canvas.width ? canvas.width : (getMousePos(canvas, event).x) < 0 ? 0 : getMousePos(canvas, event).x;

  if (axis > size) {
    return size;
  }
  if (axis < 0) {
    return 0;
  }
  return axis;
}

// eventlistener for the x and y mouse position correction
window.addEventListener("mousemove", function (event) {
  // if(canvas){
  //     mouseX = (getMousePos(canvas, event).x) > canvas.width ? canvas.width : (getMousePos(canvas, event).x) < 0 ? 0 : getMousePos(canvas, event).x;
  //     mouseY = (getMousePos(canvas, event).y) > canvas.height? canvas.height : (getMousePos(canvas, event).y) < 0 ? 0 : getMousePos(canvas, event).y;
  // }
  if (canvas) {
    mouseX = setMouseCanvas(getMousePos(canvas, event).x, canvas.width);
    mouseY = setMouseCanvas(getMousePos(canvas, event).y, canvas.height);
  }
});

// function plays sound when laser beam is shot

canvas.addEventListener("click", function (event) {
  if (canvas && gameStatus) {
    beamArr.push(new Beam(mouseX, mouseY, 10));
    ShootingSound();
  }
});

// circle below the spaceship image to use for the object collision detection

function spaceShip(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, 30, 0, Math.PI * 2, false);
  ctx.strokeStyle = "black";
  ctx.stroke();
}

// function to remove asteroids objects from the array when they leave the canvas

function clearObject() {
  astroidsArr.forEach((element, index, arr) => {
    if (element.x < 0) {
      astroidsArr.splice(index, 1);
    }
  });
}

// function to remove stars objects from the array when they leave the canvas

function clearStars() {
  starsArr.forEach((element, index, arr) => {
    if (element.x < 0) {
      starsArr.splice(index, 1);
    }
  });
}

// function to remove beam objects from the array when they leave the canvas

function clearBeams() {
  beamArr.forEach((element, index, arr) => {
    if (element.x > canvas.width) {
      astroidsArr.splice(index, 1);
    }
  });
}

// animate function that draws everything on the canvas

function animate() {
  clearArea();
  startAnimation();
  frames += 1;

  const rangeFrames = randomIntFromInterval(minInterval, maxInterval);
  if (frames % rangeFrames === 0) {
    generateAsteroids();
  }

  if (frames % rangeFrames === 0) {
    generateStars();
  }

  clearObject();
  for (let i = 0; i < astroidsArr.length; i++) {
    astroidsArr[i].update();
    astroidsArr[i].crashWith(mouseX, mouseY);
  }

  for (let i = 0; i < beamArr.length; i++) {
    beamArr[i].draw();
    beamArr[i].crashWith();
  }

  clearStars();
  for (let i = 0; i < starsArr.length; i++) {
    starsArr[i].draw();
  }

  detectCollisions();
  countingLives();
  spaceShip(mouseX, mouseY);
  imageLoad();
  beamloader();
  noLivesLeft();
  increasedifficulty();
  winner();
  scoreLives();
}

let mouseX = null;
let mouseY = null;
