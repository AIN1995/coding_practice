const app = Vue.createApp({
    data() {
        return {
            message: "Hello Vue!"
        }
    }
})

const vm = app.mount("#app");

class Ball {
    constructor(x,y) {
        this.x=x;
        this.y=y;
    }
    init() {
        this.move();
        document.write('<div class="ball" style="top:'+this.y+
                       'px;left:'+this.x+'px;">💛</div>');
    }
    move() {
        this.x+=this.x;
        this.y+=this.y;
    }
}

let ball = [];

for(let i=0;i<=100;i++) {
    ball[i]=new Ball(
        Math.floor(Math.random()*window.innerWidth),
        Math.floor(Math.random()*window.innerHeight)
    ).init();
}





