'use strict';
//block checkbox turn on/ turn off flag on divs of checkboxes
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
// block cart  add EventListener on page
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
    search.addEventListener('keyup',filters);
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
    // GROUP GOOODS add small div with number of goods one kind
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
        // First goods   If no any goods in cart - add to cart
        if (cartWrapper.querySelectorAll('.card').length===0) 
        { 
            addCardCart(cartWrapper,cardClone,goodsNum);
        }else{
        // Second and next goods. If any goods are in the cart, match them and added
        let cardsCart = cartWrapper.querySelectorAll('.card');
        let cardFinded = false; // if one of goods in cart = current flag cardFinded = true. And increment number of that kind goods.
        cardsCart.forEach(function(card) {
            if (card.querySelector('.card-title').textContent === cardClone.querySelector('.card-title').textContent) 
            {
                cardFinded = true;
                card.querySelector('.number-sticker').textContent = parseFloat(card.querySelector('.number-sticker').textContent) + 1;
            }
        });
        if (!cardFinded) { addCardCart(cartWrapper,cardClone,goodsNum); } // if no any some good, add new
        }
        showData(cartWrapper); // update info stickers
    })
    });
}

/* helpful functions */
// add goods to cart as new card or as increment current card
function addCardCart(cartWrapper,cardClone,goodsNum) {
    {
        const   modalCart = document.querySelector('.cart'),
                cardCloneBtn = cardClone.querySelector('.btn');
        cardClone.appendChild(goodsNum);
        cartWrapper.appendChild(cardClone);
        cardCloneBtn.textContent = 'удалить'; // config added card
        // add function of remove (increment counter or remove card)
        cardCloneBtn.addEventListener('click', function() {
           (parseFloat(this.parentElement.parentElement.querySelector('.number-sticker').textContent)>1) ?                
           this.parentElement.parentElement.querySelector('.number-sticker').textContent = parseFloat(this.parentElement.parentElement.querySelector('.number-sticker').textContent) - 1
           : cardClone.remove();
            calcTotal(modalCart); // update total
            showData(cartWrapper);// update informers
        });
    }
}
// show informer about quantity of goods
function showData(cartWrapper) {
    const   cartEmpty = document.querySelector('#cart-empty'),
            numberCardsCart = cartWrapper.querySelectorAll('.card').length, // lenght = number of card in cart
            cardsCart = cartWrapper.querySelectorAll('.number-sticker'), // array of divs with numbers sticker 
            countGoods = document.querySelector('.counter'); // sticker with Total Numbers
    let counter = 0;
    cardsCart.forEach((card) => { counter +=  parseFloat(card.textContent); })  // sum all divs with numbers
    countGoods.textContent = numberCardsCart + ' [' + counter + ']';
    (counter) ? cartEmpty.style.display="none" : cartEmpty.style.display="block"; 
}
// end block add/delete stuff to cart
// function calculate Total in Cart
function calcTotal(cart) {
    const   cards = cart.querySelectorAll('.card'),
            totalText = document.querySelector('.cart-total > span');
    var     sum = 0;
    cards.forEach(function(card) {
        const   goodPrice = parseFloat(card.querySelector('.card-price').textContent), // get Price in card
                goodNumber = parseFloat(card.querySelector('.number-sticker').textContent); // get Number in card
                sum += goodPrice * goodNumber; 
    }) // add Space after each three simbol of cost. Example "33 500", "12 325 524" 
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
    // do all card visible
    cards.forEach((card)=> {card.parentElement.style.display = "block";});
    // hide card under the filters
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
// function getData
function getData() {
    const goodsWrapper = document.querySelector('.gooods');
    fetch('../db/db.json')
    .then((response) => {
        if (response.ok) 
        {
            return response.json();
        }else{
            throw new Error ('Error, data not resive: ' + response.status);
        }  
    })
    .then(data => renderCards(data))
    .catch(err => {
        goodsWrapper.innerHTML = '<div style="color: red;">Ошибка: не удалось получить данные!</div>';
        console.warn('Error, data not resive: ' + err)
    });
}
// end getData
// render
function renderCards(cards) {
    const   {goods} = cards,
            goodsWrapper = document.querySelector('.goods');
        goods.map(card => {
//        card.category; card.hoverImg; card.title; card.price; card.sale; card.img;
        const   cardHtml = document.createElement('div');
        cardHtml.className = 'col-12 col-md-6 col-lg-4 col-xl-3';
        cardHtml.innerHTML = `
        <div class="card">
            ${card.sale ? '<div class="card-sale">🔥Hot Sale🔥</div>' : ''}
            <div class="card-img-wrapper">
                <span class="card-img-top"
                    style="background-image: url('${card.img}')"></span>
            </div>
            <div class="card-body justify-content-between">
                <div class="card-price" style="${card.sale ? 'color: green;' : ''}">${card.price} ₽</div>
                <h5 class="card-title">${card.title}</h5>
                <button class="btn btn-primary">В корзину</button>
            </div>
        </div>
        `;
        goodsWrapper.appendChild(cardHtml);
    })
}
// end render
// start functions
getData();
toggleCartInit();
toggleCheckbox();
toggleCart();
