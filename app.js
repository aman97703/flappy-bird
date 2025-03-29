let board;
const boardHeight = 640;
const boardWidth = 360;
let context;
let isGameOver = false;
let score = 0;

const birdWidth = 34;
const birdHeight = 24;
let birdImage;

let birdX = boardWidth / 8;
let birdY = boardHeight / 2;

let bird = {
  x: birdX,
  y: birdY,
  width: birdWidth,
  height: birdHeight,
};

// pipe
let pipeArray = [];
const pipeWidth = 64;
const pipeHeight = 512;
let pipeX = boardWidth;
let pipeY = 0;
let topPipeImage;
let bottomPipeImage;

// physics
let velocityX = -2;
let velocityY = 0;
let gravity = 0.25;

window.onload = function () {
  board = document.getElementById("board");
  board.height = boardHeight;
  board.maxHeight = "100vh";
  board.width = boardWidth;
  context = board.getContext("2d");

  // bird image
  birdImage = new Image();
  birdImage.src = "./assets/flappybird.gif ";
  birdImage.onload = function () {
    context.drawImage(birdImage, bird.x, bird.y, bird.width, bird.height);
  };

  // pipe images
  topPipeImage = new Image();
  bottomPipeImage = new Image();
  topPipeImage.src = "./assets/toppipe.png";
  bottomPipeImage.src = "./assets/bottompipe.png";

  // animating
  requestAnimationFrame(update);
  setInterval(placePipes, 1500);

  document.addEventListener("keypress", (event) => {
    if (event.code === "Space") {
      velocityY = -5;
      if (isGameOver) {
        bird.y = birdY;
        pipeArray = [];
        score = 0;
        isGameOver = false;
        requestAnimationFrame(update);
      }
    }
  });
  document.addEventListener("mousedown", (event) => {
    if (event.button === 0) {
      velocityY = -5;
    }
  });
};

function update() {
  if (isGameOver) {
    return;
  }
  requestAnimationFrame(update);
  context.clearRect(0, 0, board.width, board.height);
  context.drawImage(birdImage, bird.x, bird.y, bird.width, bird.height);

  velocityY += gravity;
  bird.y = Math.max(velocityY + bird.y, 0);

  if (bird.y >= board.height) {
    isGameOver = true;
  }

  // pipes
  for (let i = 0; i < pipeArray.length; i++) {
    let pipe = pipeArray[i];
    pipe.x += velocityX;
    context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

    if (!pipe.passed && pipe.x + pipe.width < bird.x) {
      score += 0.5;
      pipe.passed = true;
    }

    if (detectCollision(bird, pipe)) {
      isGameOver = true;
    }
  }

  //   clear pipes
  while (pipeArray.length > 0 && pipeArray[0].x + pipeWidth < 0) {
    pipeArray.shift();
  }

  //   score
  context.fillStyle = "white";
  context.font = "50px Arial";
  context.fillText(score, 10, 50);

  //   game over
  if (isGameOver) {
    // Game Over background overlay
    context.fillStyle = "rgba(0, 0, 0, 0.5)";
    context.fillRect(0, 0, board.width, board.height);

    // Fancy game over text
    context.fillStyle = `rgb(255, 0, 0)`; // Red color with fading opacity
    context.font = `bold ${50}px "Arial"`;
    context.textAlign = "center";
    context.textBaseline = "middle";
    // context.shadowColor = "yell  ow"; // Text shadow effect
    context.shadowBlur = 10;
    context.fillText("GAME OVER", board.width / 2, board.height / 2);  
  }
}

function placePipes() {
  if (isGameOver) {
    return;
  }
  const randomPipeY = pipeY - pipeHeight / 4 - Math.random() * (pipeHeight / 2);
  const openingSpace = board.height / 4;
  const topPipeObj = {
    img: topPipeImage,
    x: pipeX,
    y: randomPipeY,
    width: pipeWidth,
    height: pipeHeight,
    passed: false,
  };
  const bottomPipeObj = {
    img: bottomPipeImage,
    x: pipeX,
    y: randomPipeY + pipeHeight + openingSpace,
    width: pipeWidth,
    height: pipeHeight,
    passed: false,
  };

  pipeArray.push(topPipeObj);
  pipeArray.push(bottomPipeObj);
}

function detectCollision(bird, pipe) {
  // Check horizontal overlap (X-axis)
  const horizontalOverlap =
    bird.x + bird.width > pipe.x && bird.x < pipe.x + pipe.width;

  // Check vertical overlap (Y-axis)
  const verticalOverlap =
    bird.y + bird.height > pipe.y && bird.y < pipe.y + pipe.height;

  // If both horizontal and vertical ranges overlap, there's a collision
  return horizontalOverlap && verticalOverlap;
}
