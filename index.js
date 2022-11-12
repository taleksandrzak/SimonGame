let gameStatus = true; // varible for starting the game
let colorArray = ["green", "red", "yellow", "blue"];
let gamePattern = [];
let userPattern = [];
let blueSound = new Audio("blue.wav");
let greenSound = new Audio("green.wav");
let redSound = new Audio("red.wav");
let yellowSound = new Audio("yellow.wav");
let gameLevel = 0;
let j = -1;

// start the game after pressing any key
$(document).keypress(function () {
  if (gameStatus) {
    $("#heading").text("Select the approprite buttons");
    $("#footer").text("Level " + gameLevel);
    gameStatus = false;
    let levelColor = takeRandomColor();
    gamePattern.push(levelColor);
    setTimeout(function () {
      buttonFlash(levelColor);
      playSound(levelColor);
    }, 500);
  }
});

$(".btnn").click(function (event) {
  if (!gameStatus) {
    // check that game have started
    j++;
    let clickColor = event.target.id;
    userPattern.push(clickColor);
    buttonFlash(clickColor);
    playSound(clickColor);

    if (gamePattern[j] == userPattern[j]) {
    } else {
      userPattern = [];
      gamePattern = [];
      gameLevel = 0;
      gameStatus = true;
      j = -1;
      $("#heading").text("Game over! Press any key to start again");
      $(document).keypress(function () {
        if (gameStatus) {
          $("#heading").text("Select the approprite buttons");
          $("#footer").text("Level " + gameLevel);
          gameStatus = false;
          let levelColor = takeRandomColor();
          gamePattern.push(levelColor);
          setTimeout(function () {
            buttonFlash(levelColor);
            playSound(levelColor);
          }, 1000);
        }
      });
    }

    if (j === gameLevel) {
      setTimeout(nextLevel, 1000);
      userPattern = [];
      j = -1;
    }
  }
});

// function for drawing a random color
function takeRandomColor() {
  return colorArray[Math.floor(Math.random() * 4)];
}

// function for button flasing
function buttonFlash(color) {
  $("#" + color)
    .fadeOut(200)
    .fadeIn(200);
}

function playSound(color) {
  eval(color + "Sound").play();
}

function nextLevel() {
  let levelColor = takeRandomColor();
  gamePattern.push(levelColor);
  buttonFlash(levelColor);
  playSound(levelColor);
  gameLevel++;
  $("#footer").text("Level " + gameLevel);
}
