// =========================
// AI Scam Detector
// script.js
// =========================

const inputText = document.getElementById("inputText");
const detectBtn = document.getElementById("detectBtn");
const sampleBtn = document.getElementById("sampleBtn");
const clearBtn = document.getElementById("clearBtn");
const copyBtn = document.getElementById("copyBtn");
const newBtn = document.getElementById("newBtn");

const loading = document.getElementById("loading");
const result = document.getElementById("result");

const score = document.getElementById("score");
const riskLevel = document.getElementById("riskLevel");
const scamType = document.getElementById("scamType");
const explanation = document.getElementById("explanation");
const confidence = document.getElementById("confidence");

const flags = document.getElementById("flags");
const tips = document.getElementById("tips");

const charCount = document.getElementById("charCount");


// =========================
// Character Counter
// =========================

inputText.addEventListener("input", () => {

    charCount.textContent = inputText.value.length + " Characters";

});


// =========================
// Sample Inputs
// =========================

const samples = [

`Congratulations!

You won ₹25,00,000 in our Mega Lucky Draw.

Pay ₹999 processing fee immediately to receive your prize.`,

`Amazon Recruitment

Congratulations!

You have been selected.

Pay ₹1500 registration fee today.

Limited seats.`,

`Dear Customer,

Your bank account will be blocked today.

Share your OTP immediately to verify your account.`,

`Hi Dear ❤️

I love you so much.

I need ₹10,000 urgently.

Please help me.`,

`Bitcoin Investment

Invest ₹5000 today.

Guaranteed 300% profit in only 24 hours.

No risk.`

];

sampleBtn.onclick = () => {

    const random = samples[Math.floor(Math.random() * samples.length)];

    inputText.value = random;

    charCount.textContent = inputText.value.length + " Characters";

};



// =========================
// Reset
// =========================

clearBtn.onclick = resetAll;

newBtn.onclick = resetAll;

function resetAll(){

    inputText.value="";

    charCount.textContent="0 Characters";

    result.classList.add("hidden");

    loading.classList.add("hidden");

}



// =========================
// Detection
// =========================

detectBtn.onclick = () => {

    const text = inputText.value.trim();

    if(text===""){

        alert("Please enter some text.");

        return;

    }

    loading.classList.remove("hidden");

    result.classList.add("hidden");

    setTimeout(()=>{

        detectScam(text);

        loading.classList.add("hidden");

        result.classList.remove("hidden");

    },1800);

};



// =========================
// Keywords
// =========================

const database=[

{
name:"Lottery Scam",
score:25,
words:[
"won",
"winner",
"lottery",
"jackpot",
"prize",
"congratulations",
"reward",
"gift"
]
},

{
name:"Fake Job",
score:20,
words:[
"job",
"registration fee",
"hiring",
"vacancy",
"selected",
"interview",
"pay fee",
"offer letter"
]
},

{
name:"Bank Scam",
score:30,
words:[
"otp",
"bank",
"blocked",
"account",
"verify",
"kyc",
"debit card",
"credit card",
"pin"
]
},

{
name:"Investment Scam",
score:25,
words:[
"bitcoin",
"crypto",
"investment",
"double money",
"profit",
"guaranteed",
"return",
"trading"
]
},

{
name:"Romance Scam",
score:20,
words:[
"love",
"baby",
"dear",
"send money",
"urgent",
"emergency",
"relationship"
]
}

];



// =========================
// AI Detection
// =========================

function detectScam(message){

    const text=message.toLowerCase();

    let totalScore=5;

    let highestType="General";

    let highest=0;

    let redFlags=[];

    database.forEach(category=>{

        let found=0;

        category.words.forEach(word=>{

            if(text.includes(word)){

                found++;

                totalScore+=category.score;

                redFlags.push("Contains suspicious phrase: \""+word+"\"");

            }

        });

        if(found>highest){

            highest=found;

            highestType=category.name;

        }

    });



    if(text.includes("http")){

        totalScore+=15;

        redFlags.push("Contains website link");

    }

    if(text.includes("₹")){

        totalScore+=10;

        redFlags.push("Requests money");

    }

    if(text.includes("immediately")
    ||text.includes("urgent")
    ||text.includes("today")){

        totalScore+=15;

        redFlags.push("Creates urgency");

    }

    if(totalScore>100){

        totalScore=100;

    }

    let risk="Low Risk";

    let explain="The message appears mostly safe. Always verify unknown sources.";

    if(totalScore>=30){

        risk="Medium Risk";

        explain="The content contains several suspicious patterns commonly found in online scams.";

    }

    if(totalScore>=60){

        risk="High Risk";

        explain="Strong indicators suggest this is very likely a scam. Avoid sharing money, OTPs, passwords or personal information.";

    }

    score.textContent=totalScore;

    riskLevel.textContent=risk;

    scamType.textContent=highestType;

    explanation.textContent=explain;

    confidence.textContent=Math.min(98,totalScore+5)+"%";



    flags.innerHTML="";

    if(redFlags.length===0){

        redFlags.push("No major scam indicators detected.");

    }

    redFlags.forEach(item=>{

        const li=document.createElement("li");

        li.textContent=item;

        flags.appendChild(li);

    });



    const safety=[

"Never share OTP or passwords.",

"Verify the sender using official sources.",

"Do not pay processing or registration fees.",

"Avoid clicking unknown links.",

"Report suspicious messages."

];

    tips.innerHTML="";

    safety.forEach(item=>{

        const li=document.createElement("li");

        li.textContent=item;

        tips.appendChild(li);

    });

}



// =========================
// Copy Result
// =========================

copyBtn.onclick=()=>{

    const text=`

AI Scam Detector Report

Scam Score : ${score.textContent}/100

Risk Level : ${riskLevel.textContent}

Scam Type : ${scamType.textContent}

Confidence : ${confidence.textContent}

Explanation :

${explanation.textContent}

Generated using AI Scam Detector.

`;

    navigator.clipboard.writeText(text);

    copyBtn.textContent="Copied ✓";

    setTimeout(()=>{

        copyBtn.textContent="Copy Result";

    },2000);

};



// =========================
// Click Examples
// =========================

document.querySelectorAll(".example").forEach(card=>{

    card.addEventListener("click",()=>{

        inputText.value=card.querySelector("p").innerText;

        charCount.textContent=inputText.value.length+" Characters";

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });

});