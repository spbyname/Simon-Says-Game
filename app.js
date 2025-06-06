
let gameSeq = [];
let userSeq = [];
let highestScore = 0;
let btns = ["pink","blue","yellow","purple"];

let started = false;
let level = 0;

let h3 = document.querySelector("h3");

document.addEventListener('keypress', function(){
    if(started==false){
        started = true;
        levelUp();
    }
});

function gameFlash(btn){
    btn.classList.add("gameFlash");
    setTimeout(function(){
        btn.classList.remove("gameFlash");
    },250);
}

function userFlash(btn){
    btn.classList.add("userFlash");
    setTimeout(function(){
        btn.classList.remove("userFlash");
    },250);
}

function levelUp(){
    userSeq = [];
    level++;
    h3.innerText = `Level: ${level}`;
    
    let randIdx = Math.floor(Math.random()*4);
    console.log(randIdx);
    let randColor = btns[randIdx];
    console.log(randColor);
    let randBtn = document.querySelector(`#${randColor}`);
    gameSeq.push(randColor);
    gameFlash(randBtn);
}


function checkAns(idx){
    if(userSeq[idx]===gameSeq[idx]){
        if(userSeq.length==gameSeq.length){
            setTimeout(levelUp,1000);
        }
    }
    else{
        h3.innerHTML = `Game over. Your score is <b>${level}</b>.<br>Press any key to start.`
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
        document.querySelector("body").style.backgroundColor = "white";
        },250);
        reset();
    }
}

function btnPress(){
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".box");

for(btn of allBtns){
    btn.addEventListener("click",btnPress)
}


function reset(){
    if(level>highestScore){
        highestScore = level;
        document.querySelector("#score").innerText = highestScore;
    }
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;

}