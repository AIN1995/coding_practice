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



        this.photoviewer();
        }


        photoviewer() {
            const frame = this.root.querySelector(".frame");
            const images = this.images[this.currentIndex];
    
            frame.innerHTML = `
                <div class="test">
                <img src=${images} width="500" height="500"></img>
                </div> 
            `;
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