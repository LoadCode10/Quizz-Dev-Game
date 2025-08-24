const questions = [
  {
    question : "What does HTML stand for?",
    answers : [
      {text:'Hyperlinks and Text Markup Language', correct:false},
      {text:'Blue Hyper Text Making Language', correct:false},
      {text:'Hyper Text Markup Language', correct:true},
      {text:'High Text Markup Language', correct:false},
    ]
  },
  {
    question : "Which HTML tag is used to create a hyperlink?",
    answers : [
      {text:'<link>', correct:false},
      {text:'<a>', correct:true},
      {text:'<href>', correct:false},
      {text:'<url>', correct:false},
    ]
  },
  {
    question : "Which HTML tag is used to insert an image?",
    answers : [
      {text:'<image>', correct:false},
      {text:'<img>', correct:true},
      {text:'<pic>', correct:false},
      {text:'<src>', correct:false},
    ]
  },
  {
    question : "What is the correct HTML element for inserting a line break?",
    answers : [
      {text:'<break>', correct:false},
      {text:'<br>', correct:true},
      {text:'<lb>', correct:false},
      {text:'<hr>', correct:false},
    ]
  },
  {
    question : "How can you make a numbered list in HTML?",
    answers : [
      {text:'<ul>', correct:false},
      {text:'<ol>', correct:true},
      {text:'<dl>', correct:false},
      {text:'<list>', correct:false},
    ]
  },
  {
    question : "What is the correct HTML tag for the largest heading?",
    answers : [
      {text:'<heading>', correct:false},
      {text:'<h6>', correct:false},
      {text:'<h1>', correct:true},
      {text:'<head>', correct:false},
    ]
  },
  {
    question : "Which tag is used to define a table row?",
    answers : [
      {text:'<tr>', correct:true},
      {text:'<td>', correct:false},
      {text:'<th>', correct:false},
      {text:'<row>', correct:false},
    ]
  },
  {
    question : "Which attribute is used to provide alternative text for an image?",
    answers : [
      {text:'title', correct:false},
      {text:'alt', correct:true},
      {text:'src', correct:false},
      {text:'description', correct:false},
    ]
  },
  {
    question : "Which tag is used to create a dropdown list?",
    answers : [
      {text:'<dropdown>', correct:false},
      {text:'<input type="dropdown">', correct:false},
      {text:'<select>', correct:true},
      {text:'<listbox>', correct:false},
    ]
  },
  {
    question : "How do you create a checkbox in HTML?",
    answers : [
      {text:'<input type="checkbox">', correct:true},
      {text:'<check>', correct:false},
      {text:'<input type="check">', correct:false},
      {text:'<box>', correct:false},
    ]
  }
];

const myQuestion = document.querySelector('.My-question');
const answerButtons = document.querySelector('.answers-buttons');
const nextBtn = document.querySelector('.next-btn');

const progressBar = document.querySelector('.progress');
const progressNumbs = document.querySelector('.numbers');

nextBtn.style.display = 'none';


let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
  currentQuestionIndex = 0;
  score = 0;
  showQuestions();
};

//console.log(questions.answers);

function showQuestions(){
  deletePreviuosAnswers()
  let currentQuestion = questions[currentQuestionIndex];
  let currentQuestionNumb = currentQuestionIndex + 1;
  myQuestion.innerHTML = `${currentQuestionNumb}.Question: ${currentQuestion.question}`;
  currentQuestion.answers.forEach(answer => {
    const answerBtn = document.createElement('button');
    answerBtn.classList.add('btn');
    answerBtn.innerText = answer.text;
    answerButtons.appendChild(answerBtn);
    answerBtn.dataset.correct = answer.correct;
    answerBtn.addEventListener('click',selectAnswer);
  });
};

function selectAnswer(e){
  const selectedBtn = e.target;
  const isCorrect = e.target.dataset.correct === 'true';
  if(isCorrect){
    selectedBtn.classList.add('correct');
    score++;
  }else{
    selectedBtn.classList.add('incorrect');
  }
  Array.from(answerButtons.children).forEach(button => {
    if(button.dataset.correct === 'true'){
      button.classList.add('correct');
    }
    button.disabled = true;
  });
  nextBtn.style.display = 'block';
  ProgressStatus(score);
};

function deletePreviuosAnswers(){
  nextBtn.style.display = 'none';
  while(answerButtons.firstChild){
    answerButtons.removeChild(answerButtons.firstChild);
  }
};

function showScore(){
  deletePreviuosAnswers();
  myQuestion.innerHTML = `You are scored ${score}/${questions.length}.`;
  nextBtn.style.display = 'block';
  nextBtn.innerText = 'Play Again!';
};

function showNextQuestion(){
  currentQuestionIndex ++;
  if(currentQuestionIndex < questions.length){
    showQuestions();
  }else{
    showScore()
  }
};


nextBtn.addEventListener('click',()=>{
  if(currentQuestionIndex < questions.length){
    showNextQuestion();
  }else{
    startQuiz();
  }
});

function ProgressStatus(score){
  const totalQuestions = questions.length;
  const yourScore = score;
  progressBar.style.width = totalQuestions ? `${yourScore / totalQuestions * 100}%` : `0%`;
  progressNumbs.textContent = `${yourScore}/${totalQuestions}`;
}

showQuestions();