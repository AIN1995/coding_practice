class todoList {

  init() {
    const form = document.getElementById("form");
    const input = form.querySelector(".form-control");
    const ul = document.getElementById("ul");

    const todo = JSON.parse(localStorage.getItem("list"));

    if(todo) {
      for(let list of todo) {
        this.forminput(list);
      }
    }

    form.addEventListener("submit",(event)=>{
      event.preventDefault();
      this.forminput();
    });
  }

    forminput(list) {
      let inputtext = document.createElement("li");
      if(list) {
        inputtext.innerText = list.tag;
      }else {
        inputtext.innerText = input.value;
      }

      if(list && list.class) {
        inputtext.classList.add("text-decoration-line-through");
      }

      ul.appendChild(inputtext);

      inputtext.addEventListener("contextmenu",(event)=>{
        event.preventDefault();
        this.deleteli(inputtext);
      });

      inputtext.addEventListener("click",()=>{
        this.border(inputtext);
      });

      this.saveData();
    }

    deleteli(inputtext) {
      inputtext.remove();
      this.saveData();
    }

    border(inputtext) {
      inputtext.classList.toggle("text-decoration-line-through");
      this.saveData();
    }

    saveData() {
      let save = document.querySelectorAll("li");
      let lists = [];
      for(let list of save) {
          let taglist = {
            tag:list.innerText,
            class:list.classList.contains("text-decoration-line-through")
          }
        lists.push(taglist);
      }
     localStorage.setItem("list",JSON.stringify(lists));
    }

 }

const todolist = new todoList().init();

