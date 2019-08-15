'use strict';
//block checkbox
function toggleCheckbox(){
    const checkbox = document.querySelectorAll('.filter-check_checkbox');
    checkbox.forEach(function(element) {
        element.addEventListener('change', ()=> {
            (element.checked) ? element.nextElementSibling.classList.add('checked') : element.nextElementSibling.classList.remove('checked');
            filters();
        })
    })
}
//end block checkbox
// block cart
function toggleCartInit() {
    const   cartBtn = document.querySelector('#cart'),
            closeBtn = document.querySelector('.cart-close'),
            modalCart = document.querySelector('.cart'),
            minPrice = document.querySelector('#min'),
            maxPrice = document.querySelector('#max'),
            search = document.querySelector('.search-wrapper_input'),
            searchBtn = document.querySelector('.search-btn');
    document.addEventListener('click', (event)=> {
        if (event.target.className === 'cart') {
            modalCart.style.display = "none";
            document.body.style.overflow = "";
        }
        cartBtn.addEventListener('click', ()=> {
        modalCart.style.display = "block";
        document.body.style.overflow = "hidden";
        });
        calcTotal(modalCart);
    });
    closeBtn.addEventListener('click', ()=> {
    modalCart.style.display = "none";
    document.body.style.overflow = "";
    });
    maxPrice.addEventListener('change', filters);
    minPrice.addEventListener('change', filters);
    search.addEventListener('change', filters);
    searchBtn.addEventListener('change', filters);
    search.addEventListener('keypress',filters);
    }
// end block cart
// block add/delete stuff to cart
function toggleCart() {
    const   cards = document.querySelectorAll('.goods .card'),
            cartWrapper = document.querySelector('.cart-wrapper');
    cards.forEach( (card)=> {
    const btn = card.querySelector('button');
    btn.addEventListener('click', ()=> {
        const   cardClone = card.cloneNode(true);
    // GROUP GOOODS
        const   goodsNum = document.createElement("div");
        goodsNum.style.width = "30px";
        goodsNum.style.height = "30px";
        goodsNum.style.background = "#333333";
        goodsNum.style.color = "white";
        goodsNum.innerHTML = "1";
        goodsNum.style.textAlign = "center";
        goodsNum.style.position = "absolute";
        goodsNum.className = "number-sticker";
        goodsNum.style.zIndex = "111";
        // First goods        
        if (cartWrapper.querySelectorAll('.card').length===0) 
        { 
            addCardCart(cartWrapper,cardClone,goodsNum);
        }else{
        // Second and next goods
        let cardsCart = cartWrapper.querySelectorAll('.card');
        let cardFinded = false;
        cardsCart.forEach(function(card) {
            if (card.querySelector('.card-title').textContent === cardClone.querySelector('.card-title').textContent) 
            {
                cardFinded = true;
                card.querySelector('.number-sticker').textContent = parseFloat(card.querySelector('.number-sticker').textContent) + 1;
            }
        });
        if (!cardFinded) { addCardCart(cartWrapper,cardClone,goodsNum); }
        }
        showData(cartWrapper);
    })
    });
}

/* helpful functions */
function addCardCart(cartWrapper,cardClone,goodsNum) {
    {
        const   modalCart = document.querySelector('.cart'),
                cardCloneBtn = cardClone.querySelector('.btn');
        cardClone.appendChild(goodsNum);
        cartWrapper.appendChild(cardClone);
        cardCloneBtn.textContent = 'удалить';
        cardCloneBtn.addEventListener('click', function() {
           (parseFloat(this.parentElement.parentElement.querySelector('.number-sticker').textContent)>1) ?                
           this.parentElement.parentElement.querySelector('.number-sticker').textContent = parseFloat(this.parentElement.parentElement.querySelector('.number-sticker').textContent) - 1
           : cardClone.remove();
            calcTotal(modalCart);
            showData(cartWrapper);
        });
    }
}
function showData(cartWrapper) {
    const   cardsCart = cartWrapper.querySelectorAll('.card'),
            countGoods = document.querySelector('.counter'),
            cartEmpty = document.querySelector('#cart-empty');
    countGoods.textContent = cardsCart.length;
    (cardsCart.length) ? cartEmpty.style.display="none" : cartEmpty.style.display="block";
}
// end block add/delete stuff to cart
// function calculate Total in Cart
function calcTotal(cart) {
    const   cards = cart.querySelectorAll('.card'),
            totalText = document.querySelector('.cart-total > span');
    var     sum = 0;
    cards.forEach(function(card) {
        const   goodPrice = parseFloat(card.querySelector('.card-price').textContent),
                goodNumber = parseFloat(card.querySelector('.number-sticker').textContent);
                sum += goodPrice * goodNumber;
    })
    totalText.textContent = (parseFloat(sum).toFixed(0)).toString().replace(/(\d)(?=(\d{3})+($|\.))/g, '$1 ');
}
// end function calculate Total in Cart
// block filters
function filters() {
    const   cards = document.querySelectorAll('.goods .card'),
            discountCheckbox = document.querySelector('#discount-checkbox'),
            presenceCheckbox = document.querySelector('#discount-presence'),
            topCheckbox = document.querySelector('#discount-top'),
            minPrice = document.querySelector('#min'),
            maxPrice = document.querySelector('#max'),
            search = document.querySelector('.search-wrapper_input'),
            searchText = new RegExp(search.value.trim(), 'i');

    cards.forEach((card)=> {card.parentElement.style.display = "block";});

    cards.forEach((card)=> {
        if (discountCheckbox.checked) {
            if (!card.querySelector('.card-sale')) {
                card.parentElement.style.display = "none";
            }
        }
        if (presenceCheckbox.checked) {
            if (!card.querySelector('.card-sale')) {
                card.parentElement.style.display = "none";
            }
        }
        if (topCheckbox.checked) {
            if (!card.querySelector('.card-sale')) {
                card.parentElement.style.display = "none";
            }
        }
         if (parseFloat(minPrice.value) > 0 && parseFloat(card.querySelector('.card-price').textContent) < parseFloat(minPrice.value)) {
            card.parentElement.style.display = "none";
        }
        if (parseFloat(maxPrice.value) > 0 && parseFloat(card.querySelector('.card-price').textContent) > parseFloat(maxPrice.value)) {
            card.parentElement.style.display = "none";
        }
        if (searchText.length > 0 ) { console.log(searchText)}
        if (! searchText.test(card.querySelector('.card-title').textContent)) {
            card.parentElement.style.display = "none";
        }
    });
}
// end block filters
toggleCartInit();
toggleCart();
toggleCheckbox();