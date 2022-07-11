class todoList {

  constructor() {
  }

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
        inputtext.innerText = list;
      }else {
        inputtext.innerText = input.value;
      }
      ul.appendChild(inputtext);

      inputtext.addEventListener("contextmenu",(event)=>{
        event.preventDefault();
        this.deleteli(inputtext);
      });

      this.saveData();
    }

    deleteli(inputtext) {
      inputtext.remove();
      this.saveData();
    }


    saveData() {
      let save = document.querySelectorAll("li");
      let lists = [];
      for(let list of save) {
        lists.push(list.innerText);
      }
     localStorage.setItem("list",JSON.stringify(lists));
    }


 }


const todolist = new todoList().init();

