var userClickedPattern = []
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var started = false;
var level = 0;


$(document).keypress(function(e) {
    if(e.key == "a" && !started) {
      $("h1").text("LEVEL " + level);
      nextSequence();
      started = true;
    }
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      console.log("success")
      if (gamePattern.length === userClickedPattern.length) {
        setTimeout(function(){
          nextSequence();
        }, 1000)
      } else {

      }
    } else {
      $("body").addClass("game-over")
      setTimeout(function(){
        $("body").removeClass("game-over")
      }, 200);
      var audio = new Audio("sounds/wrong.mp3");
      audio.play();
      $("h1").text("GAME OVER, Press A key to restart");
      startOver();
    }
}

$("button").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
})

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100)
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").text("LEVEL " + level);
  var randomNumber = Math.round(Math.random() * 3);
  var randomChosenColor = buttonColours[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);

}

function startOver() {
  started = false;
  gamePattern = [];
  level = 0;
}
