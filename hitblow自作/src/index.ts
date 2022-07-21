const printLine = (text:string,breakLine:boolean=true)=>{
    process.stdout.write(text+(breakLine ? "\n" : ""));
}

const promptInput = async (text:string)=>{
    printLine(`\n${text}\n`,false);
    const input:string = await new Promise((resolve)=>process.stdin.once("data",(data)=>resolve(data.toString())));
    return input.trim();
}


class HitAndBlow {
    private readonly Answers = ["0","1","2","3","4","5","6","7","8","9"];
    private answer:string[] = [];
    private tryCount = 0;

    setup() {
        const answerLength = 3;
        while(this.answer.length<answerLength) {
        const random = Math.floor(Math.random()*this.Answers.length);
        const ans = this.Answers[random];
        if(!this.answer.includes(ans)) {
            this.answer.push(ans);
          }
        }
    }

    async play() {
        const answerLength = 3;
        const data = (await promptInput(",区切りで数字を３つ入力")).split(",");
        const result = this.check(data);

        if(result.hit!==answerLength) {
            printLine(`---\nHit:${result.hit}\nBlow:${result.blow}\n---`);
            this.tryCount += 1;
            this.play();
        }else{
            this.tryCount += 1;
            this.end();
        }
        
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
    hitandblow.setup();
    await hitandblow.play();
})();

