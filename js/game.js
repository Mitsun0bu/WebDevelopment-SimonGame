// ============================== //
//      VARIABLE DECLARATION      //
// ============================== //

var buttonColours      = ["red", "blue", "green", "yellow"];
var gamePattern        = [];
var userClickedPattern = [];
var gameStarted        = "false";
var level              = 0;

// ============== //
//      MAIN      //
// ============== //

$(document).keydown(startGame);

$(".btn").click(handler);

// ======================== //
//      SEQUENCE LOGIC      //
// ======================== //

function startGame()
{
    if (gameStarted == "false")
    {
        gameStarted = "true";
        nextSequence();
    }
}

function nextSequence()
{
    var randomNumber      = Math.floor((Math.random() * 4) + 0);
    var randomChosenColor = buttonColours[randomNumber];
    
    $("h1").text("Level "+ level);
    userClickedPattern = [];

    gamePattern.push(randomChosenColor);
    
    makeButtonFlash(randomChosenColor);
    makeButtonSound(randomChosenColor);

    level ++;
}

function startOver()
{
    gamePattern = [];
    gameStarted = "false";
    level       = 0;
}

// ==================== //
//      USER LOGIC      //
// ==================== //

function handler()
{
    var userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour); 

    makeButtonSound(userChosenColour);
    animatePress(userChosenColour);

    var currentLevel = userClickedPattern.length - 1;
    checkAnswer(currentLevel);
}

function checkAnswer(currentLevel)
{
    if (userClickedPattern[currentLevel] == gamePattern[currentLevel])
    {
        console.log("success");
        if (userClickedPattern.length == gamePattern.length)
        {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else
    {
        makeButtonSound("wrong");
        gameOverAnimation();
        startOver();
    }
}

// =============== //
//      UTILS      //
// =============== //

function makeButtonFlash(randomChosenColor)
{
    var buttonId = "#" + randomChosenColor;
    $(buttonId).fadeIn(100).fadeOut(100).fadeIn(100);
}

function makeButtonSound(randomChosenColor)
{
    var soundPath = "../sounds/" + randomChosenColor + ".mp3";
    var audio     = new Audio(soundPath);

    audio.play();
}

function animatePress(currentColor)
{
    var buttonId = "#" + currentColor;

    $(buttonId).addClass("pressed");
    setTimeout(function() {
        $(buttonId).removeClass("pressed");
      }, 100);
}

function gameOverAnimation()
{
    $("body").addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over");
        }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
}