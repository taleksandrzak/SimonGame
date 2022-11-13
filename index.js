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
    buttonFlash(levelColor);
  }
});

$(".btnn").click(function (event) {
  if (!gameStatus) {
    // check that game have started
    j++;
    let clickColor = event.target.id;
    userPattern.push(clickColor);
    buttonFlashQuick(clickColor);

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
          buttonFlash(levelColor);
        }
      });
    }

    if (j === gameLevel) {
      userPattern = [];
      j = -1;
      nextLevel();
    }
  }
});

// function for drawing a random color
function takeRandomColor() {
  return colorArray[Math.floor(Math.random() * 4)];
}

// function for button flasing
function buttonFlash(color) {
  setTimeout(function () {
    $("#" + color)
      .fadeOut(200)
      .fadeIn(200);
    eval(color + "Sound").play();
  }, 1000);
}

function nextLevel() {
  let levelColor = takeRandomColor();
  gamePattern.push(levelColor);
  buttonFlash(levelColor);
  gameLevel++;
  $("#footer").text("Level " + gameLevel);
}

function buttonFlashQuick(color) {
  $("#" + color)
    .fadeOut(100)
    .fadeIn(100);
  eval(color + "Sound").play();
}
