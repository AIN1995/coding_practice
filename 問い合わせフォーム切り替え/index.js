const kozin = document.getElementById("kozin");
const hozin = document.getElementById("hozin");


function showJapan() {
    if(hozin.classList.contains("active")&&kozin.classList.contains("delete")){
        kozin.className = "active";
        hozin.className = "delete";
    }
    kozin.classList.add("active");
    hozin.classList.add("delete");
}

function showHozin() {
    if(hozin.classList.contains("delete")&&kozin.classList.contains("active")){
        kozin.className = "delete";
        hozin.className = "active";
    }
    kozin.classList.add("delete");
    hozin.classList.add("active");
}