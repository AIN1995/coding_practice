class WordQuiz {

    constructor(rootElm) {
        this.rootElm = rootElm;
        this.levelstep = 1;
        this.nowlevel = "level1";
        this.answerpoint = 0;
        this.settimer = null;
    }

    async init() {
        await this.getjson();
        this.startgamen();
    }

    async getjson() {
        try {
        const json = await fetch("./quiz.json");
        this.quizData = await json.json();
        } catch(e) {
            this.rootElm.innerText = "通信失敗";
            console.log(e);
        }
    }

    resetdata() {
        this.levelstep = 1;
        this.nowlevel = "level1";
        this.answerpoint = 0;
        this.startgamen();
    }

    startgamen() {
        const level = Object.keys(this.quizData);
        const levelList = [];
        for(let i=0;i<level.length;i++)  {let list=`
            <option value="${level[i]}" class="level">レベル${i+1}
            </option>
            `;
            levelList.push(list);
        }
        const html=`
        <h1>クイズゲーム</h1>
        <select class="levelSelect">
        ${levelList}
        </select>
        <button class="startBtn">スタート</button>
        `
        this.changegamen(html);

        const getlevel = this.rootElm.querySelector(".levelSelect");
        getlevel.addEventListener("change",(event)=>{
            this.nowlevel = event.target.value;
        });

        const startBtn = this.rootElm.querySelector(".startBtn");
        startBtn.addEventListener("click",()=>{
            this.questiongamen();
        });
    }

    questiongamen() {
        const word = this.quizData[this.nowlevel][`step${this.levelstep}`]["word"];
        const choices = this.quizData[this.nowlevel][`step${this.levelstep}`]["choices"];
        let choicelist = [];
        let count = 10;

        for(let choice of choices) {let list=
        `<input type="radio" name="list" value="${choice}">${choice}</input>`;
        choicelist.push(list);
        }

        this.settimer = setInterval(() => {
            this.time = this.rootElm.querySelector(".time");
            count--;
            if(count!==undefined) {
            this.time.innerText = `制限時間${count}秒`;
            }
            if(count===0) {
                this.nexthantei();
            }
        }, 1000);

        const html = `
        <p>${word}</p>
        <div class="answer">
        ${choicelist.join("")}
        </div>
        <button class="nextbtn">回答する</button>
        <div class="time">制限時間10秒</div>
        `;

        this.changegamen(html);

        const next = this.rootElm.querySelector(".nextbtn");
        const kaitou = this.rootElm.querySelector(".answer");

        kaitou.addEventListener("change",(event)=>{
            this.answer = event.target.value;
        });

        next.addEventListener("click",()=>{
            this.nexthantei();
        });
    }

    nexthantei() {
        clearInterval(this.settimer);
        this.answerkeisan(this.answer);
        const object = Object.keys(this.quizData[this.nowlevel]);
        this.maxlength = object.length;
        if(this.levelstep!==this.maxlength) {
            this.levelstep++;
            this.questiongamen();
        }else{
            this.answergamen();
        }
    }

    answerkeisan(kekka) {
        const answer = this.quizData[this.nowlevel][`step${this.levelstep}`]["answer"];
        if(kekka===answer) {
            this.answerpoint++;
        }
        this.answerkekka = (this.answerpoint/this.maxlength)*100;
    }

    answergamen() {
        const html =`
        <h1>ゲーム終了</h1>
        <p>正答率${this.answerkekka}%</P>
        <button class="lastbtn">開始画面に戻る</button>
        `;
        this.changegamen(html);
        const last = this.rootElm.querySelector(".lastbtn");
        last.addEventListener("click",()=>{
            this.resetdata();
        });
    }

    changegamen(elm) {
        this.rootElm.innerHTML = "";
        this.rootElm.innerHTML = elm;
    }

}

new WordQuiz(document.getElementById("app")).init();