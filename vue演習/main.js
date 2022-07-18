const main = document.getElementById("main");
const check = main.querySelectorAll('input[type="checkbox"]');
const product = Array.from(main.querySelectorAll(".product"));

check[0].addEventListener("change",onCheck,false);
check[1].addEventListener("change",onCheck,false);

function onCheck(event) {
    const list = main.querySelector(".search_resault");

    const fil = product.filter(function(item){
        let show = true;
        if(check[0].checked) {
            if(!issale(item)) {
                show = false;
            }
        }
        if(check[1].checked) {
            if(!istel(item)) {
                show = false;
            }
        }
        setShow(item,show)
        return show;
    });
    list.innerText = fil.length+"個";
}

function issale(item) {
    const sale = item.querySelector(".product_sale");
    return (sale && sale.innerText==="SALE");
}

function istel(item) {
    const tel = item.querySelector(".product_tel");
    return (tel && tel.textContent==="送料無料");
}

function setShow(item,show) {
    if(show) {
        item.setAttribute("style","display:block");
    }else{
        item.setAttribute("style","display:none");
    }
}