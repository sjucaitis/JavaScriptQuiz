const startButton = document.getElementById("start-btn")
const quizQuestion = document.getElementById("quizQuestion")
var timer = document.getElementById("timer")
var timeLeft = 75
 
//add EventListener to start button to start timed quiz (SFJ)
startButton.addEventListener ("click", startGame)

function startGame() {
  console.log("started") //test to ensure quiz starts on click
  startButton.classList.add('hide') // hides start button on click
  quizQuestion.classList.remove("hide") // shows quiz Question on start
  timer.classList.remove("hide")

    // starts 75 second quiz timer
  timerInterval = setInterval(function() {
    timeLeft--;
    timer.textContent = "Time remaining: " + timeLeft;
    if(timeLeft === 0) {
    clearInterval(timerInterval);
    }
    }, 1000);
    }



