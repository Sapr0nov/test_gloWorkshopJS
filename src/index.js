'use strict';
//block checkbox
const checkbox = document.querySelectorAll('.filter-check_checkbox');
checkbox.forEach(function(element) {
    element.addEventListener('change', ()=> {
        (element.checked) ? element.nextElementSibling.classList.add('checked') : element.nextElementSibling.classList.remove('checked');
    })
})
//end block checkbox
// block cart
const   cartBtn = document.querySelector('#cart'),
        closeBtn = document.querySelector('.cart-close'),
        modalCart = document.querySelector('.cart'),
        totalText = document.querySelector('.cart-total > span');
cartBtn.addEventListener('click', ()=> {
    modalCart.style.display = "block";
    document.body.style.overflow = "hidden";
    totalText.textContent = calcTotal(modalCart);
});
closeBtn.addEventListener('click', ()=> {
    modalCart.style.display = "none";
    document.body.style.overflow = "";
});
// end block cart
// block add/delete stuff to cart
const   cards = document.querySelectorAll('.goods .card'),
        cartWrapper = document.querySelector('.cart-wrapper'),
        cartEmpty = document.querySelector('#cart-empty'),
        countGoods = document.querySelector('.counter');

cards.forEach( (card)=> {
    const btn = card.querySelector('button');
    btn.addEventListener('click', ()=> {
        function isLargeNumber(element) {
            return element > 13;
          }
        const   cardClone = card.cloneNode(true),
                cardCloneBtn = cardClone.querySelector('.btn');
// TEST
        const   goodsNum = document.createElement("div");
        goodsNum.style.width = "30px";
        goodsNum.style.height = "30px";
        goodsNum.style.background = "#333333";
        goodsNum.style.color = "white";
        goodsNum.innerHTML = "1";
        goodsNum.style.textAlign = "center";
        goodsNum.style.position = "absolute";
        goodsNum.className = "number-sticker";
// First goods        
        if (cartWrapper.querySelectorAll('.card').length===0) 
        {
            cartWrapper.appendChild(cardClone);
            cardCloneBtn.textContent = 'удалить';
            cardCloneBtn.addEventListener('click', ()=> {
                cardClone.remove();
                showData();
                totalText.textContent = calcTotal(modalCart);
            });
            showData();
        }
// Second and next goods
        cartWrapper.querySelectorAll('.card').forEach(function(element) {
            if (element.querySelector('.card-title').textContent === cardClone.querySelector('.card-title').textContent) 
            // TODO СВЕРЯЕТСЯ С КАЖДЫМ ЭЛЕМЕНТОМ И ВЫПОЛНЯЕТ ДЕЙСТВИЕ А НУЖНО ОДНО ДЕЙСТВИЕ НА ПРОХОД МАССИВА. ДОП ПЕРЕМЕННАЯ?
                {
                    console.log(element.querySelector('.card-title').textContent + ' == ' + cardClone.querySelector('.card-title').textContent)
                    if (element.querySelector('.number-sticker')) {
                        console.log(element.querySelector('.number-sticker'))
                        element.querySelector('.number-sticker').textContent = parseFloat(element.querySelector('.number-sticker').textContent) + 1;
                    }else{
                        element.appendChild(goodsNum);
                    }
                }else{
                    cartWrapper.appendChild(cardClone);
                    cardCloneBtn.textContent = 'удалить';
                    cardCloneBtn.addEventListener('click', ()=> {
                        cardClone.remove();
                        showData();
                        totalText.textContent = calcTotal(modalCart);
                    });
                }
                showData();
        });
    })
});
function showData() {
    const cardsCart = cartWrapper.querySelectorAll('.card');
    countGoods.textContent = cardsCart.length;
    (cardsCart.length) ? cartEmpty.remove() : cartWrapper.appendChild(cartEmpty);
}
// end block add/delete stuff to cart
// function calculate Total in Cart
function calcTotal(cart) {
    const   goodsPrice = cart.querySelectorAll('.card-price');
    var     sum = 0;
        goodsPrice.forEach(function(val){
            sum += parseFloat(val.textContent);
        })
    return (parseFloat(sum).toFixed(0)).toString().replace(/(\d)(?=(\d{3})+($|\.))/g, '$1 ');
}
// end function calculate Total in Cart
