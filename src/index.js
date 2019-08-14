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
        const   cardClone = card.cloneNode(true),
                cardCloneBtn = cardClone.querySelector('.btn');
        cartWrapper.appendChild(cardClone);
        cardCloneBtn.textContent = 'удалить';
        cardCloneBtn.addEventListener('click', ()=> {
            cardClone.remove();
            showData();
            totalText.textContent = calcTotal(modalCart);
        });
        showData();
    })
});
function showData() {
    const cardsCart = cartWrapper.querySelectorAll('.card');
//    countGoods.textContent = cardsCart.length;    // show total number of goods in Cart
    countGoods.textContent = calcTotal(modalCart);  // show total cost of goods in Cart
    (cardsCart.length) ? cartEmpty.remove() : cartWrapper.appendChild(cartEmpty);
}
// end block add/delete stuff to cart
// function calculate Total in Cart
function calcTotal(cart) {
    const   goodsPrice = cart.querySelectorAll('.card-price');
    var     sum = 0;
        goodsPrice.forEach(function(val){
            sum += parseInt(val.textContent);
        })
    return (parseInt(sum).toFixed(0)).toString().replace(/(\d)(?=(\d{3})+($|\.))/g, '$1 ');
}
// end function calculate Total in Cart
