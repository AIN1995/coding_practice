class StopWatch{
    constructor(option={}){
        this.option = option;
    }

    init(){
        const startButton = document.getElementsByClassName("startButton")[0];
        const display = document.getElementsByClassName("display")[0];
        const stopButton = document.getElementsByClassName("stopButton")[0];
        const log = document.getElementsByClassName("log")[0];
        const firstlog = document.getElementsByClassName("firstlog")[0];

        let timer = null;
        let {color,backgroundColor} = this.option;

        color = color || "lightblue";
        backgroundColor = backgroundColor || "black";

        display.style.color = color;
        display.style.backgroundColor = backgroundColor;

        startButton.addEventListener("click",function(){
            let seconds = 0;
            if(timer===null){
            timer = setInterval(function(){
                seconds++;
                display.innerText = seconds;
            },1000);
            startButton.className = "stop";
            addMessager("開始");
            }
        });

        stopButton.addEventListener("click",function(){
            if(timer!==null){
            clearInterval(timer);
            timer = null;
            startButton.className = "actions";
            addMessager("終了");
            }
        });

        function addMessager(message){
            const logtext = document.createElement("div");
            const now = new Date();
            firstlog.classList.add("firstmessage");
            logtext.classList.add("message");
            firstlog.innerText= `${now.getHours()}時${now.getMinutes()}分${now.getSeconds()}秒 ${message}`;
            logtext.innerText = `${now.getHours()}時${now.getMinutes()}分${now.getSeconds()}秒 ${message}`;
            log.appendChild(logtext);
        }
        
    }
}

const option  = {
    color:"limegreen",
    backgroundColor:"#333"
}

const stopWatch = new StopWatch(option);
stopWatch.init();
