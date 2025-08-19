HTML CSS JS Result Skip Results Iframe
// ==================== QUIZ ====================

const questions=[];

const ops=['+','-','*','/','%','^'];

for(let i=0;i<100;i++){

  let a=Math.floor(Math.random()*50)+1;

  let b=Math.floor(Math.random()*50)+1;

  let op=ops[Math.floor(Math.random()*ops.length)];

  let qStr=`${a} ${op} ${b}`;

  let ans=0; try{ans=math.evaluate(qStr);}catch{ans=0;}

  questions.push({q:qStr,a:ans});

}

let currentQuestion=null,score=0,timeLeft=30,timerId=null,askedQuestions=[],quizActive=false;

const questionEl=document.getElementById("question");

const answerEl=document.getElementById("answer");

const feedbackEl=document.getElementById("feedback");

const scoreEl=document.getElementById("score");

const timerEl=document.getElementById("timer");

function startQuiz(){

  score=0; askedQuestions=[]; quizActive=true;

  scoreEl.textContent=score; timeLeft=30; timerEl.textContent=timeLeft;

  nextQuestion();

  timerId=setInterval(()=>{timeLeft--; timerEl.textContent=timeLeft;if(timeLeft<=0){clearInterval(timerId); endQuiz();}},1000);

}

function nextQuestion(){

  if(askedQuestions.length===questions.length||!quizActive){endQuiz();return;}

  let idx; do{idx=Math.floor(Math.random()*questions.length);} while(askedQuestions.includes(idx));

  askedQuestions.push(idx);

  currentQuestion=questions[idx];

  questionEl.textContent=currentQuestion.q;

  answerEl.value=""; feedbackEl.textContent="";

}

function checkAnswer(){

  if(!quizActive) return;

  const userAnswer=parseFloat(answerEl.value);

  if(userAnswer===currentQuestion.a){score++; feedbackEl.textContent="✅ ถูกต้อง!";}

  else{feedbackEl.textContent="❌ ผิด! คำตอบคือ "+currentQuestion.a;}

  scoreEl.textContent=score; nextQuestion();

}

function endQuiz(){quizActive=false; questionEl.textContent="⏳ หมดเวลา! ได้คะแนน "+score; feedbackEl.textContent="";}

document.getElementById("startQuiz").addEventListener("click",startQuiz);

document.getElementById("submitAnswer").addEventListener("click",checkAnswer);

// ==================== SUPER CALCULATOR ====================

document.getElementById("calc-btn").addEventListener("click",()=>{

  const input=document.getElementById("calc-input").value;

  const resultEl=document.getElementById("calc-result");

  const stepsEl=document.getElementById("calc-steps");

  try{

    let sanitized=input.replace(/×/g,'*').replace(/÷/g,'/');

    const node=math.parse(sanitized);

    const code=node.compile();

    const result=code.evaluate();

    resultEl.textContent="ผลลัพธ์: "+result;

    const steps=[];

    node.traverse(n=>{if(n.isOperatorNode){const l=n.args[0].toString(),r=n.args[1].toString();steps.push(`${l} ${n.op} ${r} = ${n.evaluate()}`);}});

    stepsEl.textContent="วิธีคิด:\n"+steps.join("\n");

  } catch(e){resultEl.textContent="❌ สมการผิดพลาด!"; stepsEl.textContent="";}

});

// ==================== PYTHAGORAS ====================

document.getElementById("calc-pythagoras").addEventListener("click",()=>{

  let a=parseFloat(document.getElementById("side-a").value)||null;

  let b=parseFloat(document.getElementById("side-b").value)||null;

  let c=parseFloat(document.getElementById("side-c").value)||null;

  const resultEl=document.getElementById("pythag-result");

  const stepsEl=document.getElementById("pythag-steps");

  let res=""; let steps=[];

  const filled=[a,b,c].filter(x=>x!==null).length;

  if(filled<2){ resultEl.textContent="❌ ต้องใส่ตัวเลขอย่างน้อย 2 ด้าน"; stepsEl.textContent=""; return;}

  try{

    if(c===null){ const cCalc=Math.sqrt(a*a+b*b); res=`c = √(a² + b²) = √(${a}² + ${b}²) = ${cCalc.toFixed(2)}`; steps.push(`1. a²=${a*a}, b²=${b*b}`); steps.push(`2. a²+b²=${a*a+b*b}`); steps.push(`3. √(a²+b²)=${cCalc.toFixed(2)}`);}

    else if(a===null){ const aCalc=Math.sqrt(c*c-b*b); res=`a = √(c²-b²) = √(${c}²-${b}²) = ${aCalc.toFixed(2)}`; steps.push(`1. c²=${c*c}, b²=${b*b}`); steps.push(`2. c²-b²=${c*c-b*b}`); steps.push(`3. √(c²-b²)=${aCalc.toFixed(2)}`);}

    else if(b===null){ const bCalc=Math.sqrt(c*c-a*a); res=`b = √(c²-a²) = √(${c}²-${a}²) = ${bCalc.toFixed(2)}`; steps.push(`1. c²=${c*c}, a²=${a*a}`); steps.push(`2. c²-a²=${c*c-a*a}`); steps.push(`3. √(c²-a²)=${bCalc.toFixed(2)}`);}

    else{ const valid=Math.abs(c*c-(a*a+b*b))<0.001; res=valid?"✅ ถูกต้องตามทฤษฎีพิทากอรัส":"❌ ไม่ถูกต้องตามทฤษฎีพิทากอรัส"; steps.push(`ตรวจสอบ: c²=${c*c}, a²+b²=${a*a+b*b}`);}

    resultEl.textContent="ผลลัพธ์: "+res;

    stepsEl.textContent=steps.join("\n");

  } catch(e){resultEl.textContent="❌ มีข้อผิดพลาด"; stepsEl.textContent="";}

});


Resources
