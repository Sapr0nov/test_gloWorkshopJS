import  showData from "./showData";
import addCardCart from "./addCardCart";

export default function toggleCart() {
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