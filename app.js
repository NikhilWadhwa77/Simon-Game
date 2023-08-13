var buttonColors = ["red","blue","green","yellow"];

var gamePattern = [];

var userGivenPattern = [];

var level = 0;

var started = false;

// $(document).keypress(function(){
//     if(!started){
//         nextSequence();
//         started = true;
//     }
// })

function gameStart(){
    if(!started){
        nextSequence();
        started = true;
    }
}

$(".btn").click(function(){
    userGivenPattern.push(this.id);

    playSound(this.id);
    animatePress(this.id);

    // console.log(userGivenPattern);

    checkAnswer(userGivenPattern.length - 1);
})

function checkAnswer(index){
    if(userGivenPattern[index] === gamePattern[index]){
        // console.log("Success");
        if(userGivenPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }else{
        playSound("wrong");
        $("#level-title").text("Game over, your level is "+level+" ,refresh to start again");
        startOver();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200)
        // console.log("wrong");
    }
}


function nextSequence(){

    userGivenPattern = [];

    level++;
    $("#level-title").text("level "+ level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    // console.log(gamePattern);

    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}


function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}

function playSound(name){
    var audioPath = "sounds/"+name+".mp3";
    var colorSound = new Audio(audioPath);
    colorSound.play();
}

function startOver(){
    gamePattern = [];
    started = false;
    level = 0;
}

