const startButton = document.getElementsByClassName("startButton")[0];
const stopButton = document.getElementsByClassName("stopButton")[0];
const display = document.getElementsByClassName("display")[0];
const log = document.getElementsByClassName("log")[0];
let timer = null;

function stopWatch(){
function addMessage(message){
    let logtext = document.createElement("div");
    let now = new Date();
    logtext.innerText = now.getHours()+"時"+now.getMinutes()+"分"+now.getSeconds()+"秒"+" "+message;
    logtext.classList = ["message"];
    log.appendChild(logtext);
}

startButton.addEventListener("click",function(){
    let seconds = 0;
    if(timer===null){
    timer = setInterval(function(){
        seconds++;
        display.innerText=seconds;
    },1000);
    addMessage("開始");
    }
});

stopButton.addEventListener("click",function(){
    if(timer!==null){
    clearInterval(timer);
    timer = null;
    addMessage("終了");
    }
});
}

stopWatch();