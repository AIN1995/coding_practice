const modes = ["normal","hard"] as const;
type Mode = typeof modes[number];

const printLine = (text:string,breakLine:boolean=true)=>{
    process.stdout.write(text+(breakLine ? "\n" : ""));
}

const promptInput = async (text:string)=>{
    printLine(`\n${text}\n`,false);
    return readLine();
}

const readLine = async()=>{
    const input:string = await new Promise((resolve)=>process.stdin.once("data",(data)=>resolve(data.toString())));
    return input.trim();
}

const selectmode = async<T extends String>(text:string,values:readonly T[]):Promise<T>=>{
    printLine("-text",false);
    values.forEach((value)=>{
        printLine(`\n>${value}`);
    });
    printLine(">");
    const input = (await readLine()) as T;
    if(values.includes(input)) {
        return input;
    }else {
        return selectmode(text,values);
    }
}



class HitAndBlow {
    private readonly Answers = ["0","1","2","3","4","5","6","7","8","9"];
    private answer:string[] = [];
    private tryCount = 0;
    private answerLength = 0;
    private mode:Mode="normal";
  
    async setup() {
        this.mode = await selectmode<Mode>("モード入力",modes);
        await this.levelmode();
        while(this.answer.length<this.answerLength) {
        const random = Math.floor(Math.random()*this.Answers.length);
        const ans = this.Answers[random];
        if(!this.answer.includes(ans)) {
            this.answer.push(ans);
          }
        }
    }

    async levelmode() {
        switch(this.mode) {
            case "normal":
            this.answerLength=3;
            break;
            case "hard":
            this.answerLength=4;
            break;
            default:
            printLine("エラー");
        }
        
    }

    async play() {
        const data = (await promptInput(`,区切りで数字を${this.answerLength}つ入力`)).split(",");

        if(!this.checkinput(data)) {
            printLine("再入力");
            this.play();
        }else {

        const result = this.check(data);

        if(result.hit!==this.answerLength) {
            printLine(`---\nHit:${result.hit}\nBlow:${result.blow}\n---`);
            this.tryCount += 1;
            this.play();
        }else{
            this.tryCount += 1;
            this.end();
        }
      }
    }

    private checkinput(data:string[]) {
        const checklength = data.length === this.answerLength;
        const checkinclude = data.every((val)=> this.Answers.includes(val));
        const checkcopy = data.every((val,index)=> data.indexOf(val)===index);
        return checklength&&checkinclude&&checkcopy;
    }

   check(data:string[]) {
        let hitcount = 0;
        let blowcount = 0;
        data.forEach((value,index)=> {
            if(value===this.answer[index]) {
                hitcount += 1;
            }else if(this.answer.includes(value)) {
                blowcount += 1;
            }
        });
        return {
            hit:hitcount,
            blow:blowcount
        }
   }

   end() {
    printLine(`正解です。回数：${this.tryCount}`);
    process.exit();
   }
           

}


;(async ()=>{
    const hitandblow = new HitAndBlow();
    await hitandblow.setup();
    await hitandblow.play();
})();

