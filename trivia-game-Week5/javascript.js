//europe trivia game
        

$(document).ready(function () {

    function validateField() { 
        var docs = document.getElementById("img");
        docs.setAttribute("src", "gif_path");
        };


    function initialScreen() {
        startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Click Here To Start</a></p>";
        $(".mainDiv").html(startScreen);
    }

    initialScreen();


    $("body").on("click", ".start-button", function (event) {
        event.preventDefault();  // added line to test scrolling issue
        clickSound.play();
        generateHTML();
        timerWrapper();

    });


    $("body").on("click", ".answer", function (event) {

        // clickSound.play();    
        selectedAnswer = $(this).text();
        if (selectedAnswer === correctAnswers[questionCounter]) {
            clearInterval(theClock);
            generateWin();
            //correct answer
        }
        else {
            //wrong answer
            clearInterval(theClock);
            generateLoss();
            //wrong answer
        }
    });

    $("body").on("click", ".reset-button", function (event) {
        clickSound.play();
        resetGame();
    });

});

function userLossTimeOut() {
    unansweredTally++;
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Time's Up!  The country was: " + correctAnswers[questionCounter] + "</p>" + losingImages[questionCounter];
    $(".mainDiv").html(gameHTML);
    setTimeout(wait, 4000); 
}

function generateWin() {
    correctTally++;
    gameHTML = "<p class='text-center timer-p'>With <span class='timer'>" + counter + " seconds to spare!</span></p>" + "<p class='text-center'>You're correct! The country is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
    $(".mainDiv").html(gameHTML);
    setTimeout(wait, 4000); 
}

function generateLoss() {
    incorrectTally++;
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>No, the correct answer was: " + correctAnswers[questionCounter] + "</p>" + losingImages[questionCounter];
    $(".mainDiv").html(gameHTML);
    setTimeout(wait, 4000); 
}

function generateHTML() {
    gameHTML = "<p class='text-center timer-p'>Countdown: <span class='timer'>20</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. " + answerArray[questionCounter][1] + "</p><p class='answer'>C. " + answerArray[questionCounter][2] + "</p><p class='answer'>D. " + answerArray[questionCounter][3] + "</p>";
    $(".mainDiv").html(gameHTML);
}

function wait() {
    if (questionCounter < 7) {
        questionCounter++;
        generateHTML();
        counter = 20;
        timerWrapper();
    }
    else {
        finalScreen();
    }
}

function timerWrapper() {
    theClock = setInterval(twentySeconds, 1000);
    function twentySeconds() {
        if (counter === 0) {
            clearInterval(theClock);
            userLossTimeOut();
        }
        if (counter > 0) {
            counter--;
        }
        $(".timer").html(counter);
    }
}

// function finalScreen() {
//     gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Game Over! How'd you do?" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Play Again!</a></p>";
//     $(".mainDiv").html(gameHTML);
// }

function finalScreen() {

    if (correctTally === 8) {
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>100%! You got a perfect score!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Can You Do It Again?</a></p>";
        $(".mainDiv").html(gameHTML);
    }
    else if (correctTally < 8 && correctTally > 4) {
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Game Over! You did great!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Play Again</a></p>";
        $(".mainDiv").html(gameHTML);
    }

    else if (correctTally === 4) {
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Game Over! You scored 50%." + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Play Again</a></p>";
        $(".mainDiv").html(gameHTML);
    }
    else if (correctTally < 4 && correctTally != 0) {
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Game Over! You need to stay in school." + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Try Again</a></p>";
        $(".mainDiv").html(gameHTML);
    }
    else { //correct tally is zero
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Game Over! You are horrible at this." + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Try Again</a></p>";
        $(".mainDiv").html(gameHTML);
    }
}

function resetGame() {
    questionCounter = 0;
    correctTally = 0;
    incorrectTally = 0;
    unansweredTally = 0;
    counter = 20;
    generateHTML();
    timerWrapper();
}

var startScreen;
var gameHTML;
var counter = 20;
var questionArray = ["<img src='euruk1.png'></img>", "<img src='eurFrance1.png'></img>", "<img src='eurSpain1.png'></img>", "<img src='eurukraine1.png'></img>", "<img src='eurItaly1.png'></img>", "<img src='eurSweeden1.png'></img>", "<img src='eurBulgaria1.png'></img>", "<img src='eurGermany1.png'></img>"];
var answerArray = [["United Kingdom", "Iceland", "Greenland", "Ireland"], ["Germany", "France", "Poland", "Denmark"], ["Portugal", "Italy", "Spain", "Turkey"], ["Russia", "Croatia", "Ukraine", "Czech Republic"], ["Hungary", "Switzerland", "Andorra", "Italy"], ["Sweeden", "Norway", "Finland", "Greece"], ["Cyprus", "Bulgaria", "Austria", "Romania"], ["France", "Netherlands", "Spain", "Germany"]];
var imageArray = ["<img class='center-block img-right' src='ukimage1.png'>", "<img class='center-block img-right' src='franceimage1.png'>", "<img class='center-block img-right' src='spainimage1.png'>", "<img class='center-block img-right' src='ukraineimage1.png'>", "<img class='center-block img-right' src='italyimage1.png'>", "<img class='center-block img-right' src='sweeden1.png'>", "<img class='center-block img-right' src='bulgariaimage1.png'>", "<img class='center-block img-right' src='germanyimage1.png'>"];
var losingImages = ["<img class='center-block img-right' src='wrongukimage1.png'>", "<img class='center-block img-right' src='wrongfranceimage1.png'>", "<img class='center-block img-right' src='wrongspainimage1.png'>", "<img class='center-block img-right' src='wrongukraineimage1.png'>", "<img class='center-block img-right' src='wrongitalyimage1.png'>", "<img class='center-block img-right' src='wrongsweeden1.png'>", "<img class='center-block img-right' src='wrongbulgariaimage1.png'>", "<img class='center-block img-right' src='wronggermanyimage1.png'>"];
var correctAnswers = ["A. United Kingdom", "B. France", "C. Spain", "C. Ukraine", "D. Italy", "A. Sweeden", "B. Bulgaria", "D. Germany"];
var questionCounter = 0;
var selecterAnswer;
var theClock;
var correctTally = 0;
var incorrectTally = 0;
var unansweredTally = 0;
var clickSound = new Audio("BuildThatWallRMX2.mp3");
