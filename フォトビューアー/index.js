class PhotoViewer {

    constructor(root,images) {
        this.root = root;
        this.images = images;
        this.currentIndex=0;
    }

    init() {
       const prevButton = this.root.querySelector(".prevButton");
       const nextButton = this.root.querySelector(".nextButton");

        prevButton.addEventListener("click", ()=>{
            this.prev();
        });

         nextButton.addEventListener("click", ()=>{
            this.next();
        });


        this.renderImageUrls();
        this.photoviewer();
        }


        photoviewer() {
            const frame = this.root.querySelector(".frame");
            const imageIndex = this.currentIndex+1;
    
            frame.innerHTML = `
                <div class="test">
                <p>${imageIndex}枚目</p>
                <img src=${this.images[this.currentIndex]} width="500" height="500"></img>
                </div> 
            `;
            this.startTimer();
        }

        startTimer() {
            if(this.timerKey) {
                clearTimeout(this.timerKey);
            }

            this.timerKey = setTimeout(()=>{
                this.next();
            },3000);
        }

        renderImageUrls() {
            const imagesElm = this.root.querySelector(".images");
            let imageUrlsHtml ="";
            for (const image of this.images) {
                imageUrlsHtml += `<li><a href="${image}" target="_blank">${image}</a></li>`;
            }
            imagesElm.innerHTML = imageUrlsHtml;   
        }

        prev() {
            const lastIndex = this.images.length -1;
            if(this.currentIndex===0){
                this.currentIndex=lastIndex;
            }else{
            this.currentIndex--;
            }
            this.photoviewer();
        }

        next() {
            const lastIndex = this.images.length -1;
            if(this.currentIndex===lastIndex){
                this.currentIndex=0;
            }else{
                this.currentIndex++;
            }
            this.photoviewer();
        }
}

const images = [
    "img1.jpg",
    "img2.jpg",
    "img3.jpg"
];

new PhotoViewer(document.getElementById("photoViewer"),images).init();