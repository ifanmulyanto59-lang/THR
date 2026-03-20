// ======================
// TEST MODE
// ======================

const TEST_MODE = false
// ubah ke false saat website dipakai orang


// ======================
// QUIZ STATE
// ======================

let currentQuestion = 0
let score = 0
let quizStarted = false
let quizFinished = false


// ======================
// TIMER
// ======================

let timeLeft = 10
let timer


// ======================
// ANTI MULTIPLE PLAY
// ======================

if (!TEST_MODE && localStorage.getItem("quizPlayed")) {

document.body.innerHTML = `
<h2 style="text-align:center;margin-top:100px;">
Quiz sudah pernah dimainkan.<br>
Kesempatan hanya 1 kali.
</h2>
`

throw new Error("Quiz already played")

}


// ======================
// QUESTIONS
// ======================

const questions = [

{
q:"Perang Badar terjadi pada tahun?",
a:["1 H","2 H","3 H","5 H"],
c:1
},

{
q:"Berapa jumlah ayat dalam surat Al-Fatihah?",
a:["5","6","7","8"],
c:2
},

{
q:"Lailatul Qadar berada pada malam?",
a:["10 awal Ramadhan","10 tengah","10 akhir","Setiap malam"],
c:2
},

{
q:"Siapa malaikat penyampai wahyu?",
a:["Mikail","Israfil","Jibril","Izrail"],
c:2
},

{
q:"Berapa rakaat sholat tarawih umum di Indonesia?",
a:["8","11","20","23"],
c:2
},

{
q:"Puasa Ramadhan diwajibkan pada tahun?",
a:["1 H","2 H","3 H","4 H"],
c:1
},

{
q:"Surah terpanjang dalam Al-Quran?",
a:["Al-Baqarah","Ali Imran","An-Nisa","Al-Maidah"],
c:0
},

{
q:"Idul Fitri jatuh pada tanggal?",
a:["1 Ramadhan","1 Syawal","10 Dzulhijjah","12 Rabiul Awal"],
c:1
},

{
q:"Kitab Zabur diberikan kepada?",
a:["Isa","Musa","Daud","Ibrahim"],
c:2
},

{
q:"Jumlah rukun Islam?",
a:["3","4","5","6"],
c:2
}

]


// ======================
// SHUFFLE QUESTIONS
// ======================

function shuffle(array){

for(let i=array.length-1;i>0;i--){

let j=Math.floor(Math.random()*(i+1))

[array[i],array[j]]=[array[j],array[i]]

}

}

shuffle(questions)


// ======================
// START QUIZ
// ======================

function startQuiz(){

quizStarted = true

if(!TEST_MODE){
localStorage.setItem("quizPlayed","true")
}

document.getElementById("startPage").classList.add("hidden")
document.getElementById("quizPage").classList.remove("hidden")

loadQuestion()

}


// ======================
// LOAD QUESTION
// ======================

function loadQuestion(){

clearInterval(timer)

let q = questions[currentQuestion]

document.getElementById("question").innerHTML =
q.q + `<div id="timer" style="margin-top:10px;font-size:18px;color:#f4d35e;">20</div>`

let answers = ""

q.a.forEach((choice,i)=>{

answers += `
<button onclick="answer(${i})">
${choice}
</button>
`

})

document.getElementById("answers").innerHTML = answers

document.getElementById("progressBar").style.width =
((currentQuestion)/questions.length)*100+"%"

startTimer()

}


// ======================
// TIMER
// ======================

function startTimer(){

timeLeft = 10

document.getElementById("timer").innerText = timeLeft

timer = setInterval(()=>{

timeLeft--

document.getElementById("timer").innerText = timeLeft

if(timeLeft <= 0){

clearInterval(timer)

failQuiz("Waktu habis.")

}

},500)

}


// ======================
// ANSWER
// ======================

function answer(i){

if(quizFinished) return

clearInterval(timer)

if(i === questions[currentQuestion].c){
score++
}

currentQuestion++

if(currentQuestion < questions.length){

loadQuestion()

}else{

finishQuiz()

}

}


// ======================
// FINISH QUIZ
// ======================

function finishQuiz(){

quizFinished = true

clearInterval(timer)

document.getElementById("quizPage").classList.add("hidden")
document.getElementById("resultPage").classList.remove("hidden")

document.getElementById("progressBar").style.width="100%"

let text=""

if(score >= 8){

text="Selamat! Kamu benar "+score+"/10 dan berhak mendapatkan THR"

document.getElementById("claimBtn").classList.remove("hidden")

}else{

text="Kamu benar "+score+"/10. Minimal 8 untuk mendapatkan THR."

}

document.getElementById("resultText").innerText = text

}


// ======================
// FAIL QUIZ
// ======================

function failQuiz(reason){

if(!quizStarted || quizFinished) return

quizFinished = true

clearInterval(timer)

document.getElementById("quizPage").classList.add("hidden")
document.getElementById("resultPage").classList.remove("hidden")

document.getElementById("claimBtn").classList.add("hidden")

document.getElementById("resultText").innerText =
"Quiz gagal.\n\n"+reason

}


// ======================
// TAB SWITCH DETECTION
// ======================

document.addEventListener("visibilitychange",function(){

if(TEST_MODE) return

if(document.hidden){

failQuiz("Terdeteksi pindah tab.")

}

})


// ======================
// WINDOW BLUR DETECTION
// ======================

window.addEventListener("blur",function(){

if(TEST_MODE) return

if(quizStarted && !quizFinished){

failQuiz("Terdeteksi keluar dari window.")

}

})


// // ======================
// // REFRESH / CLOSE DETECT
// // ======================

// window.addEventListener("beforeunload",function(){

// if(TEST_MODE) return

// if(quizStarted){

// localStorage.setItem("quizPlayed","true")

// }

// })


// ======================
// CLAIM PAGE
// ======================

function showClaim(){

document.getElementById("resultPage").classList.add("hidden")
document.getElementById("claimPage").classList.remove("hidden")

}


// ======================
// SEND WHATSAPP
// ======================

function sendWA(){

let method=document.getElementById("method").value
let rekening=document.getElementById("rekening").value
let nama=document.getElementById("nama").value

let message=`Halo, saya menang quiz THR

Metode: ${method}
Nomor: ${rekening}
Nama: ${nama}`

let url="https://wa.me/628563802368?text="+encodeURIComponent(message)

window.open(url)

}
