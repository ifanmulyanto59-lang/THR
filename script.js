// ========================
// CONFIG
// ========================

const TEST_MODE = true; 
// true = bisa coba berkali kali
// false = cuma boleh 1x

const TIME_LIMIT = 20;


// ========================
// QUIZ DATA
// ========================

const quiz = [
{
question:"Apa ibu kota Indonesia?",
answers:[
{text:"Jakarta",correct:true},
{text:"Bandung",correct:false},
{text:"Surabaya",correct:false},
{text:"Medan",correct:false}
]
},

{
question:"2 + 2 = ?",
answers:[
{text:"3",correct:false},
{text:"4",correct:true},
{text:"5",correct:false},
{text:"22",correct:false}
]
},

{
question:"Planet terbesar?",
answers:[
{text:"Mars",correct:false},
{text:"Bumi",correct:false},
{text:"Jupiter",correct:true},
{text:"Venus",correct:false}
]
}
];


// ========================
// VARIABLES
// ========================

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = TIME_LIMIT;


// ========================
// ELEMENTS
// ========================

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const timerEl = document.getElementById("timer");

const quizContainer = document.getElementById("quiz-container");
const resultContainer = document.getElementById("result-container");
const resultText = document.getElementById("result-text");


// ========================
// BLOCK MULTIPLE ATTEMPT
// ========================

if(!TEST_MODE){

if(localStorage.getItem("quiz_done")){
document.body.innerHTML="<h2>Anda sudah pernah mengerjakan quiz ini.</h2>";
throw new Error("Quiz already done");
}

}


// ========================
// START QUIZ
// ========================

startQuiz();

function startQuiz(){
showQuestion();
}


// ========================
// SHOW QUESTION
// ========================

function showQuestion(){

resetTimer();

const q = quiz[currentQuestion];

questionEl.innerText = q.question;

answersEl.innerHTML="";

q.answers.forEach(answer=>{

const btn=document.createElement("button");
btn.innerText=answer.text;

btn.onclick=()=>selectAnswer(answer.correct);

answersEl.appendChild(btn);

});

startTimer();

}


// ========================
// ANSWER
// ========================

function selectAnswer(correct){

if(correct) score++;

currentQuestion++;

if(currentQuestion < quiz.length){

showQuestion();

}else{

finishQuiz();

}

}


// ========================
// TIMER
// ========================

function startTimer(){

timeLeft = TIME_LIMIT;

timerEl.innerText = timeLeft;

timer=setInterval(()=>{

timeLeft--;

timerEl.innerText=timeLeft;

if(timeLeft<=0){

clearInterval(timer);

failQuiz("Waktu habis");

}

},1000);

}


function resetTimer(){

clearInterval(timer);

}


// ========================
// FINISH
// ========================

function finishQuiz(){

resetTimer();

if(!TEST_MODE){
localStorage.setItem("quiz_done","true");
}

quizContainer.classList.add("hidden");
resultContainer.classList.remove("hidden");

resultText.innerText="Score kamu: "+score+" / "+quiz.length;

}


// ========================
// FAIL
// ========================

function failQuiz(reason){

resetTimer();

quizContainer.classList.add("hidden");
resultContainer.classList.remove("hidden");

resultText.innerText="Gagal: "+reason;

}


// ========================
// ANTI TAB SWITCH
// ========================

document.addEventListener("visibilitychange", ()=>{

if(document.hidden){

failQuiz("Keluar dari halaman");

}

});


// ========================
// ANTI MINIMIZE (mobile)
// ========================

window.addEventListener("blur", ()=>{

failQuiz("Aplikasi ditinggalkan");

});


// ========================
// ANTI BACK BUTTON
// ========================

history.pushState(null,null,location.href);

window.onpopstate=function(){

failQuiz("Tidak boleh keluar");

};
