const app = document.getElementById("app");

const check = app.querySelectorAll('input[type="checkbox"]');

check[0].addEventListener("change",onCheckChanged,false);
check[1].addEventListener("change",onCheckChanged,false);

const order = app.querySelector(".search_order");
order.addEventListener("change",onOrderChanged,false);

function onCheckChanged(event) {
    const nodeCount = app.querySelector(".search_count");
    const products = Array.from(app.querySelectorAll(".product"));

    const filteredList = products.filter(function(item) {
      let show = true;
      if(check[0].checked) {
        if(!isSale(item)) {
            show = false;
        }
      }
      if(check[1].checked) {
        if(!isFreeShipping(item)) {
            show = false;
        }
      }

      setDisplay(item,show);
      return show
});
    nodeCount.textContent = filteredList.length+"件";
}

function isSale(item) {
    const node = item.querySelector(".product_status");
    return (node && node.textContent === "SALE");
}

function isFreeShipping(item) {
    const node = item.querySelector(".product_shipping");
    return (node && node.textContent === "送料無料");
}

function setDisplay(node,show) {
    if(show) {
        node.setAttribute("style","display:block");
    }else {
        node.setAttribute("style","display:none");
    }
}

function onOrderChanged(event) {
    const nodeList = app.querySelector(".products");
    const products = Array.from(app.querySelectorAll(".product"));

    products.sort(function(a,b){
        if(event.target.value=="1") {
            return parseInt(a.getAttribute("id")) - parseInt(b.getAttribute("id"));
        }
        
         else if(event.target.value=="2") {
            const price1 = parseInt(a.querySelector(".product_price span").textContent.replace(",",""));
            const price2 = parseInt(b.querySelector(".product_price span").textContent.replace(",",""));
            return price1 - price2;
        }
    });

    while(nodeList.firstChild) {
        nodeList.removeChild(nodeList.firstChild);
    }

    products.forEach(function(item){
        nodeList.appendChild(item);
    });

}
