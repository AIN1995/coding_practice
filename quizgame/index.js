class WordQuiz {
    constructor(rootElm) {
        this.rootElm = rootElm;

        this.gameStatus ={};
        this.resetGame();
    }

    async init() {
        await this.fetchQuizData();
        this.displaStartView();
    }
    
    async fetchQuizData() {
      try {
        const response = await fetch("./quiz.json");
        this.quizData = await response.json();
      } catch (e) {
        this.rootElm.innerText = "問題の読み込みに失敗しました";
        console.log(e);
      }
    }

    isLastStep() {
        const currentQuetstions = this.quizData[this.gameStatus.level];
        return this.gameStatus.step === Object.keys(currentQuetstions).length;
    }

    nextStep() {
        this.clearTimer();
        this.addResult();
        if(this.isLastStep()) {
            this.displayResultView();
        }else{
            this.gameStatus.step++;
            this.displayQuestionView();
        }
    }

    addResult() {
        const checkedElm = this.rootElm.querySelector('input[name="choice"]:checked');
        const answer = checkedElm ? checkedElm.value:"";
        const currentQuestion = this.quizData[this.gameStatus.level][`step${this.gameStatus.step}`];

        this.gameStatus.results.push({
            question:currentQuestion,
            selectedAnswer:answer
        });
    }

    calcScore() {
        let correctNum = 0;
        const results = this.gameStatus.results;

        for(const result of results) {
            const selected = result.selectedAnswer;
            const correct = result.question.answer;
            if(selected===correct) {
                correctNum++;
            }
        }
        return Math.floor((correctNum/results.length)*100);
    }

    resetGame() {
        this.gameStatus.level=null;
        this.gameStatus.step = 1;
        this.gameStatus.results=[];
        this.gameStatus.timeLimit=0;
        this.gameStatus.intervalKey = null;
    }

    setTimer() {
        if(this.gameStatus.intervalKey !== null) {
            throw new Error("taima-ugoiteu");
        }
        this.gameStatus.timeLimit = 10;
        this.gameStatus.intervalKey = setInterval(()=>{
            this.gameStatus.timeLimit--;
        if(this.gameStatus.timeLimit===0) {
            this.nextStep();
        }else{
            this.renderTimeLimitStr();
        }
        },1000);
    }

    clearTimer() {
        clearInterval(this.gameStatus.intervalKey);
        this.gameStatus.intervalKey=null;
    }

    displaStartView() {
        const levelStrs = Object.keys(this.quizData);
        this.gameStatus.level = levelStrs[0];
        const optionStars = [];
        for(let i=0;levelStrs.length>i;i++) {
            optionStars.push(`<option value="${levelStrs[i]}" name="level">レベル${i+1}</option>`);
        }
        const html = `
        <select class="levelSelector">
        ${optionStars.join("")}
        </select>
        <button class="startBtn">スタート</button>
        `
        const parentElm = document.createElement("div");
        parentElm.innerHTML = html;

        const selectorElm = parentElm.querySelector(".levelSelector");
        selectorElm.addEventListener("change",(event)=>{
           this.gameStatus.level = event.target.value; 
        });

        const startBtnElm = parentElm.querySelector(".startBtn");
        startBtnElm.addEventListener("click",()=>{
            this.displayQuestionView();
        });

        this.replaceView(parentElm);
    }

    displayQuestionView() {
        console.log(`レベル：${this.gameStatus.level}`);
        this.setTimer();
        const stepKey = `step${this.gameStatus.step}`;
        const currentQuetstion = this.quizData[this.gameStatus.level][stepKey];

        const choiceStrs = [];
        for(const choice of currentQuetstion.choices) {
            choiceStrs.push(`<label>
            <input type="radio" name="choice" value="${choice}"/>
            ${choice}
            </label>
            `);
        }

        const html = `
            <p>${currentQuetstion.word}</p>
            <div>
            ${choiceStrs.join("")}
            </div>
            <div class="actions">
            <button class="nextBtn">解答する</button>
            </div>
            <p class="sec">残り解答時間:${this.gameStatus.timeLimit}秒</p>
        `;

        const parentElm = document.createElement("div");
        parentElm.className = "question";
        parentElm.innerHTML = html;

        const nextBtnElm = parentElm.querySelector(".nextBtn");
        nextBtnElm.addEventListener("click",()=>{
            this.nextStep();
        });


        this.replaceView(parentElm);
    }

    renderTimeLimitStr() {
        const secElm = this.rootElm.querySelector(".sec");
        secElm.innerText=`残り時間:${this.gameStatus.timeLimit}秒`;
    }

    displayResultView() {
        const score = this.calcScore();
        const html = `
        <p>ゲーム終了</p>
        <p>正解率：${score}%</p>
        <button class="resetBtn">開始画面に戻る</button>
        `;

        const parentElm = document.createElement("div");
        parentElm.className = "results";
        parentElm.innerHTML = html;
        const resetBtnElm = parentElm.querySelector(".resetBtn");
        resetBtnElm.addEventListener("click",()=>{
            this.resetGame();
            this.displaStartView();
        });

        this.replaceView(parentElm);
    }

    replaceView(elm) {
        this.rootElm.innerHTML = "";
        this.rootElm.appendChild(elm);
    }

}

new WordQuiz(document.getElementById("app")).init();