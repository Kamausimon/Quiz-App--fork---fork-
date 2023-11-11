// Write your awesome JavaScript here!
const QuestionData = [
	{
		questionText: "Commonly used data types DO NOT include:",
		options: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
		answerIndex: 2,
	},
	{
		questionText: "Arrays in JavaScript can be used to store ______.",
		options: [
			"1. numbers and strings",
			"2. other arrays",
			"3. booleans",
			"4. all of the above",
		],
		answerIndex: 3,
	},
	{
		questionText:
			"String values must be enclosed within _____ when being assigned to variables.",
		options: [
			"1. commas",
			"2. curly brackets",
			"3. quotes",
			"4. parentheses",
		],
		answerIndex: 2,
	},
	{
		questionText:
			"A very useful tool used during development and debugging for printing content to the debugger is:",
		options: [
			"1. JavaScript",
			"2. terminal/bash",
			"3. for loops",
			"4. console.log",
		],
		answerIndex: 3,
	},
	{
		questionText:
			"Which of the following is a statement that can be used to terminate a loop, switch or label statement?",
		options: ["1. break", "2. stop", "3. halt", "4. exit"],
		answerIndex: 0,
	},
];



let nextButton = document.getElementById("next-button");
let questionElement = document.getElementById("question");
let answerContainer = document.getElementById("answer-container");
let timeElement = document.getElementById("timeElement");
let startQuizButton = document.getElementById("quizstart");
  
let currentQuestionIndex = 0; 
let score = 0;
let highScore = [];
let countdown;
let count = 11;

   
   function startQuiz(){
         currentQuestionIndex = 0;
		  score = 0;
		  nextButton.innerHTML = "next";
		   displayQuestion();
   }


function displayQuestion() {
	 resetState()
  let currentQuestion = QuestionData[currentQuestionIndex];
   let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.questionText;
     


	currentQuestion.options.map((option) => {
	     const button = document.createElement("button");
		 // let div = document.createElement("div");
		 button.innerHTML = option;
		  button.classList.add("btn");
		   answerContainer.appendChild(button);

		   let answerNo = currentQuestion.answerIndex;
		   if(answerNo === currentQuestion.answerIndex){
			  button.dataset.answerIndex  = currentQuestion.answerIndex;
		   }
			button.addEventListener("click", selectAnswer);
	})
};

function resetState(){
   nextButton.style.display = "none";
    while(answerContainer.firstChild){
		answerContainer.removeChild(answerContainer.firstChild)
	}
}

 function timeDisplay(){
         countdown = setInterval(() =>{
		  count--;
		  timeElement.innerHTML= `Time:${count}`
		  if(count==0){
		    clearInterval(countdown);
			 displayNext();
		  }
		 },1000)
	 }

	 
	 function displayNext(){
      currentQuestionIndex++
	  clearInterval(countdown);
	   if(currentQuestionIndex < QuestionData.length ){
	      displayQuestion();
	   }
	 }
	 

function selectAnswer(e){
    const selectedButton = e.target;
	    const buttons = Array.from(answerContainer.getElementsByTagName("button"));
		 const selectedAnswerIndex = buttons.indexOf(selectedButton)
	    //console.log(selectedAnswer);
	   const correctAnswerIndex = QuestionData[currentQuestionIndex].answerIndex;
           //console.log(correctAnswerIndex)
	   if(selectedAnswerIndex== correctAnswerIndex) {
		selectedButton.classList.add("correct");
		score++;
	   } else{
		selectedButton.classList.add("incorrect");
	   }
       
	   buttons.forEach(button => {
		button.disabled = true;
	  });  

		nextButton.style.display = "block";

	};

	function showScore(){
		resetState();
		questionElement.innerHTML=`You have scored: ${score} out of ${QuestionData.length}`;
		nextButton.innerHTML = "play again";
		nextButton.style.display = "block";
	}
  
     function handleNextButton(){
		 currentQuestionIndex++;
		 if(currentQuestionIndex < QuestionData.length){
			 displayQuestion();
		 } else{
			showScore();
		 }
	 }

	
	  
	 nextButton.addEventListener("click", ()=>{
		if(currentQuestionIndex < QuestionData.length){
			handleNextButton()
		} else{
			startQuiz();
		}
	 })


startQuiz();
    

