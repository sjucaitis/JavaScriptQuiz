var start = document.getElementById("start")
const startButton = document.getElementById("start-btn")
const quizQuestionContainer = document.getElementById("quizQuestionContainer")
var timer = document.getElementById("timer")
var timeLeft = 75
var question = document.getElementById("question")
var answerA = document.getElementById("answerA")
var answerB = document.getElementById("answerB")
var answerC = document.getElementById("answerC")
var answerD = document.getElementById("answerD")
var answers = document.getElementById("answers")
var yourScore = document.getElementById("yourScore")
var submitScore = document.getElementById("submitScore")
var initials = document.getElementById("initials")
var endQuiz = document.getElementById("endQuiz")
var highscores = document.getElementById("highscores")

//add EventListener to start button to start timed quiz (SFJ)
startButton.addEventListener ("click", startGame)

var myQuestions = [
  {question: "What characters mark the beginning of a single line comment in JavaScript?",
    answers: {
      a: "/*",
      b: "**",
      c: "//",
      d: "{{"
    },
    correctAnswer: "c"
  },
  {question: "What is string interpolation?",
    answers: {
      a: "Using template literals to embed variables into strings.",
      b: "Changing the value of a variable.",
      c: "Printing a string to the console.",
      d: "Joining multiple strings together using operators like +"
    },
    correctAnswer: "a"
  },
  {question: "What are variables used for in JavaScript?",
    answers: {
      a: "For changing a value's data type.",
      b: "For storing or holding data.",
      c: "For changing language settings.",
      d: "For creating mass confusion."
    },
    correctAnswer: "b"
  },
  {question: "What is string concatenation?",
    answers: {
      a: "What you change a variable's value.",
      b: "When you assign a string to a variable.",
      c: "When you print a string to the console.",
      d: "When you join strings together."
    },
    correctAnswer: "d"
  },
  {question: "What is the general purpose of a conditional statement?",
    answers: {
      a: "To evaluate code as either true or false",
      b: "To make all computers capable of thought.",
      c: "To answer binary questions.",
      d: "To prevaricate."
    },
    correctAnswer: "a"
  },
  {question: "What are functions in JavaScript used for?",
    answers: {
      a: "They allow for the use of mathematical operators.",
      b: "They store data.",
      c: "They provide reusable code that can accept and perform a task.",
      d: "They serve as conjunction functions."
    },
    correctAnswer: "c"
  },
  {question: "What is the purpose of a parameter?",
    answers: {
      a: "To specify actual values passed to a function.",
      b: "To allow a function to accept data.",
      c: "To call a function.",
      d: "Nobody really knows."
    },
    correctAnswer: "c"
  },
];

var finalQuestion = myQuestions.length;
var questionIndex = 0;
var score = 0;

function startGame() {
  console.log("started") //test to ensure quiz starts on click
  start.classList.add('hide') // hides start button on click
  quizQuestionContainer.classList.remove("hide") // shows quiz Question on start
  timer.classList.remove("hide")
    // starts 75 second quiz timer and shows score upon expiration of tinme
  timerInterval = setInterval(function() {
      timeLeft--;
      timer.textContent = "Time remaining: " + timeLeft;
      if(timeLeft === 0) {
       clearInterval(timerInterval);
       displayScore();
        }
       }, 1000);
  // calls quiz Question function to display Question
  displayQuestion()
  };

  // function to display question (will execute in startGame function)
function displayQuestion () {
 //displays score after user answers final question
  if (questionIndex === finalQuestion){
    return displayScore();
} 
  var currentQuestion = myQuestions[questionIndex];
  question.innerHTML = "<p>" + currentQuestion.question + "</p>";
  answerA.innerHTML = myQuestions[questionIndex].answers.a;
  answerB.innerHTML = myQuestions[questionIndex].answers.b;
  answerC.innerHTML = myQuestions[questionIndex].answers.c;
  answerD.innerHTML = myQuestions[questionIndex].answers.d;
  };

  //function to check Answer on answer button click

  function checkAnswer(answer){
    correct = myQuestions[questionIndex].correctAnswer;

    //on correct answer for question that is not final question, takes user to next question
    if (answer === correct && questionIndex !== finalQuestion){
        score++;
        questionIndex++;
        displayQuestion();
    
  // on incorrect answer that is not final question, removes 5 seconds from timer        
    }else if (answer !== correct && questionIndex !== finalQuestion){
        questionIndex++;
        displayQuestion();
        timeLeft -=5; // takes 5 seconds off of timer for incorrect answer
       
    // after last question, displays the user's score
    }else{
        displayScore();
    }
}
 //function to display score
function displayScore(){
  clearInterval(timerInterval); // timer clears
  quizQuestionContainer.classList.add("hide"); // hides question container
  timer.classList.add("hide"); // hides timer
  endQuiz.classList.remove("hide"); // displays user score
  yourScore.innerHTML = "You got " + score + " out of " + myQuestions.length + " correct!"
}

var highscoreName = document.getElementById("highscoreInitials")
var highscoreDisplayScore = document.getElementById("highscoreScore")

//submits score on button
submitScore.addEventListener("click", function highscore(){
 //validation for intials
  if(initials.value === "") {
    alert("Must enter initials");
    return false;
} else{
// hides quiz end and displays high score list
  highscores.classList.remove("hide");
  endQuiz.classList.add("hide");
  var savedHighScores = JSON.parse(localStorage.getItem("savedHighScores")) || [];
    var currentUser = initials.value.trim();
    var currentHighScore = {
        name : currentUser,
        score : score
    };
// test debug score
    console.log(currentHighScore);
    savedHighScores.push(currentHighScore);
// sets local storage and calls generateScores function
    localStorage.setItem("savedHighScores", JSON.stringify(savedHighScores));
    generateScores();
}
});

// this function generates highsore list utilizing local storage
function generateScores(){
  highscoreName.innerHTML = "";
  highscoreScore.innerHTML = "";
  var highscores = JSON.parse(localStorage.getItem("savedHighScores")) || [];
  for (i=0; i<highscores.length; i++){
      var newNameSpan = document.createElement("li");
      var newScoreSpan = document.createElement("li");
      newNameSpan.textContent = highscores[i].name;
      newScoreSpan.textContent = highscores[i].score;
      highscoreName.appendChild(newNameSpan);
      highscoreScore.appendChild(newScoreSpan);
  }
}